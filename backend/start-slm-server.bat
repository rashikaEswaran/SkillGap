@echo off
REM Startup Script for CurriculumIQ SLM Server

echo ============================================================
echo   CurriculumIQ SLM Server - Startup
echo ============================================================
echo.

REM Check if virtual environment exists
if not exist "venv\" (
    echo [!] Virtual environment not found. Creating...
    python -m venv venv
    echo [+] Virtual environment created
    echo.
)

REM Activate virtual environment
echo [*] Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies if needed
if not exist "venv\Lib\site-packages\flask" (
    echo [!] Installing dependencies...
    pip install -r slm-agent\requirements.txt
    echo [+] Dependencies installed
    echo.
)

REM Start Flask server
echo [*] Starting SLM API Server...
echo [+] Server will run at: http://localhost:5000
echo.
echo ============================================================
echo   Press Ctrl+C to stop the server
echo ============================================================
echo.

python slm-server.py