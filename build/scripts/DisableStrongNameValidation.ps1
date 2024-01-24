<#
.SYNOPSIS
Disable all strong name verification.

.DESCRIPTION
VSTS Hosted 2017 build agents use strong name verification as of Jan 2017.
This means we can't run unit tests on delay-signed assemblies.
Run this to take care of that.
#>

function Get-InstalledSNPaths{

    $sdkLookup = @{
        "4.5" = 378389
        "4.5.1" = 378675
        "4.5.2" = 379893
        "4.6" = 393295
        "4.6.1" = 394254
        "4.6.2" = 394802
        "4.7" = 460798
        "4.7.1" = 461308
        "4.7.2" = 461808
        "4.8" = 528040

    }

    $installedSDKRegistryPath = 'HKLM:\SOFTWARE\Microsoft\Microsoft SDKs\NETFXSDK'
    Write-Host "Trying to retrieve list of installed .Net Framework SDKs from the .32 registry path"
    $InstalledDotNetFrameworkSDKs= Get-ChildItem -Path $installedSDKRegistryPath -ErrorAction SilentlyContinue
    if ($null -eq $InstalledDotNetFrameworkSDKs -or $InstalledDotNetFrameworkReleases.Length -eq 0){    
        Write-Host "Trying to retrieve list of installed .Net Framework SDKs from the WOW64 registry path"       
    $installedSDKRegistryPath = 'HKLM:\SOFTWARE\WOW6432Node\Microsoft\Microsoft SDKs\NETFXSDK' 
        $InstalledDotNetFrameworkSDKs =  Get-ChildItem -Path $installedSDKRegistryPath -ErrorAction SilentlyContinue
    }

    if ($null -eq $InstalledDotNetFrameworkSDKs -or $InstalledDotNetFrameworkSDKs.Length -eq 0){
        Write-Error "There are no installed version of .Net Framework SDKs on this machine"
    }

    $highestSDKRelease = 0
    $highestSDK = [string]::Empty
    foreach ($installedSDk in $InstalledDotNetFrameworkSDKs){
        $sdkName = Split-Path $installedSDk.Name -Leaf
        if (-not ($sdkName.StartsWith("4"))){
            continue        
        }

        $installedSDKReleaseNumber = $sdkLookup.$($sdkName)
        if ([string]::IsNullOrWhiteSpace($installedSDKReleaseNumber)){
            write-error "Found an invalid SDK on the machine '$sdkName'"
        }

        if ($installedSDKReleaseNumber -ge $highestSDKRelease){
            $highestSDKRelease = $installedSDKReleaseNumber
            $highestSDK = $sdkName
        }
    }

    if ($highestSDKRelease -eq 0){
        Write-Error "Could not find an installed SDK for a .Net Framework 4.*"
    }

    $highestSDKRegistryPath = "$installedSDKRegistryPath\$highestSDK"
    $highestSDKToolsVersionPaths = @(Get-ItemProperty -Path "$highestSDKRegistryPath\WinSDK-NetFx40Tools*") | Select-Object -Property "InstallationFolder" -ExpandProperty "InstallationFolder" -Unique

    if ($null -eq $highestSDKToolsVersionPaths -or $highestSDKToolsVersionPaths.Length -eq 0){
        Write-Error "Failed to find installed tools version keys for SDK '$highestSDK'"
    }

    $snPaths = @()
    $highestSDKToolsVersionPaths | ForEach-Object {get-childItem -Path $_ -Filter sn.exe} | ForEach-Object {$snPaths += $_.FullName}

    if ($null -eq $snPaths -or $snPaths.Length -eq 0){
        Write-Error "There are no sn.exe installed on the machine for SDK '$highestSDK'"
    }

    return $snPaths

}

$ErrorActionPreference = "stop"
$installedSNPaths = Get-InstalledSNPaths

$successFullSNInvocations = 0

foreach ($installedSNPath in $installedSNPaths){
    Write-Host "Executing '$installedSNPath' to skip validation for all the FSI assemblies with signature '31bf3856ad364e35'"
    $installationResult = $(& "$installedSNPath" -Vr *,31bf3856ad364e35) -join " "
    if (-not ($installationResult.Contains("Failed"))){
        $successFullSNInvocations++
    }
}

if ($successFullSNInvocations -eq 0){
    Write-Error "Failed to register FSI assemblies with signature '31bf3856ad364e35' for verification skipping"
}