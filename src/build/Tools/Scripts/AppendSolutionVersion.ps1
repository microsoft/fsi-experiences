param 
(
    [parameter(mandatory)][string] $solutionPath,    
    [parameter(mandatory)][string] $solutionName
)

$fullExtractPath = "{0}\extract\{1}\other\solution.xml" -f $solutionPath, $solutionName 
$fullRenameManagedPath = "{0}\zipFiles\{1}\{1}_managed.zip" -f $solutionPath, $solutionName
$fullRenameUnManagedPath = "{0}\zipFiles\{1}\{1}.zip" -f $solutionPath, $solutionName

[xml]$solutionXmlDocument = Get-Content -Path $fullExtractPath
$solutionVersion = $solutionXmlDocument.ImportExportXml.SolutionManifest.Version.Replace(".", "_")

$fullRenameManaged = "{0}_{1}_managed.zip" -f $solutionName, $solutionVersion
$fullRenameUnManaged = "{0}_{1}.zip" -f $solutionName, $solutionVersion

Rename-Item -Path $fullRenameUnManagedPath -NewName $fullRenameUnManaged
Rename-Item -Path $fullRenameManagedPath -NewName $fullRenameManaged