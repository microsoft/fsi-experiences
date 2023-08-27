param (
    [string]$buildNumber = ""
)

    Write-Output("Pipeline Build number is " + $buildNumber);

    $varName = "BuildAlias";
    $varValue = $env:BuildAlias;
    
    if ($varValue -eq "" -and ($env:BUILD_SOURCEBRANCH.IndexOf("_preview") -gt 0 -or $env:BUILD_SOURCEBRANCH.IndexOf("/preview") -gt 0 )) {
        $varValue = "-preview";
    }
    
    if ($varValue -eq "" -and $env:BUILD_SOURCEBRANCH.StartsWith("refs/heads/master") -eq $true) {
        $varValue = "-debug";
    }
    
    if ($varValue -eq "" -and $env:BUILD_SOURCEBRANCH.StartsWith("refs/heads/dev/v2") -eq $true) {
        $varValue = "-debug";
    }
    
    if ($varValue -eq "" -and $env:BUILD_SOURCEBRANCH.StartsWith("refs/heads/dev/EA") -eq $true) {
        $varValue = "-debug";
    }
    
    if ($varValue -eq "" -and $env:BUILD_SOURCEBRANCH.StartsWith("refs/heads/releases") -ne $true) {
        $varValue = "-private";
    }
    
    if ($varValue -ne '') {
        Write-Host("##vso[task.setvariable variable=" + $varName + ";]" + $varValue)
        "Process variable '" + $varName + "' has been set to '" + $varValue + "'";
    }
    
    "Updating VSO Build number..";
    if($NugetPackageVersion -ne $null)
    {
        $Version = $NugetPackageVersion + $varValue
        Write-Host "PackageValueProvided"
    }
    else
    {
        $Version = $buildNumber + $varValue
        Write-Host "PackageValueNotProvided"
    }
    
    $adoBuildNumber = $Env:BUILD_BUILDNUMBER
    # $revision= $adoBuildNumber.Substring($adoBuildNumber.LastIndexOf('.') + 1)
    # $Version=$Version + "-" + $revision

    $buildId=$Env:SYSTEM_DEFINITIONID
    "Current Build ID is " + $buildId
    if($buildId -eq '17428')
    {
        "##vso[task.setvariable variable=CUSTOM_VERSION]$Version";
        "Build number is " + $Version;
    }
    else{
        "##vso[build.updatebuildnumber]$Version";
        "Build number is " + $Version;
    }

    Write-Output("Completed setting pipeline build number.");