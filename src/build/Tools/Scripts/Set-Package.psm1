#Requires -Version 2.0

function Set-Package
{
	[CmdletBinding()]
	param
	(
		[parameter(Position=0,Mandatory=$true,ValueFromPipeline=$true,HelpMessage="The name of the project to package.")]
        [string] $ProjectName,

        [parameter(Position=1,Mandatory=$true,ValueFromPipeline=$false,HelpMessage="Destination path for solution artifacts.")]
        [string] $SolutionName,
        
        [parameter(Mandatory=$true,HelpMessage="Root of solution")]
        [ValidateScript({Test-Path $_})]
        [string] $SolutionRoot,

        [parameter(Mandatory=$true,HelpMessage="Destination for package output")]
        [ValidateScript({Test-Path $_})]
        [string] $DestinationPath,

        [parameter(Mandatory=$true,ValueFromPipeline=$true,HelpMessage="The name prefix to use for solution deployer package and appsource package.")]
        [string] $PackageNamePrefix,

        [parameter(Mandatory=$true,ValueFromPipeline=$true,HelpMessage="The solution to use for determining the version for the deployer package and app source package.")]
        [string] $SolutionForVersion,

		[parameter(Mandatory=$false)]
		[switch] $WhatIf
	)

	BEGIN { }
	END { }
	PROCESS
	{
        $ErrorActionPreference = 'Stop'

		# Turn on Strict Mode to help catch syntax-related errors.
		# 	This must come after a script's/function's param section.
		# 	Forces a function to be the first non-comment code to appear in a PowerShell Script/Module.
		Set-StrictMode -Version Latest

        # Default the ParameterSet variables that may not have been set depending on which parameter set is being used. This is required for PowerShell v2.0 compatibility.

        # Import Modules
        Import-Module -Name "$PSScriptRoot\Get-SolutionVersion.psm1" > $null
		
		Write-Verbose "$(Get-Date) - Building PackageDeployer zip for '$ProjectName'..."

        $componentsPath = Join-Path $SolutionRoot "$ProjectName\bin\Debug\"
        if (!(Test-Path $componentsPath)) { throw "Invalid solution path or project name, resolved to '$componentsPath'" }


        $solutionVersion = ''
        if($SolutionForVersion -ne '')
        {
            $solutionFullName = $SolutionForVersion +"_managed.zip"
            $solutionPath = Join-Path $componentsPath "PkgFolder\$solutionFullName"
            if (!(Test-Path $solutionPath)) { throw "Could not locate solution at expected path '$solutionPath'" }
            $solutionVersion = Get-SolutionVersion -SolutionPath $solutionPath
        }
        $destinationFilePath = Join-Path $componentsPath "package.zip"

        # Clean existing package.zip to ensure we create new, not update
        If (Test-Path $destinationFilePath)
        {
            Remove-Item -Force $destinationFilePath
        }

        $packageDeployerPaths = @(
            (Join-Path $componentsPath "$ProjectName.dll"),
            (Join-Path $componentsPath "[Content_Types].xml")
        )

        # Add individual files
        ForEach ($file in $packageDeployerPaths) {
            Compress-Archive -LiteralPath $file -DestinationPath $destinationFilePath -Update
        }

        # Add all files in PkgFolder
        Compress-Archive -Path (Join-Path $componentsPath "\PkgFolder\") -DestinationPath $destinationFilePath -Update

        #Copy-Item (Join-Path $componentsPath "package.zip") (Join-Path $DestinationPath "$SolutionName-PackageDeployer-$solutionVersion.zip")
        Copy-Item (Join-Path $componentsPath "package.zip") (Join-Path $DestinationPath "$PackageNamePrefix-PackageDeployer-$solutionVersion.zip")

        Write-Verbose "$(Get-Date) - PackageDeployer zip built."

        Write-Verbose "$(Get-Date) - Creating AppSource wrapper zip..."

        $appsourcePaths = @(
            (Join-Path $componentsPath "package.zip"),
            (Join-Path $componentsPath "[Content_Types].xml"),
            (Join-Path $componentsPath "input.xml"),
            (Join-Path $componentsPath "logo32x32.png"),
            (Join-Path $componentsPath "TermsOfUse.html")
        )

        #$appsourceDestination = Join-Path $DestinationPath "$SolutionName-AppSource-$solutionVersion.zip"
        $appsourceDestination = Join-Path $DestinationPath "$PackageNamePrefix-AppSource-$solutionVersion.zip"

        ForEach ($file in $appsourcePaths) {
            Compress-Archive -LiteralPath $file -DestinationPath $appsourceDestination -Update
        }

        Write-Verbose "$(Get-Date) - AppSource wrapper zip built."
	}
}

Export-ModuleMember -Function Set-Package
