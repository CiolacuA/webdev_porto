@echo off
setlocal

REM Define log file
set LOGFILE=run_application.log

REM Clear previous log file if it exists
if exist %LOGFILE% del %LOGFILE%

REM Run the Node.js application
echo Running the Node.js application...
node index.js
if %errorlevel% neq 0 (
    echo The Node.js application encountered an error. >> %LOGFILE%
    echo Please check the log file for details. >> %LOGFILE%
    echo The Node.js application encountered an error. Please check the log file for details.
    type %LOGFILE%
    pause
    exit /b 1
) else (
    echo Node.js application is running.
    echo Node.js application is running. >> %LOGFILE%
)

echo Done. Application running!
echo Done. Application running! >> %LOGFILE%

pause
endlocal
