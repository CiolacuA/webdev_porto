@echo off
setlocal

REM Define log file
set LOGFILE=check_node.log

REM Clear previous log file if it exists
if exist %LOGFILE% del %LOGFILE%

REM Check if Node.js is installed
echo Checking for Node.js...
node -v
if %errorlevel% neq 0 (
    echo Node.js is not installed correctly. >> %LOGFILE%
    echo Please install Node.js to proceed. >> %LOGFILE%
    echo Please install Node.js to proceed.
    type %LOGFILE%
    pause
    exit /b 1
) else (
    echo Node.js is correctly installed.
    echo Node.js is correctly installed. >> %LOGFILE%
)

pause
endlocal
