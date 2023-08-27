param (
    [string]$schema_path,
    [string]$data_path 
 )

# Disable plugins and remove personalized fields
Edit-CrmSchemaFile -Path $schema_path -Destination $schema_path -DisableAllEntityPlugins -FieldFilter {$_.name -notin 'createdby','createdon','createdonbehalfby','importsequencenumber','modifiedby','modifiedon','modifiedonbehalfby'} 

# Re-GUID all id's (used in portals)
Edit-CrmDataFile -Path $data_path -Destination $data_path -ReplaceRecordIds
#Revert adx_portallanguage / adx_portallanguageid as those are shared across all portals
