# Usinf the Microsoft.Xrm.Tooling.ConfigurationMigration this script download the data from the D365 using the schema
param 
(
    [Parameter(Mandatory=$true)]
    [AllowEmptyString()]
    [string]$ModuleName,
    [AllowEmptyString()]
    $OrganizationName
)

# download and install (if needed) the given module
function Import-XrmDataModule {

    param (
        $ModuleName
    )

    if([string]::IsNullOrWhiteSpace($ModuleName)) {
        Write-Host "Incorrect module name to import. Please provide valid module name."
        EXIT 1
    }

    # If module is imported say that and do nothing
    if (!(Get-Module | Where-Object {$_.Name -eq $ModuleName})) {

        # If module is not imported, but available on disk then import
        if (Get-Module -ListAvailable | Where-Object {$_.Name -eq $ModuleName}) {
            write-host "Importing Module $ModuleName."
            Import-Module $ModuleName
        }
        else {

            # If module is not imported, not available on disk, but is in online gallery then install and import
            if (Find-Module -Name $ModuleName | Where-Object {$_.Name -eq $ModuleName}) {
                write-host "Installing Module $ModuleName."
                Install-Module -Name $ModuleName -Force -Scope CurrentUser
                write-host "Importing Module $ModuleName."
                Import-Module $ModuleName
            }
            else {

                # If module is not imported, not available and not in online gallery then abort
                write-host "Module $ModuleName not imported, not available and not in online gallery, exiting."
                EXIT 1
            }

        }
    }
}

# get and open the filemapping.json, validate the moduleName exists in it
function Get-ModuleMapping {

    param (
        $ExportFolderPath
    )
 
    $FileMappingsFileName = "filemappings.json"
    $FileMappingsPath = Join-Path $ExportFolderPath $FileMappingsFileName

    try{
        $Mappings = Get-Content $FileMappingsPath -ErrorAction Stop | ConvertFrom-Json
        $FileMapping = $Mappings.FileMappings | Where-Object ModuleName -eq $ModuleName

        if($null -eq $FileMapping)
        {
            Write-Host "No mapping found for module: $ModuleName. Please add mapping and try again"
            EXIT 1
        }
        if($FileMapping.length -gt 1)
        {
            Write-Host "Found more than one mapping for module: $ModuleName. Please ensure only one mapping exists."
            EXIT 1
        }

        return $FileMapping
    }
    catch {
        Write-Host "Error getting file mappings."
        Write-Host $_.Exception.Message
        EXIT 1
    }

}

Write-Host "Finding Microsoft.Xrm.Tooling.ConfigurationMigration module"
#Load CRM Configuration tool
Import-XrmDataModule -ModuleName "Microsoft.Xrm.Tooling.ConfigurationMigration"

Write-Host "Exporting data started..."

if([string]::IsNullOrEmpty($OrganizationName)) {
    $OrganizationName = Read-Host -Prompt 'Organization name'
    if([string]::IsNullOrEmpty($OrganizationName)) {
        Write-Host "Exiting. No organization name provided"
        EXIT 1
    }
}

if([string]::IsNullOrEmpty($ModuleName)) {
    $ModuleName = Read-Host -Prompt 'Module Name'
    if([string]::IsNullOrEmpty($ModuleName)) {
       Write-Host "Exiting. No Module Name provided"
       EXIT 1
    }
}

try {

    $ExportFolderPath = Join-Path $PSScriptRoot "..\..\exports\data"

    $ModuleMapping = Get-ModuleMapping -ExportFolderPath $ExportFolderPath

    $SchemaFileFullPath = Join-Path $ExportFolderPath\Schema $ModuleMapping.SchemaFile

    if((Test-Path -Path $SchemaFileFullPath) -eq $false){
        Write-Host "Schema file $SchemaFileFullPath does not exist. Exiting.."
        EXIT 1
    }
    #Export zip data file path
    $DataFile = Join-Path $ExportFolderPath $ModuleMapping.DataZipName
    
    Write-Host "Connecting to CRM"
    # #Connect to CRM
    $Cred = Get-Credential
    $CRMConn = Get-CrmConnection -Credential $Cred -OnlineType Office365 -OrganizationName $OrganizationName

    Write-Host "Exporting data from CRM"
    Write-Host "Schema file: $SchemaFileFullPath"
    Write-Host "Exporting data from CRM to: $DataFile"

    Export-CrmDataFile -CrmConnection $CRMConn -SchemaFile $SchemaFileFullPath -DataFile $DataFile
    Write-Host "Successfully exported data from CRM"
    Write-Host "====================================================================================================="
}
catch {
    Write-Host "Failed to export from CRM"
    Write-Host $_
    EXIT 1
}