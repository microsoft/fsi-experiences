#Requires -Version 2.0

function Get-Solutions
{
	[CmdletBinding()]
	param
	(
		[parameter(Position=0,Mandatory=$true,ValueFromPipeline=$true,HelpMessage="Destination path for package artifacts.")]
        [string] $PackagePath,

        [parameter(Position=1,Mandatory=$true,ValueFromPipeline=$false,HelpMessage="Destination path for solution artifacts.")]
        [string] $SolutionPath,

        [parameter(Mandatory=$true)]
		[array] $Packages
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
        if (!(Test-Path $PackagePath)) { throw "Invalid package path '$PackagePath'" }
        if (!(Test-Path $SolutionPath)) { throw "Invalid solution path '$SolutionPath'" }

        Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
        $ErrorActionPreference = 'Stop'
        
        Write-Verbose "$(Get-Date) - Importing dependencies..."
        Import-Module $PSScriptRoot\Modules\Microsoft.Xrm.Data.PowerShell.psd1

        Write-Verbose "$(Get-Date) - Getting credentials..."
        $credentials = Get-PlainStringCredential('MSDynAccelerators.onmicrosoft.com')
        
        Write-Verbose "$(Get-Date) - Exporting solutions..."
        :processPackage ForEach ($task in $Packages) {
            if (!(Get-Member -inputobject $task -name 'solution' -Membertype Properties)) {
                continue :processPackage
            }

            $solution = $task.solution
        
            Connect-CrmOnline -Credential $credentials -ServerUrl $task.environment
			
			Set-CrmConnectionTimeout -TimeoutInSeconds 600
        
            $solutionRecords = (Get-CrmRecords -EntityLogicalName solution -FilterAttribute uniquename -FilterOperator "like" -FilterValue $solution -Fields version)
            #if we can't find just one solution matching then ERROR
            if($solutionRecords.CrmRecords.Count -ne 1) {
                Write-Error "Solution with name `"$solution`" in specified CRM Instance not found!"
                break
            }
            # else PROCEED  
            $crmSolutionRecord = $solutionRecords.CrmRecords[0]
            $version = $crmSolutionRecord.version.replace('.', '_')

            $managedName = "$solution`_$version`_managed.zip"
            $unmanagedName = "$solution`_$version`_unmanaged.zip"
        
            Write-Verbose "$(Get-Date) - Beginning exports..."
            Export-CrmSolution -SolutionName $solution -SolutionFilePath $PackagePath -SolutionZipFileName $managedName -Managed -Verbose
            Export-CrmSolution -SolutionName $solution -SolutionFilePath $PackagePath -SolutionZipFileName $unmanagedName -Verbose

            If (Get-Member -InputObject $task -Name project -MemberType Properties) {
                Write-Verbose "$(Get-Date) - Copying managed export to project $('..\src\' + $task.project + '\PkgFolder\' + $task.name + '_managed.zip')"
                Copy-Item (Join-Path $PackagePath $managedName) -Destination ("$('..\src\' + $task.project + '\PkgFolder\' + $task.name + '_managed.zip')")
            }

            Write-Verbose ("$(Get-Date) - Unpacking managed solution from " + (Join-Path $PackagePath $managedName) + " to " + ([IO.Path]::Combine($SolutionPath, $solution, 'ManagedSolutionExtract')))
            .\Tools\Dynamics365\SolutionPackager\SolutionPackager.exe /src /loc /action:Extract /zipfile:(Join-Path $PackagePath $managedName) /folder:([IO.Path]::Combine($SolutionPath, $solution, 'ManagedSolutionExtract')) /allowDelete:Yes /clobber
            Write-Verbose ("$(Get-Date) - Unpacking unmanaged solution from " + (Join-Path $PackagePath $unmanagedName) + " to " + ([IO.Path]::Combine($SolutionPath, $solution, 'UnmanagedSolutionExtract')))
            .\Tools\Dynamics365\SolutionPackager\SolutionPackager.exe /src /loc /action:Extract /zipfile:(Join-Path $PackagePath $unmanagedName) /folder:([IO.Path]::Combine($SolutionPath, $solution, 'UnmanagedSolutionExtract')) /allowDelete:Yes /clobber
        }
	}
}

function Get-PlainStringCredential
{
    param([String]$Name)

    $credentials = Get-Credential -Message "Please enter credentials for $Name"

    return $credentials
}

Export-ModuleMember -Function Get-Solutions