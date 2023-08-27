param(
    [parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]
    $targetEnvironmentUrl,

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
    [validateScript({Test-Path $_ -PathType leaf})]
    [string]
    $rolesAssingmentsFile,

    [parameter(Mandatory = $false)]
    [ValidateNotNullOrEmpty()]
    [string]
    $powerPlatformAdminModuleRequiredVersion = "2.0.99",

    [parameter(Mandatory = $false)]
    [ValidateNotNullOrEmpty()]
    [string]
    $interactiveLogin = $false
)

function GetPowerPlatformEnvironmentUsers{
    param(
        [Parameter(Mandatory = $true)]
        [ValidateNotNull()]
        [hashtable]
        $RelevantUsers
    )

    $users = @{}
    $odataTable = 'systemusers'
    $systemsUserOdata = (SendOdataRequestToPowerPlatformEnvironment -Method Get  -odataQuery $odataTable).value
    foreach ($systemUserOdata in $systemsUserOdata){
        foreach ($relevantUser in $RelevantUsers.Keys){
            if ($systemUserOdata.DomainName -eq $relevantUser){
                $users.$relevantUser = $RelevantUsers.$relevantUser
                $users.$relevantUser.systemUserId = $systemUserOdata.systemuserid
                break;
            }
        }
    }

    if ($users.Keys.Count -ne $RelevantUsers.Keys.Count){
        foreach ($relevantUser in $RelevantUsers.Keys){
            if ($null -eq $users.$relevantUser){
                Write-Host "Requested user '$relevantUser' was not found in environment '$targetEnvironmentUrl'" -ForegroundColor Red
            }
        }

        Write-Error "Not all requested users were found in environment '$targetEnvironmentUrl' - see previous log files for details"
    }

    return $users
}

function GetPowerPlatformEnvironmentRoleIds{
    param(
        [Parameter(Mandatory = $true)]
        [ValidateNotNull()]
        [string[]]
        $RelevantRoles
    )

    $odataTable = "roles"
    $roleIds = @{}
    $rolesOdata = (SendOdataRequestToPowerPlatformEnvironment -Method Get  -odataQuery $odataTable).value

    foreach ($roleOdata in $rolesOdata){
        foreach ($relevantRole in $RelevantRoles){
            if ($roleOdata.Name -eq $relevantRole){
                $roleIds.$relevantRole =  $roleOdata[0].roleId
            }
        }
    }

    if ($roleIds.Keys.Count -ne $RelevantRoles.Count){
        foreach ($relevantRole in $RelevantRoles){
            if ($null -eq $roleIds.$relevantRole){
                Write-Host "Requested role '$relevantRole' was not found in environment '$targetEnvironmentUrl'" -ForegroundColor Red
            }
        }

        Write-Error "Not all requested roles were found in environment '$targetEnvironmentUrl' - see previous log files for details"
    }

    return $roleIds
}

function SetPowerPlatformEnvironmentRoleAssignments{
param(
        [Parameter(Mandatory = $true)]
        [ValidateNotNull()]
        [Hashtable]
        $environmentRoles,

        [Parameter(Mandatory = $true)]
        [ValidateNotNull()]
        [Hashtable]
        $roleAssignments
    )

    foreach ($userToAssign in $roleAssignments.Keys){
        foreach ($roleToAssign in $roleAssignments.$userToAssign.Roles.Keys){
            $userIdToAssign = $environmentUsers.$userToAssign.SystemUserId
            $roleIdToassign = $environmentRoles.$roleToAssign

            Write-Host "Assigning role '$roleToAssign' to user '$userToAssign'"

            $body = @{
                "@odata.id" = "$targetEnvironmentUrl/api/data/v9.1/roles($roleIdToassign)"
            }

            $roleAssignmentOdataQuery = "systemusers($userIdToAssign)/systemuserroles_association/" + '$ref'
            SendOdataRequestToPowerPlatformEnvironment -odataQuery $roleAssignmentOdataQuery -Method Post -Body $body

            Write-Host "Role '$roleToAssign' successfully assigned to user '$userToAssign'" -ForegroundColor Green
        }
    }
}

function SendOdataRequestToPowerPlatformEnvironment{
    [CmdletBinding()]
    param(
        [parameter(Mandatory = $true)]
        [ValidateNotNullOrEmpty()]
        [string]
        $odataQuery,

        [Parameter(Mandatory = $true)]
        [string]
        [ValidateSet("Get","Post")]
        $Method,

        [Parameter(Mandatory = $false)]
        $Body = $null
    )

    # We are using the PowerShell known client id
    $clientId = '1950a258-227b-4e31-a9cf-717495945fc2'

    $odataUri = "$targetEnvironmentUrl/api/data/v9.1"


    $authParameters = [Microsoft.IdentityModel.Clients.ActiveDirectory.AuthenticationParameters]::CreateFromResourceUrlAsync($odataUri).Result
    $authContext = New-Object Microsoft.IdentityModel.Clients.ActiveDirectory.AuthenticationContext -ArgumentList $authParameters.Authority, $false

    if ($interactiveLogin -eq $true){
        $authResult = $authContext.AcquireToken($targetEnvironmentUrl, $clientId, "urn:ietf:wg:oauth:2.0:oob")
    }
    else{
        $userCredential = New-Object  Microsoft.IdentityModel.Clients.ActiveDirectory.UserCredential -ArgumentList $userName, $userPassword
        $authResult = $authContext.AcquireToken($targetEnvironmentUrl, $clientId, $userCredential)
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
        Invoke-RestMethod -Uri  $requestFullUri -Method $Method -Headers $headers -Body $bodyJs
    }
    else{
        Invoke-RestMethod -Uri  $requestFullUri -Method $Method -Headers $headers
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

function AddUsersToPowerPlatformEnvironment{
    param(
        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrEmpty()]
        [string[]]
        $UsersToAdd
    )

    $GetEnvironmentInformation = {

        $environmentName = $(New-Object System.Uri -ArgumentList $targetEnvironmentUrl).Host
        $environmentName = $environmentName.Substring(0,$environmentName.IndexOf("."))

        $environments = Get-AdminPowerAppEnvironment
        foreach ($environment in $environments){
            if ($environment.DisplayName.Contains("(")){
                if ($environment.DisplayName.ToLower().Contains("($environmentName)")){
                    return $environment
                }
            }
            else{
                if ($environment.DisplayName.ToLower().Contains("$environmentName")){
                    return $environment
                }
            }
        }

        return $null
    }

    $securedPassword = ConvertTo-SecureString $userPassword -AsPlainText -Force
    $credential = New-Object System.Management.Automation.PSCredential ($userName, $securedPassword)

    if ($interactiveLogin -eq $true){
        Add-PowerAppsAccount
    }
    else{
        Add-PowerAppsAccount -Username $userName -Password $securedPassword
    }


    Write-Host "Retrieving enviroment '$targetEnvironmentUrl' details from Power Platform"
    $powerPlaformEnvironmentDetails = $GetEnvironmentInformation.InvokeReturnAsIs()
    if ($null -eq $powerPlaformEnvironmentDetails){
        Write-Error "Failed to retrieve details for environment '$targetEnvironmentUrl' - environment does not exist"
    }

    Write-Host "Retrieving users information from Azure AD"
    if ($interactiveLogin -eq $true){
        Connect-AzureAD
    }
    else{
        Connect-AzureAD -Credential $credential | Out-Null
    }


    Write-Host "Adding users to environment '$targetEnvironmentUrl'"
    foreach ($userToAdd in $UsersToAdd){
        $userObjectId = (Get-AzureADUser -SearchString $userToAdd).ObjectId
        if ($null -eq $userObjectId){
            Write-Error "User '$userToAdd' was not found in Azure AD - user will be not added to environment '$targetEnvironmentUrl'"
            continue
        }

        Write-Host "Adding user '$userToAdd' to environment '$targetEnvironmentUrl'"
        $memberAdditionResponse = Add-AdminPowerAppsSyncUser -EnvironmentName $powerPlaformEnvironmentDetails.EnvironmentName -PrincipalObjectId $userObjectId
        if ($memberAdditionResponse.Code -ne 200){
            Write-Error "Failed to add user '$userToAdd' to envnironment '$targetEnvironmentUrl'"
        }
    }
    Disconnect-AzureAD | Out-Null
}

$ErrorActionPreference = "Stop"

$targetEnvironmentUrl = $targetEnvironmentUrl.TrimEnd("/")
ImportPowerPlatformAdminModule

if ($null -eq $(Get-Module -Name AzureAD -ListAvailable)){
    Install-Module AzureAD -Force -AllowClobber
}
Import-Module AzureAd

$relevantRoles = @{}
$assignments = @{}

foreach ($roleAssignment in $(Get-Content -Path $rolesAssingmentsFile | ConvertFrom-Json)){
    $relevantRoles.$($roleAssignment.Role) = $null
    foreach ($roleAssignmentUser in $roleAssignment.Users){
        $roleAssignmentUser = $roleAssignmentUser.Trim()
        if ($null -eq $assignments.$roleAssignmentUser){
            $assignments.$($roleAssignmentUser) = @{}
        }
        $assignments.$roleAssignmentUser.Roles = @{}
        $assignments.$roleAssignmentUser.Roles.$($roleAssignment.Role) = $null
    }
}

Write-Host "Adding the users to environment '$targetEnvironmentUrl'"
AddUsersToPowerPlatformEnvironment -Users $assignments.Keys

Write-Host "Retrieving ids for relevant users from environemnt '$targetEnvironmentUrl'"
$environmentUsers = GetPowerPlatformEnvironmentUsers -RelevantUsers $assignments

Write-Host "Retrieving ids relevant roles from environemnt '$targetEnvironmentUrl'"
$environmentDefinedRoles = GetPowerPlatformEnvironmentRoleIds -RelevantRoles $relevantRoles.Keys

Write-Host "Performing required role assignments to user in environment '$targetEnvironmentUrl'"
SetPowerPlatformEnvironmentRoleAssignments -environmentRoles $environmentDefinedRoles -roleAssignments $assignments