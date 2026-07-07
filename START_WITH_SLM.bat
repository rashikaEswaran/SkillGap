@echo off
REM Complete Startup Script for CurriculumIQ with SLM

echo ============================================================
echo   CurriculumIQ v2 - Full Startup (Frontend + SLM)
echo ============================================================
echo.

REM Start SLM Server in background
echo [*] Starting SLM Server...
start "SLM Server" cmd /k "cd backend && start-slm-server.bat"

REM Wait for SLM server to initialize
timeout /t 5 /nobreak >nul

REM Start Next.js Frontend
echo [*] Starting Next.js Frontend...
cd frontend
npm run dev

echo.
echo ============================================================
echo   Both servers started!
echo   - SLM API:    http://localhost:5000
echo   - Frontend:   http://localhost:3000
echo   - Live Demo:  http://localhost:3000/live-analysis
echo ============================================================