#Requires -Version 2.0

function Get-SolutionVersion
{
	[CmdletBinding()]
	param
	(
		[parameter(Position=0,Mandatory=$true,ValueFromPipeline=$true,HelpMessage="The path to the CDS solution zip.")]
        [string] $SolutionPath
	)

	BEGIN { }
	END { }
	PROCESS
	{
		# Turn on Strict Mode to help catch syntax-related errors.
		# 	This must come after a script's/function's param section.
		# 	Forces a function to be the first non-comment code to appear in a PowerShell Script/Module.
		Set-StrictMode -Version Latest
		
		Write-Verbose "$(Get-Date) - Checking inputs..."
        if (!(Test-Path $SolutionPath)) { throw "Invalid solution path '$SolutionPath'" }

        # Load dependencies
        Add-Type -assembly "system.io.compression.filesystem"

        Write-Verbose "$(Get-Date) - Opening zip for read..."
        $zip = [io.compression.zipfile]::OpenRead($SolutionPath)

        Write-Verbose "$(Get-Date) - Extracing solution.xml..."
        $file = $zip.Entries | where-object { $_.Name -eq "solution.xml"}

        Write-Verbose "$(Get-Date) - Reading xml..."
        $stream = $file.Open()
        $xml = New-Object -TypeName 'System.XML.XMLDocument'
        $xml.Load($stream)

        Write-Verbose "$(Get-Date) - Extracting version..."
        $version = $xml.SelectSingleNode("//Version").InnerText
        $stream.Dispose()
        $zip.Dispose()

        Write-Verbose "$(Get-Date) - Found and returning version of '$version'."

        return $version
	}
}

Export-ModuleMember -Function Get-SolutionVersion