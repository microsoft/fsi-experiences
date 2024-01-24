# Using the PAC to authenticate and download the solution (both managed and unmanaged) to the exports\solutions folder
param 
(
    [AllowEmptyString()]
    $Url,
    $ProjectName,
    $Version
)

# Open the Solutionmappings.json file and return the given solution's object. terminate if not found
Function Get-SolutionUniqueName{
    param (
        $ExportFolderPath
    )

    $SolutionMappingsFileName = "Solutionmappings.json"
    $SolutionMappingsPath = Join-Path $ExportFolderPath $SolutionMappingsFileName

    try{
        $Mappings = Get-Content $SolutionMappingsPath -ErrorAction Stop | ConvertFrom-Json
        $SolutionMapping = $Mappings.SolutionMappings | Where-Object ProjectName -eq $ProjectName
        if($null -eq $SolutionMapping)
        {
            Write-Host "No solution mapping found for project: $ProjectName. Please add mapping and try again"
            EXIT 1
        }
        if($SolutionMapping.length -gt 1)
        {
            Write-Host "Found more than one solution mapping for project: $ProjectName. Please ensure only one mapping exists."
            EXIT 1
        }

        return $SolutionMapping.SolutionName
    }
    catch {
        Write-Host "Error getting solution mappings."
        Write-Host $_.Exception.Message
        EXIT 1
    }
}

# Create a PAC profile (authenticate to the D365)
function New-PACProfile{
    
    $message = pac auth create --url $Url
    if($message -ilike "*not a valid URL*") {
        Write-Host "Incorrect url. Exiting..."
        Write-Host $message
        EXIT 1
    }
}

try {
    Get-command pac -ErrorAction Stop > $null
} catch {
    Write-Host "Powerapps cli is not installed. Please go to https://aka.ms/PowerAppsCLI and install."
    EXIT 1
}
#check if pac is installed

Write-Host "Exporting solution started..."

if([string]::IsNullOrEmpty($Url)) {
    pac auth list
    $response = Read-Host -Prompt "Please pick a profile by selecting the index or enter 'c' to create a new profile"
    if($response -eq "c") {
        $url = Read-Host -Prompt "Provide url"
        New-PACProfile
    } else {
        $message = pac auth select --index $response 
        if($message -ilike "*value is incorrect*") {
            Write-Host "Error picking profile. Exiting..."
            Write-Host $message
            EXIT 1
        }
    }
} else {
    New-PACProfile
}

if([string]::IsNullOrEmpty($ProjectName)) {
    $ProjectName = Read-Host -Prompt 'Project name'
    if([string]::IsNullOrEmpty($ProjectName)) {
       Write-Host "Exiting. No project name provided"
       EXIT 1
    }
}


$ProjectName = $ProjectName.Trim()
$ExportFolderPath = Join-Path $PSScriptRoot "..\..\exports\solutions"
$SolutionUniqueName = Get-SolutionUniqueName -ExportFolderPath $ExportFolderPath
$SolutionHeaderFolderPath = Join-Path $ExportFolderPath $ProjectName

Write-Host "Exporting pacakage - $SolutionUniqueName"

if((Test-Path -Path $SolutionHeaderFolderPath) -eq $false){
    mkdir $SolutionHeaderFolderPath
} else {
    #Empty out the folder because build picks the first one in an alphabetical order, so might not pick the latest.
    $contents = Get-ChildItem
    if($null -ne $contents) {
        $deleteContents = Read-Host "Emptying out exports folder. Continue deleting?(Y/N)"
        if($deleteContents -eq 'y') {
            Remove-Item -Path $SolutionHeaderFolderPath\*.zip -Recurse
        }
    }
}

try {

    if([string]::IsNullOrEmpty($Version)) {
        $UnmanagedFilePath = Join-Path $SolutionHeaderFolderPath "$SolutionUniqueName.zip"
    } else {
        $UnmanagedFilePath = Join-Path $SolutionHeaderFolderPath "$($SolutionUniqueName)_$($Version).zip" 
    }
    Write-Host "Exporting umanaged solution to - $UnmanagedFilePath"

    #Check if the unmanaged zip file with the same name exists
    if(Test-Path -Path $UnmanagedFilePath) {
        $continueDelete = Read-Host -Prompt "Deleting existing $UnmanagedFilePath. Continue?(Y/N)"
        if($continueDelete -eq "Y") {
            Remove-item -path $UnmanagedFilePath -Force
            #Export unmanaged
            pac solution export --path $UnmanagedFilePath --name $SolutionUniqueName --managed false --async
            Write-Host "Unmanaged solution export is completed"
        } else {
            Write-Host "Not exporting unmanaged solution because zip file $UnmanagedFilePath already exists. This must be deleted to successfully export solution"
        }
    } else {
        #Export unmanaged
        pac solution export --path $UnmanagedFilePath --name $SolutionUniqueName --managed false --async
        Write-Host "Unmanaged solution export is completed"
    }
    Write-Host "=============================================================================================="
   
    if([string]::IsNullOrEmpty($Version)) {
        $ManagedFilePath = Join-Path $SolutionHeaderFolderPath "$($SolutionUniqueName)_managed.zip"
    } else {
        $ManagedFilePath = Join-Path $SolutionHeaderFolderPath "$($SolutionUniqueName)_$($Version)_managed.zip"
    }

    Write-Host "Exporting managed solution to - $ManagedFilePath"
    #Check if the unmanaged zip file with the same name exists
    if(Test-Path -Path $ManagedFilePath) {
        $continueDelete = Read-Host -Prompt "Deleting existing $ManagedFilePath. Continue?(Y/N)"
        if($continueDelete -eq "Y") {
            Remove-item -path $ManagedFilePath -Force
            #Export managed
            pac solution export --path $ManagedFilePath --name $SolutionUniqueName --managed true --async
            Write-Host "Managed solution export is completed"
        } else {
            Write-Host "Not exporting managed solution because zip file $ManagedFilePath already exists. This must be deleted to successfully export solution"
        }
    } else { 
        #Export managed
        pac solution export --path $ManagedFilePath --name $SolutionUniqueName --managed true --async
        Write-Host "Managed solution export is completed"
    }

} catch {
    Write-Host "Error exporting solution"
    Write-Host $_.Exception.Message
    EXIT 1
}
