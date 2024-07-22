@echo off
setlocal

REM Define log file
set LOGFILE=check_npm.log

REM Clear previous log file if it exists
if exist %LOGFILE% del %LOGFILE%

REM Check if npm is installed
echo Checking for npm...
npm -v
if %errorlevel% neq 0 (
    echo npm is not installed correctly. >> %LOGFILE%
    echo Please install npm to proceed. >> %LOGFILE%
    echo npm is not installed correctly. Please install npm to proceed.
    type %LOGFILE%
    pause
    exit /b 1
) else (
    echo npm is correctly installed.
    echo npm is correctly installed. >> %LOGFILE%
)

pause
endlocal
