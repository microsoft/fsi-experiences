# Introduction
This folder contains scripts that can be used by msbuild and devs to make the job of building and testing solutions easier.

# Getting Started
## DataExportTool.ps1
This script is used to export data from CRM for a specific organization. The tool takes two arguments:
* ModuleName - the module name in the filemappings.json
* OrganziationName - The name of the organization from which to export the data (the environment name in PowerApp)
This schema file must exist in $(root)\exports\data folder. The tool then reads in the mappings located at $(root)\exports\data\filemappings.json to determine what to name the zip folder that CRM exports to. Once you run the script, it will ask for the credentials to be used to connect to CRM.

in addition you should be aware of the filemappings.json:
* filemappings.json schema
The file contains a list of mappings between schema file name, module name, and the zipped folder name.
## SolutionExportTools.ps1
This script is used to export both managed and unmanaged solution from CRM for a specific organization. The tool uses powerapps cli. As a prerequisite, users must download this cli by visiting  https://aka.ms/PowerAppsCLI. THe script takes three arguments

* Url - The url from which to export the data. If not provided, the script will prompt the user to either choose from a list of previously created profiles or to create a new profile
* ProjectName - The name of the organization (environment) from which to export the data. If not provided, the script will prompt user
* Version - The version to append to the exported solution zip. This is optional and only determines the name of the zip file. The solution is not exported with this version because pac currently does not support exporting with a version
The tool reads in the mappings located at $(root)\exports\solutions\SolutionMappings.json to determine the unique name of the solution. 

in addition you should be aware of the SolutionMapping:
* SolutionMappings.json schema
The file contains a list of mappings between project names and the unique name of corresponding solution in powersapps.
