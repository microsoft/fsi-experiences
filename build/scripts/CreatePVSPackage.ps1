#This script will run the powershell scripts to create the PVS packages for all of the solutions
# The sript create the directory path to the PVSPackages path and run the Create-AppSourcePackage in the packageFunctions.ps1

param(
	[string]$solutionName = '',
	[string]$moduleName = 'Others',
	[string]$pdPackageName = $null,
	[string]$pvsPackageName = $null,
	[string]$dllName = '',
	[string]$outPutFolder = '',
	[string]$SourcesDirectory = '',
	[string]$packageExtraDirectory = $null
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
	
$PVSPackagePath = "drop\$bType\$bPlatform\PVSPackages";
$result = Test-Path (Join-Path $SourcesDirectory $PVSPackagePath);

if (!$result) {
	New-Item (Join-Path $SourcesDirectory $PVSPackagePath) -type directory
}

# command for PVS package creation
Create-AppSourcePackage $solutionName $pdPackageName $pvsPackageName $dllName $outPutFolder $SourcesDirectory $packageExtraDirectory $moduleName
