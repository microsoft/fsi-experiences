$AzureDevOpsAuthenicationHeader = @{Authorization = 'Basic ' + [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$(System.AccessToken)")) }
$response = (Invoke-RestMethod -Uri $(azureDevOpsEndpoint) -Method GET -Headers $AzureDevOpsAuthenicationHeader )
$response.value | ForEach-Object { 

   $changesUrl= $_.location

   $changesMethod="/changes?api-version=6.0"
   $changesEndPoint="$changesUrl$changesMethod"

   $changesResponse=(Invoke-RestMethod -Uri $changesEndPoint -Method GET -Headers $AzureDevOpsAuthenicationHeader )
   $changesResponse.changes | ForEach-Object{
     $path=$_.item.path
     $isFolder=$_.item.isFolder
     
     $pathArray=($path).substring(1) -split '/'
     
     if(($pathArray[0] -eq "Modules") -and ($isFolder) -and ($pathArray.Length -ge 3)){
        $moduleName=$pathArray[1]
        $projectName=$pathArray[2]

         Write-Host "Module Name: $moduleName"
         Write-Host "Project Name: $projectName"

         $varName= "$($moduleName)Changed"
         Write-Host "##vso[task.setvariable variable=$varName]true"
      }
   }
}