<#
    .SYNOPSIS
        Installs the Microsoft.CRMSDK.CoreTools nuget package globally
    .DESCRIPTION
        This script gets the latest nuget package version for the Microsoft.CrmSdk.CoreTools, 
        extracts it into the users local APPDATA folder and makes sure that location is added 
#>

###################Const Definitions#########################
$versionExtractionRegex = '<span class="version-title">[\s]*([\w\d.]*)[\s]*<\/span>';

#######################
Write-Host -NoNewline "Querying Latest Package Version...";
$nugetPageContent = (Invoke-WebRequest -Uri "https://www.nuget.org/packages/Microsoft.CrmSdk.CoreTools").Content;
$latestVersion = [regex]::Match($nugetPageContent, $versionExtractionRegex).captures.groups[1].value;
Write-Host $latestVersion;
$outputFile = "Microsoft.CrmSdk.CoreTools.$latestVersion.zip";
Write-Host "Downloading Package"
Invoke-WebRequest -Uri "https://www.nuget.org/api/v2/package/Microsoft.CrmSdk.CoreTools/$latestVersion" -OutFile $outputFile 
Write-Host "Extracting Package to Local AppData Folder"
$extractPath = "$($env:localappdata)\microsoft.crmsdk.coretools.$latestVersion";
Expand-Archive -LiteralPath ./$outputFile -DestinationPath $extractPath -Force
$currentPath = [Environment]::GetEnvironmentVariable("Path", [System.EnvironmentVariableTarget]::User);
$folderToAddToPath = "$($extractPath)\content\bin\coretools";

if ($currentPath -like "*$folderToAddToPath*") 
{
    Write-Host "Directory already in PATH"
}
else
{
    Write-Host "Adding to User PATH"
    [Environment]::SetEnvironmentVariable("Path", "$currentPath;$folderToAddToPath", [System.EnvironmentVariableTarget]::User);    
}

Write-Host "Cleaning Artifacts";
Remove-Item -Path $outputFile
Write-Host "Done."