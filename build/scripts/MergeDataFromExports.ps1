#This script will run the powershell scripts to create the PVS packages for all of the solutions
# Basically just calling Merge-ExportsDataIntoModule. don't see any use of the bTpy and bPlatform
param(
	[string]$solutionName = '',
	[string]$moduleName = 'Others',
	[string]$SourcesDirectory = '',
	[string]$ProjectDirectory = ''
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

Merge-ExportsDataIntoModule $solutionName $moduleName $SourcesDirectory $ProjectDirectory