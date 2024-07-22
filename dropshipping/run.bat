@echo off
setlocal

REM Path to scripts folder
set SCRIPTS_DIR=scripts

REM Execute the Node.js check script
call %SCRIPTS_DIR%\check_node.bat
if %errorlevel% neq 0 exit /b %errorlevel%

REM Wait for file operations to complete
timeout /t 2 /nobreak >nul

REM Execute the npm check script
call %SCRIPTS_DIR%\check_npm.bat
if %errorlevel% neq 0 exit /b %errorlevel%

REM Wait for file operations to complete
timeout /t 2 /nobreak >nul

REM Execute the install dependencies script
call %SCRIPTS_DIR%\install_dependencies.bat
if %errorlevel% neq 0 exit /b %errorlevel%

REM Wait for file operations to complete
timeout /t 2 /nobreak >nul

REM Execute the run application script
call %SCRIPTS_DIR%\run_application.bat
if %errorlevel% neq 0 exit /b %errorlevel%

endlocal
