param(
    [string] $Subscription
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

$CosmosDBAccounts = Get-AzCosmosDBAccount
$enabled = @()
$disabled = @()
foreach ($account in $CosmosDBAccounts) {
    $publicNetworkAccess = $account.PublicNetworkAccess
     Write-Host "YYYYYYYYYYYYYYYYYYYYY  $publicNetworkAccess"
    if ($publicNetworkAccess -eq "Enabled") {
        $enabled += $account
    }
    else {
        $disabled += $account
    }
}

Write-Host "Network Enabled Cosmos DB Accounts:" -ForegroundColor Yellow
$i = 1
$enabled | ForEach-Object {
    Write-Host "    $($i)   $($_.Name)" -ForegroundColor Yellow
    $i++
}

Write-Host "Network Disabled Cosmos DB Accounts:" -ForegroundColor Green
$i = 1
$disabled | ForEach-Object {
    Write-Host "    $($i)   $($_.Name)" -ForegroundColor Green
    $i++
}
