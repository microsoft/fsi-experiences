# Introduction

This README will give you details on how to create or modify PCF Controls.

# Prereqs

-   Need to have PNPM installed (https://pnpm.io/installation)
-   Visual Studio (2017 or 2019), as well as the command line tool (should be included with Visual Studio)
-   Details can be found in https://docs.microsoft.com/en-us/powerapps/developer/data-platform/powerapps-cli
-   PowerApps CLI can be downloaded from https://aka.ms/PowerAppsCLI

# Creating a new control

- [Option 1 - using pac CLI]
 To create a new control, create it's root folder in the "frontend\pcf-controls" folder, with the word "Control" preened. I.E. if you were creating a BaseTool PCF Control, name the folder "BaseToolControl"
- Using Powershell, navigate to that directory and create the component: `pac pcf init --namespace [Your Namespace] --name [Your Component Name] --template [Component Type]`
- [Option 2 - using create-pcf script]
 Go to frontend folder and run "pnpm create-pcf" select the target module and the pcf name
-   Component Type, currently, can be "field" or "dataset". The Namespace should be "MicrosoftPCF" and the Component Name should be the folder name (ie "CarePlanControl")
-   Run: `pnpm i`
-   Navigate to the new folder created for your control, and open "ControlManifest.Input.xml"
-   Note the XML element "control" in "manifest". If needed, update the version, display-name-key (NO spaces), and description-key (This is what will be shown as description in D365).
-   Save
-   For dataset template types, there will be a "data-set" xml element. Change name and display-name-key to appropriate values (NO spaces in either). In the data-set are "property-set" xml elements. These are the attributes expected in each data-set object (data-set is an array of objects). Add what you need and set the appropriate name, display-name-key (NO spaces), and description-key to show to the user. Set if required or not in the dataset.
    -If you need to support multiple of-type, create a new "type-group" XML element as follows:
    <type-group name="numbers">
    <type>Whole.None</type>
    <type>Currency</type>
    </type-group>
    -Then you can reference the name for your property, and use "of-type-group" as the key.
    -List of available "of-type": https://docs.microsoft.com/en-us/powerapps/developer/component-framework/manifest-schema-reference/type
-   Scroll to the "resources" tag
-   There should be one child element, which adds your root index.ts file. As control grows, add your other .ts files here, as well as any css files needed
-   Depending on APIs needed, uncomment or add the appropriate feature elements in the "feature-usege" element

# Adding localization to a new control

-   Adding a translation script to `package.json` - its name should be `build-translations`
    and its content `node ../../core-components/scripts/translateHelper.js `.
    Example: `"build-translations": "node ../../core-components/scripts/translateHelper.js "`.
    The script will translate by default `common` and the `[ControlName]` (if exists) from `frontend/assets/strings` folder.
    To add more translations (i.e `Cards`) we need to add the name as argument in the script like this:
    `"build-translations": "node ../../core-components/scripts/translateHelper.js Cards"`.
    Eventually, we need to run the script before `build` and `start` so our `start` and `build` scripts should be:
    `"build": "npm run build-translations && pcf-scripts build"`
    `"start": "npm run build-translations && pcf-scripts start watch"`
    `build-translations": "node ../../core-components/scripts/translateHelper.js "`.

-   The script translates all translations codes (1033,1034,1035...) and output it into `[ControlName]/strings/[ControlName].[code].resx`.

-   Add into `gitignore` of the control the following:
    `**/strings`

-   Add into `[ControlName]/[ControlName]/ControlManifest.Input.xml` the following:
    <resources>
    ...
    **<resx path="strings/<ControlName>.<languageCode>.resx" version="1.0.0" />**
    ...
    </resources>
    This row `<resx path="strings/<ControlName>.<languageCode>.resx" version="1.0.0" />` will define the path to the translations file (which is created on build).
    Example: `<resx path="strings/LoanSnapshotControl.1033.resx" version="1.0.0" />`.

-   Create and Add a `Namespace` for the control into `frontend/core-components/constants/namespaces.ts`.
    The template for the namespace should be in the following format: `<CONTROL_NAME>: "controlName"`.
    Example: `LOAN_APPLICATION_FILES_CONTROL: "loanApplicationFilesControl"`.

-   Add the control's namespace into `/frontend/core-components/jest-setup.ts`.
    The namespace should be imported and added into `translationsObj`.
    Example: `[LOAN_APPLICATION_FILES_CONTROL]: loanApplicationFilesControl,`.

-   NOTE: If you use `useTranslation` hook (from: `frontend/core-components/context/hooks/useTranslation`) in your component, you need to provide it the namespace of your component as an input parameter.
    Example: `const translate = useTranslation(namespaces.LOAN_SNAPSHOT_CONTROL);`.

-   NOTE: Namespaces constant can be imported either from `frontend/core-components/constants/namespaces.ts` or from `frontend/core-components/context/hooks/useTranslation`.

-   Development:  
    If you change the strings file you will need to re-run build-translations to see it in the development env.

# Integrating new PCF projects to the build

After your PCF project has been created you will need to add the Properties below to .pcfproj where [MODULENAME] is equal to the Module the control will be a part of (e.g. HealthFoundation) and [SOLUTIONNAME] is the name of the solution where the control is referenced (e.g. HealthcareControls)

  <PropertyGroup>
    <DynamicsProjectType>PCFControl</DynamicsProjectType>
    <TargetModuleLocation>$(WSRoot)Modules\[MODULENAME]\[SOLUTIONNAME]</TargetModuleLocation>
    <ControlManifest>[PCFControlName]\ControlManifest.Input.xml</ControlManifest>
  </PropertyGroup>

Next, update the <Project> tag in .pcfproj with the below

  <Project Sdk="Microsoft.NET.Sdk">

Next you will need to add a reference to your pcfproj to the Solutions .csproj as you see below.

  <ProjectReference Include="..\..\..\frontend\pcf-controls\[ControlFolder]\[ControlProjectName].pcfproj" ReferenceOutputAssembly="false" />

Next update Solution.xml to include your new root component and update the schemaname tag accordingly

<RootComponent type="66" schemaName="customizationprefix_ctrlnamespace.ctrlname" behavior="0" />

Run `msbuild` from Modules dir and you should see a new folder created in your target solution with schema of _customizationprefix_ctrlnamespace.ctrlname_

# Development

During development, from the directory of your Control project use ``pac pcf push –publisher-prefix` command. Publisher Prefix should be the value in the customization prefix tag from your target solutions _Solution.xml_ file. This command will push your changes regardless of incrementing the version, etc. https://powerapps.microsoft.com/en-us/blog/the-powerapps-cli-exciting-new-features/.

Once complete, simply do an msbuild from \Modules dir and validate your changes are found in the respective controls solution. If you want to deploy your control via the solution approach to a new instance for testing, you will need to use `msbuild /p:configuration=release` from within the referenced Solutions .csproj dir
