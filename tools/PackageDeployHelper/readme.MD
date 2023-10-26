To use the Package Deployer a user needs to copy dll and folders to the packageDeployer folder and clean it when done.
This script helps to ease the pain of working with it

# Getting Started

The script has 2 parameters:

1. PackagePath - The path to the package zip to upload. Full path may be required.
2. DeployerFolderPath - The path to the packageDeployer folder (where the PackageDeployer.exe resides)

## Example
```PowerShell
PS> .\RunPackageDeployerOnPackage.ps1 -PackagePath drop\Debug\AnyCPU\PDPackages\contoso-PackageDeployer-1.0.0.0.zip -DeployerFolderPath "C:\tools\d365 sdk tools\Tools\PackageDeployment"
```

## Troubleshooting
- Log file for deployer tool can be found under: %userprofile%\AppData\Roaming\Microsoft\Microsoft Package Deployer Tool
- To solve the error "Strong name validation failed", run this script from an elevated power-shell console:
  CRM.BAS.FSI\build\scripts\DisableStrongNameValidation.ps1
- Be sure to use the tool on zips from the **PDPackages** folder
