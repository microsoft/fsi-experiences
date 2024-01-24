@echo off

SET location=%CD%
echo %date%, %time%  "%location%"
IF NOT "%1" == "build_machine" goto :skipPNPMInstall

call curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm@6

:skipPNPMInstall
:: ----------------Instaling frontend libs---------------
cd %location%\frontend\

call pnpm install-libs --frozen-lockfile

IF %errorlevel% gtr 0 (
    echo %date%, %time%  install libs failed! %errorlevel%
    EXIT 1
) ELSE (
    echo %date%, %time%  install libs command was successful
)

call pnpm build-libs

IF %errorlevel% gtr 0 (
    echo %date%, %time%  build libs failed! %errorlevel%
    EXIT 1
) ELSE (
    echo %date%, %time%  build libs command was successful
)

IF "%1" == "build_machine" goto :skipPCFNPM
::----------------Instaling the entire workspace---------------
cd %location%\frontend\
call pnpm i --frozen-lockfile

:skipPCFNPM
cd %location%
echo %date%, %time%  finished installing js successfully
EXIT 0