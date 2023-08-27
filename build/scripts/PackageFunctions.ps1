#Functions for PVS Package creation
# Taking the files from the directoryToAdd and zip it to outputZipFile, if deleteOld is on deleteing the zip before
# 1. Didn't understand the srcurity policy changes that is done in the start of the function
# 2. the use of the copy-stram - why do you need to copy it like that? there is surly a better way (roboCopy for example)
function Create-ZipPackage {
	[CmdletBinding()]
	param(
		[string]
		$outputZipFile,

		[string]
		$directoryToAdd,

		[switch]
		$deleteOld
	)


	process {
		Add-Type -AssemblyName WindowsBase

		$replacementEvidence = New-Object System.Security.Policy.Evidence
		$replacementEvidence.AddHost((New-Object System.Security.Policy.Zone ([Security.SecurityZone]::MyComputer)))
		$currentAppDomain = [System.Threading.Thread]::GetDomain()
		$securityIdentityField = $currentAppDomain.GetType().GetField("_SecurityIdentity", ([System.Reflection.BindingFlags]::Instance -bOr [System.Reflection.BindingFlags]::NonPublic))
		$securityIdentityField.SetValue($currentAppDomain,$replacementEvidence)

		$filesToAdd = @()

		if ($directoryToAdd -and (Test-Path $directoryToAdd)) {
			$directoryToAdd = Convert-Path "$directoryToAdd\\"
			$filesToAdd += (Get-ChildItem $directoryToAdd -Recurse | ? { !$_.PSIsContainer } | % { $_.FullName })
		} 
		"Files to Add"
		$filesToAdd
		if ($deleteOld -and (Test-Path $outputZipFile)) {
			Remove-Item $outputZipFile -Force -Verbose
		}
		
        $package = [System.IO.Packaging.ZipPackage]::Open($outputZipFile, [System.IO.FileMode]::Create)	
		try {
			$outputZipFile = Convert-Path $outputZipFile
			if ($filesToAdd -and ($filesToAdd.Count -gt 0)) {
				$filesToAdd | % {
					$nameInDir = $_.Replace($directoryToAdd, "")
					$fileNamePartToZip = "\\$nameInDir"
					Write-Verbose "Adding $_ to $outputZipFile"
					$relUri = Get-RelativeUri $fileNamePartToZip
					$packagePart = $package.CreatePart($relUri, "application/octet", [System.IO.Packaging.CompressionOption]::Maximum)
					$fileStream = New-Object System.IO.FileStream -ArgumentList ($_, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read)
					try {
						Copy-Stream $fileStream $packagePart.GetStream()
					}
					finally {
						$fileStream.Dispose()
					}
				}
			}
            
			Write-Verbose "Zip file $outputZipFile created."

		}
		catch {
			Write-Error "An error occurred while creating zip file ${outputZipFile}:"
			throw
		}
		finally {
			$package.Dispose()
		}
	}
}

# removing the first part of the path (until the first \\) and then converting the path from windows format to unix format
# returning a URI object after also removing the accent (using the remove accent function) from the path
function Get-RelativeUri {
	[CmdletBinding()]
	param(
		[parameter(Position=0)]
		[string]
		$currentFile
	)
	process {
		$relPath = $currentFile
		if ($currentFile.Contains("\\")) {
			$relPath = $currentFile.Substring($currentFile.IndexOf("\\"))
		} 
		$relPath = $relPath.Replace("\\","/").Replace("\","/").Replace(" ", "_")
		New-Object System.Uri -ArgumentList ((Remove-Accents $relPath), [System.UriKind]::Relative)
	}
}

#takes a string, normalize it (convert to unicode) and then converts to ascii bytes and back to string (probably to remove any non latin characters(??))
function Remove-Accents {
	[CmdletBinding()]
	param(
		[parameter(Position=0)]
		[System.String]
		$inputString
	)
	process {
		$normalized =  $inputString.Normalize([System.Text.NormalizationForm]::FormKD)
		$removal = [System.Text.Encoding]::GetEncoding([System.Text.Encoding]::ASCII.CodePage, (New-Object System.Text.EncoderReplacementFallback), (New-Object System.Text.DecoderReplacementFallback))
		$bytes = $removal.GetBytes($normalized)
		[System.Text.Encoding]::ASCII.GetString($bytes)
	}
}

# copy the stream from one file (or stream) to another. however, it create a buffer in the size of the source file
# so i'm not sure what the while loop is doing
function Copy-Stream {
	[CmdletBinding()]
	param(
		[parameter(Position=0)]
		[System.IO.Stream]
		$source,

		[parameter(Position=1)]
		[System.IO.Stream]
		$target
	)
	process {
		$buffSize = $source.Length
		$buf = New-Object System.Byte[] $buffSize 
		$bytesRead = 0
		while (($bytesRead = $source.Read($buf, 0, $buffSize)) -gt 0) {
			$target.Write($buf, 0, $bytesRead)
		}
	}
}

# Though a long function an simple one, take the content of the target folder (build target)
# and zip it in the drop folder (another folder under the git folder which is the build's target)
function Create-PackageDeployerPackage {
	[CmdletBinding()]
	param(
		[parameter(Position=0)]
		[string]
		$solutionName,
		
        [parameter(Position=1)]
		[string]
		$pdPackageName = $null,
    
		[parameter(Position=2)]
		[string]
		$dllName,
		
		[parameter(Position=3)]
		[string]
		$outPutFolder,
		
		[parameter(Position=4)]
		[string]
		$sourcesDir,
		
	    [parameter(Position=5)]
		[string]
		$moduleName = $null
	)
	
	process {
		# resolve package zip name
    if ($pdPackageName)
    {
      $zipName = -join($pdPackageName, ".zip");
    }
    else
    {
      $zipName = -join($solutionName, "_managed_Package.zip");
    }
    "PD Package name is: " + $zipName;
		
		#Build type
		$bType = $env:Configuration
		if($Null -eq $bType)
		{
			$bType = 'debug'
		}
		Write-Host $bType;
		
		#Build Platform
		$bPlatform = $env:Platform
		if($Null -eq $bPlatform)
		{
			$bPlatform = 'AnyCpu'
		}
		Write-Host $bPlatform;
		
		#Check if old zip file exists, remove it
		$PDDropPath = "drop\$bType\$bPlatform\PDPackages\$zipName"
		
		# remove old package artifacts
		if (Test-Path (Join-Path $sourcesDir $PDDropPath))
		{
		   Remove-Item (Join-Path $sourcesDir $PDDropPath) -Force;
		   "Removed old package zip" 
		}

		#Set temp drop location for files to be included in the package
		$dropTmp = (Join-Path $sourcesDir $solutionName\);
		"dropTmp is:" + $dropTmp
		
		#exclude file path 
		$excludeFilePath = (Join-Path $sourcesDir "build\include\xrmcopyexcludes.txt");
		"exclude file path:" + $excludeFilePath
		
		#target file path
		$targetOutputPath = (Join-Path $sourcesDir "target\$bType\$bPlatform\$outPutFolder\$bType");
		"targetOutputPath is:" + $targetOutputPath
		
		#Copy Files to dropTmp to be included in package
		"CREATING PD PACKAGE"
		xcopy $targetOutputPath $dropTmp /e /i /s /exclude:$excludeFilePath
		
		"zip package configuration data"
		$tmpModuleDir = (Join-Path $dropTmp "$moduleName");
		$configDataDir = (Join-Path  $tmpModuleDir "ConfigData")
		"Config Data Directory:" + $configDataDir
		
        if (Test-Path $configDataDir)
		{
			$configDataSchemaFile = (Join-Path  $configDataDir 'data_schema.xml')
		    $configDataFileName = $moduleName + '_ConfigData.zip'

			#For each dir in configdata we zip contents
			get-childitem $configDataDir -recurse | where {$_.PsIsContainer} | % {
				Write-Host $_.FullName
				Write-Host $configDataSchemaFile
			
				$copySchemaTo = (Join-Path  $configDataDir $_)
				
				#copy the schema file to the dir
				"Copying the schema file"
				xcopy $configDataSchemaFile $copySchemaTo /i
			
				$configDataFilePath = (Join-Path $configDataDir\$_ $configDataFileName);
				"Config Data Zip File Path: " + $configDataFilePath
				Create-ZipPackage -OutputZipFile $configDataFilePath -DirectoryToAdd $configDataDir\$_ -DeleteOld
				
				Remove-Item (Join-Path $_.FullName \*) -Include *.xml -Force
		   }
		   
		    Remove-Item $configDataSchemaFile -Force
        }

		Create-ZipPackage -OutputZipFile (Join-Path $sourcesDir $PDDropPath) -DirectoryToAdd $dropTmp  -DeleteOld
		"created zip"

		#clean up dropTmp
		Remove-Item $dropTmp -Recurse -Force;
	}
}

# similar to the last one, this function copy files to the drop folder and zips them. 
# this function uses different path as its base and also search for the packageExtra directory
function Create-AppSourcePackage{
	[CmdletBinding()]
	param(
		[parameter(Position=0)]
		[string]
		$solutionName,
		
        [parameter(Position=1)]
		[string]
		$pdPackageName = $null,
    
        [parameter(Position=2)]
		[string]
		$pvsPackageName = $null,
    
		[parameter(Position=3)]
		[string]
		$dllName,
		
		[parameter(Position=4)]
		[string]
		$outPutFolder,
		
		[parameter(Position=5)]
		[string]
		$sourcesDir,
    
		[parameter(Position=6)]
		[string]
		$packageExtraDirectory = $null,
		
	    [parameter(Position=7)]
		[string]
		$moduleName = $null
	)
	
    process 
    {
		#Build type
		$bType = $env:Configuration
		if($Null -eq $bType)
		{
			$bType = 'debug'
		}
		Write-Host $bType;
		
		#Build Platform
		$bPlatform = $env:Platform
		if($Null -eq $bPlatform)
		{
			$bPlatform = 'AnyCpu'
		}
		Write-Host $bPlatform;

		#resolve package name
        if ($pdPackageName)
        {
            $pdZipName = -join($pdPackageName, ".zip");
        }
        else
        {
            $pdZipName = -join($solutionName, "_managed_Package.zip");
        }
	    "PD Package name is: " + $pdZipName;
    
        if ($pvsPackageName)
        {
            $appSourceZipName = -join($pvsPackageName, ".zip");
        }
        else
        {
            $appSourceZipName = -join($solutionName, "Package.zip");
        }
	    "PVS Package name is: " + $appSourceZipName;
    
	    #Set temp drop location for files to be included in the package
	    $dropTmp = (Join-Path $sourcesDir $solutionName\);
	    "dropTmp is:" + $dropTmp
		
		$PDDropPath = "drop\$bType\$bPlatform\PDPackages\$pdZipName"
		"PDDropPath is:" + $PDDropPath
		
		$AppSourceDropPath = "drop\$bType\$bPlatform\PVSPackages\$appSourceZipName"	    
		"AppSourceDropPath is:" + $AppSourceDropPath
		
	    $pdPath = (Join-Path $sourcesDir $PDDropPath);
		
	    xcopy $pdPath $dropTmp

        if (!$packageExtraDirectory) {
            $packageExtraDirectory = (Join-Path $sourcesDir "solutions\$solutionName\PVSPackage\PackageExtra");
        }
    
	    #This line is for anything addition needed in the package like license terms, etc
	    xcopy $packageExtraDirectory $dropTmp /E

	    "creating AppSource zip"
	    Create-ZipPackage -OutputZipFile (Join-Path $sourcesDir $AppSourceDropPath) -DirectoryToAdd $dropTmp -DeleteOld
	    "created AppSource zip"

	    #clean up dropTmp
	    Remove-Item $dropTmp -Recurse -Force;
	}
}

# make sure the filemapping.json exists and contains the given moduleName
# take the data from the configData directory (under the current directory)
#  open the zip file there and extracting the data.xml to the configData directory

function Merge-ExportsDataIntoModule {
	[CmdletBinding()]
	param(
		[parameter(Position=0)]
		[string]
		$solutionName,

		[parameter(Position=1)]
		[string]
		$moduleName = $null,
		
		[parameter(Position=2)]
		[string]
		$sourcesDir,

		[parameter(Position=3)]
		[string]
		$projDir
	)
	
	process {
		
		#Exports folder data path
		$ExportsFolderPath = Join-Path $sourcesDir "exports\data"
		
		#Get data zip folder name in exports
		$FileMappingsFileName = "filemappings.json"
		$FileMappingsPath = Join-Path $ExportsFolderPath $FileMappingsFileName

		if((Test-Path -Path $FileMappingsPath) -eq $false){
			"Merging export data error. Export merge mapping file - $FileMappingsPath not found."
			EXIT 1
		}

		$Mappings = Get-Content $FileMappingsPath | ConvertFrom-Json
		$ModuleMapping = $Mappings.FileMappings | Where-Object ModuleName -eq $ModuleName

		if($null -eq $ModuleMapping) {
			"No mappings found in mapping file for module - $ModuleName"
			EXIT 1
		}
			
		$SourceFolderPath = Join-Path $ExportsFolderPath $ModuleMapping.DataZipName

		if((Test-Path -Path $SourceFolderPath) -eq $false){
			"No config data to be exported for $ModuleName. $SourceFolderPath not found"
			EXIT 1
		}

		#Copy Data from zip folder to config data
		#1. Get destination config data folder path
		$ModuleDataFolder =  Get-ChildItem -Filter "ConfigData" -Recurse -Directory

		if($null -eq $ModuleDataFolder) {
			"No config data folder found in module - $ModuleName. Not merging"
			EXIT 1
		}

		"Merging export data. Source folder path - $SourceFolderPath"
		$Filter = 'data*.xml'
		$ModuleDataPath = $ModuleDataFolder.FullName
		"Merging export data. Destination folder path - $ModuleDataPath"

		#2. Copy from exports zip folder to the config data folder
		# load ZIP methods
		Add-Type -Path ([Reflection.Assembly]::LoadWithPartialName("System.IO.Compression.FileSystem")).Location

		# open ZIP archive for reading
		$zip = [System.IO.Compression.ZipFile]::OpenRead($SourceFolderPath)

		# find all files in ZIP that match the filter (i.e. file extension)
		$zip.Entries | 
			Where-Object { $_.FullName -like $Filter } |
			ForEach-Object { 
				# extract the selected items from the ZIP archive
				# and copy them to the out folder
				$FileName = $_.Name
				[System.IO.Compression.ZipFileExtensions]::ExtractToFile($_, "$ModuleDataPath\$FileName", $true)
			}

		# close ZIP file
		$zip.Dispose()
	}
}
