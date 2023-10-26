param(
    [string]$logsFolder
)

$ErrorActionPreference = "stop"
$logFiles = "$logsFolder\ImportDataDetailLog.log"

$errorIndicationStrings = @("Result: False", "Warning!!")
Write-Host "Examining '$logsFolder' for import errors - '$logFiles' will be scanned"

foreach ($errorIndicationString in $errorIndicationStrings)
{
    if ($null -ne (Select-String -Pattern $errorIndicationString -Path $logFiles)){
        write-error "Import Errors Detected In Logs, Assuming Import Operation Failed - check the logs of the data import step for details"
    }
}

write-host "No Import Errors Detected In Logs, Assuming Import Operation Succeeded"