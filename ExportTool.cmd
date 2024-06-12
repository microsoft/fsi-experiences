@echo off
SET ExportType=%1
setlocal enabledelayedexpansion

if /I "%ExportType%"=="Solution" (
    SET PowerShellScriptPath=%~dp0%\build\scripts\SolutionExportTool.ps1
    SET ProjectName=%2
    SET Version=%3
    SET Url=%4
    IF NOT DEFINED ProjectName SET "ProjectName=''"
    IF NOT DEFINED Url SET "Url=''"
    IF NOT DEFINED Version SET "Version=''"
    PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& !PowerShellScriptPath! -Url !Url! -ProjectName !ProjectName! -Version !Version! ";
) else (
    if /I "%Exporttype%"=="Data" (
        SET PowerShellScriptPath=%~dp0%\build\scripts\DataExportTool.ps1
        SET ModuleName=%2
        SET OrganizationName=%3
        IF NOT DEFINED ModuleName SET "ModuleName=''"
        IF NOT DEFINED OrganizationName SET "OrganizationName=''"
        PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& !PowerShellScriptPath! -ModuleName  !ModuleName! -OrganizationName !OrganizationName! ";    
    ) else (
        echo Please specify type of export - either 'Data' or 'Solution'.
    )
)


