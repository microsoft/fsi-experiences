param(
    [string]
    [parameter(Mandatory = $true)]
    [validatescript(
        {
            if (-not $(Test-Path $_)){
                Write-Error "Package File '$_' doesn't exist"
            }
            else{
                if ([System.IO.Path]::GetExtension($_) -ne ".zip"){
                    Write-Error "'$_' is not a zip file"
                }
                else{
                return $true
                }
            }
        })]
    $PackagePath,

    [string]
    [parameter(Mandatory = $true)]
    [validatescript(
        {
            if (-not $(Test-Path -Path $_ -PathType Container)){
                Write-Error "The package deployer folder  '$_' doesn't exist"
            }
            else{
                return $true
            }
        })]
    $DeployerFolderPath
)

$ErrorActionPreference = "stop"

$folderName = [System.IO.Path]::GetFileNameWithoutExtension($(New-TemporaryFile))
$folderName = $(New-Item -Path $env:TEMP -ItemType Directory -Name $folderName).FullName

#Copy the package deployer files to the target folder
try{
    Copy-Item -Path "$DeployerFolderPath\*" -Destination $folderName -Recurse

    Unblock-File $PackagePath
    Expand-Archive -Path $PackagePath -DestinationPath $folderName -Force
    Start-Process -FilePath "$folderName\PackageDeployer.exe"  -Wait
}
finally{
    Write-Host "Removing temporary folder '$folderName'"
    if (Test-Path -Path $folderName -PathType Container){
        Remove-Item $folderName -Force -Recurse
    }
}
