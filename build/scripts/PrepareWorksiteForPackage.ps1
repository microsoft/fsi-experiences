param(
    [parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]
    $PackagesPath,

    [parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]
    $PackageName,

    [parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]
    $PackagesExtractionPath

)

function GetReleaseSettings {
    Write-Host "Reading and validating release settings"
    
    $releaseSettings = @{}

    $settingsValue = $PackagesPath

    if ([string]::IsNullOrWhiteSpace($settingsValue)) {
        Write-Error "Release setting 'PackagesPath' is either missing or empty"
    }

    if (-Not (Test-Path -Path $settingsValue -PathType Container)) {
        Write-Error "Release setting 'PackagesPath' points to a path '$settingsValue' that does not exist"
    }

    $releaseSettings.PackagesPathFromRelease = $settingsValue

    $settingsValue = $PackageName
    if ([string]::IsNullOrWhiteSpace($settingsValue)) {
        Write-Error "Release setting 'PackageName' is either missing or empty"
    }

    $releaseSettings.PackageNameFromRelease = $settingsValue

    $settingsValue = $PackagesExtractionPath
    if ([string]::IsNullOrWhiteSpace($settingsValue)) {
        Write-Error "Release setting 'PackagesExtractionPath' is either missing or empty"
    }
        
    $releaseSettings.PackagesExtractionPathFromRelease = $settingsValue

    return $releaseSettings
}

function GetPackageFileInformation {
    Write-Host "Getting packaged zip for '$PackageNameFromRelease' from the drop path"

    $packageFilesSearchPattern = $PackageNameFromRelease + "-PackageDeployer-*.zip"

    Write-Host "Searching for package matching search pattern '$packageFilesSearchPattern' in '$PackagesPathFromRelease'"
    $packageFile = @(Get-ChildItem -Path $PackagesPathFromRelease -Filter $packageFilesSearchPattern -Recurse)
    $numberOfMatchingFiles = $packageFile.Length
    if ($numberOfMatchingFiles -ne 1) {
        if ($numberOfMatchingFiles -eq 0) {
            Write-Error "No packages matching search pattern '$packageFilesSearchPattern' found in '$PackagesPathFromRelease'"
        }
        else {
            Write-Error "$numberOfMatchingFiles packages matching search pattern '$packageFilesSearchPattern' found in '$PackagesPathFromRelease' - this is an indication of either a bad build drop or too generic package name"
        }       
    }

    $packageFile = $packageFile | Select-Object -First 1
    return $packageFile    
}

function CreateWorkSiteFolderStructure {
    Write-Host "Creating work site"

    if (-not (Test-Path -Path $PackagesExtractionPathFromRelease -PathType Container)) {
        Write-Host "Package extraction folder '$PackagesExtractionPathFromRelease' not found - creating folder"
        New-Item $PackagesExtractionPathFromRelease -ItemType Directory -Force
    }
    else {
        Write-Host "Package extraction site '$PackagesExtractionPathFromRelease' found"
    }
    
    if (-not (Test-Path -Path $PackagesExtractionLogPath -PathType Container)) {
        Write-Host "Logs folder '$PackagesExtractionLogPath' not found - creating folder"
        New-Item $PackagesExtractionLogPath -ItemType Directory -Force
    }
    else {
        Write-Host "Logs folder '$PackagesExtractionLogPath' found"
    }

    if (Test-Path -Path $packageFileCopyPath -PathType Leaf) {
        Write-Host "Found a file name '$packageFileName' in '$PackagesExtractionPathFromRelease' - file will be deleted"
        Remove-Item $packageFileCopyPath -Force
    }

    if (Test-Path -Path $packageFileExtractionSiteFolderName -PathType Container) {
        Write-Host "Found a folder named '$packageFileExtractionSiteFolderName' - folder will be deleted"
        Remove-Item $packageFileExtractionSiteFolderName -Recurse -Force
    }

    if (Test-Path -Path $packageLogsPath -PathType Container) {
        Write-Host "Found a folder named '$packageLogsPath' - folder will be deleted"
        Remove-Item $packageLogsPath -Recurse -Force
    }
}

function PopulateWorkSite {
    $packageFileFullName = $packageFile.FullName
    Write-Host "Copying package file '$packageFileFullName' to $packageFileCopyPath"
    Copy-Item -Path $packageFile.FullName -Destination $packageFileCopyPath -Force

    Write-Host "Unblocking package file '$packageFileCopyPath'"
    Unblock-File -Path $packageFileCopyPath

    Write-Host "Extracting package file '$packageFileCopyPath' to '$packageFileExtractionSiteFolderName'"
    Expand-Archive -Path $packageFileCopyPath -DestinationPath $packageFileExtractionSiteFolderName -Force

    Write-Host "Creating logs folder '$packageLogsPath'"
    New-Item $packageLogsPath -ItemType Directory -Force
}

function ValidateAndSetEnvironmentVariables {
    $packageDllFileName = $PackageNameFromRelease + ".package.dll"
    
    $packageDllFile = @(Get-ChildItem -Path $packageFileExtractionSiteFolderName -Filter $packageDllFileName -File -Recurse)
    $numberOfDllFiles = $packageDllFile.Length

    if ($numberOfDllFiles -ne 1) {
        if ($numberOfDllFiles.Length -eq 0) {
            Write-Error "No packages dll file matching package name '$PackageNameFromRelease' was found in '$packageFileExtractionSiteFolderName'"
        }
        else {
            Write-Error "$numberOfDllFiles packages dll files matching package name '$PackageNameFromRelease'  were found in '$packageFileExtractionSiteFolderName' - this indicate an issue with the package"
        }
    }

    $packageDllFile = $packageDllFile | Select-Object -First 1

    $packageConfigFileName = $PackageNameFromRelease + "_ConfigData.zip"
    $packageConfigDataFile = @(Get-ChildItem -Path $packageFileExtractionSiteFolderName -Filter $packageConfigFileName -file -Recurse)
    $packageConfigDataFile = $packageConfigDataFile | Select-Object -First 1

    Write-Host "Setting package '$PackageNameFromRelease' related custom variables"

    $packageDllFileFullName = $packageDllFile.FullName
    $packageConfigDataFileFullName = $packageConfigDataFile.FullName
    Write-Host "##vso[task.setvariable variable=FSI_Package_Dll;]$packageDllFileFullName"    
    Write-Host "##vso[task.setvariable variable=FSI_Package_ConfigData;]$packageConfigDataFileFullName"    
    Write-Host "##vso[task.setvariable variable=packageLogVariableName;]$packageLogsPath"        
}

$ErrorActionPreference = "stop"

# These variables will be populated from the environment variables set by the release
$PackagesPathFromRelease = [string]::Empty
$PackageNameFromRelease = [string]::Empty
$PackagesExtractionPathFromRelease = [string]::Empty

$releaseSettings = GetReleaseSettings
$PackagesPathFromRelease = $releaseSettings.PackagesPathFromRelease 
$PackageNameFromRelease = $releaseSettings.PackageNameFromRelease 
$PackagesExtractionPathFromRelease = $releaseSettings.PackagesExtractionPathFromRelease 

Write-Host "The value, for the release, for the setting 'PackagesPath' is '$PackagesPathFromRelease'"
Write-Host "The value, for the release, for the setting 'PackageName' is '$PackageNameFromRelease'"
Write-Host "The value, for the release, for the setting 'PackagesExtractionPath ' is '$PackagesExtractionPathFromRelease'"

$PackagesExtractionLogPath = Join-Path $PackagesExtractionPathFromRelease -ChildPath "Logs"
$PackagesExtractionPackagePath = Join-Path $PackagesExtractionPathFromRelease -ChildPath "Packages"

$packageFile = GetPackageFileInformation
$packageFileName = $packageFile.Name

$packageFileExtractionSiteFolderName = Join-Path -Path $PackagesExtractionPackagePath -ChildPath $PackageNameFromRelease
$packageFileCopyPath = Join-Path $PackagesExtractionPathFromRelease -ChildPath $packageFileName
$packageLogsPath = Join-Path $PackagesExtractionLogPath -ChildPath $PackageNameFromRelease

CreateWorkSiteFolderStructure
PopulateWorkSite
ValidateAndSetEnvironmentVariables