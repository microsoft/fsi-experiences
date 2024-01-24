<#
    This script looks for data.xml files in the specified Project / Project Directory and extracts the guids from the English version and
    is executed on build of project to ensure guids are always validated for the enabled languages. 
    Then it generates and adds more guids mappable for each language to the language mapping file so that we are tracking what guids we have added so that we can maintain them on upgrade scenarios.
#>

param(
	[string]$MSBuildProjectName = '',
    [string]$MSBuildProjectDirectory = ''
)


# retrieve the common settings
function Get-ScriptDirectory
{
	if ($script:MyInvocation.MyCommand.Path) { Split-Path $script:MyInvocation.MyCommand.Path } else { $pwd }
}

$scriptPath = Get-ScriptDirectory

$guidMappingFilePath = Join-Path $MSBuildProjectDirectory "$MSBuildProjectName\ConfigData\GuidMapsMaster.xml"

if(!(Test-Path -Path $guidMappingFilePath)) {
    "Error Failed to find GuidMapsMaster.xml file $guidMappingFilePath"
    EXIT 1
} 

$dataFolderPath = Join-Path $MSBuildProjectDirectory "$MSBuildProjectName\ConfigData\"

$lcidsPath =Join-Path $dataFolderPath "lcids.json" -Resolve

Add-type -AssemblyName "System.xml.linq"

## Global variables for xml document
[xml]$global:oXMLDocument = Get-Content $guidMappingFilePath
$global:oXMLRoot = $global:oXMLDocument.SelectSingleNode("//guids")
$global:guidsAdded= 0

## List of languages where mapped guids should be added
$lcids = Get-Content -Raw -Path $lcidsPath | ConvertFrom-Json

## Hash table that takes keeps track of guids that we have added
$global:guidHash = @{}

## Read the mapping file to populated the guidHash
function ReadMappingFile()
{
    if (Test-Path $guidMappingFilePath) 
    {
        foreach ($line in [System.IO.File]::ReadLines($guidMappingFilePath)) {
            $match = [regex]::match($line, 'id=\"(.*?)\"')
            if ($match.Success)
	        {
                $currentGuid = $match.Groups[1].Value;
                $guidHash.Add($currentGuid, "")
	        }
        }
     }  
}

## Extract the guids from the data file for all packages
function ExtractGuids()
{

    $packageDataPath = Join-Path $dataFolderPath "1033\data.xml"  -Resolve
    $packageEntityDirPath= Join-Path $dataFolderPath "1033\"  -Resolve
    
    ExtractGuidFromFile -dataFilePath $packageDataPath

    $fileNames = Get-ChildItem -Path $packageEntityDirPath -Recurse -Include entity.xml
    
    for ($i=0; $i -lt $fileNames.Count; $i++)
    {
        ExtractGuidFromFile -dataFilePath $fileNames[$i].FullName       
    }

    if($global:guidsAdded -eq 1)
    {
        $global:oXMLDocument.Save($guidMappingFilePath)
    }
}

## Extract the guids from a data.xml file
function ExtractGuidFromFile($dataFilePath) {
	$dataFile = [System.Xml.Linq.XDocument]::Load($dataFilePath)
	
    foreach($record in $dataFile.Descendants("record"))
	    {
            if($record.Parent -ne $null){
                $id = $record.Attribute("id").value
                
                if ($global:guidHash.ContainsKey($id))
                {
                    GenerateMissedMappingGuids($id)
                    continue;
                }

                $global:guidsAdded = 1
                ## If you did't find a guid, that means we have added a new record in sample data, generate the map for it
                GenerateMappingGuids($id)
                $guidHash.Add($id, "")
            }
	    }
}

## Generate the mapping guid node for a reference guid
function GenerateMappingGuids($referenceGuid)
{
   
    $guidNode = $global:oXMLDocument.CreateElement("guid")
    $guidNode.SetAttribute("id", $referenceGuid)
   
    foreach($lcid in $lcids)
    {
        $mappedGuid = $global:oXMLDocument.CreateElement("mappedGuid")
        $mappedGuid.SetAttribute("languageCode",$lcid)
        $newguid = [guid]::NewGuid()
        $mappedGuid.SetAttribute("id",$newguid)
        $guidNode.appendChild($mappedGuid)
    }
        
    $importedNode = $global:oXMLRoot.OwnerDocument.ImportNode($guidNode, $true)
    $global:oXMLRoot.appendChild($importedNode)
}

## Сheck whether guid node has missed mappedGuids for languages. Then, generate the missing mappedGuids.
function GenerateMissedMappingGuids($referenceGuid) {
    $guidSelector = "//guid[@id='" + $referenceGuid + "']"
    $guidNode = $global:oXMLRoot.SelectSingleNode($guidSelector)
    $existedLanguages = $global:oXMLRoot.SelectNodes($guidSelector + "/mappedGuid") | Select -ExpandProperty languageCode

    foreach($lcid in $lcids | Where { $_ -notin $existedLanguages })
    {
        $mappedGuid = $global:oXMLDocument.CreateElement("mappedGuid")
        $mappedGuid.SetAttribute("languageCode",$lcid)
        do {
            $newGuid = [guid]::NewGuid()
        } while($guidHash.ContainsKey($newGuid))
        $mappedGuid.SetAttribute("id", $newGuid)
        $guidNode.appendChild($mappedGuid)
        $guidHash.Add($newGuid, '');
        $global:guidsAdded = 1
    }
}

ReadMappingFile
ExtractGuids
