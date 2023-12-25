# Update the PackageFile attribute (i guess) in the xml doc

param 
(
    $InputXmlPath,
    $PackageFileName
)

# Read the existing file
[xml]$xmlDoc = Get-Content $InputXmlPath

# Update the package file name
$xmlDoc.PvsPackageData.PackageFile = $PackageFileName

# Then you can save that back to the xml file
$xmlDoc.Save($InputXmlPath)