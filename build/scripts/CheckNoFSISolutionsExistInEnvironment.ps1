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

    if ($null -ne $Body){
        $bodyJs = ConvertTo-Json $Body
        $result = Invoke-RestMethod -Uri  $requestFullUri -Method $Method -Headers $headers -Body $bodyJs
    }
    else{
        $result = Invoke-RestMethod -Uri  $requestFullUri -Method $Method -Headers $headers
    }

    return $result
}

function Test-SolutionsExistanceByPublished{
    $odataTable = 'solutions'
    $odataQuery = "$($odataTable)?`$filter=publisherid/publisherid eq '$fsiPublisherId'"
    $solutionInformationResult = (Send-OdataRequestToPowerPlatformEnvironment -Method Get  -odataQuery $odataQuery).value
    if ($solutionInformationResult.Length -ne 0){
        return $true
    }
    else{
        return $false
    }
}

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
    Write-Host "Environment '$environmentName' does not include publisher with unique name '$fsiPublisherName' hence we can safely assume it does not include any solutions by it"
    return
}

$fsiPublisherId = $fsiPublisherInformation.Id
$fsiPublisherFriendlyName = $fsiPublisherInformation.Name

Write-Host "Testing that environment '$environmentName' does not include solutions of publisher '$fsiPublisherFriendlyName'"
if (Test-SolutionsExistanceByPublished){
    Write-Error "Environment '$environmentName' contains soutions from publisher '$fsiPublisherFriendlyName' - this indicates leftovers which has to be attended manually"
}
else{
    Write-Host "Environment '$environmentName' does not include any solutions from publisher '$fsiPublisherFriendlyName'"
}