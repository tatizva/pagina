@echo off
REM Script para instalar dependencias del backend de Fegurd Spa
REM Requiere Node.js instalado y npm en PATH

cd /d "%~dp0"

echo.
echo ===================================================
echo   INSTALANDO DEPENDENCIAS - FEGURD SPA BACKEND
echo ===================================================
echo.

REM Verificar si npm está disponible
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm no se encontró en el PATH
    echo.
    echo Por favor instala Node.js desde: https://nodejs.org
    echo Asegúrate de que npm esté en el PATH
    echo.
    pause
    exit /b 1
)

echo [1/3] Verificando versión de npm...
npm --version

echo.
echo [2/3] Instalando paquetes...
npm install

if %ERRORLEVEL% NEQ 0 (
    echo ERROR durante la instalación de dependencias
    pause
    exit /b 1
)

echo.
echo [3/3] Instalación completada exitosamente
echo.
echo ===================================================
echo Próximos pasos:
echo 1. Configura las credenciales de Twilio en .env
echo    - TWILIO_ACCOUNT_SID
echo    - TWILIO_AUTH_TOKEN
echo    - TWILIO_WHATSAPP_NUMBER
echo.
echo 2. Instala MongoDB (https://www.mongodb.com/try/download/community)
echo    o usa MongoDB Atlas (cloud)
echo.
echo 3. Ejecuta el servidor con: npm run dev
echo ===================================================
echo.
pause
