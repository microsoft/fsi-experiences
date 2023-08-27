param 
 (
     [parameter(mandatory)][string] $solutionname,
     [parameter(mandatory)][string] $solutionversion,
     [parameter(mandatory)][string] $baseDir
 )

#"Dynamics365ElectronicMedicalRecords_1_8_1_managed.zip"
#$testSolutionZipName = $solutionName + "_" + $solutionversion + "_managed.zip"
$solutionZipName = $solutionName + "_"+ $solutionversion + ".zip"
$packageDirectory = [io.path]::combine($baseDir,"build\Artifact\Packages\PkgFolder\" + $solutionZipName)
$extractDirectory = [io.path]::combine($baseDir,"solutions\Extracts\Accelerator")
$solutionPackager = [io.path]::combine($baseDir,"build\Tools\Dynamics365\SolutionPackager")

#Update ImportConfigFile with Solutionname
$ImportConfigFile = [io.path]::combine($baseDir,"build\Artifact\Packages\PkgFolder\ImportConfig.xml")
[xml]$xml = Get-Content $ImportConfigFile
$xml.configdatastorage.solutions.configsolutionfile.solutionpackagefilename = $solutionName + "_"+ $solutionversion + "_managed" + ".zip"
$xml.Save($ImportConfigFile)

Push-Location $solutionPackager
# Pack Managed/UnManaged Solution 
#.\SolutionPackager.exe /action:Pack /PackageType:Both /zipfile:$packageDirectory /folder:$extractDirectory 


#Extract Managed/UnManaged Solution 
#.\SolutionPackager.exe /action:Pack /PackageType:Both /zipfile:$packageDirectory /folder:$extractDirectory 

.\SolutionPackager.exe /action:Pack /PackageType:Both /zipfile:$packageDirectory /folder:$extractDirectory

Pop-Location