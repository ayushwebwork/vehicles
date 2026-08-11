@echo off

echo ==========================================
echo       ROHTAK FLEET DATA UPDATE
echo ==========================================

set PROJECT=D:\Ayush All data\rohtak vehicle\vehicles
set DOWNLOADS=C:\Users\Dinesh\Downloads

echo.
echo Moving latest fleet-data.js...

move /Y "%DOWNLOADS%\fleet-data.js" "%PROJECT%\fleet-data.js"

if errorlevel 1 (
    echo.
    echo ERROR: fleet-data.js was not found in Downloads.
    echo Please export fleet data first.
    pause
    exit /b 1
)

cd /d "%PROJECT%"

echo.
echo Adding fleet-data.js...

git add .

echo.
echo Committing...

git commit -m "Update fleet data"

echo.
echo Pushing to GitHub...

git push origin main

echo.
echo ==========================================
echo       FLEET DATA UPDATED SUCCESSFULLY
echo ==========================================

pause