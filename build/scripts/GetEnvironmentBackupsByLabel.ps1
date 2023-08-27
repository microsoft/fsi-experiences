param(
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
    $powerPlatformAdminModuleRequiredVersion = "2.0.99",

    [parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]
    $targetEnvironmentName,

    [parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]
    $backupLabel
)

function Set-SecurityContextForPowerAppCalls{
    $securedPassword = ConvertTo-SecureString $userPassword -AsPlainText -Force
    $credential = New-Object System.Management.Automation.PSCredential ($userName, $securedPassword)

    Write-Host "Setting up security context for user '$userName'"
    Add-PowerAppsAccount -Username $userName -Password $securedPassword
}

function Import-PowerPlatformAdminModule{

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

function Find-EnvironmentByFriendlyName{
    Write-Host "Retrieving all environments starting with name '$targetEnvironmentName'"
    $potentialEnvironments =  Get-AdminPowerAppEnvironment  "$targetEnvironmentName*"
    if ($null -eq $potentialEnvironments){
        Write-Error "Could not find an environment with friendly name starting with '$targetEnvironmentName'"
    }

    Write-Host "Scanning potential environments starting with '$targetEnvironmentName' to find the one with a friendly name which exactly match '$targetEnvironmentName'"
    $environment = @()
    foreach ($potentialEnvironment in $potentialEnvironments){
        if ($potentialEnvironment.Internal.properties.linkedEnvironmentMetadata.friendlyName -eq  $targetEnvironmentName){
            $environment += $potentialEnvironment
        }
    }

    if ($environment.Length -eq 0){
        Write-Error "Could not find an environment with friendly name '$targetEnvironmentName'"
    }

    if ($environment.Length -gt 1){
        Write-Error "It was expected to find only one environment with friendly name '$targetEnvironmentName' but there were $($potentialEnvironments.Length) environments found with this name"
    }

    Write-Host "Found one environment with friendly name '$targetEnvironmentName"
    return $environment | Select-Object -First 1
}

function Get-EnvironmentLatestBackupByLabel{
    Write-Host "Looking for backups with label '$backupLabel' in environent with friendly name '$targetEnvironmentName' and name '$environmentInternalName'"
    $backups = Get-PowerAppEnvironmentBackups -EnvironmentName $environmentInternalName |  Select-Object  -ExpandProperty value | Where-Object {$_.Label -eq $backupLabel -and $_.createdBy.type -eq "User"}

    if ($null -eq $backups){
        Write-Error "Could not find any backup with label '$backupLabel' for environment '$targetEnvironmentName'"
    }

    if ($backups -isnot [array]){
        Write-Host "Found one backup with label matching '$backupLabel' in environment '$targetEnvironmentName' - backup time is '$($backups.backupPointDateTime)'"
        return $backups
    }

    $latestBackupTimeStamp = [DateTime]::MinValue
    $latestBackup
    foreach ($backup in $backups){
        $backupTimeStamp = [DateTime]::Parse($backup.backupPointDateTime)
        if ($backupTimeStamp -gt $latestBackupTimeStamp){
            $latestBackup = $backup
            $latestBackupTimeStamp = $backupTimeStamp
        }
    }

    Write-Host "Found $($backups.Length) backups with label matching '$backupLabel' in environment '$targetEnvironmentName' - using latest backup time '$($latestBackup.backupPointDateTime)'"
    return $latestBackup
}

$ErrorActionPreference = "Stop"

Write-Host "Importing relevant Power Apps PowerShell modules"
Import-PowerPlatformAdminModule

Write-Host "Aquiring security credentials for calling the Power Apps management APIs"
Set-SecurityContextForPowerAppCalls

Write-Host "Retrieving relevant environment"
$environmentInternalName = (Find-EnvironmentByFriendlyName).EnvironmentName

Write-Host "Getting latest backup label"
Get-EnvironmentLatestBackupByLabel