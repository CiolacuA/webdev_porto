@echo off
setlocal

REM Define log file
set LOGFILE=install_dependencies.log

REM Clear previous log file if it exists
if exist %LOGFILE% del %LOGFILE%

REM Install dependencies
echo Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo Failed to install dependencies. >> %LOGFILE%
    echo Please check the log file for details. >> %LOGFILE%
    echo Failed to install dependencies. Please check the log file for details.
    type %LOGFILE%
    pause
    exit /b 1
) else (
    echo Dependencies installed successfully.
    echo Dependencies installed successfully. >> %LOGFILE%
)

pause
endlocal
