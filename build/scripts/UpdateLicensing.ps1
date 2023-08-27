#This script will inject or remove licensing from a project if LicenseRequired is set to true and the correspding customization file exists in 
#($WSRoot)/Licensing
# running one of the actions - inject license or remove license
# remove license - delete the serviceplanappmodulesset attribute from the other.xml file in the project
# injectLicense - inject the license to the other.xml file in the project
param(
	[string]$MSBuildProjectName = '',
    [string]$MSBuildProjectDirectory = '',
	[string]$Action = ''
)

#Functions for PVS Package creation
function Inject-Licensing {
	process {
        Write-Verbose "Licensing enabled. Checking for license file...";

        $LicensingPath = Join-Path $MSBuildProjectDirectory "..\License\Customizations.xml"

        if(!(Test-Path -Path $LicensingPath)) {
	        "Error Failed to find license file $LicensingPath"
	        EXIT 1
        } 

        Write-Verbose "License file found! Merging...";

        [xml]$licenseNode = Get-Content $LicensingPath;
                    
        $customizationFilePath = Join-Path $MSBuildProjectDirectory "Other/Customizations.xml"
        [xml]$extractedCustomizationFile = Get-Content $customizationFilePath;

        $importNode = $extractedCustomizationFile.ImportNode($licenseNode.SelectSingleNode('/ImportExportXml/serviceplanappmodulesset'), $true);

        if ($extractedCustomizationFile.SelectSingleNode('/ImportExportXml/serviceplanappmodulesset') -eq $null)
        {
            # Insert after Entity Data Providers
            $importednode = $extractedCustomizationFile.ImportExportXml.InsertAfter($importNode, $extractedCustomizationFile.ImportExportXml.SelectSingleNode("EntityDataProviders"))
            Write-Verbose "Customizations file merged";
            $extractedCustomizationFile.Save($customizationFilePath);
            Write-Verbose "Licensing injected into $customizationFilePath";
        }
    }
}

#Functions for PVS Package creation
function Remove-Licensing {
	process {
                   
        $customizationFilePath = Join-Path $MSBuildProjectDirectory "Other/Customizations.xml"
        [xml]$extractedCustomizationFile = Get-Content $customizationFilePath;

        $deletednodes = $extractedCustomizationFile.SelectNodes('/ImportExportXml/serviceplanappmodulesset') | ForEach-Object {
            $_.ParentNode.RemoveChild($_)
        }
        $extractedCustomizationFile.Save($customizationFilePath);
        Write-Verbose "Licensing removed $customizationFilePath";
    }
}

if($Action -eq 'inject') {
    Write-Verbose "Licensing enabled - Injecting Licensing"
    Inject-Licensing 
}
if($Action -eq 'remove') {
    Write-Verbose "Licensing enabled - Removing Licensing"
    Remove-Licensing 
}

