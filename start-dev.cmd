@echo off
setlocal
cd /d "%~dp0"

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo Node.js/npm was not found. Install Node.js and reopen this window.
  pause
  exit /b 1
)

echo Starting iJourney frontend...
call npm.cmd run dev

if errorlevel 1 (
  echo.
  echo The frontend stopped because of the error shown above.
  pause
)
