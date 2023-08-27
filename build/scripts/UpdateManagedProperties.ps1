param (
    [string]$path, 
    [boolean]$updateManagedProperties = $true,
    [boolean]$updateSentenceCase = $true,
    [boolean]$updateTechnicalNames = $false,
    [boolean]$updateDescriptions = $false,
    [string]$technicalNameFile, 
    [boolean]$updateOnlyTechNamesToLowercase = $false
 )

if(!$path){
    Write-Output "Solution path cannot be found - " + $path;
    EXIT 1;
}

#Set elements in entity to 0
$setEntityTo0 = @(

)

#Set elements in entity to 1
$setEntityTo1 = @(
    'CanModifyAdditionalSettings'
    'IsCustomizable'
    'IsRenameable'
    'CanCreateForms'
    'CanCreateCharts'
    'CanCreateViews'
    'IsMappable' 
    'CanChangeTrackingBeEnabled'
    'CanChangeHierarchicalRelationship'
    'ChangeTrackingEnabled'
    'CanModifyConnectionSettings'
)

#skip elements for virtual entities
$skipElementsForVE = @(
    'CanCreateCharts'
    'CanChangeTrackingBeEnabled'
)


#Set elements in attribute to 0
$setAttributeTo0 = @(
    'CanModifyRequirementLevelSettings'
)

#Entity names to force value attributes (comma separated) to 1
#Also a solution name can be specified to change the value only for these solutions
$setXMLAttributeTo1ForEntities = @{
    RetailBankingCoreDataModel = "CanCreateAttributes,CanModifyAdditionalSettings"
    LoanOnboardingDataModel = "CanCreateAttributes"
    FinancialServicesCommonDataModel = "CanCreateAttributes"
    LoanTracker = "CanCreateAttributes"
    IntelligentAppointmentsDataModel = "CanCreateAttributes"
    #msfsi_branch = "CanCreateAttributes"
    #msfsi_loanapplication = "CanCreateAttributes"
    #msfsi_loanapplicationcontact = "CanCreateAttributes"
}

#Force IsCustomizeable to 1 for selected Optionsets. by default, all Optionsets customization is set to false ((IsCustomizeable=0) 
#If specified with an entity name, will replace only within the entity
#If specified without entity name, will replace in all occurences of the optionset
#If specified with solution name, will replace only within solution
#If specified with solution name, and without entity (using the convention 'Solution..Optionset name') will replace all occurances within the solution
$setIsCustomizeableTo1_OptionsSets = @(
    'RetailBankingCoreDataModel..msfsi_FinancialHoldingType'
    'FinancialServicesCommonDataModel.msfsi_groupmember.msfsi_Role'
    'RetailBankingCoreDataModel.msfsi_lifemoment.msfsi_LifeMomentCategory'
    'RetailBankingCoreDataModel.msfsi_lifemoment.msfsi_LifeMomentType'
    'RetailBankingCoreDataModel.msfsi_relationship.msfsi_Relationshiptype'
    'RetailBankingCoreDataModel.msfsi_customerfinancialholding.msfsi_FinancialHoldingRole'
    'LoanOnboardingDataModel.msfsi_collateral.msfsi_category'
    'LoanOnboardingDataModel.msfsi_collateral.msfsi_realestatetype'
    'LoanOnboardingDataModel.msfsi_employment.msfsi_employmenttype'
    'LoanOnboardingDataModel.msfsi_loanapplication.msfsi_amortizationtype'
    'LoanOnboardingDataModel.msfsi_loanapplication.msfsi_financingtype'
    'LoanOnboardingDataModel.msfsi_loanapplication.msfsi_interesttype'
    'LoanOnboardingDataModel.msfsi_loanapplication.msfsi_loanorrefinancepurpose'
    'LoanOnboardingDataModel.msfsi_loanapplication.msfsi_loantype'
    'LoanOnboardingDataModel.msfsi_loanapplication.msfsi_refinancetype'
    'LoanOnboardingDataModel.msfsi_loanapplicationasset.msfsi_assettype'
    'LoanOnboardingDataModel.msfsi_loanapplicationcollateral.msfsi_lientype'
    'LoanOnboardingDataModel.msfsi_loanapplicationcollateral.msfsi_usagetype'
    'LoanOnboardingDataModel.msfsi_loanapplicationcollateralvaluation.msfsi_status'
    'LoanOnboardingDataModel.msfsi_loanapplicationcollateralvaluation.msfsi_type'
    'LoanOnboardingDataModel.msfsi_loanapplicationcontact.msfsi_gender'
    'LoanOnboardingDataModel.msfsi_loanapplicationcontact.msfsi_loanapplicationrole'
    'LoanOnboardingDataModel.msfsi_loanapplicationcontact.msfsi_maritalstatus'
    'LoanOnboardingDataModel.msfsi_loanapplicationcontact.msfsi_prefix'
    'LoanOnboardingDataModel.msfsi_loanapplicationcontact.msfsi_presentaddressownershipstatus'
    'LoanOnboardingDataModel.msfsi_loanapplicationcontactasset.msfsi_holdingrole'
    'LoanOnboardingDataModel.msfsi_loanapplicationcontactliability.msfsi_holdingrole'
    'LoanOnboardingDataModel.msfsi_loanapplicationliability.msfsi_liabilitytype'
    'IntelligentAppointmentsDataModel..msfsi_meetingoriginchannel'
    )

#Force IsCustomizeable to 1 for selected Optionsets. by default, all relationships customization is set to false ((IsCustomizeable=0) 
#Attribue format is entity name.attribute name. TBD to support solution name
$setIsCustomizeableTo1_Relationships = @(
    #'msfsi_GroupMember.msfsi_member'
)


#Set elements in attribute to 1
$setAttributeTo1 = @(
    'IsCustomizable'
    'CanModifyAdditionalSettings'
)

#solutions requiring analytics set on
$analyticalModels = @(
    'RetailBankingCoreDataModel'
    'LoanOnboardingDataModel'
    'FinancialServicesCommonDataModel'
    'WealthManagementCoreDataModel'
    'PropertyCasualtyDataModel'
    'CommonDataModel'
)

$solutionPrefixes = @(
    'msfsi'
    'msind'
)

function Write-Error{
param(
    [string]$Description,
    [string]$filename
)

    Write-Output "$Description in $filename $PSItem"
    EXIT 1
}

#Remove temp folder of solution's zip file when not needed
function Remove-temp-folder{
param(
    [string]$tempFolderPath,
    [string]$filename
)

    try {
        Remove-Item $tempFolderPath -Recurse
    }
    catch
    {
        Write-Error "Failed to remove temp folder $tempFolderPath" $file
    }
}

#Change managed properties in customizations.xml file
function Modify-File{
param(
    [string]$file
)
    
    try {
        $tempFolderPath = Join-Path $Env:Temp $([guid]::newguid())
        New-Item -Type Directory -Path $tempFolderPath | Out-Null
        if (![System.IO.Directory]::Exists($tempFolderPath)){
            Write-Error "Failed to create temp folder $tempFolderPath" $file
        }
    }
    catch {
        Write-Error "Cannot create temp folder for solution" $file + "   " + $tempFolderPath
    }

    Expand-Archive $file -DestinationPath $tempFolderPath
    $customizationFile = $tempFolderPath + '\customizations.xml'
    $solutionFile = $tempFolderPath + '\solution.xml'
    if (![System.IO.File]::Exists($customizationFile) -or ![System.IO.File]::Exists($solutionFile)){
        Remove-temp-folder $tempFolderPath  $file
        Write-Error "Cannot find customizations.xml in solution zip file - $file "  $file
    }
    

    try {
        $customizationXml=New-Object XML
        $customizationXml.Load($customizationFile)
        $solutionXml=New-Object XML
        $solutionXml.Load($solutionFile)
    }
    catch {
        Write-Error "Error loading customizations.xml" $file
    }

    #Determine we are currently in the 'Data model' so we can apply also 'Change Tracking' to its entities
    $solutionName = $solutionXml.SelectSingleNode("ImportExportXml/SolutionManifest/UniqueName").InnerText
    $isAnalyticalModel = $analyticalModels.Contains($solutionName) -and $updateManagedProperties

    if($updateTechnicalNames -or $updateDescriptions -or $updateOnlyTechNamesToLowercase){
        #for technical name relacement:
        #the config file should be a tab delimited file with 3 columns: key, value, type. these should be the values of the 1st data row
        #each row should contain source technical name, destination technical name, and a type (table, field, optionset)

        #for description replacement:
        #the config file should include also a description column holding the new descriptions for the tables and fields
        #if only description replacement is done, value column is not necessary
    
        $techDict = @{}
        $descDict = @{}
        LoadConfigFileIntoDict $technicalNameFile $techDict "`t" $descDict
    }

    foreach($solutionBase in $solutionPrefixes){
        $prefix = "'" + $solutionBase + "_'"
        
        if($updateManagedProperties){
            updManagedProperties $prefix $solutionName $isAnalyticalModel   
        }

        #Enforce sentence case on prefixed display names (entitites - display names, collections, attributes, optionsets)
        if($updateSentenceCase){
            ChangeDisplayNamesToSentenceStyle $prefix
        }

        if($updateTechnicalNames -or $updateDescriptions -or $updateOnlyTechNamesToLowercase){
            updTechnicalNames $prefix $techDict $descDict
        }
    }

    #update analytical entities only for analytical models
    if($isAnalyticalModel){
        UpdateAnalytisFlagsInEntities
    }

    UpdateFileInSolutionZip $customizationXml $customizationFile $file
    UpdateFileInSolutionZip $solutionXml $solutionFile $file
    Remove-temp-folder $tempFolderPath $file
    
}

function updManagedProperties{
    param(
        [string]$prefix,
        [string]$solutionName,
        [boolean]$isAnalyticalModel
    ) 


    #Look for attributes whose PhysicalName starts with prefix and change tags in SetAttributeTo1 collection to 1 and those in SetAttributeTo0 collection to 0
    try {
        $nodes = $customizationXml.SelectNodes("//entity/attributes/attribute[starts-with(@PhysicalName,$prefix)]")
        foreach($node in $nodes) {
            foreach($s in $setAttributeTo0){
                $childNode = $node.SelectSingleNode("./" + $s)
                if($childNode){
                    $childNode.InnerText = "0"
                }

                #We must have in polymorphic lookup 'CanModifyRequirementLevelSettings=1' in order to power apps to allow extending the lookup in upper solutions
                if($s -eq 'CanModifyAdditionalSettings'){
                    if($childNode){
                        $nodeLookup =  $node.SelectSingleNode("./LookupStyle")
                        if($nodeLookup.InnerText -eq 'polymorphic'){
                            $childNode.InnerText = "1"
                        }
                    }
                }
            }
            foreach($s in $SetAttributeTo1){
                $childNode = $node.SelectSingleNode("./" + $s)
                if($childNode){
                    $childNode.InnerText = "1"
                } 
            }
        }
    }
    catch {
        Write-Error "Error changing Attributes info" $file
    }

    #Look for entities whose name starts with prefix and change some node to 0, some to 1. mainly IsCustomizable to 1
    try {
        $nodes = $customizationXml.SelectNodes("//entity[starts-with(@Name,$prefix)]")
        foreach($node in $nodes) {
            foreach($s in $setEntityTo1){
                $changeProperty = $true
                $forcePropertyTo0 = $false

                #Skip enable tacking for non analyical solutions
                if($s -eq 'ChangeTrackingEnabled' -and !$isAnalyticalModel){
                    $changeProperty = $false
                }

                #Change selected properties to 0 if entity is VE
                try{
                    $dataSource = $node.SelectSingleNode("./DataSourceId")
                    $dataProvider = $node.SelectSingleNode("./DataProviderId")
                    if($null -ne $dataSource -or $null -ne $dataProvider){
                        if($skipElementsForVE.Contains($s)){
                            $forcePropertyTo0 = $true
                        }
                    }
                }catch{}

                if($changeProperty){
                    $childNode = $node.SelectSingleNode("./" + $s)
                    if($childNode){
                        if($forcePropertyTo0){
                            $childNode.InnerText = "0"
                        }else{
                            $childNode.InnerText = "1"
                        }                        
                    }
                }
            }

            foreach($s in $setEntityTo0){
                $childNode = $node.SelectSingleNode("./" + $s)
                if($childNode){
                    $childNode.InnerText = "0"
                }
            }

            foreach($entity in $setXMLAttributeTo1ForEntities.GetEnumerator()){
                if($entity.key -eq $solutionName -or $entity.key -eq $node.getAttribute("Name")){
                    $arrAttributes = $entity.value -split ","
                    foreach($s in $arrAttributes){
                        $childNode = $node.SelectSingleNode("./" + $s)
                        if($childNode){
                            $childNode.InnerText = "1"
                        # if the element does not exist, we need to force adding it. 
                        # this solves the issue of top solution that has EntityInfo that is empty, but then cannot inherit entity properties changes from below (i.e. CanCreateAttributes)
                        }elseif($entity.key -eq $solutionName){
                            $newAttribute = $customizationXml.CreateElement($s)
                            $newAttribute.InnerText = "1"                
                            $node.AppendChild($newAttribute)

                            #if we have unmodified="1" we need to remove it
                            $value = $node.getAttribute("unmodified")
                            if($value -eq "1"){
                                $node.removeAttribute("unmodified")
                            }

                        }
                    }
                }
            }
        }
    }
    catch {
        Write-Error "Error changing Entities info" $file
    }


    #Look for OptionSets whose Name starts with prefix (global and local) and change 'IsCustomizable' to 0
    try {
        $nodes = $customizationXml.SelectNodes("//optionset[starts-with(@Name,$prefix)]")
        foreach($node in $nodes) {
            $childNode = $node.SelectSingleNode("IsCustomizable")
            if($childNode){
                $childNode.InnerText = "0"
            }
        }
    }
    catch {
        Write-Error "Error changing OptionSets info" $file
    }

    #Look for optionsets where we need to force IsCustomizeable to 1
    if($setIsCustomizeableTo1_OptionsSets.Count){        
        foreach($item in $setIsCustomizeableTo1_OptionsSets){
            try{
                $nodes = $null
                #Split optionset name to entity part and attrinute part
                $itemParts = $item.Split(".")
                $where = "starts-with(@PhysicalName,$prefix) and "

                #If we have solution name as first part, check that we are at the right solution
                if($itemParts.count -eq 3){
                    if($itemParts[0] -ne $solutionName ){
                        continue
                    }else{
                        #remove solution name from collection
                        $itemParts = [System.Collections.ArrayList]$itemParts
                        $itemParts.RemoveAt(0)
                        if(!$itemParts[0].length){
                            #If entitiy name is empty remove it from collection
                            $itemParts.RemoveAt(0)
                        }
                    }  
                }
                #If only attribute part exists, take attribute for all entities, otherwise, take attribute for the defined entitiy
                if($itemParts.count -eq 2){
                    
                    $att_lc = $itemParts[1].ToLowerInvariant()
                    $att_uc = $itemParts[1].ToUpperInvariant()
                    $where += "translate(@PhysicalName,'$att_uc','$att_lc')='$att_lc'"

                    $entityName = $itemParts[0]
                    $en_lc = $entityName.ToLowerInvariant()
                    $en_uc = $entityName.ToUpperInvariant()
                    $nodes = $customizationXml.SelectNodes("//entity[translate(@Name,'$en_uc','$en_lc') = '$en_lc']/attributes/attribute[$where]")
    
                }elseif($itemParts.count -eq 1){
                    
                    $att_lc = $itemParts[0].ToLowerInvariant()
                    $att_uc = $itemParts[0].ToUpperInvariant()
                    $where += "translate(@PhysicalName,'$att_uc','$att_lc')='$att_lc'"

                    $nodes = $customizationXml.SelectNodes("//entity/attributes/attribute[$where]")
                }
                
                if($nodes){
                    foreach($node in $nodes) {
                        $optionsetPointer = $node.SelectSingleNode("OptionSetName")
                        #If optionset is global then derive from the optiosetpointer in the attribute the location of the global optionset
                        if($optionsetPointer){
                            $optionsetName = $optionsetPointer.InnerText
                            $isCustomizeableNode = $customizationXml.SelectSingleNode("ImportExportXml/optionsets/optionset[@Name='$optionsetName']/IsCustomizable")
                        }
                        #Else, if local optionset, select its IsCustomizeable directly
                        else{
                            $isCustomizeableNode = $node.SelectSingleNode("optionset/IsCustomizable") 
                        }
                        if($isCustomizeableNode){
                            $isCustomizeableNode.InnerText = "1"
                        }
                    }
                }
            }catch{
                Write-Output "Failed to update optionset $item"
            }
        }
    }


    #Look for forms whose parent entity Name starts with prefix and change 'IsCustomizable' to 1
    try {
        $nodes = $customizationXml.SelectNodes("//FormXml")
        foreach($node in $nodes) {
            $entityNode = $node.SelectSingleNode("ancestor::Entity/EntityInfo/entity[starts-with(@Name,$prefix)]")
            if($entityNode){
                $ChildNodes = $node.SelectNodes(".//IsCustomizable")
                foreach($childNode in $ChildNodes){
                    $childNode.InnerText = "1"
                }
            }
        }
    }
    catch {
        Write-Error "Error changing Forms info" $file
    }

    #Look for Views whose parent entity Name starts with prefix and change 'IsCustomizable' to 1
    try {
        $nodes = $customizationXml.SelectNodes("//SavedQueries")
        foreach($node in $nodes) {
            $entityNode = $node.SelectSingleNode("ancestor::Entity/EntityInfo/entity[starts-with(@Name,$prefix)]")
            if($entityNode){
                $ChildNodes = $node.SelectNodes(".//IsCustomizable")
                foreach($childNode in $ChildNodes){
                    $childNode.InnerText = "1"
                }
            }
        }
    }
    catch {
        Write-Error "Error changing Views info" $file
    }

    #Look for entitiy relationships whose name contains prefix and change 'IsCustomizable' to 0
    try {
        $nodes = $customizationXml.SelectNodes("//EntityRelationship[contains(@Name,$prefix)]")
        foreach($node in $nodes) {
            $childNode = $node.SelectSingleNode("IsCustomizable")
            if($childNode){   
                $value = "0"
                if($setIsCustomizeableTo1_Relationships.Count){
                    #if field is in collection, set its IsCustomizeable to 1
                    $entity = $node.SelectSingleNode("ReferencingEntityName").InnerText
                    $attribute = $node.SelectSingleNode("ReferencingAttributeName").InnerText
                    if($setIsCustomizeableTo1_Relationships.Contains($entity +"." + $attribute )){
                        $value = "1"
                    }
                }
                $childNode.InnerText = $value
            }
        }
    }
    catch {
        Write-Error "Error changing Relationships info" $file
    }
}

function updTechnicalNames{
    param(
        [string]$prefix,
        [object]$dict,
        [object]$descDict
    )
    
    
    $xml = $customizationXml.InnerXml
    $cleanPrefix = $prefix -replace "'", ""
    if($xml.contains($cleanPrefix)){
        
        $typeTable = "table"
        $typeField = "field"
        $typeFieldTable = "fieldtable"
        $typeSet = "optionset"
        $version = "1.3.0.0"
        
        if($updateTechnicalNames -and -not $updateOnlyTechNamesToLowercase){
            #Entities
            #if we need only the update tech names to lowercase we do these transormation only at the end, so the xpath query below will succeed
            ReplaceTechnicalNames $dict $typeTable "//Entity[starts-with(Name,$prefix)]/Name" 
            ReplaceTechnicalNames $dict $typeTable "//entity[starts-with(@Name,$prefix)]" "Name"
            ReplaceTechnicalNames $dict $typeTable "//entity[starts-with(@Name,$prefix)]/EntitySetName" 
        }


        $nodes = $customizationXml.SelectNodes("//EntityInfo/entity")
        foreach($node in $nodes){
            $tableName = $node.getAttribute("Name")
            $parentNode = $node.SelectSingleNode("../../Name")
            $tableCaption = $parentNode.getAttribute("LocalizedName")
            
            $tableCaptionFilter = "/Name[@LocalizedName='$tableCaption']/.."
            $tableRefFilter = "[ReferencingEntityName='$tableName']"    
            $tableFilter = "[@Name='$tableName']"
             
            #if($tableName -eq 'msfsi_Coverage'){

            Write-Output "Processing $tableName"

            if($updateTechnicalNames){
                #attributes
                ReplaceTechnicalNames $dict $typeFieldTable "//entity$tableFilter/attributes/attribute[starts-with(@PhysicalName,$prefix)]" "PhysicalName" -tableName $tableName
                ReplaceTechnicalNames $dict $typeFieldTable "//entity$tableFilter/attributes/attribute[starts-with(@PhysicalName,$prefix)]/Name" -tableName $tableName
                ReplaceTechnicalNames $dict $typeFieldTable "//entity$tableFilter/attributes/attribute[starts-with(@PhysicalName,$prefix)]/LogicalName" -tableName $tableName

                #Keys
                ReplaceTechnicalNames $dict $typeField "//entity$tableFilter/EntityKeys/EntityKey[starts-with(Name,$prefix)]/EntityKeyAttributes/AttributeName" -tableName $tableName

                #optionsets on entity
                ReplaceTechnicalNames $dict $typeSet "//entity$tableFilter/attributes/attribute[starts-with(@PhysicalName,$prefix)]/OptionSetName" -tableName $tableName
                ReplaceTechnicalNames $dict $typeFieldTable "//entity$tableFilter/attributes/attribute/optionset[starts-with(@Name,$prefix)]" "Name" -tableName $tableName

                #forms
                ReplaceTechnicalNames $dict $typeField "//Entity$tableCaptionFilter/FormXml/forms//control[starts-with(@id,$prefix)]" "id" -tableName $tableName
                ReplaceTechnicalNames $dict $typeField "//Entity$tableCaptionFilter/FormXml/forms//control[starts-with(@datafieldname,$prefix)]" "datafieldname" -tableName $tableName
                ReplaceTechnicalNames $dict $typeTable "//Entity$tableCaptionFilter/FormXml/forms//NavBarByRelationshipItem[contains(@RelationshipName,$prefix)]" "RelationshipName" $true -tableName $tableName
                ReplaceTechnicalNames $dict $typeTable "//Entity$tableCaptionFilter/FormXml/forms//NavBarByRelationshipItem[contains(@Id,$prefix)]" "Id" $true -tableName $tableName


                #Queries
                ReplaceTechnicalNames $dict $typeField "//Entity$tableCaptionFilter/SavedQueries/savedqueries/savedquery/layoutxml/grid[starts-with(@jump,$prefix)]" "jump" -tableName $tableName
                ReplaceTechnicalNames $dict $typeTable "//Entity$tableCaptionFilter/SavedQueries/savedqueries/savedquery/layoutxml/grid[starts-with(@name,$prefix)]" "name" -tableName $tableName
                ReplaceTechnicalNames $dict $typeTable "//Entity$tableCaptionFilter/SavedQueries/savedqueries/savedquery/layoutxml/grid/row[starts-with(@id,$prefix)]" "id" -tableName $tableName
                ReplaceTechnicalNames $dict $typeTable "//Entity$tableCaptionFilter/SavedQueries/savedqueries/savedquery/layoutxml/grid/row[starts-with(@name,$prefix)]" "name" -tableName $tableName
                ReplaceTechnicalNames $dict $typeField "//Entity$tableCaptionFilter/SavedQueries/savedqueries/savedquery/layoutxml/grid/row/cell[starts-with(@name,$prefix)]" "name" -tableName $tableName
                ReplaceTechnicalNames $dict $typeTable "//Entity$tableCaptionFilter/SavedQueries/savedqueries/savedquery/fetchxml/fetch/entity[starts-with(@name,$prefix)]" "name" -tableName $tableName
                ReplaceTechnicalNames $dict $typeField "//Entity$tableCaptionFilter/SavedQueries/savedqueries/savedquery/fetchxml/fetch/entity/attribute[starts-with(@name,$prefix)]" "name" -tableName $tableName
                ReplaceTechnicalNames $dict $typeField "//Entity$tableCaptionFilter/SavedQueries/savedqueries/savedquery/fetchxml/fetch/entity/order[starts-with(@attribute,$prefix)]" "attribute" -tableName $tableName
                ReplaceTechnicalNames $dict $typeField "//Entity$tableCaptionFilter/SavedQueries/savedqueries/savedquery/fetchxml/fetch/entity/filter/condition[starts-with(@attribute,$prefix)]" "attribute" -tableName $tableName

                #relationship
                #also check if need to change the relationship name only in this case
                

                ReplaceTechnicalNames $dict $typeField "//EntityRelationships/EntityRelationship$tableRefFilter/ReferencingAttributeName" -tableName $tableName
                ReplaceTechnicalNames $dict $typeTable "//EntityRelationships/EntityRelationship[contains(@Name,$prefix)]/ReferencedEntityName" -tableName $tableName
                
                ReplaceTechnicalNames $dict $typeField "//EntityRelationships/EntityRelationship$tableRefFilter/EntityRelationshipRoles/EntityRelationshipRole/NavigationPropertyName" -tableName $tableName
                
                if($updateOnlyTechNamesToLowercase){
                    ReplaceTechnicalNames $dict $typeField "//EntityRelationships/EntityRelationship$tableRefFilter" "Name" 
                }
                
                #must be last as when changing technical names the other are depending the a value that is changing in this call
                ReplaceTechnicalNames $dict $typeTable "//EntityRelationships/EntityRelationship$tableRefFilter/ReferencingEntityName" -checkRelationshipWithSystemField $true -tableName $tableName

                }

            if($updateDescriptions){
                ReplaceDescription $descDict $typeTable "//entity[@Name='$tableName' and starts-with(@Name,$prefix)]" "Name" $tableName
                ReplaceDescription $descDict $typeField "//entity$tableFilter/attributes/attribute[starts-with(@PhysicalName,$prefix)]" "PhysicalName" $tableName
            }
            #}
        }

        if($updateTechnicalNames){
            #optionsets
            ReplaceTechnicalNames $dict $typeSet "//optionsets/optionset[starts-with(@Name,$prefix)]" "Name"

            #analytics
            ReplaceTechnicalNames $dict $typeTable "//EntityAnalyticsConfigs/EntityAnalyticsConfig[starts-with(parententitylogicalname,$prefix)]/parententitylogicalname"

            #solution 
            ReplaceTechnicalNames $dict $typeSet "//RootComponents/RootComponent[starts-with(@schemaName,$prefix) and starts-with(@type,'9')]" "schemaName"  -isSolution $true
            ReplaceTechnicalNames $dict $typeTable "//RootComponents/RootComponent[starts-with(@schemaName,$prefix) and not(starts-with(@type,'9'))]" "schemaName"  -isSolution $true

            #version
            ReplaceVersion "//entity/attributes/attribute[starts-with(@PhysicalName,$prefix)]/IntroducedVersion" $version
            ReplaceVersion "//entity/attributes/attribute[starts-with(@PhysicalName,$prefix)]/optionset/IntroducedVersion" $version
            ReplaceVersion "//EntityRelationships/EntityRelationship[contains(@Name,$prefix)]/IntroducedVersion" $version
            ReplaceVersion "//optionsets/optionset[starts-with(@Name,$prefix)]/IntroducedVersion" $version
            ReplaceVersion "//Entity[starts-with(Name,$prefix)]/FormXml/forms//IntroducedVersion" $version
            ReplaceVersion "//entity//EntityKeys/EntityKey[starts-with(Name,$prefix)]/IntroducedVersion" $version

            if($updateOnlyTechNamesToLowercase){
                #Entities
                ReplaceTechnicalNames $dict $typeTable "//Entity[starts-with(Name,$prefix)]/Name" 
                ReplaceTechnicalNames $dict $typeTable "//entity[starts-with(@Name,$prefix)]" "Name"
                ReplaceTechnicalNames $dict $typeTable "//entity[starts-with(@Name,$prefix)]/EntitySetName" 
            }
        }
    }

}

function ReplaceDescription{
    param(
        [object]$descDict,
        [string]$nameType,
        [string]$xpathQuery,
        [string]$attributeName,
        [string]$tableName
    )

    try{
         $nodes = $customizationXml.SelectNodes($xpathQuery)
    }catch{
        Write-Output "Cannot change technical name using the query " + $xpathQuery
    }finally{
        if(!$nodes.Count){
            Write-Output ('no data for:' + $tableName)
        }

        $tableNamePrefix = ""
        if($tableName -and $nameType -ne 'table'){
            $tableNamePrefix = $tableName + "."
        }

        foreach($node in $nodes) {
            $name = $node.getAttribute($attributeName)
            $descNode = $node.SelectSingleNode("Descriptions/Description")

            $newDesc = $descDict[$nameType + ':' + $tableNamePrefix + $name]
            if($newDesc){
                $descNode.SetAttribute("description", $newDesc)
            }else{
                Write-Output ('not found:' + $tableNamePrefix + $name)
            }
        }
    }

}

function ReplaceVersion{
    param(
        [string]$xpathQuery,
        [string]$newVersion
    )

    try{
         $nodes = $customizationXml.SelectNodes($xpathQuery)
    }catch{
        Write-Output "Cannot change technical name using the query " + $xpathQuery
    }finally{
        if(!$nodes.Count){
        }
        foreach($node in $nodes) {
            $node.InnerText = $newVersion
        }


    }

}

function ReplaceTechnicalNames{
    param(
        [object]$dict,
        [string]$nameType,
        [string]$xpathQuery,
        [string]$attributeName,
        [boolean]$checkRelationshipWithSystemField,
        [boolean]$isSolution,
        [string]$tableName
    )



    $tableNamePrefix = ""
    if($tableName){
        $tableNamePrefix = $tableName + "."
    }

    try{

        if($isSolution){
            $nodes = $solutionXml.SelectNodes($xpathQuery)
        }else{
            $nodes = $customizationXml.SelectNodes($xpathQuery)
        }
 
        $isAttribute = $attributeName.Length -gt 0

        if($updateOnlyTechNamesToLowercase){
            foreach($node in $nodes){



                if($isAttribute){
                    $desc = $node.getAttribute($attributeName)

                    #if(ReplaceNodeValue $Node $attributeName "a" "b"){
                    #    $a=$a
                    #}

                    $node.SetAttribute($attributeName,$desc.toLower())
                }else{
                    $desc = $node.InnerText
                    $node.InnerText = $desc.toLower()
                }
            }
            return 
        }

        if($null -ne $nodes){
            if($nodes.Count -eq 0){
                $a=$a
            }
    
            $suffixes = @(
                ''
                'id'
                '_statecode'
                '_statusecode'
                's'
                'es'
            )

            foreach($node in $nodes) {
                
                try{
                    if($isAttribute){
                        $desc = $node.getAttribute($attributeName)
                        if($desc -eq 'msfsi_policypart' ){
                            $a=$a
                        }
                    }else{
                        $desc = $node.InnerText
                        if($desc -eq 'msfsi_InsurancePolicy' -and $checkRelationshipWithSystemField ){
                            $a=$a
                        }
                        if($desc -eq 'msfsi_termdocumentpoldictionary' ){
                            $a=$a
                        }
                    }
                    foreach($suffix in $suffixes){
                        $hasSuffix = $false
                        $updateDesc = $desc
                        if($desc.Substring($desc.length-$suffix.Length) -eq $suffix){
                            $updateDesc = $desc.Substring(0,$desc.length-$suffix.Length)
                            $hasSuffix = $true 
                        }
                        if($null -ne $updateDesc -and "" -ne $updateDesc){
                            if($nameType -eq "fieldtable"){
                                $newDesc = $dict['field:' + $tableNamePrefix + $updateDesc]    
                                if(!$newDesc){
                                    $newDesc = $dict['table:' + $updateDesc]    
                                }
                            }else{
                                $newDesc = $dict[$nameType + ":" + $tableNamePrefix + $updateDesc]
                            }
                            if($newDesc){
                                if($hasSuffix){
                                    $newDesc += $suffix
                                }
                                if($desc -ne $newDesc){
                                    if($isAttribute){
                                        $node.SetAttribute($attributeName, $newDesc)    
                                    }else{
                                        $node.InnerText = $newDesc
                                        if($checkRelationshipWithSystemField){
                                            $referencedNode = $node.SelectSingleNode('../ReferencedEntityName')
                                            $referncedDesc = $referencedNode.InnerText

                                            #Must change the relationship name when it relates to non custom field
                                            if(!$referncedDesc.contains($prefix)){ 
                                                $parentNode = $referencedNode.SelectSingleNode('..')
                                                ReplaceNodeValue $parentNode "Name" $desc $newDesc

                                                
                                            }
                                            
                                            #ReplaceFieldValue $node $dict '..//ReferencingAttributeName' $newDesc "field" $suffixes
                                            #ReplaceFieldValue $node $dict '..//NavigationPropertyName' $newDesc "field" $suffixes

                                            <#
                                            $nodeRelRoles = $node.SelectNodes('..//NavigationPropertyName')
                                            foreach($nodeRole in $nodeRelRoles){
                                                $navContent = $nodeRole.InnerText
                                                if($navContent -eq 'msfsi_ProducerID'){
                                                    $a=$a
                                                }

                                                foreach($navSuffix in $suffixes){
                                                    if($navContent.Substring($navContent.length-$navSuffix.Length) -eq $navSuffix){
                                                        $navUpdateDesc = $navContent.Substring(0,$navContent.length-$navSuffix.Length)
                                                        $navNewValue = $dict['field:' + $tableNamePrefix + $navUpdateDesc]    
                                                        if($navNewValue){
                                                            $nodeRole.InnerText = $navNewValue + $navSuffix
                                                            break
                                                        }
                                                    }
                                                }
                                                
                                                ReplaceNodeValue $nodeRole '' $desc $newDesc
                                                $newContent = $nodeRole.InnerText
                                                if($nodeRole.InnerText -ne $content){
                                                    $navBarNodes =$customizationXml.SelectNodes("//NavBarByRelationshipItem[starts-with(@RelationshipName,$content)]")
                                                    foreach($navBarNode in $navBarNodes){
                                                        ReplaceNodeValue $navBarNode 'RelationshipName' $content $newContent
                                                        ReplaceNodeValue $navBarNode 'Id' $content $newContent
                                                    }
                                                }
                                            }
                                            #>
                                        }
                                    }    
                                }
                                break
                            }
                        }
                    }
                }catch{}
            }
        }else {
        }

    }catch{
        Write-Output "Cannot change technical name using the query " + $xpathQuery
    }
}

function ReplaceFieldValue{
param(
    [object]$rootNode,
    [object]$dict,
    [string]$xpath,
    [string]$tableName,
    [string]$typeName,
    [object]$suffixes

)
   
    $nodes = $rootNode.SelectNodes($xpath)
    foreach($node in $nodes){
        $refNode = $node.InnerText
        foreach($navSuffix in $suffixes){
            if($refNode.Substring($refNode.length-$navSuffix.Length) -eq $navSuffix){
                $navUpdateDesc = $refNode.Substring(0,$refNode.length-$navSuffix.Length)
                $navNewValue = $dict[$typeName + ":" + $tableName + '.' + $navUpdateDesc]    
                if($navNewValue){
                    $refNode.InnerText = $navNewValue + $navSuffix
                    break
                }
            }
        }
    }
}
function [boolean]ReplaceNodeValue{
    param(
        [object]$sourceNode,
        [string]$attributeName,
        [string]$replace,
        [string]$replateWith
    )   
    
    $res = $false 
    $isAttribute = $attributeName.Length -gt 0
    if($isAttribute){
        $relName = $sourceNode.getAttribute($attributeName)
        $newName = $relName -ireplace $replace, $replateWith
        if($repName -ne $relName){
            $sourceNode.SetAttribute($attributeName, $newName)
            $res =$true
        }
        
    }else{
        $relName = $sourceNode.InnerText
        $newName = $relName -ireplace $replace, $replateWith
        if($repName -ne $relName){
            $sourceNode.InnerText = $newName
            $res = $true
        }
    }

    return $res

}

function LoadConfigFileIntoDict{
    param(
        [string]$filePath,
        [object]$dict,
        [string]$delimiter,
        [object]$descDict
    )    

    try{
        $table = Import-Csv -Path $filePath -Delimiter $delimiter -Encoding Unicode
        foreach($r in $table)
        {
            if($r.key){
                $key =""
                if($r.table){
                    $key = $r.table + "." + $r.key
                }else{
                    $key = $r.key
                }
                
                if($r.type){
                    $key = $r.type + ':' + $key 
                }

                if($r.value){
                    if(!$dict[$key]){
                        $dict[$key] = $r.Value
                    }
                }
               
                if($r.description){
                    if(!$descDict[$key]){
                        $descDict[$key] = $r.description 
                    }
                }
            }
        }
    }catch{
    }
}
function ChangeDisplayNamesToSentenceStyle{
param(
    [string]$prefix
)

    try{

        $ConfigPath = $PSScriptRoot + '\SentenceCaseConfig\SentenceCaseConfig.csv'
        LoadConfigFileIntoDict $ConfigPath $arrDisplayValues ","
        
        #Look for all entities display names
        ChangeDisplayNamesToSentenceStyleForGroup "//entity[starts-with(@Name,$prefix)]/LocalizedNames/LocalizedName"
        ChangeDisplayNamesToSentenceStyleForGroup "//entity[starts-with(@Name,$prefix)]/../../Name" "LocalizedName"
        ChangeDisplayNamesToSentenceStyleForGroup "//entity[starts-with(@Name,$prefix)]/../../Name" "OriginalName"
        
        #Look for all entities collection display names
        ChangeDisplayNamesToSentenceStyleForGroup "//entity[starts-with(@Name,$prefix)]/LocalizedCollectionNames/LocalizedCollectionName"

        #Look for all attributes display names
        ChangeDisplayNamesToSentenceStyleForGroup "//entity/attributes/attribute[starts-with(@PhysicalName,$prefix)]/displaynames/displayname"
        
        #Look for all optionsets display names (local and global) 
        ChangeDisplayNamesToSentenceStyleForGroup "//optionset[starts-with(@Name,$prefix)]/options/option/labels/label"
        ChangeDisplayNamesToSentenceStyleForGroup "//optionset[starts-with(@Name,$prefix)]/displaynames/displayname"
        ChangeDisplayNamesToSentenceStyleForGroup "//optionset[starts-with(@Name,$prefix)]" "localizedName"

        #Look for all labels and names in forms
        ChangeDisplayNamesToSentenceStyleForGroup "//FormXml/forms//labels/label"
        ChangeDisplayNamesToSentenceStyleForGroup "//FormXml/forms//LocalizedNames/LocalizedName"
        ChangeDisplayNamesToSentenceStyleForGroup "//FormXml/forms//Titles/Title" "Text" "1033"

        #look for all queries names
        #ChangeDisplayNamesToSentenceStyleForGroup "//Entity[starts-with(Name,$prefix)]/SavedQueries/savedqueries/savedquery/LocalizedNames/LocalizedName"
        

        try{
            ($arrDisplayValues.GetEnumerator() | Sort-Object -property:Key) | Select-Object Key, Value  | Export-Csv -Path $ConfigPath -NoTypeInformation -Encoding Unicode
        }catch{}

    }catch{
        Write-Error "Error changing to Sentence case " $file
    }
}

function ChangeDisplayNamesToSentenceStyleForGroup{
param(
    [string]$xpathQuery,
    [string]$attributeName = "description",
    [string]$LCID
)

    try{
        $nodes = $customizationXml.SelectNodes($xpathQuery)
    }catch{
        Write-Output "Cannot change to sentence case using the query " + $xpathQuery
    }finally{
        if($null -ne $nodes){
            foreach($node in $nodes) {
                $lcidValue = $node.getAttribute("LCID")
                if($LCID.length -eq 0 -or ($LCID.length -gt 0 -and $lcidValue -eq $LCID)){
                    try{
                        $desc = $node.getAttribute($attributeName)
                        if($null -ne $desc -and "" -ne $desc){
                            if(!$arrDisplayValues.ContainsKey($desc)){
                                $displayName = ConverToSentenceCase $desc
                                if($desc -ne $displayName){
                                    $node.SetAttribute($attributeName, $displayName)
                                }
                                $arrDisplayValues.add($desc, $displayName)
                            }else{
                                $newDesc = $arrDisplayValues[$desc]
                                if($desc -ne $newDesc){
                                    $node.SetAttribute($attributeName, $newDesc)    
                                }
                            }
                        }
                    }catch{}
                }
            }
        }           
    }
}

function ToTitleCase{
param(
    [string]$text
)
    if($text.Length -eq 0){
        $res = $text
    }elseif($text.Length -eq 1){
        $res = $text.ToUpper()
    }else{
        $res = $text.Substring(0,1).ToUpper() + $text.Substring(1).ToLower()
    }
    return $res 
}

function ConverToSentenceCase{
param(
    [string]$name
    
)
    
    # Break text into words seperated by ' '
    # if first word does not start with 2 consequetive upper case characters change it to title case
    # for all other words change to lower case
    #words that have / between shound show in title case 

    if($name.Length -gt 0){
        try{
            #if the text has / remove extra spaces around the /
            if($name.Contains("/")){
                $name = $name -replace "\s+/\s+" , "/"
            }

            $arrWords = $name -split " "

            for($i=0; $i -lt $arrWords.Length; $i++){
                if(!($arrWords[$i] -cmatch '^[A-Z][A-Z]')){
                    if($i -eq 0){
                        $arrWords[$i] = ToTitleCase $arrWords[$i]
                    }else{
                        $arrWords[$i] = $arrWords[$i].toLower()
                    }
                }
                $arrWords[$i]= TreatSlashInWord $arrWords[$i]
            }
            $res = $arrWords -join " "
            return $res
        }catch{

        }
    }else{
        return $name
    }
}

function TreatSlashInWord{
param(
    [string]$name
)
    try{
        if($name.Contains("/")){
            $arrWords = $name -split "/"
            for($i=0; $i -lt $arrWords.Length; $i++){
                if(!($arrWords[$i] -cmatch '^[A-Z][A-Z]')){
                    $arrWords[$i] = ToTitleCase $arrWords[$i]
                }
            }
            $res = $arrWords -join "/"
            return $res
        }else{
            $res = $name
        }
        return $res
    }catch{}
}

function UpdateAnalytisFlagsInEntities{
    #update anlytics in customization.xml
    $analyticsRootParent = $customizationXml.SelectSingleNode("ImportExportXml/EntityAnalyticsConfigs")
    if(!$analyticsRootParent){
        $rootNode = $customizationXml.SelectSingleNode("ImportExportXml")
        $analyticsRootParent = $customizationXml.CreateElement("EntityAnalyticsConfigs")
        $rootNode.AppendChild($analyticsRootParent) | Out-Null
    }

    $nodes = $customizationXml.SelectNodes("ImportExportXml/Entities/Entity/EntityInfo/entity")
    foreach($node in $nodes){
        $entityName = $node.getAttribute("Name").toLower()
        $analyticsParent = $analyticsRootParent.SelectSingleNode("EntityAnalyticsConfig[parententitylogicalname='" + $entityName +  "']")
        
        # if node does not exist for the entity, create it
        if(!$analyticsParent){

            $analyticsParent = $customizationXml.CreateElement("EntityAnalyticsConfig")
            $analyticsRootParent.AppendChild($analyticsParent) | Out-Null
            
            $analyticalEntity = $customizationXml.CreateElement("parententitylogicalname")
            $analyticalEntity.InnerText = $entityName
            $analyticsParent.AppendChild($analyticalEntity) | Out-Null

            $analyticalEntityEnabled = $customizationXml.CreateElement("isenabledforadls")
            $analyticalEntityEnabled.InnerText = 1
            $analyticsParent.AppendChild($analyticalEntityEnabled) | Out-Null
        }else{
            $analyticalEntityEnabled = $analyticsParent.SelectSingleNode("isenabledforadls")
            $analyticalEntityEnabled.InnerText = 1
        }
    }

    #update root components in solution.xml
    $rootComponentParent = $solutionXml.SelectSingleNode("//RootComponents")

    $nodes = $customizationXml.SelectNodes("ImportExportXml/Entities/Entity/EntityInfo/entity")
    foreach($node in $nodes){

        $entityName = $node.getAttribute("Name").toLower()
        $rootComponent = $rootComponentParent.SelectSingleNode("RootComponent[@type='430' and @schemaName='" + $entityName +  "']")

        # if node does not exist for the entity, create it
        if(!$rootComponent){

            $rootComponent = $solutionXml.CreateElement("RootComponent")
            $rootComponent.SetAttribute("type","430")
            $rootComponent.SetAttribute("schemaName",$entityName)
            $rootComponent.SetAttribute("behavior","0")
            $rootComponentParent.AppendChild($rootComponent) | Out-Null
        }
    }
}

function UpdateFileInSolutionZip{
param(
    [xml]$objXml,
    [string]$filename,
    [string]$targetZipFile
)

    try {
        $objXml.Save($filename)
        Compress-Archive -Update -Path $filename -DestinationPath $targetZipFile
    }
    catch {
        $fn = [System.IO.Path]::GetFileName($filename)
        Write-Error "Failed to update $fn"
    }
}
#-------------------------------------------------------------

$arrDisplayValues = @{}

try{
    if ([System.IO.Directory]::Exists($path)){
        $filesArr = [System.IO.Directory]::GetFiles($path)
    }
    else{
        $filesArr = $path.Split(";")
    }
    ForEach($file in $filesArr){
        if([System.IO.Path]::GetExtension($file) -eq '.zip'){
            Modify-File $file.Trim()
        }
    }
}
catch{
    Write-Error "Error reading file" $path
}
