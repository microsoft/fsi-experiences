FSI - Unified Customer Profile
Introduction
Prerequisites Installations
Repo Code Setup
Deploy
Tools
Introduction
Introduction | Prerequisites Installations | Repo Code Setup | Deploy | Tools

This guide will walk you through the entire process of build and deploy. It introduces the list of essential prerequisites, a set of detailed code setup instructions, a deployment guidance into the Power Platform environment, and an overview of the tools at your disposal. Before you can start working, carefully follow the instructions outlined below, or simply use InstallTools.cmd in Tools.

Prerequisites Installations
Introduction | Prerequisites Installations | Repo Code Setup | Deploy | Tools

NPM, PNPM, .NET and Node.js 18.14.1
Visual Studio 2019
Visual Studio Code
Tools and Configurations
SDK Installation
NPM, PNPM, .NET and Node.js 18.14.1
To use the specified Node.js version (18.14.1), NVM should be used. 1. Install latest nvm for Windows. 2. Run: nvm install 18.14.1 and then: nvm use 18.14.1. 3. Install pnpm using Windows PowerShell with the command: npm install -g pnpm@8.6.2. 4. Install .NET for Windows.

Visual Studio 2019
Install Visual Studio 2019.
Add .NET (C:\Program Files\dotnet) to the System Path - (Using the GUI way: Start > Type "Environment Variables" > Select "Edit the system environment variables" > At the bottom click "Environment Variables" > Add to the System Path).
Visual Studio Code
Install Visual Studio Code.
Tools and Configurations
Install the PAC powerapps CLI.
Install the Microsoft Dynamics CRM SDK Templates. Despite documentation and a warning message while installing, this extension also work with VS2019.
Install the Package deployment module. Follow the instructions here.
Allow File Paths Longer Than 260 Characters - use this guide to change the registry to allow file path longer then 260 characters
Install git for Windows.
Allow git to use long file paths by running the following command: git config --global core.longpaths true.
SDK Installation
To install the CRM SDK tools, you can manually follow the steps down below, or simply run the CrmSdk Tools powershell script installer located in $RepoRoot> ./Crm.Sdk.Core.Installer.ps1 after cloning the repo.

Download the nuget for Windows.
Download the SDK Tools and you want it global.
Change the extension to "zip" and extract it.
Save it to your user's AppData folder, i.e. C:\Users\<alias>\AppData\Local\microsoft.crmsdk.coretools.9.1.0.64 (If the AppData folder is not visible, change the folder view settings to display hidden files).
Add it to the User Path - (Using the GUI way: Start > Type "Environment Variables" > Select "Edit the system environment variables" > At the bottom click "Environment Variables" > Add to the User Path).
Repo Code Setup
Introduction | Prerequisites Installations | Repo Code Setup | Deploy | Tools

Clone the repository.
Run the pnpm install in \frontend directory to install all dependent node libraries.
Run the pnpm build-libs in \frontend directory to build all dependent node libraries.
Open Modules\FSI.sln in VS2019, and build the solution. The build might fail, but that's ok. This stage serves both as a verification stage as well as a setup of NuGet packages.
Open a PowerShell terminal, go to \Modules and run the dotnet build. The build should complete without any errors.
Getting Started
Getting started

Adding New Package to Repo

Adding New Solution to Repo

Export Solution or Data

Registering a Plug-in

Setup by Project Type

It is important to follow the setup steps below, as without them build process won't work properly and you can spend quite a lot of time debugging issues.

Follow this section when adding a new Solution to the code. If the solution already exists, skip to the Export Solution or Data section.

Naming Conventions
There are two name convention in the setup that will be shorten for readability.

module - The module name is the package you are working on.
fullName - the concatenation of the group and solution like so: <GroupName><solutionName>, the group name is the name of the group you are working in.
e.g. GroupName: FSI, solutionName: BankingDataModel => FSIBankingDataModel.
Repo Structure
modules
module1
anchor solution for module 1
package project for module 1
solution 1
solution 2
...
module2
anchor solution for module 2
package project for module 2
solution 1
solution 2
Adding New Package to Repo
Getting Started

Adding New Package to Repo

Module Folder

Anchor Solution

Package Project

Adding New Solution to Repo

Registering a Plug-in

Setup by Project Type

Module Folder
Adding New Package to Repo

Module Folder

Anchor Solution

Package Project

Create a new folder under modules, with the name <module>.
Open the solution (fsinew\Modules\FSI.sln) in VS and create a new solution folder with the name <module>.
Anchor Solution
Adding New Package to Repo

Module Folder

Anchor Solution

Package Project

The anchor solution is the indicator that all the solutions in a package were deployed at the client.

Add a new project of type Class Library (.NET Framework) with the name <fullname>Anchor (where in this case solutionName is module so fullname is <Groupname><module> => <Groupname><module>Anchor) under the <module> folder (Notice: the default project path is incorrect, make sure the project is created under the <module> folder).
Project Cleanup (Back to VS Code):

Remove the folder Properties.
Delete Class1.cs.
Copy the [FSIBaseSolution.csproj] content from the <projectDirectory>/templates to the newly created csproj file and update the ModuleName attribute with <module>

Go to build\include and add a "<fullname>Anchor." entry to the xrmcopyexcludes.txt file (notice the period at the end).
Create an Anchor Solution (if one does not exists) - Create an empty solution in your D365 environment, with the following naming convention: <module>Anchor.
Go to the exports\solutions folder and open the SolutionMappings.json file.

This file describes the different projects have and the corresponding solutions' name. ProjectName is the name of the solution in the repo. SolutionName is the display name of the solution in the D365 environment, you wish to add to the repo.
Add entry in SolutionMappings.json file - Follow the pattern in the file.
Package Project
Adding New Package to Repo

Module Folder

Anchor Solution

Package Project

The package project is what gathers all the other projects (solution, plugin, PCF) to one package, to be shipped to the client, as well as deploy locally for testing. To setup your package project follow these steps:

Go to VS and add a new CRM package project under the module created above. Use the "Microsoft Dynamics CRM SDK Templates" to get this package type. Naming convention is <module>.Package. (AGAIN: Remember to make sure the project is created under the module directory). If you don't have the CRM package project you can copy from the sample project.
Copy the content of the [importConfig.xml] file content from <projectDirectory>/templates and update importConfig.xml of the newly create package file (\Modules\<module>\<module>.Package\PkgFolder\ImportConfig.xml). Update the configsolutionfile attributes accordingly.
Rename the pkgFolder to <module>.
In the PackageTemplate.cs override the return value of GetImportPackageDataFolderName with <module>.
Copy the [BaseSolution.Package.csproj] file content from the <projectDirectory>/templates to <module>.Package\<module>.Package.csproj

In csproj - find and replace all references to FSIBaseSolution with the FSI<module>.
Update the ModuleName attribute with current <module>.
Delete to properties folder and packages.config file.
Under \Modules\<module>\<module>.Package\<module> create a ConfigData folder and copy into it the placeholder file [readme.md] from the <projectDirectory>/templates (This folder will be used to store data.xml files that will be unpacked there.)

Copy the [PackageExtra] folder from <projectDirectory>/templates project and paste under the project (<module>.Package)
Adding New Solution to Repo
Repo Code Setup

Getting Started

Adding New Package to Repo

Adding New Solution to Repo

Setup a Data Project

Solution Project

Registering a Plug-in

Setup by Project Type

Setup a Data Project
Adding New Solution to Repo

Setup a Data Project

Solution Project

Go to the exports\data folder.

Create a schema XML file and add it to the schema folder.

The Schema file is created using the configuration migration tool. More details can be found in the readme.MD under the exports\data folder.
Use the schema file to download the data from your solution and paste it in the data folder.
Solution Project
Adding New Solution to Repo

Setup a Data Project

Solution Project

Assuming we want to add a new solution with the name <SolutionName> which exists in your D365 environment:

Add a new project of type Class Library (.NET Framework) with the name <fullName> under the relevant <module> folder (package). (Notice: the default project path is incorrect, make sure the project is created under the <module> folder).
Project Cleanup (Back to VS Code):
Remove the folder Properties.
Delete Class1.cs.
Copy the csproj content rom the template project to the newly created csproj file and update the ModuleName attribute with <module>.
Go to build\include and add a "<fullName>." entry to the xrmcopyexcludes.txt file (notice the period at the end).

Go to the exports\solutions folder and open the SolutionMappings.json file.

This file describes the different projects have and the corresponding solutions' name. ProjectName is the name of the solution in the repo. SolutionName is the display name of the solution in the D365 environment, you wish to add to the repo.
Add new entry in SolutionMappings.json file - Follow the pattern in the file.For first export please refer to this section.
Registering a Plug-in
Repo Code Setup

Getting Started

Adding New Package to Repo

Adding New Solution to Repo

Setup a Data Project

Solution Project

Registering a Plug-in

Setup by Project Type

The plugin must be signed and registered before the deployment stage, otherwise, the deployment will fail. Follow the instructions in the official documentation to sign and register a plug-in.

Setup by Project Type
Repo Code Setup

Getting Started

Adding New Package to Repo

Adding New Solution to Repo

Registering a Plug-in

Setup by Project Type

PCF Projects

Plugin Projects

WebResource Projects

Net Unit Test Project

PCF Projects
Setup by Project Type

PCF Projects

Plugin Projects

WebResource Projects

Net Unit Test Project

Since PCF are special JS projects, they have different build cycle. in order to create them follow these instructions:

Go to the internal\src folder`
Create a new folder for your combined PCF solution. this solution can host one ore more PCFs and it is important not to create too much PCFs solutions.
The name convention for the folder is <ModuleName>.PCF.
create a src and a solutions folder inside folder created at step 2.
In the solutions folder create a folder with the solution's name (note about the naming and solutions after this guide).
In this folder you can create the PCF solution (use the guide here).
In the src folder create a folder the name of the PCF you are creating.
In this folder create the PCF component (use the guide here).
Note about Naming and Solutions: The PCF structure is complex from its nature and very strict. deviating from this structure might cause fails in compile or run. as for the naming and structure: the basic idea is to have a single PCF folder for vertical (for example: FSI.PCF, HealtCare.PCF), however, this approach might cause complexity when working on common solutions or on several offering in similar verticals. this is why i explain here the full guide of creating all the folder structure. In most cases, all you'll need to do is to create new PCF under the <PCF floder>\src and add it to an existing PCF solution.

Post Building: After successfully building the PCF solution you'll need to deploy it to an environment and create a solution project (as mentioned in the Setup guide in step #4). this solution will be packed with the rest of your customizations and will contain the PCFs.

Plugin Projects
Setup by Project Type

PCF Projects

Plugin Projects

WebResource Projects

Net Unit Test Project

Actually, creating and working with plugins is easier then the rest. it's just creating a class library project (like you do in a solution project) and update the csproj to mimic the template.

WebResource Projects
Setup by Project Type

PCF Projects

Plugin Projects

WebResource Projects

Net Unit Test Project

Javascript or Typescript WebResources are built in the frontend/web-resources/WebResources folder. In order to work with WebResources follow these steps:

First create the js webResource in the solution you need it. The name must have the .js extension.
Export it for the metadata.
Create the same folder structure for the solution under frontend/web-resources/WebResources folder and add a ts/js file with the same name in the newly created folder.
In the solution folder add packageMap.xml file if one doesn't exists already.
Add the following rows to the packageMap.xml:
<?xml version="1.0" encoding="utf-8"?>
<Mapping>
  <FileToPath map="WebResources\**\*.js" to="..\..\..\target\WebResources\<Parent folder>\<current folder>\**" />
  <FileToPath map="WebResources\*.js" to="..\..\..\target\WebResources\<Parent folder>\<current folder>\**" />
</Mapping>
Note: The <xml> and <Mapping> tags are only needed if this is a new file. If the file already exists just add the <FileToPath> tags in the right location.
In the solution .csproj file add <SolutionMapFile>packageMap.xml</SolutionMapFile> to the PropertyGroup.
Now run the InstallTool only_webresource or install and run the WebResources package (npm i && npm run build in the frontend/web-resources/WebResources folder).

Net Unit Test Projects
Setup by Project Type

PCF Projects

Plugin Projects

WebResource Projects

Net Unit Test Project

Unit test projects can be added to test plugins and run in the pipeline to create a unit test project create a folder under Modules/tests and add a .csproj file with the following template:

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
Note that the FakeXrmEasy is taking locally since it is an edited version of the fakeXrmEasy package.

Deploy
Introduction | Prerequisites Installations | Repo Code Setup | Deploy | Tools

Prerequisites

The PackageDeployer UI

Localization

Prerequisites
Download the NuGet package the documentation is suggesting. download it an open it as a zip file.
Open a PowerShell terminal and go to [ExtractedLocation]\tools.
Now, run Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass to bypass MS policies.
Run the install - .\RegisterXRMPackageDeployment.ps1.
Before deploying the model, make sure to change the maximum file size limit on the Power Platform environment where you wish to deploy the model. Follow the instructions in this documentation.
If you wish to have your Power Platform environment localized, you can follow the steps outlined in the section of Localization.
Deploy Banking data model from Microsoft Solution center, available in the Financial Services
Select the Banking data model and then click the "Deploy" button.
Choose any additional components you require.
Select your Power Platform environment.
At the time of writing this, there is still no automate import tool available. However, to use the PowerShell tool to import package there are some prerequisites that aren't fully explained in the official documentation.

The PackageDeployer UI
The packageDeployer is a deploy tool for the Solutions. The build process pack the packages into zip files that can be found in drop\Debug\AnyCPU\PDPackages. you can use the package deployer to deploy an entire package to your environment, eliminating the need to import solution one by one and then the data and publish customizations.

On top of that we added a tool to help with the deploy. the tool is found in tools\PackageDeployHelper. There is a detailed readme file in the folder as well as troubleshooting steps that can help also if you are using the package deployer without the helper tool.

Localization
To enable multiple languages on your Power Platform environment, follow these steps:

Select Preferred Language: When creating your environment, choose the desired language to enable localization right from the start. Or you can enable/disable available languages in the environment settings.

Import Localization Files:

Navigate to ./Localization/your-language-code/your-solution.
Unzip the selected folder (This should yield two files: [Content_Types].xml and crmTranslation.xml).
Open crmTranslation.xml in an Excel app.
Select the first tab (information tab) and add your organization ID, which you can find here.
Save your changes and rezip crmTranslation.xml file with [Content_Types].xml as it was before.
Import Translations: To import the translations into your environment, follow these steps, which will help you configure and import localization files for your solution in your Power Platform environment.

Tools
Introduction | Prerequisites Installations | Repo Code Setup | Deploy | Tools

Export Solution or Data
You can use the ExportTool.cmd to export the solution and data (or manually export them).

This can be used to export either data or solutions (both managed and unmanaged) from an org to (root)\exports folder. As a prerequisite to export solutions, powerapps cli must be downloaded from https://aka.ms/PowerAppsCLI.

Using ExportTool.cmd
The following parameters are needed in order to do so:

ExportType - write 'Solution' or 'Data', the rest of the parameters are based on the first one. e.g. .\ExportTool.cmd 'Solution'.
Follow the instructions, when prompted enter the projectName name as defined in solutionmapping.json or filemapping.json (for Solution and Data respectivly):
(Optional Parameter; 'Solution') Version - the version number, or leave empty for latest.
(Optional Parameter; 'Solution') URL - the url for your environment, or leave empty to use the default URL from the logged in PAC profile.
(Optional Parameter; 'Data') OrganizationName, or leave empty to use the default OrganizationName from the logged in PAC profile.
When Solution export is done, a managed and unmanaged solution zip files will be placed under exports\solutions\<ProjectName>

Change managed properties and convert displated texts to sentence case - in solutions
When running dotnet build -p:EnableExportMerge=True per solution (ran from the solution's folder) or on all solutions (ran from the modules folder) the script 'UpdateManagedProperties.ps1' is ran and performs the following changes on the solutions' zip files: 1. Change selected managed properties of entities and attributes to 0 or 1, based on configuration defined in the script. 2. Use an allow list of entities for which selected entity managed properties are be set to 1. 3. Enable analytics on selected solutions (allows tricking of data from the entity's data into the managed data lake for further usage). 4. Run a check on displayable content (entities display name, attribute display names, optionsets, forms) and changes the texts to sentence case (exceptions: when word starts with two upper case character, leave it be (proabaly acronym), or when word contains /, in which case use title case). 5. Create a csv file 'SentenceCaseConfig.csv' with all analyzed text, where an author can change the 2nd column text, creating exceptions to override the sentence case change algorithm. As the export is ran after adding more entities\attributes... to solutions, the csv file will contain all additional texts, allowing an author review the additional content by comparing the two versions of the csv file.

In order to have all solutions in the export folder, so they are available for export and can by analyzed by the UpdateManagedProperties script do the following: 1. run dotnet build to update all solutions in the 'drop' folder. 2. run Drop2Export.ps1 script (in the root folder) to copy all solutions from the 'drop' folder into their respecitve folders in the 'export' folder (using the mapping defined in 'SolutionMappings.Json' in the 'export' folder). 3. run 'dotnet build -p:EnableExportMerge=True' from the modules folder.

Install and Build Tool
You can use InstallTool.cmd to install and build front-end modules.

Using InstallTool.cmd
To run the installation tool, simply execute the ./InstallTool.cmd command in PowerShell.

Trademarks
This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow Microsoft's Trademark & Brand Guidelines. Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship. Any use of third-party trademarks or logos are subject to those third-party's policies.