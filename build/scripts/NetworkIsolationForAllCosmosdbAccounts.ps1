param(
    [string] $Subscription,
    [string] $AccountName = $null,
    [string] $ResourceGroup = $null
)

if (-not (Get-Module Az.Accounts -ListAvailable)) {
    Install-Module -Name Az.Accounts -Repository PSGallery -Force
}

if (-not (Get-Module Az.CosmosDB -ListAvailable)) {
    Install-Module -Name Az.CosmosDB -Repository PSGallery -Force
}

try {
    Connect-AzAccount -Subscription $Subscription -UseDeviceAuthentication -ErrorAction Stop
    Write-Output "Successfully connected to Azure."
}
catch {
    Write-Error "Failed to connect to Azure. Please check your credentials and try again."
    exit
}

$Context = Get-AzContext
$SubscriptionId = $Context.Subscription.Id
$TenantId = $Context.Tenant.Id

$ipRanges = @(
    "4.0.0.0/8",
    "13.0.0.0/8",
    "20.0.0.0/8",
    "40.0.0.0/8",
    "51.0.0.0/8",
    "52.0.0.0/8",
    "65.0.0.0/8",
    "70.0.0.0/8",
    "74.234.0.0/16",
    "94.245.0.0/16",
    "98.71.0.0/16",
    "102.133.0.0/16",
    "104.41.214.32/29",
    "104.44.0.0/16",
    "104.208.0.0/12",
    "108.142.0.0/16",
    "131.107.0.0/16",
    "157.58.0.0/16",
    "167.220.0.0/16",
    "172.128.0.0/13",
    "191.234.97.0/26",
    "194.69.0.0/16",
    "207.46.0.0/16",
    "13.106.4.96/27",
    "13.106.78.32/27",
    "13.106.174.32/27",
    "13.106.174.128/26",
    "157.58.216.64/26",
    "167.220.249.128/26",
    "194.69.119.64/26",
    "207.68.130.64/26",
    "207.68.190.32/27"
)

$resourceInstances = @(
    "Microsoft.ApiManagement/service",
    "Microsoft.AutonomousSystems/workspaces",
    "Microsoft.Search/searchServices",
    "Microsoft.CognitiveServices/accounts",
    "Microsoft.ContainerRegistry/registries",
    "Microsoft.Databricks/accessConnectors",
    "Microsoft.DataFactory/factories",
    "Microsoft.DataProtection/BackupVaults",
    "Microsoft.DataShare/accounts",
    "Microsoft.EventGrid/domains",
    "Microsoft.EventGrid/partnerTopics",
    "Microsoft.EventGrid/systemTopics",
    "Microsoft.EventGrid/topics",
    "Microsoft.Fabric/workspaces",
    "Microsoft.MachineLearningServices/registries",
    "Microsoft.MachineLearningServices/workspaces",
    "Microsoft.Media/mediaservices",
    "Microsoft.Network/expressRoutePorts",
    "Microsoft.Purview/accounts",
    "Microsoft.RecoveryServices/vaults",
    "Microsoft.Security/dataScanners",
    "Microsoft.Singularity/accounts",
    "Microsoft.Sql/servers",
    "Microsoft.StreamAnalytics/streamingjobs",
    "Microsoft.Synapse/workspaces"
)

function Set-CosmosDBNetwork {
    param (
        [string]$AccountName,
        [string]$ResourceGroup
    )
    
    Write-Host "Updating Network Settings for Cosmos DB Account: $($AccountName), Resource Group: $($ResourceGroup)" -ForegroundColor Green

    Write-Host "Disabling public network access to the Cosmos DB accounts"
    Update-AzCosmosDBAccount -ResourceGroupName $ResourceGroup -Name $AccountName -PublicNetworkAccess "Disabled"
    
    Write-Host "Adding MSFT IP addresses to the Cosmos DB account"
    foreach ($ipRange in $ipRanges) {
        Update-AzCosmosDBAccount -ResourceGroupName $ResourceGroup -Name $AccountName -IpRule $ipRange
    }

    $rulesList = @()
    foreach ($resourceInstance in $resourceInstances) {
        $resourceId = "/subscriptions/$($SubscriptionId)/resourceGroups/$($ResourceGroup)/providers/$($resourceInstance)/*"
        $rulesList += @{
            ResourceId = $resourceId
            TenantId   = $TenantId
        }
    }
    
    foreach ($rule in $rulesList) {
        Update-AzCosmosDBAccount -ResourceGroupName $ResourceGroup -Name $AccountName -NetworkAclBypassResourceId $rule.ResourceId -TenantId $rule.TenantId
    }

    Write-Host "--------------------------------------------------------------------------------------------------------------------------------------------"
}

if ($AccountName -and $ResourceGroup) {
    Set-CosmosDBNetwork -AccountName $AccountName -ResourceGroup $ResourceGroup
    exit
}

if ($ResourceGroup) {
    $CosmosDBAccounts = Get-AzCosmosDBAccount -ResourceGroupName $ResourceGroup
}
else {
    $CosmosDBAccounts = Get-AzCosmosDBAccount
}

foreach ($account in $CosmosDBAccounts) {
    Set-CosmosDBNetwork -Name $account.Name -ResourceGroup $account.ResourceGroupName 
}
