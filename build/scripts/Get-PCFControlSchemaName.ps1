#Requires -Version 2.0

param
(
	[parameter(Position=0,Mandatory=$true,ValueFromPipeline=$true,HelpMessage="The path to the CDS solution.xml file.")]
	[string] $SolutionXmlPath,
	[parameter(Position=0,Mandatory=$true,ValueFromPipeline=$true,HelpMessage="The path to the CDS solution.xml file.")]
	[string] $ControlManifestPath
)
function Get-PCFControlSchemaName
{
	BEGIN { }
	END { }
	PROCESS
	{
		# Turn on Strict Mode to help catch syntax-related errors.
		# 	This must come after a script's/function's param section.
		# 	Forces a function to be the first non-comment code to appear in a PowerShell Script/Module.
		Set-StrictMode -Version Latest
		
		Write-Verbose "$(Get-Date) - Checking inputs..."
		if (!(Test-Path $SolutionXmlPath)) { throw "Invalid solution path '$SolutionXmlPath'" }
		if (!(Test-Path $ControlManifestPath)) { throw "Invalid ControlManifest path '$ControlManifestPath'" }

        Write-Verbose "$(Get-Date) - Setting filePath to $SolutionXmlPath..."
		[xml]$XmlDocument = Get-Content -Path $SolutionXmlPath

        $publisherPrefix = $XmlDocument.ImportExportXml.SolutionManifest.Publisher.CustomizationPrefix	

		Write-Verbose "$(Get-Date) - Found and returning Prefix $publisherPrefix."

        Write-Verbose "$(Get-Date) - Setting filePath to $ControlManifestPath..."
		[xml]$XmlDocument = Get-Content -Path $ControlManifestPath

        $ctrlNameSpace = $XmlDocument.manifest.control.namespace
		
		Write-Verbose "$(Get-Date) - Found and returning Prefix $publisherPrefix."

        return Write-Host "$($publisherPrefix)_$($ctrlNameSpace)"
	}
}

Get-PCFControlSchemaName