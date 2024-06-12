#This script will run the powershell scripts to create the PVS packages for all of the solutions
# The sript create the directory path to the PDPackagePath path and run the Create-PackageDeployerPackage in the packageFunctions.ps1
param(
	[string]$solutionName = '',
	[string]$moduleName = 'Others',
	[string]$pdPackageName = $null,
	[string]$dllName = '',
	[string]$outPutFolder = '',
	[string]$SourcesDirectory = ''
)

$includeFunc =(Join-Path $PSScriptRoot "PackageFunctions.ps1");

.$includeFunc

# create package drop directory
    
	#Build type
	$bType = $env:Configuration
	if($Null -eq $bType)
	{
		$bType = 'debug'
	}

	#Build Platform
	$bPlatform = $env:Platform
	if($Null -eq $bPlatform)
	{
		$bPlatform = 'AnyCpu'
	}

$PDPackagePath = "drop\$bType\$bPlatform\PDPackages"
$result = Test-Path (Join-Path $SourcesDirectory $PDPackagePath)

if (!$result) {
	New-Item (Join-Path $SourcesDirectory $PDPackagePath) -type directory
}

# command for PD package creation
Create-PackageDeployerPackage $solutionName $pdPackageName $dllName $outPutFolder $SourcesDirectory $moduleName