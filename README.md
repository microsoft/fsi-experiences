# Financial Services Experiences
1. [Introduction][Introduction]
2. [Overview][Overview]
3. [Prerequisites installations][Prerequisitesinstallations]
4. [Repo code setup][Repocodesetup]
5. [Deploy][Deploying]
6. [Tools][UsedTools]

# Introduction
[**Introduction**][Introduction] | [Overview][Overview] | [Prerequisites installations][Prerequisitesinstallations] | [Repo code setup][Repocodesetup] | [Deploy][Deploying] | [Tools][UsedTools]

The Financial Services Repository contains the code-base for the Unified customer profile, Loan onboarding, Onboarding essentials, Banking data model, Small business data model and Property and Casualty data model.

The **Unified customer profile** provides a 360-degree perspective of the customer in a clear and intuitive way. It helps professionals have a good understanding of their customer’s financial details, important life moments, goals and much more, in order to be able to effectively maintain or deepen their loyalty. It has been tailored to fit the specific needs of professionals operating in the retail banking and the wealth management industries.

* Learn more about the Unified customer profile for retail banking [here](https://learn.microsoft.com/en-us/dynamics365/industry/financial-services/unified-customer-profile?toc=%2Findustry%2Ffinancial-services%2Ftoc.json&bc=%2Findustry%2Fbreadcrumb%2Ftoc.json).
* Learn more about the Unified client profile for wealth management [here](https://learn.microsoft.com/en-us/dynamics365/industry/financial-services/unified-client-profile?toc=%2Findustry%2Ffinancial-services%2Ftoc.json&bc=%2Findustry%2Fbreadcrumb%2Ftoc.json).

**Loan onboarding** has been designed to streamline the lending process by leveraging key capabilities such as document and data collection and verification. The application is easily configurable and extensible so that you can customize it to fit the needs of any financial institution looking to provide lending professionals with a unified interface to manage loans. Learn more about Loan onboarding [here](https://learn.microsoft.com/en-us/dynamics365/industry/financial-services/loan-onboarding).

**Onboarding essentials** provides a set of configurable components to address any onboarding scenarios. You can create an application using a combination of the Onboarding components and out-of-the-box platform components. Learn more about Onboarding essentials [here](https://learn.microsoft.com/en-us/dynamics365/industry/financial-services/onboarding-application-toolkit-components).

**Banking data model** provides the foundation for operational capabilities across retail banking and wealth management. Learn more about retail banking data model [here](https://learn.microsoft.com/en-us/common-data-model/schema/core/industrycommon/financialservices/retailbankingcoredatamodel/overview)

**Small business data model** extends the Microsoft Cloud for Financial Services data model foundation to represent individuals and allows linking small businesses to individual financial holdings. Learn more about small business data model [here](https://learn.microsoft.com/en-us/common-data-model/schema/core/industrycommon/financialservices/smbdatamodel/overview)

**Property and Casualty data model** captures new attributes including policy and coverage information, claims, insurance providers and producers. Learn more about property and casualty data model [here](https://learn.microsoft.com/en-us/common-data-model/schema/core/industrycommon/financialservices/propertyandcasualtydatamodel/overview)

# Overview
[Introduction][Introduction] | [**Overview**][Overview] | [Prerequisites installations][Prerequisitesinstallations] | [Repo code setup][Repocodesetup] | [Deploy][Deploying] | [Tools][UsedTools]

This guide walks you through the entire process of building and deploying any of the solutions within the Financial Services Experiences, such as the Unified customer profile, Loan onboarding or Onboarding essentials. It introduces the list of essential prerequisites, a set of detailed code setup instructions, a deployment guidance into the Power Platform environment, and an overview of the tools at your disposal. To install the solution, you can either carefully follow the instructions outlined in the following sections or use `InstallTools.cmd` in [**Tools**][UsedTools].

**Note**: To guarantee a smooth build process, you may need to have a memory of 8GB or more to avoid running out of memory on build. Consider using [Windows PowerShell of version 5.1](https://learn.microsoft.com/en-us/skypeforbusiness/set-up-your-computer-for-windows-powershell/download-and-install-windows-powershell-5-1) as needed throughout setup steps.

# Prerequisites installations
[Introduction][Introduction] | [Overview][Overview] | [**Prerequisites installations**][Prerequisitesinstallations] | [Repo code setup][Repocodesetup] | [Deploy][Deploying] | [Tools][UsedTools]

>    * [NPM, PNPM, .NET and Node.js 18.14.1][NPM,PNPM,.NETandNode.js18.14.1]
>    * [Visual Studio 2022][VisualStudio2022]
>    * [Visual Studio Code][VisualStudioCode]
>    * [Tools and configurations][Toolsandconfigurations]
>    * [SDK installation][SDKinstallation]

## NPM, PNPM, .NET and Node.js 18.14.1
Install NVM to use the specified Node.js version (18.14.1).
1. Install [latest nvm for Windows](https://github.com/coreybutler/nvm-windows/releases).
2. Run `nvm install 18.14.1` and then `nvm use 18.14.1` on Windows PowerShell.
3. Install pnpm using Windows PowerShell with the `npm install -g pnpm@8.6.2` command.
4. Install [.NET for Windows](https://dotnet.microsoft.com/en-us/download).
    
## Visual Studio 2022

1. Install [Visual Studio 2022](https://visualstudio.microsoft.com/vs/). 
2. Add .NET (C:\Program Files\dotnet) to the **System Path** using this [guide](https://learn.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ee537574(v=office.14)).

## Visual Studio Code 
1. Install [Visual Studio Code](https://code.visualstudio.com/download).

## Tools and configurations
1. Install the [PAC PowerApps CLI](https://aka.ms/PowerAppsCLI).
2. Install [Power Platform Tools extension for Visual Studio](https://learn.microsoft.com/en-us/power-platform/developer/devtools-vs#install-power-platform-tools-extension-for-visual-studio).
3. Install the package deployment module according to the instructions [here](https://docs.microsoft.com/powershell/powerapps/get-started-packagedeployment?view=pa-ps-latest), and make sure to run the command `Install-Module Microsoft.Xrm.Tooling.CrmConnector.PowerShell` (use Administrator Windows PowerShell). You can use the instructions in [this guide](https://lifehacker.com/windows-10-allows-file-names-longer-than-260-characters-1785201032) to change the registry and allow file path longer then 260 characters. 
4. Install [git](https://git-scm.com/download/win) for Windows.
5. Allow git to use long file paths by running the following command:
`git config --global core.longpaths true`.

## SDK installation

To install the CRM SDK tools, you can manually the specified steps, or run the `CrmSdk Tools` PowerShell script installer located in **$RepoRoot> ./Crm.Sdk.Core.Installer.ps1** after cloning the repo.

1. Download [nuget](https://www.nuget.org/downloads) for Windows.
2. Download [SDK Tools](https://www.nuget.org/packages/Microsoft.CrmSdk.CoreTools).
3. Use nuget to install the downloaded package, you can follow the instructions outlined in the [official documentation](https://learn.microsoft.com/en-us/nuget/consume-packages/install-use-packages-nuget-cli).
4. Save the file to your user's AppData folder, that is, C:\Users\\\<alias>\AppData\Local\microsoft.crmsdk.coretools.9.1.0.64. 
   **(If the AppData folder is not visible, change the folder view settings to display hidden files)**.
5. Add the saved file to the **User Path** using this [guide](https://learn.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ee537574(v=office.14)).

# Repo code setup

[Introduction][Introduction] | [Overview][Overview] | [Prerequisites installations][Prerequisitesinstallations] | [**Repo code setup**][Repocodesetup] | [Deploy][Deploying] | [Tools][UsedTools]

1. Clone the [repository](https://github.com/microsoft/fsi-experiences).
2. Make sure to have plug-ins signed before building the solution in this stage. To achieve that, you can follow the instructions highlighted in [signing and registering plug-ins][PluginRegister] section. 
3. Run `pnpm install` in `\frontend` directory to install all dependent node libraries. If you encountered an error, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` and try again.
4. Run `pnpm build-libs` in `\frontend` directory to build all dependent node libraries.
5. Open `Modules\FSI.sln` in Visual Studio, and build the solution. If the build fails, go to the next step.
6. Open a PowerShell terminal, go to `\Modules` and run `dotnet build`. The build should complete without any errors.

## Getting started

>    * [**Getting started**][Gettingstarted]
>
>    * [Adding new package to repo][ModuleFolder]
>
>    * [Adding new solution to repo][DataProject]
>
>    * [Export solution or data][ExportSolution]
>
>    * [Signing and registering a plug-in][PluginRegister]
>
>    * [Setup by project type][Projects]

**Note**: It is important that you follow the setup steps in the following sections, as without them, the build process won't work properly and you might spend quite a lot of time in debugging issues.

Follow this section when adding a new solution to the code. If the solution already exists, skip to the [Export solution or data][ExportSolution] section.

### Naming conventions
There are two name convention in the setup that will be shorten for readability.
1. `module`: The module name is the package you are working on.
3. `fullName`: The concatenation of the group and solution in the `<GroupName><solutionName>` format. Here, group name is the name of the group in which you are working. For example, if a group name is FSI and a solution name is BankingDataModel, the full name is FSIBankingDataModel.
### Repo structure
* modules
   * module1
      * anchor solution for module 1
      * package project for module 1
      * solution 1 
      * solution 2
      * ...
   * module2
      * anchor solution for module 2
      * package project for module 2
      * solution 1
      * solution 2
## Adding new package to repo
>    * [Getting started][Gettingstarted]
>
>    * [**Adding new package to repo**][AddingNewPackagetoRepo]
>
>        * [Module folder][ModuleFolder]
>
>        * [Anchor solution][AnchorSolution]
>
>        * [Package project][PackageProject]
>
>    * [Adding new solution to repo][DataProject]
> 
>    * [Signing and registering a plug-in][PluginRegister]
> 
>    * [Setup by project type][Projects]
### Module folder
>    * [Adding new package to repo][AddingNewPackagetoRepo]
>
>        * [**Module folder**][ModuleFolder]
>
>        * [Anchor solution][AnchorSolution]
>
>        * [Package project][PackageProject]
1. Create a new folder under `modules`, with the name *`<module>`*.
2. Open the solution (`fsinew\Modules\FSI.sln`) in Visual Studio and create a new solution folder with the name *`<module>`*.

### Anchor solution
>    * [Adding new package to repo][AddingNewPackagetoRepo]
>
>        * [Module folder][ModuleFolder]
>
>        * [**Anchor solution**][AnchorSolution]
>
>        * [Package project][PackageProject]

**The anchor solution is the indicator that all the solutions in a package were deployed at the client.**
1. Add a new project of type `Class Library (.NET Framework)` with the name `<fullname>Anchor` under the `<module>` folder. In this case, `solutionName` is `module`, so `fullname` is `<Groupname><module>` and the new project name is `<Groupname><module>Anchor`. Note that the default project path is *incorrect*. Make sure the project is created under the `<module>` folder.
2. In Visual Studio Code, perform the following tasks:
   - Remove the folder `Properties`.
   - Delete `Class1.cs`.
3. Copy the contents of `FSIBaseSolution.csproj` from the `<projectDirectory>/templates` to the newly created `csproj` file and update the ModuleName attribute with `<module>`.
4. Go to `build\include` and add a `"<fullname>Anchor."` entry to the `xrmcopyexcludes.txt` file (note the period at the end).
5. **Create an Anchor solution (if one does not exist)**. Create an empty solution in your Dynamics 365 environment with the following naming convention: `<module>Anchor`.
6. Go to `exports\solutions` and open the `SolutionMappings.json` file.
   - This file describes the different projects and the corresponding solutions. `ProjectName` is the name of the solution in the repo. `SolutionName` is the display name of the solution ( in the Dynamics 365 environment) you want to add to the repo.
   - Add the new solution in `SolutionMappings.json` by following the pattern in the file.

### Package project
>    * [Adding new package to repo][AddingNewPackagetoRepo]
>
>        * [Module folder][ModuleFolder]
>
>        * [Anchor solution][AnchorSolution]
>
>        * [**Package project**][PackageProject]

The package project combines all the other projects, such as solution, plugin, and PCF, into one package for shipping to the client and in the local deployment for testing. To set up your package project, follow these steps:
1. Go to Visual Studio and add a new project under the already created module. Use the `power platform package deployment project` to get this package type. Naming convention is `<module>.Package`. Remember to make sure the project is created under the module directory. If you don't have the Power Platform package project, you can copy from `<projectDirectory>/templates/SampleProject.package`.
2. Copy the contents of the `importConfig.xml` file content from `<projectDirectory>/templates/SampleProject.package` and update `importConfig.xml` of the newly created package file (`\Modules\<module>\<module>.Package\PkgFolder\ImportConfig.xml`). Update the `configsolutionfile` attributes accordingly.
3. Rename `pkgFolder` to `<module>`.
4. In `PackageTemplate.cs`, override the return value of `GetImportPackageDataFolderName` with `<module>`.
5. Copy the contents of the `BaseSolution.Package.csproj` file from `<projectDirectory>/templates` to `<module>.Package\<module>.Package.csproj`.
   - In `csproj`, find and replace all references to `FSIBaseSolution` with the `FSI<module>`.
   - Update the `ModuleName` attribute with current `<module>`.
   - Delete to `properties` folder and `packages.config` file.
6. Under `\Modules\<module>\<module>.Package\<module>` create a `ConfigData` folder and copy into it the placeholder file `readme.md` from `<projectDirectory>/templates`. This folder can store `data.xml` files that will be unpacked there.
7. Copy the `PackageExtra` folder from `<projectDirectory>/templates/SampleProject.package` and paste it under `<module>.Package`.

## Adding new solution to repo
>    * [Repo code setup][Repocodesetup]
>
>    * [Getting started][Gettingstarted]
>
>    * [Adding new package to repo][ModuleFolder]
>
>    * [**Adding new solution to repo**][DataProject]
>
>        * [Set up a data project][DataProject]
> 
>        * [Solution project][SolutionProject]
>
>    * [Signing and registering a plug-in][PluginRegister]
> 
>    * [Setup by project type][Projects]
### Set up a data project
>    * [Adding new solution to repo][DataProject]
>
>        * [**Set up a data project**][DataProject]
> 
>        * [Solution project][SolutionProject]
1. Go to the `exports\data` folder.
2. Create a schema XML file and add it to the schema folder.
   - The Schema file is created using the configuration migration tool. You can find more details in `readme.md` under the `exports\data` folder.
   - Use the schema file to download the data from your solution and paste it in the data folder.
### Solution project
>    * [Adding new solution to repo][DataProject]
>
>        * [Set up a data project][DataProject]
> 
>        * [**Solution project**][SolutionProject]

If you want to add a new solution with the name `<SolutionName>` available in your Dynamics 365 environment, follow these steps:
1. Add a new project of type `Class Library (.NET Framework)` with the name `<fullName>` under the relevant `<module>` folder (package). Note that the default project path is *incorrect*. Make sure the project is created under the `<module>` folder.
2. Project Cleanup (Back to VS Code):
   - Remove the folder `Properties`.
   - Delete `Class1.cs`.
3. Copy the [csproj](https://dev.azure.com/dynamicscrm/Solutions/_git/CRM.BAS.FSI/commit/8d0eeaee713e672782e8accdc7b5416e17eb79b7?refName=refs/heads/releases/release.1.0.1&path=/Modules/BaseSolution/FSIBaseSolution/FSIBaseSolution.csproj) content from the `template project` to the newly created `csproj` file and update the ModuleName attribute with `<module>`.
4. Go to `build\include` and add a `"<fullName>."` entry to the `xrmcopyexcludes.txt` file (note the period at the end).
5. Go to the `exports\solutions` folder and open the `SolutionMappings.json` file.
   - This file describes the different projects and the corresponding solutions. `ProjectName` is the name of the solution in the repo. `SolutionName` is the display name of the solution  (in the Dynamics 365 environment) you want to add to the repo.
   - Add the new solution in `SolutionMappings.json` by following the pattern in the file. For information about the initial export, refer to [this][ExportSolution] section.

## Signing and registering a plug-in
>
>    * [Repo code setup][Repocodesetup]
>
>    * [Getting started][Gettingstarted]
>
>    * [Adding new package to repo][ModuleFolder]
>
>    * [Adding new solution to repo][DataProject]
>
>        * [Set up a data project][DataProject]
> 
>        * [Solution project][SolutionProject]
>
>    * [**Signing and registering a plug-in**][PluginRegister]
> 
>    * [Setup by project type][Projects]

Plug-ins must be signed before the deployment stage. Otherwise, the deployment will fail. Follow the steps down below to sign the plug-in:

1. To sign the plugins, you need to create a key pair using the [Strong Name tool](https://learn.microsoft.com/en-us/dotnet/framework/tools/sn-exe-strong-name-tool). 
2. Start the tool using Visual Studio Developer Command Prompt, go to `build\config` folder, and follow the steps in this [documentation](https://learn.microsoft.com/en-us/dotnet/standard/assembly/create-public-private-key-pair#create-a-key-pair) to create a key pair, **call it *"key.snk"***.
3. Extract the public key from the key pair and copy it to a separate file as declared in the documentation in step 2, you'll need the *public.snk* file to extract the public key token.
4. Run `sn -tp public.snk` on Visual Studio Developer Command Prompt and save the extracted public key token.
5. Follow the steps [here](https://learn.microsoft.com/en-us/dotnet/standard/assembly/sign-strong-name?source=recommendations#create-and-sign-an-assembly-with-a-strong-name-by-using-visual-studio) to sign the assemblies (.Plugins.csproj files found under the Modules directory) using Visual Studio. The strong name key file path should point to your key pair file, i.e., `$(MSBuildThisFileDirectory)\build\config\key.snk`.
6. Using Visual Studio Code, search for *"PublicKeyToken=null"*, and replace all results with the public key token extracted previously in step 4, *i.e, PublicKeyToken=<extracted_public_key_token>*.

For plug-ins registration, you can follow the steps in this [documentation](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/tutorial-write-plug-in#register-plug-in).


## Setup by project type
>    * [Repo code setup][Repocodesetup]
>
>    * [Getting started][Gettingstarted]
>
>    * [Adding new package to repo][ModuleFolder]
>
>    * [Adding new solution to repo][DataProject]
>
>    * [Signing and registering a plug-in][PluginRegister]
> 
>    * [**Setup by project type**][Projects]
>
>       * [PCF projects][PCFProjects]
> 
>       * [Plugin projects][PluginProjects]
> 
>       * [WebResource projects][WebResourceProjects]
> 
>       * [Net unit test project][UnitTestProjects]
### PCF projects
>    * [Setup by project type][Projects]
>
>       * [**PCF projects**][PCFProjects]
> 
>       * [Plugin projects][PluginProjects]
> 
>       * [WebResource projects][WebResourceProjects]
> 
>       * [Net unit test project][UnitTestProjects]

Because Power Apps component framework (PCF) projects are special Javascript projects, they have a different build cycle. To create PCF projects, follow these instructions:
1. Go to the `internal\src` folder`
2. Create a new folder for your combined PCF solution. This solution can host one or more PCFs, and it is important not to create many PCFs solutions, as this can decrease performance and requires a lot of maintenance on dependency management . Follow the naming convention `<ModuleName>.PCF` for the folder.
4. Create an `src` folder and a `solutions` folder inside the folder you created in the previous step.
5. In the `solutions` folder, create a folder with the solution's name considering the naming conventions specified [in the naming and solutions note below][NoteaboutNamingandSolutions].
6. In the folder created in the previous step, create the PCF solution. For more information on creating the solution, see [this](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/implementing-controls-using-typescript) page.
7. In the `src` folder, create a folder with the name of the PCF you are creating.
8. In the folder created in the previous step, create the PCF component. For more information on creating the component, see [this](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/implementing-controls-using-typescript) page.

**Note about Naming and Solutions:**
You must follow the recommended folder structure for the PCF, as any deviations might cause compile-time or run-time failures. As far as the naming and structure are concerned, we recommend that you have a single PCF folder for an industry vertical, such as FSI.PCF or HealthCare.PCF. This approach might cause complexity when working on common solutions or on several offering in similar verticals. Therefore, you must follow the guidelines for creating the folder structure.
In most cases, you need to create a new PCF under the `<PCF folder>\src` and add it to an existing PCF solution.

**Post Building:**
After successfully building the PCF solution, you'll need to deploy it to an environment and create a solution project, as mentioned in step 4 of the [Setup guide][SolutionProject]. The solution is packed with the rest of your customizations and contains the PCFs.

### Plugin projects
>    * [Setup by project type][Projects]
>
>       * [PCF projects][PCFProjects]
> 
>       * [**Plugin projects**][PluginProjects]
> 
>       * [WebResource projects][WebResourceProjects]
> 
>       * [Net unit test project][UnitTestProjects]

As part of creating and working with plug-ins, you need to create a class library project, similar to a solution project, and update the `csproj` to mimic the template.

### WebResource projects

>    * [Setup by project type][Projects]
>
>       * [PCF projects][PCFProjects]
> 
>       * [Plugin projects][PluginProjects]
> 
>       * [**WebResource projects**][WebResourceProjects]
> 
>       * [Net unit test project][UnitTestProjects]

Javascript or typescript web resources are built in the `frontend/web-resources/WebResources` folder. To work with web resources, follow these steps:

1. Create the Javascript web resource in the required solution. The name must have the `.js` extension.
2. [Export](#export-solution-or-data) the solution for the metadata.
3. Create the same folder structure for the solution under `frontend/web-resources/WebResources` folder and add a `ts` or `js` file with the same name in the newly created folder.
4. In the solution folder, add `packageMap.xml` if one doesn't already exist.
   Add the following rows to the `packageMap.xml`:
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <Mapping>
      <FileToPath map="WebResources\**\*.js" to="..\..\..\target\WebResources\<Parent folder>\<current folder>\**" />
      <FileToPath map="WebResources\*.js" to="..\..\..\target\WebResources\<Parent folder>\<current folder>\**" />
   </Mapping>
   ```
   **Note:** The `<xml>` and `<Mapping>` tags are only required if this is a new file. If the file already exists, just add the `<FileToPath>` tags in the right location.
5. In the solution `.csproj` file, add `<SolutionMapFile>packageMap.xml</SolutionMapFile>` to `PropertyGroup`.
6. Run the `InstallTool only_webresource` or install and run the web resource package (`npm i && npm run build` in the `frontend/web-resources/WebResources` folder).

### Net unit test projects
>    * [Setup by project type][Projects]
>
>       * [PCF projects][PCFProjects]
> 
>       * [Plugin projects][PluginProjects]
> 
>       * [WebResource projects][WebResourceProjects]
> 
>       * [**Net unit test project**][UnitTestProjects]

Unit test projects can be added to test plugins and run in the pipeline
to create a unit test project create a folder under `Modules/tests` and add a `.csproj` file with the following template:

```xml 
<Project Sdk="Microsoft.NET.Sdk">
	<PropertyGroup>
		<TargetFramework>net42</TargetFramework>		
		<RootNamespace>{{unit test project name}}</RootNamespace>
		<AssemblyName>{{unit test project name}}</AssemblyName>
      <DynamicsProjectType>Testing</DynamicsProjectType>
	</PropertyGroup>
	  <ProjectReference Include="{{unit test target project}}" />
	</ItemGroup>
</Project>
```

Note that the `FakeXrmEasy` is taken locally since it is an edited version of the `fakeXrmEasy` package.

# Deploy

[Introduction][Introduction] | [Overview][Overview] | [Prerequisites installations][Prerequisitesinstallations] | [Repo code setup][Repocodesetup] | [**Deploy**][Deploying] | [Tools][UsedTools]

## Prerequisites

1. Download the [NuGet package](https://www.nuget.org/packages/Microsoft.CrmSdk.XrmTooling.PackageDeployment.Wpf/9.1.0.84#release-body-tab) and install it using NuGet, you can follow the instructions outlined in the [official documentation](https://learn.microsoft.com/en-us/nuget/consume-packages/install-use-packages-nuget-cli) for installation.
2. Open a PowerShell terminal and go to `[ExtractedLocation]\tools`.
3. Run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` to bypass MS policies.
4. Run the install file: `.\RegisterXRMPackageDeployment.ps1`.
5. Before deploying the model, make sure to change the maximum file size limit on the Power Platform environment where you want to deploy the model. Follow the instructions in [this documentation](https://learn.microsoft.com/power-apps/developer/data-platform/file-attributes?tabs=sdk).
6. If you wish to have your Power Platform environment localized, you can import the compressed file supporting your preferred language from `$RepoRoot\Modules\UnifiedCustomerProfile\Localization` into your environment. 
7. Consider tracking the right order through the deployment process, the following table illustrates the dependencies between the packages in this repository, dependencies must be deployed first:

| Solution                                             | Solution Dependencies                          |
| ---------------------------------------------------- | ---------------------------------------------- |
| Banking data model                                   | -                                              |
| Document intelligence data model                     | -                                              |
| Onboarding essentials                                | Document intelligence data model               |
| Unified customer profile for retail banking          | Banking data model                             |
| Unified client profile for wealth management         | Banking data model                             |
| Loan onboarding                                      | Onboarding essentials                          |
| Small business data model                            | -                                              |
| Property and Casualty data model                     | -                                              |




Currently, no automated import tool is available. However, to use the PowerShell tool to import package, you can follow the instructions outlined in the [official documentation](https://docs.microsoft.com/en-us/power-platform/admin/deploy-packages-using-package-deployer-windows-powershell#import), and to use the Package Deployer tool, you should consider [this version](https://www.nuget.org/packages/Microsoft.CrmSdk.XrmTooling.PackageDeployment.Wpf/9.1.0.84#release-body-tab) mentioned previously in **step 1** above, instead of the version attached in the documentation.

## The package deployer user interface
PackageDeployer is a deploy tool for the solutions. The build process compresses the packages into zip files that can be found in `drop\Debug\AnyCPU\PDPackages`. You can use the package deployer to deploy an entire package to your environment, eliminating the need to import solutions one-by-one followed by the data and publish customizations.
We've added a tool to help with the deployment. You can find the tool in `tools\PackageDeployHelper`. The folder contains a detailed readme file with troubleshooting steps that can help if you are using the package deployer without the helper tool.

## Localization

To enable multiple languages on your Power Platform environment, follow these steps:

1. **Select preferred language**: When creating your environment, choose the desired language to enable localization right from the start. Or you can [enable/disable available languages in the environment settings](https://learn.microsoft.com/en-us/power-platform/admin/enable-languages).

2. **Import localization files**:
   - Navigate to `./Localization/your-language-code/your-solution`.
   - Unzip the selected folder (This should yield **two files**: `[Content_Types].xml` and `crmTranslation.xml`).
   - Open `crmTranslation.xml` in an Excel app.
   - Select the first tab (information tab) and add your organization ID, which you can find [here](https://learn.microsoft.com/en-us/power-platform/admin/determine-org-id-name).
   - Save your changes and rezip `crmTranslation.xml` file with `[Content_Types].xml` as it was before.

3. **Import translations**: To import the translations into your environment, follow these [steps](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/import-translated-entity-field-text), which will help you configure and import localization files for your solution in your Power Platform environment.
# Tools

[Introduction][Introduction] | [Overview][Overview] | [Prerequisites installations][Prerequisitesinstallations] | [Repo code setup][Repocodesetup] | [Deploy][Deploying] | [**Tools**][UsedTools]
## Export solution or data

You can use `ExportTool.cmd` to export the solution and data or manually export them.
You can use the file to export either data or solutions (both managed and unmanaged) from an org to (root)\exports folder. As a prerequisite to export solutions, you must have downloaded the Power Apps CLI from https://aka.ms/PowerAppsCLI.
## Using ExportTool.cmd
The following parameters are required for export. You need to follow these steps:
1. ExportType: Specify `'Solution'` or `'Data'`. The rest of the parameters are based on the first one. For example, `.\ExportTool.cmd 'Solution'`.
2. Follow the specified instructions. When prompted, enter the project name as defined in `solutionmapping.json` or `filemapping.json` (for Solution and Data respectively):
   - (Optional Parameter; `'Solution'`) Version: The version number, or leave empty for latest.
   - (Optional Parameter; `'Solution'`) URL: The url for your environment, or leave empty to use the default URL from the logged in PAC profile.
   - (Optional Parameter; `'Data'`): The organization name, or leave empty to use the default organization name from the logged in PAC profile.
When the solution export is complete, the managed and unmanaged solution zip files are placed under `exports\solutions\<ProjectName>`.

## Install and build tool

You can use `InstallTool.cmd` to install and build the front-end modules.
### Using InstallTool.cmd 

To run the installation tool, run the `./InstallTool.cmd` command in PowerShell.
## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow [Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general). Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship. Any use of third-party trademarks or logos are subject to those third-party's policies.

[Enviroment]: #installations
[Introduction]: #introduction
[Overview]: #overview
[Prerequisitesinstallations]: #prerequisites-installations
[Repocodesetup]: #repo-code-setup
[Deploying]: #deploy
[UsedTools]: #tools
[Installations]: #installations
[NugetCredentials]: #nuget-credentials
[PluginRegister]: #signing-and-registering-a-plug-in
[DataProject]: #set-up-a-data-project
[Projects]: #pcf-projects
[WebResourceProjects]: #webresource-projects
[UnitTestProjects]: #net-unit-test-projects
[PluginProjects]: #plugin-projects
[PCFProjects]: #pcf-projects
[Gettingstarted]: #getting-started
[ModuleFolder]: #module-folder
[AnchorSolution]: #anchor-solution
[PackageProject]: #package-project
[SolutionProject]: #solution-project
[ExportSolution]:#export-solution-or-data
[NPM,PNPM,.NETandNode.js18.14.1]: #npm,-pnpm,-.netandnode.js18.14.1
[VisualStudio2022]: #visual-studio-2022
[VisualStudioCode]: #visual-studio-code
[Toolsandconfigurations]: #tools-and-configurations
[Tools]: #tools
[SDKinstallation]: #sdk-installation
[AddingNewPackagetoRepo]: #adding-new-package-to-repo
[Prerequisites]: #prerequisites
[NoteaboutNamingandSolutions]: #note-about-naming-and-solutions
[ThePackageDeployerUI]: #the-packagedeployer-ui
[Localization]: #localization