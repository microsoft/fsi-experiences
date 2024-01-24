#This script will run the powershell scripts to merge the deletes from extracts into source
# Delete files from the source folder if they exists in the destination folder. exclude project files and folders
# then delete the destination folder.
param(
    [string]$sourceDirectory = '',
    [string]$destinationDirectory = ''
)

if (!(Test-Path $sourceDirectory))
{
  Write-Error("Invalid Source Directory parameter")
}

if (!(Test-Path $destinationDirectory))
{
  Write-Error("Invalid Destination Directory parameter")
}

Write-Host($sourceDirectory);
Write-Host($destinationDirectory);

$sourceFiles = Get-ChildItem -Path $sourceDirectory -Exclude obj,*.csproj, *.log, packageMap.xml -Recurse -Force | where {$_ -notmatch 'obj'}| Select-Object -Property Name, FullName 

foreach($file in $sourceFiles)
{
   $filePath = $file.FullName
   $newRelativePath = $filePath.Substring($sourceDirectory.Length, $filePath.Length - $sourceDirectory.Length);
   
   $newPath = Join-Path $destinationDirectory $newRelativePath
   
   if (!(Test-Path -Path $newPath))
   {
      Write-Host("Deleting file $filePath")
      Remove-Item -Path $filePath
   }
}

Remove-Item $destinationDirectory -Recurse