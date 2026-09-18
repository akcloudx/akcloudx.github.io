@echo off
REM Starts the local dev server and opens the portfolio in your browser.
cd /d "%~dp0"
start "" http://localhost:5173
python serve.py 5173
