Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
$ErrorActionPreference = 'Stop'
$VerbosePreference = 'Continue' # To see messages, set to 'Continue', otherwise 'SilentlyContinue'

# Import Modules
###############################################################
Write-Verbose "$(Get-Date) - Importing modules..."

Import-Module -Name '.\Tools\Scripts\Invoke-MsBuild.psm1'
Import-Module -Name '.\Tools\Scripts\Set-Package.psm1'
Import-Module -Name '.\Tools\Scripts\Get-Solutions.psm1'

# Set Common Variables
###############################################################

# Get solution name for build
$solutionName = Get-Item ..\src\*.sln | Select-Object Name | ForEach-Object { $_.Name.Split([string[]]'.Crm', [StringSplitOptions]'None')[0] }

# Get root of the build
$buildRoot = [IO.Path]::GetFullPath([IO.Path]::Combine($PSScriptRoot, "..", ".."))

# Get root of solution
$solutionRoot = [IO.Path]::GetFullPath([IO.Path]::Combine($PSScriptRoot, "..", "..", "..", "src"))

# Get root of extracted managed solution
$extractedSolutionsRoot = [IO.Path]::GetFullPath([IO.Path]::Combine($PSScriptRoot, "..", "..", "..", "Solutions"))

# Get root of licensing
$licensingRoot = [IO.Path]::GetFullPath([IO.Path]::Combine($PSScriptRoot, "..", "..", "..", "Licensing"))

# Get destination folder for artifacts
$destinationFolder = [IO.Path]::GetFullPath([IO.Path]::Combine($buildRoot, "Artifact"))
$solutionFolder = [IO.Path]::GetFullPath([IO.Path]::Combine($buildRoot, "Solutions"))

# Ensure folder exists
If(!(test-path $destinationFolder))
{
    Write-Verbose "$(Get-Date) - Creating destination folder"
    New-Item -ItemType Directory -Force -Path $destinationFolder > $null
}
Else
{
    #Write-Verbose "$(Get-Date) - Cleaning destination folder"
    #Remove-Item ($destinationFolder + "\*") -Force -Recurse
}



# Build Solution
###############################################################
#Write-Verbose "$(Get-Date) - Building solution .\$solutionName.Crm.sln"

# Note: if msbuild fails on the WebResources project, remove the webresources project from the build configuration
#$buildResult = Invoke-MsBuild -Path "..\src\$solutionName.Crm.sln"

#if ($buildResult.BuildSucceeded -eq $false) {
#    Write-Error "$(Get-Date) - Build failed."
#    $buildResult
#    return
#}

#Write-Verbose "$(Get-Date) - Solution built successfully."




Write-Verbose "$(Get-Date) - Parsing configuration..."

$jsonPath = "$buildRoot\build.json"
$config = Get-Content -Raw -Path $jsonPath | ConvertFrom-Json
$packageList = $config | Select-Object -expand packages

$withLicensing = $config | Select-Object -expand withLicensing

# Pack Solutions
###############################################################
 
$packageList | ForEach-Object {
    If ($_.isAppSource -eq $true) { 
        $projectName = $_.project
        $packageFolderName = $_.name
        $projectPkgFolder = [IO.Path]::GetFullPath([IO.Path]::Combine($solutionRoot, $projectName,"PkgFolder"))
        
        $packageDestinationFolder = [IO.Path]::GetFullPath([IO.Path]::Combine($destinationFolder, $packageFolderName))

        If(!(test-path $packageDestinationFolder))
        {
            Write-Verbose "$(Get-Date) - Creating destination folder"
            New-Item -ItemType Directory -Force -Path $packageDestinationFolder > $null
        }
        Else
        {
            Write-Verbose "$(Get-Date) - Cleaning destination folder"
            Remove-Item ($packageDestinationFolder + "\*") -Force
        }
        
        if($_.solutions.count -gt 0)
        {
            #TODO should be anchor, not first
            $solutionForVersion = $_.solutions[0];
            
        }
        Else
        {   
            $solutionForVersion = '';
        }

        Write-Verbose "Solution version is $solutionForVersion"

        foreach($solutionfile in $_.solutions){
            # if licensing enabled, check for licensing file and copy to extracts folder before the packaging
            if ($withLicensing -eq $true) {
                Write-Verbose "Licensing enabled. Checking for license file...";
                $licenseFilePath = [IO.Path]::Combine($licensingRoot, $solutionfile,"Customizations.xml");
                if (Test-Path $licenseFilePath) {
                    
                    Write-Verbose "License file found! Merging...";

                    [xml]$licenseNode = Get-Content $licenseFilePath;
                    
                    $otherFilePath = [IO.Path]::Combine($extractedSolutionsRoot, "extract", $solutionfile,"Other","Customizations.xml");

                    [xml]$extractedCustomizationFile = Get-Content $otherFilePath;

                    $importNode = $extractedCustomizationFile.ImportNode($licenseNode.SelectSingleNode('/ImportExportXml/serviceplanappmodulesset'), $true);
                    
                    if ($extractedCustomizationFile.SelectSingleNode('/ImportExportXml/serviceplanappmodulesset') -eq $null)
                    {
                        # Insert after Entity Data Providers
                        $extractedCustomizationFile.ImportExportXml.InsertAfter($importNode, $extractedCustomizationFile.ImportExportXml.SelectSingleNode("EntityDataProviders"))
                    
                         Write-Verbose "Customizations file merged";

                        $extractedCustomizationFile.Save($otherFilePath);

                        Write-Verbose "Saving merged file to $otherFilePath";
                    }

                    Write-Verbose "Extracted file already contains service plan";
                }
            }

            Write-Verbose "$(Get-Date) - Packing solution $($solutionfile) "
            $zipFileName = "{0}\{1}_managed.zip" -f $projectPkgFolder,$solutionfile
            $solutionPath = "{0}\extract\{1}" -f $extractedSolutionsRoot,$solutionfile
            $packageRun =  .\Tools\Dynamics365\SolutionPackager\SolutionPackager.exe /src /loc /action:Pack /zipfile:$zipFileName /folder:$solutionPath /packagetype: "Managed" /errorlevel: Error
            Write-Verbose "$($solutionfile) - Solution built successfully."
            Write-Verbose "$(Get-Date) - Copy $($solutionfile) "            
            Copy-Item $zipFileName $packageDestinationFolder
            [xml]$solutionXmlDocument = Get-Content -Path "$($solutionPath)\Other\solution.xml"
            $solutionVersion = $solutionXmlDocument.ImportExportXml.SolutionManifest.Version.Replace(".", "_")
            Rename-Item -Path "$($packageDestinationFolder)\$($solutionfile)_managed.zip" -NewName "$($solutionfile)_$($solutionVersion)_managed.zip"
        }       

        
                # Build Solution
        ###############################################################
        Write-Verbose "$(Get-Date) - Building Project .\$projectName.csproj"

      # Note: if msbuild fails on the WebResources project, remove the webresources project from the build configuration
        $buildResult = Invoke-MsBuild -Path "..\src\$projectName\$projectName.csproj"

        if ($buildResult.BuildSucceeded -eq $false) {
            Write-Error "$(Get-Date) - Build failed."
            $buildResult
            return
        }

        Write-Verbose "$(Get-Date) - Project built successfully."
        
        
       #Build solution deployer package
        ###############################################################
        Write-Verbose "$(Get-Date) - Building solution deployer package and app package .\$solutionName"
                 
        Set-Package -ProjectName $projectName -SolutionName $solutionName -SolutionRoot $solutionRoot -DestinationPath $packageDestinationFolder -PackageNamePrefix $packageFolderName -SolutionForVersion $solutionForVersion -Verbose > $null
        
        #Write-Verbose "$(Get-Date) - Solution deployer and app packages built."
    }
}