#Copy solution files (managed\unmanaged) from drop folder to the export folder. 
#distribute solutions to sub folders (and rename them) by the SolutionMappings.json file in the exports folder
#skip sampledata and anchor files

#root folder of the repo by which the drop and export folder are defined
param (
    [string]$repoPath 
 )

 
function Write-Error{
param(
    [string]$Description,
    [string]$filename
)
    
    Write-Output "$Description in $filename $PSItem"
    EXIT 1
}

function Copy-File{
param(
    [string]$filePath
)

    try{
        $exportSolutionName = [System.IO.Path]::GetFileName($filePath)
        $exportSolutionName = [System.IO.Path]::GetFileNameWithoutExtension($exportSolutionName)
        $isManaged = $exportSolutionName.Contains("_managed")
        $exportProjectName = $exportSolutionName.replace("_managed","")
        #skip anchor and sampledata solutions as they dont hold entities and display names
        if($exportProjectName.EndsWith('Anchor') -eq $false -and $exportProjectName.EndsWith('SampleData') -eq $false){
            if($projectsArr.ContainsKey($exportProjectName)){
                $exportFolder = $exportPath +'\' + $exportProjectName
                if(![System.IO.Directory]::Exists($exportFolder)){
                    New-Item -Path $exportPath -Name $exportProjectName -ItemType "directory" | Out-Null
                }
                $zipSolution =  $projectsArr[$exportProjectName]
                if($isManaged){
                    $zipSolution += "_managed"
                }
                $zipSolution += '.zip'
                Copy-Item $filePath -Destination ($exportFolder + '\' + $zipSolution) -Force
                Write-Output "Copying to $exportFolder\$zipSolution"
            }else{
                Write-Output "Project $exportProjectName does not exist in SolutionMappings.json file "
            }

        }
    }catch{
        Write-Error "Could not copy $filePath" 
    }
}

#---------------------------------------------------------


if(!$repoPath){
    $repoPath = $PSScriptRoot
}

$dropPath = $repoPath + '\drop\Debug\AnyCPU\Solutions'
$exportPath = $repoPath + '\exports\solutions'
$solutionMappings = $exportPath + '\solutionMappings.json'

if (![System.IO.Directory]::Exists($dropPath)){
    Write-Error "Solutions do not exist in $dropPath"
}
if (![System.IO.Directory]::Exists($exportPath)){
    Write-Error "Exports folder does not exist in $exportPath"
}


#read the solutionmapping.json file to create hashable of all projects and solution
$solutionContent =  Get-content -Raw  -path $solutionMappings 
$solutions = ConvertFrom-Json -InputObject $solutionContent

$projectsArr = @{}

$projectName = 'ProjectName'
$solutionName = 'SolutionName'
foreach($solution in $solutions.SolutionMappings){
    $projectName = $solution.ProjectName
    $solutionName = $solution.SolutionName 
    $projectsArr[$projectName] = $solutionName
}

#iterate through all zip files under the droppath folder and copy relevant files to export folder
try{
    if ([System.IO.Directory]::Exists($dropPath)){
        $filesArr = [System.IO.Directory]::GetFiles($dropPath, "*.zip", 1)
   
        ForEach($file in $filesArr){
            if([System.IO.Path]::GetExtension($file) -eq '.zip'){
                Copy-File $file.Trim()
            }
        }
    }
}
catch{
    Write-Error "Error reading file" $exportPath
}
