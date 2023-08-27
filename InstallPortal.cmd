@echo off

SET location=%CD%
echo %date%, %time%  "%location%"
IF NOT "%1" == "build_machine" goto :skipPNPMInstall

call curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm@6

:skipPNPMInstall
cd %location%\frontend\

call pnpm install-portal --frozen-lockfile
IF %errorlevel% gtr 0 (
    echo %date%, %time%  install portal failed! %errorlevel%
    EXIT 1
) ELSE (
    echo %date%, %time%  install portal command was successful
)

cd %location%\frontend\portals\loan-onboarding\

echo build loanOnboarding , %time%

call pnpm build
IF %errorlevel% gtr 0 (
    echo %date%, %time%  build loanOnboarding portal failed! %errorlevel%
    EXIT 1
) ELSE (
    echo %date%, %time%  build loanOnboarding portal command was successful
)

call pnpm bundleUpdate
IF %errorlevel% gtr 0 (
    echo %date%, %time%  bundleUpdate failed! %errorlevel%
    EXIT 1
) ELSE (
    echo %date%, %time%  bundleUpdate was successful
)

cd %location%
echo %date%, %time%  finished installing portal successfully
EXIT 0