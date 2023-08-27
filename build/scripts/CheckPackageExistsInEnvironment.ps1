param(
    [parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]
    $environmentName,

    [parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]
    $userName,

    [parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]
    $userPassword,

    [parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]
    $packageName,

    [parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]
    $packagesPath,

    [parameter(Mandatory = $false)]
    [ValidateNotNullOrEmpty()]
    [string]
    $fsiPublisherName = "Microsoft_FSI",

    [parameter(Mandatory = $false)]
    [ValidateNotNullOrEmpty()]
    [string]
    $powerPlatformAdminModuleRequiredVersion = "2.0.99",

    [parameter(Mandatory = $false)]
    [ValidateNotNullOrEmpty()]
    [string]
    $interactiveLogin = $false
)

function Get-FsiPublisherDetails{
    $odataTable = 'publishers'
    $odataQuery = "$($odataTable)?`$select=friendlyname,publisherid&`$filter=uniquename eq '$fsiPublisherName'"
    $publisherInformationResult = (Send-OdataRequestToPowerPlatformEnvironment -Method Get  -odataQuery $odataQuery).value
    if ($publisherInformationResult.Length -eq 0){
        return $null
    }
    else{
        return @{
            Name = $publisherInformationResult[0].friendlyname
            Id = $publisherInformationResult[0].publisherid
        }
    }
}

function Get-PackageSolutionInformation{

    $GetPackageFileInformation = {
        Write-Host "Getting packaged zip for '$packageName' from the drop path '$packagesPath'"

        $packageFilesSearchPattern = $packageName + "-PackageDeployer-*.zip"

        Write-Host "Searching for package matching search pattern '$packageFilesSearchPattern' in '$packagesPath'"
        $packageFile = @(Get-ChildItem -Path $packagesPath -Filter $packageFilesSearchPattern)
        $numberOfMatchingFiles = $packageFile.Length
        if ($numberOfMatchingFiles -ne 1){
            if ($numberOfMatchingFiles -eq 0){
                Write-Error "No packages matching search pattern '$packageFilesSearchPattern' found in '$packagesPath'"
            }
            else{
                Write-Error "$numberOfMatchingFiles packages matching search pattern '$packageFilesSearchPattern' found in '$packagesPath' - this is an indication of either a bad build drop or too generic package name"
            }
        }

        $packageFile = $packageFile | Select-Object -First 1
        return $packageFile
    }

    $PopulateWorkSite = {
        $packageFileFullName = $packageFile.FullName
        $packageFileCopyPath = Join-Path $worksiteFolderName $($packageFile.Name)
        Write-Host "Copying package file '$packageFileFullName' to $packageFileCopyPath"
        Copy-Item -Path $packageFileFullName -Destination $packageFileCopyPath -Force

        Write-Host "Unblocking package file '$packageFileCopyPath'"
        Unblock-File -Path $packageFileCopyPath

        Write-Host "Extracting package file '$packageFileCopyPath' to '$worksiteFolderName'"
        Expand-Archive -Path $packageFileCopyPath -DestinationPath $worksiteFolderName -Force
    }

    $GetPackageOrderedStructure = {
        $packageSolutions = @()

        $packageExtractionPath = Join-Path $worksiteFolderName $packageName
        $ImportConfigFilePath = Join-Path $packageExtractionPath "ImportConfig.xml"

        Write-Host "Retrieving package solutions from '$ImportConfigFilePath'"
        $PackageImportConfigContent = [xml](Get-Content $ImportConfigFilePath)
        $solutionFiles = $PackageImportConfigContent.configdatastorage.solutions.ChildNodes | Select-Object -ExpandProperty solutionpackagefilename

        foreach ($solutionFile in $solutionFiles){
            Write-Host "Expanding solution file '$solutionFile' to extract actual solution name"
            $solutionTargetFolder = Join-Path $packageExtractionPath ([IO.Path]::GetFileNameWithoutExtension($solutionFile))
            Expand-Archive -Path (Join-Path $packageExtractionPath $solutionFile) -DestinationPath $solutionTargetFolder -Force
            $solutionFileContent = [xml] (Get-Content (Join-Path $solutionTargetFolder solution.xml))
            $solutionUniqueName = $solutionFileContent.ImportExportXml.SolutionManifest.UniqueName
            Write-Host "Solution file '$solutionFile' unique name is '$solutionUniqueName'"
            $packageSolutions += @{
                Name = $solutionUniqueName
            }
        }

        return [array]$packageSolutions
    }

    $GetSolutionsIds = {
        $odataTable = 'solutions'

        foreach ($packageSolution in $packageSolutionsInOrder){
            $solutionName = $packageSolution.Name
            Write-Host "Retrieving the id, in environment '$environmentName' for solution '$solutionName'"

            $odataQuery = "$($odataTable)?`$select=solutionid&`$filter=uniquename eq '$solutionName'"
            $solutionInformationResult = (Send-OdataRequestToPowerPlatformEnvironment -Method Get  -odataQuery $odataQuery).value

            if ($solutionInformationResult.Length -eq 0){
                $packageSolution.Exists = $false
            }
            else{
                $packageSolution.Id = $solutionInformationResult.solutionid
                $packageSolution.Exists = $true
            }
        }
    }

    Write-Host "Getting the list of solutions in package '$packageName'"
    $worksiteFolderName = Join-Path $env:TEMP $(New-Guid)
    New-Item -Path $worksiteFolderName -ItemType Directory -Force | Out-Null

    $packageFile = $GetPackageFileInformation.Invoke()
    $PopulateWorkSite.Invoke() | Out-Null
    $packageSolutionsInOrder = $GetPackageOrderedStructure.Invoke()

    Write-Host "Resolving the ids for the solutions in package '$packageName'"
    $GetSolutionsIds.Invoke() | Out-Null
    return [array]$packageSolutionsInOrder
}

function Get-EnvironmentInformation{

    $environments = Get-AdminPowerAppEnvironment "$environmentName*"
    foreach ($environment in $environments){
        if ($environment.Internal.properties.linkedEnvironmentMetadata.friendlyName -eq  $environmentName){
            return $environment
        }
    }

    return $null
}

function Set-PowerAppsSecurityContext{
    $securedPassword = ConvertTo-SecureString $userPassword -AsPlainText -Force

    if ($interactiveLogin -eq $true){
        Add-PowerAppsAccount
    }
    else{
        Add-PowerAppsAccount -Username $userName -Password $securedPassword
    }
}

function Send-OdataRequestToPowerPlatformEnvironment{
    [CmdletBinding()]
    param(
        [parameter(Mandatory = $true)]
        [ValidateNotNullOrEmpty()]
        [string]
        $odataQuery,

        [Parameter(Mandatory = $true)]
        [string]
        [ValidateSet("Get","Post", "Delete")]
        $Method,

        [Parameter(Mandatory = $false)]
        $Body = $null
    )

    # We are using the PowerShell known client id
    $clientId = '1950a258-227b-4e31-a9cf-717495945fc2'

    $odataUri = "$environmentUrl/api/data/v9.1"


    $authParameters = [Microsoft.IdentityModel.Clients.ActiveDirectory.AuthenticationParameters]::CreateFromResourceUrlAsync($odataUri).Result
    $authContext = New-Object Microsoft.IdentityModel.Clients.ActiveDirectory.AuthenticationContext -ArgumentList $authParameters.Authority, $false

    if ($interactiveLogin -eq $true){
        $authResult = $authContext.AcquireToken($environmentUrl, $clientId, "urn:ietf:wg:oauth:2.0:oob")
    }
    else{
        $userCredential = New-Object  Microsoft.IdentityModel.Clients.ActiveDirectory.UserCredential -ArgumentList $userName, $userPassword
        $authResult = $authContext.AcquireToken($environmentUrl, $clientId, $userCredential)
    }

    $authToken = $authResult.AccessToken

    $headers =  New-Object "System.Collections.Generic.Dictionary``2[System.String,System.String]"
    $headers.Add("Authorization", "bearer $authToken")
    $headers.Add("OData-MaxVersion", "4.0")
    $headers.Add("OData-Version","4.0")
    $headers.Add("Content-Type","application/json; charset=utf-8")
    $headers.Add("Prefer","odata.maxpagesize=200, odata.include-annotations=OData.Community.Display.V1.FormattedValue")

    $requestFullUri = "$odataUri/$($odataQuery)"

    $requestRetriesLimit = 3
    $odataOperationTimeoneInSeconds = 600
    $waitIntervalBaselineInSeconds = 3
    for ($retriesCounter = 0; $retriesCounter -lt $requestRetriesLimit; $retriesCounter++){
        try{
            if ($null -ne $Body){
                $bodyJs = ConvertTo-Json $Body
                $result = Invoke-RestMethod -Uri  $requestFullUri -Method $Method -Headers $headers -Body $bodyJs -UseBasicParsing -TimeoutSec $odataOperationTimeoneInSeconds
            }
            else{
                $result = Invoke-RestMethod -Uri  $requestFullUri -Method $Method -Headers $headers -UseBasicParsing -TimeoutSec $odataOperationTimeoneInSeconds
            }

            return $result
        }
        catch [System.Net.WebException] {
            if($_.Exception.Status -eq 'Timeout'){
              $waitTime = $waitIntervalBaselineInSeconds * ([Math]::Pow(10, $retriesCounter))
              Write-Host "Web reqeuest '$odataQuery' exceeded allowed time limit of $odataOperationTimeoneInSeconds seconds for the $($retriesCounter + 1) out of allowed $requestRetriesLimit times - will wait $waitTime seconds before retrying"
              Start-Sleep -Seconds $waitTime | Out-Null
            }
            else{
                throw $_.Exception
            }
          }
    }

    Write-Error "Failed to execute odata query '$odataQuery' for $requestRetriesLimit times"

}

function ImportPowerPlatformAdminModule{

    $powerAppAdminModuleName = "Microsoft.PowerApps.Administration.Powershell"

    if ($null -ne $(Get-Module($powerAppAdminModuleName))){
        Remove-Module $powerAppAdminModuleName -Force
    }

    # If the PowerPlatformTools_Microsoft_PowerApps_Administration_PowerShell envirnoment variable is set, we are running in a build system after the power platform tools installation phase and need to respect this installation, otherwise we will use the default one
    # if ($null -ne $env:PowerPlatformTools_Microsoft_PowerApps_Administration_PowerShell){
    #     Write-Host "Script is running on a build machine in which Power Platform tools has been installed - using the tools '$powerAppAdminModuleName' module"
    #     import-module -Name $(Join-Path $env:PowerPlatformTools_Microsoft_PowerApps_Administration_PowerShell $powerAppAdminModuleName)
    # }
    # else{
        Write-Host "Script is running either not on build machine or the Power Platform tools has been installed - using the tools '$powerAppAdminModuleName' module"
        $powerAppsAdminModule = Get-Module -Name $powerAppAdminModuleName -ListAvailable
        if ($null -ne $powerAppsAdminModule -and -not [string]::IsNullOrWhiteSpace($powerPlatformAdminModuleRequiredVersion)){
            $powerAppsAdminModule = $powerAppsAdminModule | Where-Object {$_.Version.ToString() -eq $powerPlatformAdminModuleRequiredVersion}
        }

        if ($null -eq $powerAppsAdminModule){
            Write-Host "Installing '$powerAppAdminModuleName' module version '$powerPlatformAdminModuleRequiredVersion'"
            Install-Module $powerAppAdminModuleName -Force -AllowClobber -MinimumVersion $powerPlatformAdminModuleRequiredVersion -MaximumVersion $powerPlatformAdminModuleRequiredVersion
        }

        $powerAppsAdminModule = Get-Module -Name $powerAppAdminModuleName -ListAvailable
        if ($null -ne $powerAppsAdminModule -and -not [string]::IsNullOrWhiteSpace($powerPlatformAdminModuleRequiredVersion)){
            $powerAppsAdminModule = $powerAppsAdminModule | Where-Object {$_.Version.ToString() -eq $powerPlatformAdminModuleRequiredVersion}
        }

        if ($null -eq $powerAppsAdminModule){
            if ($null -eq $powerPlatformAdminModuleRequiredVersion){
                Write-Error "The module '$powerAppAdminModuleName' does not exist on the machine - please install the module and try again"
            }
            else{
                Write-Error "The module '$powerAppAdminModuleName' with the required version '$powerPlatformAdminModuleRequiredVersion' does not exist on the machine - please install the module and try again"
            }
        }
        else{
            if ($null -eq $powerPlatformAdminModuleRequiredVersion){
                Import-Module -Name $powerAppAdminModuleName
            }
            else{
                Import-Module -Name $powerAppAdminModuleName -RequiredVersion $powerPlatformAdminModuleRequiredVersion
            }
        }
    # }
}

$ErrorActionPreference = "Stop"

ImportPowerPlatformAdminModule

if ($null -eq $(Get-Module -Name AzureAD -ListAvailable)){
    Install-Module AzureAD -Force -AllowClobber
}

Import-Module AzureAd

Write-Host "Setting the security context for Power Apps"
Set-PowerAppsSecurityContext

Write-Host "Retrieving enviroment '$environmentName' details from Power Platform"
$powerPlaformEnvironmentDetails = Get-EnvironmentInformation
if ($null -eq $powerPlaformEnvironmentDetails){
    Write-Error "Failed to retrieve details for environment '$environmentName' - environment does not exist"
}

$environmentUrl = $powerPlaformEnvironmentDetails.Internal.properties.linkedEnvironmentMetadata.instanceUrl
$environmentUrl = $environmentUrl.TrimEnd("/")

$fsiPublisherInformation = Get-FsiPublisherDetails
if ($null -eq $fsiPublisherInformation){
    Write-Host "Environment '$environmentName' does not include publisher '$fsiPublisherName' hence we assume package '$packageName' is not installed on the environment"
    return $false
}

$fsiPublisherId = $fsiPublisherInformation.Id
$fsiPublisherFriendlyName = $fsiPublisherInformation.Name

$packageSolutions = Get-PackageSolutionInformation
if ($packageSolutions -isnot [array]){
    $packageSolutions = @($packageSolutions)
}

# We assume the first solution in the package is the achor which is unqiue to the package hence if it does not exist we assume the package was never installed on the environment
if ($packageSolutions[0].Exists){
    Write-Host "Package '$packageName' is installed on the environment '$environmentName as the package anchor solution '$($packageSolutions[0].Name)' exists in it"
    return $true
}
else{
    Write-Host "Package '$packageName' is not installed on the environment '$environmentName as the package anchor solution '$($packageSolutions[0].Name)' does not exists in it"
    return $false
}
