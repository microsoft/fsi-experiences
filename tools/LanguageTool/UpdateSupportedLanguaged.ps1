
$manifestPath = "..\..\frontend\pcf-controls"
$portalsRelativePath = "..\..\"
$modulesPath = "..\..\Modules"
$nuspecFile = "..\..\build\config\package.nuspec"
$languagesFile = "..\..\Localize\FSI_language.txt"
$pcfFileListFile = "FSI_PCFfilelist.txt"
$portalFileListFile = "..\..\Localize\FSI_Portal_filelist.txt"

# ---------- Load tamplates -----------------------
$resxdataxmlTemplateFile = ".\Templates\PluginResources.resx.data.xml"
$resxdataxmlTemplate = Get-Content($resxdataxmlTemplateFile)
$resxTemplateFile = ".\Templates\PluginResources.resx"
$resxTemplate = Get-Content($resxTemplateFile)

$pcfFileList = New-Object System.Collections.ArrayList
$portalFileList = New-Object System.Collections.ArrayList
$LanguagesCodeArray = New-Object System.Collections.ArrayList 
$LanguagesLocaleArray = New-Object System.Collections.ArrayList 

$introducedVersion = "1.0.0.0"  # default version - will be overridden by verion in package.nuspec

# ----------------------------------------------  Functions -----------------------------------
function getLanguages {
    param (
        $languagesFile
    )
    Write-Host "Reading languages from " $languagesFile

    $languagesText = Get-Content($languagesFile)

    # Manually add English as it's not in the file and can't be added
    $LanguagesCodeArray.Add("1033") | Out-Null
    $LanguagesLocaleArray.Add("en-US") | Out-Null
    # ---------------------------------------------------------------

    foreach ($line in $languagesText) {

        if ($line.StartsWith("!")) {
            continue
        }
        # line structure:   1043 nl-NL nl
        #                   0    |    1  
        #                   0123456789012
        $LanguagesCodeArray.Add($line.Substring(0,4)) | Out-Null
        $LanguagesLocaleArray.add($line.Substring(5,5)) | Out-Null
       }
    Write-Host "Languages found in file: " $languages.Count
}
function getFileList {
    param (
        [Parameter(Mandatory=$true, Position=0)]
         [string] $fileListFile
    )
    Write-Host "Reading File list from " $fileListFile

    $fileListText = Get-Content($fileListFile)
    
    foreach ($line in $fileListText) {
        if ($line.StartsWith("!")) {
            continue
        }
        $pcfFileList.Add($line) | Out-Null
       }
    Write-Host "Files found in file: " $pcfFileList.Count
}

function getPortalFileList {
    param (
        [Parameter(Mandatory=$true, Position=0)]
         [string] $fileListFile
    )
    Write-Host "Reading Portal File list from " $fileListFile

    $portalFileListText = Get-Content($fileListFile)
    
    foreach ($line in $portalFileListText) {
        if ($line.StartsWith("!")) {
            continue
        }
        $portalFileList.Add($line) | Out-Null
       }
    Write-Host "Portal files found in file: " $portalFileList.Count
}

function processPCFFolder {
    param (
        [Parameter(Mandatory=$true, Position=0)]
         [string] $manifestPath
    )
    
    Write-Host "Scanning folder:"  $manifestPath

    $files = Get-ChildItem -Path $manifestPath -Recurse -Include ControlManifest.Input.xml
    
    foreach ($file in $files) {
        $partialFileName = $file.PSpath.substring($file.PSpath.indexof("CRM.BAS.FSI") + "CRM.BAS.FSI".Length + 1)
        if ($pcfFileList.contains($partialFileName)) {
            handleControlManifest -file $file
        } else {
            Write-Host "File" $partialFileName "is not listed in FSI_PCFfilelist.txt, file skipped"
        }
        
    }
    
}

function handleControlManifest() {
    param (
        [Parameter(Mandatory=$true, Position=0)]
         [string] $file
    )
    Write-Host "Checking file " $file
    [xml]$XMLfile = Get-Content($file)
    $resxNodes = $XMLfile.SelectNodes("//resx")
    $resxNodesList = New-Object System.Collections.ArrayList
    foreach ($resxNode in $resxNodes) {
        $resxNodesList.Add($resxNode.path.Substring($resxNode.path.indexof(".")+1,4)) | Out-Null
    }
    $compareResult = Compare-Object $LanguagesCodeArray $resxNodesList 

    foreach ($result in $compareResult) {
        Switch ($result.SideIndicator)
        {
            "=>" {
                Write-Host "Resource removal not implemented, please remove " $result.InputObject  " Manually " 
            }
            "<=" {
                Write-Host "adding " $result.InputObject    
                $resourcesNode = $XMLfile.SelectSingleNode("//resources")
                $newResxElement = $XMLfile.CreateElement("resx")
                $newResx = $resourcesNode.AppendChild($newResxElement)

                $controlName = $XMLfile.SelectSingleNode("//control").constructor
                $pathAttribute = $resourcesNode.OwnerDocument.CreateAttribute("path")
                $pathAttribute.Value = "strings/" + $controlName + "." + $result.InputObject + ".resx"
                $newResx.Attributes.Append($pathAttribute)  | Out-Null

                $versionAttribute = $resourcesNode.OwnerDocument.CreateAttribute("version")
                $versionAttribute.Value = "1.0.0"
                $newResx.Attributes.Append($versionAttribute)  | Out-Null

                $XMLfile.Save($file)
            }
        }
    }
    
}
function AddResxToSolution {
    param (
        [Parameter(Mandatory=$true, Position=0)]
        [string] $folderPath, 
        [Parameter(Mandatory=$true, Position=0)]
        [string] $newResxFile
    )
    
    $solutionFolderName = split-path $folderPath
    $solutionFolderName = Split-Path $solutionFolderName
    $solutionFolder = Get-ChildItem -path $solutionFolderName -Attributes Directory | where-object Name -eq "Other"

    $solutionFileName = Get-ChildItem -Path $solutionFolder[0].PSPath | Where-Object Name -eq "Solution.xml"
    [xml]$solutionXML = Get-Content($solutionFileName[0].FullName)
    $rootComponentsNodes = $solutionXML.SelectSingleNode("//RootComponents")

    $newRootComponentElement = $solutionXML.CreateElement("RootComponent")
    $newRootComponent = $rootComponentsNodes.AppendChild($newRootComponentElement)

    $typeAttribute = $newRootComponent.OwnerDocument.CreateAttribute("type")
    $typeAttribute.Value = "61"
    $newRootComponent.Attributes.Append($typeAttribute) | Out-Null

    $schemaNameAttribute = $newRootComponent.OwnerDocument.CreateAttribute("schemaName")
    $schemaNameAttribute.Value = $newResxFile.Substring($newResxFile.IndexOf("msfsi_PluginResources")).Replace("\","/")
    $newRootComponent.Attributes.Append($schemaNameAttribute) | Out-Null

    $behaviorAttribute = $newRootComponent.OwnerDocument.CreateAttribute("behavior")
    $behaviorAttribute.Value = "0"
    $newRootComponent.Attributes.Append($behaviorAttribute) | Out-Null

    $solutionXML.Save($solutionFileName[0].FullName)

}
function createResxFiles {
    param (
        [Parameter(Mandatory=$true, Position=0)]
        [string] $folderPath, 
        [Parameter(Mandatory=$true, Position=0)]
        [string] $newLocale,
        [Parameter(Mandatory=$true, Position=0)]
        [string] $existingFileName

    )

    $newResxFileName = $existingFileName.substring(0,$existingFileName.indexof(".resx.data.xml")-5) + $newLocale + ".resx"
    Set-Content -Path $newResxFileName -Value $resxTemplate
    $newFileName = $existingFileName.substring(0,$existingFileName.indexof(".resx.data.xml")-5) + $newLocale + ".resx.data.xml"
    $webResourceGuid = New-Guid
    $tempNewFile = $resxdataxmlTemplate -replace "%1", $webResourceGuid

    $webResourceName = $newResxFileName.substring($newResxFileName.indexof("msfsi_PluginResources"))
    $tempNewFile = $tempNewFile -replace "%2",  $webResourceName.Replace("\","/")
    $tempNewFile = $tempNewFile -replace "%5",  $webResourceName.Replace("\","").Replace("resx","re").Replace(".","")
    $webResourceDisplayName = "Web resource to support language locale:" + $newLocale
    $tempNewFile = $tempNewFile -replace "%3", $webResourceDisplayName
    $tempNewFile = $tempNewFile -replace "%4", $introducedVersion
    Set-Content -Path $newFileName -Value $tempNewFile

    Write-Host "Added language " $newLocale " in folder " $folderPath

    AddResxToSolution -folderPath $folderPath -newResxFile $newResxFileName

}
function createPortalResourceFile {
    param (
        [Parameter(Mandatory=$true, Position=0)]
        [string] $folderPath, 
        [Parameter(Mandatory=$true, Position=0)]
        [string] $newLocale,
        [Parameter(Mandatory=$true, Position=0)]
        [string] $existingFileName

    )

    $newFileName = $existingFileName.substring(0,$existingFileName.indexof(".json")-5) + $newLocale + ".json"

    Set-Content -Path $newFileName -Value ""

}

function handlePluginResourceFolder {
    param (
        [Parameter(Mandatory=$true, Position=0)]
        [string] $folderPath
    )
    $existingPluginLocales = New-Object System.Collections.ArrayList
    

    Write-Host "Scanning plugin folder:" $folderPath
    $pluginFiles = Get-ChildItem -Path $folderPath -Recurse -Include *.resx.data.xml
    foreach ($pluginFile in $pluginFiles) {
        $pluginLocale = $pluginFile.PSpath.substring($pluginFile.PSpath.indexof(".resx.data.xml")-5,5)
        $existingPluginLocales.add($pluginLocale) | Out-Null 

        # save the en-US file as template
        if ($pluginFile.PSpath.indexof("en-US") -gt 0) {
            $existingFileName = $pluginFile.PSpath
        }
    }
    $compareResult = Compare-Object $LanguagesLocaleArray $existingPluginLocales 
    foreach ($result in $compareResult) {
        Switch ($result.SideIndicator)
        {
            "=>" {
                Write-Host "Need to remove resource locale " $result.InputObject  " but it's not implemented yet " 
                #not implemented 
            }
            "<=" {
                createResxFiles -folderPath $folderPath -newLocale $result.InputObject -existingFileName $existingFileName
            }
        }
    }
}
function handlePortalResourceFolder {
    param (
        [Parameter(Mandatory=$true, Position=0)]
        [string] $folderPath
    )
    $existingPortalLocales = New-Object System.Collections.ArrayList
    

    Write-Host "Scanning portal folder:" $folderPath
    $portalFiles = Get-ChildItem -Path $folderPath
    foreach ($portalFile in $portalFiles) {
        $portalLocale = $portalFile.PSpath.substring($portalFile.PSpath.indexof(".json")-5,5)
        $existingPortalLocales.add($portalLocale) | Out-Null 

        # save the en-US file as template
        if ($portalFile.PSpath.indexof("en-US") -gt 0) {
            $existingFileName = $portalFile.PSpath
        }
    }
    $compareResult = Compare-Object $LanguagesLocaleArray $existingPortalLocales 
    foreach ($result in $compareResult) {
        Switch ($result.SideIndicator)
        {
            "=>" {
                Write-Host "Need to remove portal locale " $result.InputObject  " but it's not implemented yet " 
                #not implemented 
            }
            "<=" {
                createPortalResourceFile -folderPath $folderPath -newLocale $result.InputObject -existingFileName $existingFileName
                Write-Host "Add portal locale " $result.InputObject  
            }
        }
    }
}
function processPluginResources() {
    param (
        [Parameter(Mandatory=$true, Position=0)]
         [string] $modulesPath
    )
    Write-Host "Scanning folder:"  $modulesPath
    $folders = Get-ChildItem -Path $modulesPath -Recurse -Include msfsi_PluginResources

    foreach ($folder in $folders) {
        handlePluginResourceFolder $folder
    }

}

function processPortalResources() {

    foreach ($portalFolder in $portalFileList) {
        $folder = $portalsRelativePath + $portalFolder.substring(0,$portalFolder.LastIndexOf("\") )
        handlePortalResourceFolder -folderPath $folder
    }


}

function handleImportConfigFile {
    param (
        [Parameter(Mandatory=$true, Position=0)]
         [string] $file
    )
    Write-Host "Checking config file " $file
    [xml]$XMLfile = Get-Content($file)
    $cmtNodes = $XMLfile.SelectNodes("//cmtdatafile")
    $cmtNodesList = New-Object System.Collections.ArrayList
    foreach ($cmtNode in $cmtNodes) {
        $cmtNodesList.Add($cmtNode.lcid) | Out-Null
        if ($cmtNode.lcid -eq "1033") {
            # keep english file as template
            $templateRow = $cmtNode
        }
    }
    $compareResult = Compare-Object $LanguagesCodeArray $cmtNodesList 

    foreach ($result in $compareResult) {
        Switch ($result.SideIndicator)
        {
            "=>" {
                Write-Host "Sample config data removal not implemented, please remove " $result.InputObject  " Manually " 
            }
            "<=" {
                Write-Host "adding " $result.InputObject    
                $cmtDataFilesNode = $XMLfile.SelectSingleNode("//cmtdatafiles")
                $cmtDataFilesElement = $XMLfile.CreateElement("cmtdatafile")
                $newCmtDataFile = $cmtDataFilesNode.AppendChild($cmtDataFilesElement)

                $filenameAttribute = $cmtDataFilesNode.OwnerDocument.CreateAttribute("filename")
                $filenameAttribute.Value = $templateRow.filename -replace "1033", $result.InputObject
                $newCmtDataFile.Attributes.Append($filenameAttribute)  | Out-Null

                $lcidAttribute = $cmtDataFilesNode.OwnerDocument.CreateAttribute("lcid")
                $lcidAttribute.Value = $result.InputObject
                $newCmtDataFile.Attributes.Append($lcidAttribute)  | Out-Null

                $usermapfilenameAttribute = $cmtDataFilesNode.OwnerDocument.CreateAttribute("usermapfilename")
                $usermapfilenameAttribute.Value = ""
                $newCmtDataFile.Attributes.Append($usermapfilenameAttribute)  | Out-Null

                $XMLfile.Save($file)
            }
        }
    }
}
function processImportConfig {
    $files = Get-ChildItem -Path $modulesPath -Recurse -Include ImportConfig.xml | where-object Directory -like "*Sample*"
    foreach ($file in $files) {
        handleImportConfigFile -file $file
    }    
}

function GetVersionFromNuspec {
    [xml]$nuspecXML = Get-Content($nuspecFile)
    $versionNode = $nuspecXML.SelectSingleNode("//version")
    $introducedVersion = $versionNode.InnerText

    Write-Host "setting file versions to" $introducedVersion
    return  $introducedVersion
}

# -----------------------------------------  Main Flow  -----------------------------------

Write-Host "********************************************************************"
Write-Host "***   Adding language support to FSI Modules ***********************"
Write-Host "********************************************************************"

$introducedVersion = GetVersionFromNuspec

getLanguages $languagesFile
getFileList $pcfFileListFile
getPortalFileList -fileListFile $portalFileListFile

processPCFFolder -manifestPath $manifestPath 
processPluginResources $modulesPath
processPortalResources 
processImportConfig

Write-Host "*********************** The End ************************************"
Write-Host "Please manually update /frontend/core-components/scripts/translateHelper.js script with the new languages"
