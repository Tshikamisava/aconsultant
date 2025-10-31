# Quick Start Script for Email Backend

Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   📧 Email Backend Setup                       ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-Not (Test-Path "server\.env")) {
    Write-Host "⚠️  No .env file found in server directory" -ForegroundColor Yellow
    Write-Host "📝 Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item "server\.env.example" "server\.env"
    Write-Host "✅ Created server\.env file" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔑 IMPORTANT: You need to configure your Gmail App Password!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Follow these steps:" -ForegroundColor White
    Write-Host "1. Go to: https://myaccount.google.com/apppasswords" -ForegroundColor White
    Write-Host "2. Generate a new App Password for 'Mail'" -ForegroundColor White
    Write-Host "3. Copy the 16-character password" -ForegroundColor White
    Write-Host "4. Edit server\.env and paste it in EMAIL_APP_PASSWORD" -ForegroundColor White
    Write-Host "5. Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "📖 Full guide: EMAIL_BACKEND_SETUP.md" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit
}

# Check if dependencies are installed
if (-Not (Test-Path "server\node_modules")) {
    Write-Host "📦 Installing server dependencies..." -ForegroundColor Yellow
    Push-Location server
    npm install
    Pop-Location
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
    Write-Host ""
}

# Start the server
Write-Host "🚀 Starting email server..." -ForegroundColor Green
Write-Host "📍 Server will run on http://localhost:3001" -ForegroundColor Cyan
Write-Host "🌐 Frontend should connect to: http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

Push-Location server
npm start
Pop-Location
