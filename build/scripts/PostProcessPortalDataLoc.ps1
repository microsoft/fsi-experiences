<#
    This script does all the post processing needed to data.xml files of various languages after localization/pseudo localization of these files are done.
    1. It updates the record-id guids from GuidMapsMaster.xml file for each non-English files.
    2. It updates the adx_website_language field.
#>

param
(
    # The name of the Project (e.g. RetailBankingSamplePortal)
    [parameter(mandatory=$true)]
    [string]$MSBuildProjectName = '',

    # The path of the package directory for the project    
    [parameter(mandatory=$true)]
    [string]$MSBuildProjectDirectory = '',

    $targetlcid = 1033
)

Add-Type -AssemblyName System.Web
Add-type -AssemblyName "System.xml.linq"

# Dictionary< lcid, Dictionary<englishId, localizedId> >
$allGuids = New-Object "system.collections.generic.dictionary[string,system.collections.generic.dictionary[string,string]]"

# Dictionary< lcid, Dictionary<packageName, file> >
$dataFiles = New-Object "system.collections.generic.dictionary[string,system.collections.generic.dictionary[string,string]]"

## Main method to perform all post-localization actions
function PostProcessData(){

    $packagePath = Join-Path $MSBuildProjectDirectory "$MSBuildProjectName\ConfigData\"    

    if(!(Test-Path -Path $packagePath)){
        Write-Host "$(get-date) :: The file $packagePath does not exist, nothing to do here."
        EXIT 0
    }

    Buffer-LanguageGuids
    
    $lcidFilePath = Join-Path  $packagePath "lcids.json"

    $targetlcid = Get-Content $lcidFilePath | ConvertFrom-Json
    Write-Host "$(get-date) :: Executing for lcids: $targetlcid"

    $targetlcid.Split(" ", [stringsplitoptions]::RemoveEmptyEntries) | % {
        $lcid = $_
        Write-Host "Running data merge for LCID -" $lcid

        $file = PerformPostProcessingSteps -packageDataPath $packagePath -lcid $lcid

        if((Test-Path -Path $file)) {        
            Write-Host $file
            Cache-Data-File-Path $file $lcid $MSBuildProjectName
        }
    
    }

    if ( $dataFiles.count -eq 0 ) { 
        Write-Host "$(get-date) :: No data.xml files to process guid updates for $MSBuildProjectName." 
        EXIT 0 
    }

    Write-Host "$(get-date) :: GUID update Started..."
    $MaxJobs = 8       # Number of parallel jobs

    $dataFiles.Keys | % {
        $lcid = $_
        $pName = "[GUID_$lcid]"

        $guidReplaceBlock = {
            $languageGuids = $args[0]
            $files = $args[1]
            $lcid = $args[2]
            $pName = $args[3]

            function Get-Portal-Language-From-Data-Xml() {
                param(
                    $lcid, $xml)

                Write-Host "$(Get-Date) :: $pName :: Getting portal language..."

                $xml.entities.entity |
                    ? { $_.name -eq "adx_portallanguage"} |
                    % {
                        $entity = $_

                        $entity.records.record |
                            ? {
                                $record = $_

                                $x_lcid = $record.field |
                                ? { $_.name -eq "adx_lcid"}

                                $x_lcid.value -eq $lcid
                            } |
                            % {
                                $record = $_

                                @{
                                    "adx_portallanguageid" = $record.field | ? { $_.name -eq "adx_portallanguageid" } | % { $_.value }
                                    "adx_name" =  $record.field | ? { $_.name -eq "adx_name" } | % { $_.value }
                                }
                            }
                    }
            }

            $files.Keys | % {
                $package = $_
                $dataFile = $files[$package]
                $dataFileContent = Get-Content $dataFile -Encoding UTF8 | Out-String

                Write-Output "$(Get-Date) :: $pName :: Replacing guids in file: $dataFile"

                $languageGuids.Keys | %{
                    $englishGuid = $_
                    $mappingGuid = $languageGuids[$_]

                    $dataFileContent = $dataFileContent.replace($englishGuid, $mappingGuid)
                }

                Write-Output "$(Get-Date) :: $pName :: Replacing JSON LCID value in file: $dataFile"
                $xml = ([xml]$dataFileContent)
                $portal_lang = Get-Portal-Language-From-Data-Xml $lcid $xml

                if ($portal_lang -eq $null) {
                    Write-Warning "$(Get-Date) :: $pName :: No portal language in this portal and no parent portal set in this script!"
                } else {

                    $portal_lang_string = ($portal_lang.GetEnumerator() | % { "$($_.Key)=$($_.Value)" }) -join ';'
                    Write-Output "$(Get-Date) :: $pName :: Got portal language! $portal_lang_string"

                    $xml.entities.entity |
                        ? { $_.name -eq "adx_websitelanguage"} |
                        % {
                            $entity = $_

                            $entity.records.record |
                            % {
                                $record = $_

                                # In adx_websitelanguage entity, for adx_portallanguageid field
                                # update guid value and lookup language name with above buffered data
                                $record.field |
                                    ? { $_.name -eq "adx_portallanguageid"} |
                                    % {
                                        $_.lookupentityname = $portal_lang.adx_name
                                        $_.value = $portal_lang.adx_portallanguageid
                                    }

                                # In same record, update adx_name value with above buffered adx_name
                                $record.field |
                                    ? { $_.name -eq "adx_name"} |
                                    % {
                                        $_.value = $portal_lang.adx_name
                                    }
                            }
                        }

                    Write-Output "$(Get-Date) :: $pName :: Replacing portal lang in XML..."

                    # and update all language related lookup fields (eg: adx_contentsnippetlanguageid)
                    # update lookupentityname value with above buffered adx_name.
                    $xml.entities.entity |
                        % {
                            $entity = $_

                            $entity.records.record |
                            % {
                                $record = $_

                                $record.field |
                                    ? { $_.lookupentity -eq "adx_websitelanguage"} |
                                    % {
                                        $_.lookupentityname = $portal_lang.adx_name
                                    }
                            }
                        }

                    Write-Output "$(Get-Date) :: $pName :: Replacing portal lang complete!"
                }

                # Ensure it's saved as UTF-8 without BOM: http://stackoverflow.com/a/30266424/6916097
                $utf8WithoutBom = New-Object System.Text.UTF8Encoding($false)
                $sw = New-Object System.IO.StreamWriter($dataFile, $false, $utf8WithoutBom)
                $xml.Save($sw)

                Write-Output "$(Get-Date) :: $pName :: XML file updated!"
            }
        }

        $job = Start-Job -ScriptBlock $guidReplaceBlock -Name $pName -ArgumentList $allGuids[$lcid],$dataFiles[$lcid],$lcid,$pName -ErrorAction Stop | Out-Null

        $runningJobs = @(Get-Job -State Running)
        if($runningJobs.Count -ge $MaxJobs) {
            $runningJobs | Wait-Job -Any | Out-Null
        }
    }

    Wait-Job * | Out-Null

    Get-Job | ? {$_.Name -like "*GUID_*" } | % {
        Receive-Job -Job $_ -ErrorAction Stop
        Remove-job -Force $_
    }

    Write-Host "$(get-date) :: GUID update Completed."
}

function Cache-Data-File-Path() {
param
    (
        $file,
        $lcid,
        $package
    )

    if ($file -eq $null) {
        return
    }

    if($dataFiles.ContainsKey($lcid)) {
        $dataFiles[$lcid].Add($package, $file)
    } else {
        $languageFiles = New-Object "system.collections.generic.dictionary[string,string]"
        $languageFiles.Add($package, $file)

        $dataFiles.Add($lcid, $languageFiles);
    }
}

function PerformPostProcessingSteps(){
 param
    (
        $packageDataPath,
        $lcid
    )

    if ($lcid -ne 1033)
    {
        $path = Join-Path $packageDataPath $lcid
        $file = Join-Path $path "data.xml"

        if(!(Test-Path -Path $file)) {
            Write-Host "$(Get-Date) :: WARNING Failed to find data.xml file $file"
        } 
        else {
            ## If this is a portal we should Update the language field value for the portal lanugages
            UpdateWebsiteLanguageFieldValue -packageDataPath $packagePath -lcid $lcid
        }
        return $file
    }
}

## Buffers langauge guids
function Buffer-LanguageGuids() {

    # the file path for the GuidMapsMaster.xml file
    $dataFolderPath = Join-Path $MSBuildProjectDirectory "$MSBuildProjectName\ConfigData"

    $guidMappingFilePath = Join-Path $dataFolderPath "GuidMapsMaster.xml"

    if(!(Test-Path -Path $guidMappingFilePath)){
        Write-Host "$(get-date) :: The file $guidMappingFilePath does not exist, nothing to do here."
        EXIT 0
    }

	$guidMappingFile = [System.Xml.Linq.XDocument]::Load($guidMappingFilePath)

    foreach($guid in $guidMappingFile.Descendants("guid")) {
        if($guid.Parent -eq $null) {continue}

        $englishGuid = $guid.Attribute("id").Value

        foreach ($mappedGuid in $guid.Descendants("mappedGuid")) {
            $lcid = $mappedGuid.Attribute("languageCode").Value;
            $languageGuid = $mappedGuid.Attribute("id").Value;

            if ($allGuids.ContainsKey($lcid)) {
                $allGuids[$lcid].Add($englishGuid, $languageGuid);
            } else {
                $languageGuids = New-Object "system.collections.generic.dictionary[string,string]"
                $languageGuids.Add($englishGuid, $languageGuid)

                $allGuids.Add($lcid, $languageGuids);
            }
        }
    }
}

## Replaces the guids in package by refering to the mapping file path
## And also updating JSON LCID value
function ReplaceGuidsInPackage() {
    param
    (
        $packageDataPath,

        $lcid
    )

    $lcidFolderPath = Join-Path $packageDataPath $lcid -Resolve
    $dataFilePath = Join-Path $lcidFolderPath "data.xml" -Resolve
    $dataFileContent = Get-Content $dataFilePath | Out-String

    Write-Host "$(Get-Date) :: Replacing guids in file: " $dataFilePath

    $languageGuids = New-Object "system.collections.generic.dictionary[string,string]"
    $languageGuids = $allGuids[$lcid]

    $languageGuids.Keys | %{
        $englishGuid = $_
        $mappingGuid = $languageGuids[$_]

        $dataFileContent = $dataFileContent.replace($englishGuid, $mappingGuid)
    }

    Write-Host "$(Get-Date) :: Replacing JSON LCID value in file: " $dataFilePath
    $dataFileContent = $dataFileContent.Replace("&amp;quot;LCID&amp;quot;:1033","&amp;quot;LCID&amp;quot;:"+$lcid)

    $dataFileContent | Set-Content $dataFilePath -Force -Encoding UTF8
}

# Update the website language field for all the data.xml files in different packages
function UpdateWebsiteLanguageFieldValue(){
param
(
    $packageDataPath,
    $lcid
)

   $lcidFolderPath = Join-Path $packageDataPath $lcid
   $dataFilePath = Join-Path $lcidFolderPath "data.xml"

    ## replace the adx_website_language field's lcid with the current lcid
    [xml]$oXMLDocument = Get-Content $dataFilePath
    $websiteLanguageField = $oxmlDocument.SelectSingleNode("/entities/entity/records/record/field[@name='adx_website_language']")
    if ($websiteLanguageField -ne $null)
    {
        Write-Host "$(Get-Date) :: Updating website language field for file: " $dataFilePath
        $websiteLanguageField.SetAttribute("value", $lcid)
        $oXMLDocument.Save($dataFilePath)
    }
}

PostProcessData
