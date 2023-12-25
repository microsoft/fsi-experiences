param 
 (
     [ValidateSet("export","extract","both")]
     [parameter(Mandatory=$true)][string] $Action
 )  

function ExtractSolution {
    param (
        
        [Parameter(Mandatory)][string] $PackageDirectory,
        [Parameter(Mandatory)][string] $ExtractDirectory,
        [Parameter(Mandatory)][string] $SolutionPackagerPath,
        [Parameter(Mandatory)][string] $PackageType
    )
    
    Push-Location -Path $SolutionPackagerPath 
        .\SolutionPackager.exe /action:Extract /PackageType:$PackageType /zipfile:$PackageDirectory /folder:$ExtractDirectory
    Pop-Location
}

$rootDirectory = $PSScriptRoot
$baseDirectory = Split-Path -Path (Split-Path -Path (Split-Path -Path $rootDirectory -Parent))
$SolutionConfigName = "SolutionManagerConfig.xml"
$SolutionConfigFile = Join-Path $PSScriptRoot $SolutionConfigName

[xml]$xml = Get-Content $SolutionConfigFile
$SolutionName = $xml.SolutionManagerConfig.SolutionConfig.SolutionsToExport.Solution.SolutionName
$SolutionFilePath = $xml.SolutionManagerConfig.SolutionConfig.SolutionExportFileZipPath
$Solutiontype = $xml.SolutionManagerConfig.SolutionConfig.SolutionsToExport.Solution.Solutiontype
$SolutionVersion = $xml.SolutionManagerConfig.SolutionConfig.SolutionsToExport.Solution.SolutionVersion

$SolutionZipFileNameUnmanaged = $SolutionName + "_" + $SolutionVersion + ".zip"
$SolutionZipFileNameManaged = $SolutionName + "_" + $SolutionVersion + "_managed" + ".zip"

$OrganizationName = $xml.SolutionManagerConfig.InstanceConfig.InstanceOrganization
$DeploymentRegion = $xml.SolutionManagerConfig.InstanceConfig.InstanceRegion

$PackageDirectory = $xml.SolutionManagerConfig.SolutionPackageConfig.PackageDirectory + "\" +  $SolutionZipFileNameUnmanaged
$ExtractDirectory = $xml.SolutionManagerConfig.SolutionPackageConfig.ExtractDirectory
$SolutionPackagerPath = $xml.SolutionManagerConfig.SolutionPackageConfig.SolutionPackagerPath

if($Action.Equals("export") -or $Action.Equals("both"))
{    

    $UserName = Read-Host -Prompt "Enter your Dynamics365 UserName "    
    if([string]::IsNullOrEmpty($UserName))
    {
        Write-Host "Please enter userName and continue" -ForegroundColor Red
        return
    }

    $Password = Read-Host -Prompt "Enter your Dynamics365 Password " -AsSecureString    
    if([string]::IsNullOrEmpty($Password))
    {
        Write-Host "Please enter password and continue" -ForegroundColor Red
        return
    }

    if (-Not (Get-Module -Name Microsoft.Xrm.Data.Powershell)) {
        Import-Module Microsoft.Xrm.Data.Powershell -Verbose
    }    
    # $UserName = "admin@mcpppowerplatform.onmicrosoft.com"

    $Cred = New-Object System.Management.Automation.PSCredential ($UserName, $Password);

    Write-Host "Please wait connecting to Dynamics365..." -ForegroundColor Green
    $CRMConn = Get-CrmConnection -DeploymentRegion $DeploymentRegion -OnlineType Office365 -OrganizationName $OrganizationName -Credential $Cred -Verbose
        
    Write-Host "Dynamics365 connection established successfully" -ForegroundColor Green
    Start-Sleep -s 1

    if($Solutiontype.Equals("unmanaged") -or $Solutiontype.Equals("both"))
    {
        Write-Host "Please wait exporting Dynamics365 required solutions..." -ForegroundColor Green
        Write-Host "Exporting Un-Managed Solution $SolutionZipFileNameUnmanaged" -ForegroundColor Green
        # ==== Import Un-Managed Solution =========
        Export-CrmSolution -conn $CRMConn -SolutionName $SolutionName -SolutionFilePath $SolutionFilePath -SolutionZipFileName $SolutionZipFileNameUnmanaged -Verbose
        # ==== Import Un-Managed Solution =========
        Write-Host "Export Un-Managed Solution $SolutionZipFileNameUnmanaged completed" -ForegroundColor Green
    }
    
    if($Solutiontype.Equals("managed") -or $Solutiontype.Equals("both"))
    {
        Write-Host "Exporting Managed Solution $SolutionZipFileNameManaged" -ForegroundColor Green
        # ==== Import Managed Solution =========
        Export-CrmSolution -conn $CRMConn -SolutionName $SolutionName -SolutionFilePath $SolutionFilePath -SolutionZipFileName $SolutionZipFileNameManaged -Managed -Verbose
        # ==== Import Managed Solution =========
        Write-Host "Export Managed Solution" $SolutionZipFileNameManaged "completed" -ForegroundColor Green

        Write-Host "Solution export is successfully" -ForegroundColor Green
    }   
    
}

if($Action.Equals("extract") -or $Action.Equals("both"))
{
    ExtractSolution -PackageDirectory $PackageDirectory -ExtractDirectory $ExtractDirectory -SolutionPackagerPath $SolutionPackagerPath -PackageType $Solutiontype
}