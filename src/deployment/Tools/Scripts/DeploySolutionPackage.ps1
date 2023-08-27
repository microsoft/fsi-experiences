# // ***************************************************************************
# // 
# // PowerShell Package Deployment for Dynamics 365 Customer Engagement
# // 
# // Purpose:   Deploying the Dynamics 365 package into target environments.
# //			It connects CRM instance and then deploy Dynamics 365 package 		
# //            using Package Deployer. 
# // 
# // ***************************************************************************

param 
(
    [Parameter(Mandatory)][string] $DropBitsPath,    
    [Parameter(Mandatory)][string] $OrganizationName,
	[Parameter(Mandatory)][string] $DeploymentRegion,
	[Parameter(Mandatory)][string] $ServerURL,
    [string] $UserName = [string]::Empty,
    [string] $Password = [string]::Empty,
    [string] $LogsPath = [string]::Empty,
    [bool] $SkipCheck = $false	
)

#Testing variables
<#
$DropBitsPath       = "D:\Accelerator\dropbits\"
$PackageName        = "PackageGenerator.dll"
$OrganizationName   = "org7451643b"
$DeploymentRegion   = "IND"

$UserName = ""
$Password = ""
#>

Write-Host("Build artifact path " + $DropBitsPath)

$PackageName = "PackageGenerator.dll"
$PackageDir = $DropBitsPath + "Packages"
$PackageDeploymentDir = $DropBitsPath + "Tools\Dynamics365\PackageDeployer\"
$maxCrmConnectionTimeoutMinutes = 90 # Max CRM connection timeout 1.5 hours
$importPackageTimeout = "2:30:00" # Waiting timeout for package deployment operation to be completed


if ($UserName -eq [string]::Empty -or $Password -eq [string]::Empty)
{
    $Cred = Get-Credential;
}
else
{
    $secpasswd = ConvertTo-SecureString $Password -AsPlainText -Force;
    $Cred = New-Object System.Management.Automation.PSCredential ($UserName, $secpasswd);
}

Push-Location -Path $PackageDeploymentDir
.\RegisterXrmTooling.ps1

Push-Location -Path $PackageDeploymentDir
.\RegisterXRMPackageDeployment.ps1
Pop-Location

$sessionDir = ".\sessions\$([DateTime]::UtcNow.ToString("yyyyddMM-HHmmss"))\"

mkdir "$sessionDir\unpack"
if([string]::IsNullOrWhiteSpace($LogsPath)){
    mkdir "$sessionDir\logs"
    $LogsPath = "$sessionDir\logs"
}

#$CRMConn = Get-CrmConnection -DeploymentRegion $DeploymentRegion -OnlineType Office365 -OrganizationName $OrganizationName -Credential $Cred -LogWriteDirectory $LogsPath -MaxCrmConnectionTimeOutMinutes $maxCrmConnectionTimeoutMinutes -Verbose
#Write-Host "Dynamics 365 connection is successfull."

$OrganizationServiceUri="$($ServerURL)/XRMServices/2011/Organization.svc"
$CRMConn = Get-CrmConnection -ConnectionString "ServiceUri=$OrganizationServiceUri;UserName=$($UserName);Password=$($Password);AuthType=Office365;SkipDiscovery=true" -MaxCrmConnectionTimeOutMinutes $maxCrmConnectionTimeoutMinutes -Verbose
#Write-Host "Dynamics 365 connection is successfull."

$importPackageExecutionTime = Measure-Command { Import-CrmPackage -CrmConnection $CRMConn -PackageDirectory $PackageDir -PackageName $PackageName -AllowCustomCode $true -TimeOut $importPackageTimeout -LogWriteDirectory $LogsPath -Verbose }
Write-Host("Import-CrmPackage finished. Execution time: " + $importPackageExecutionTime)