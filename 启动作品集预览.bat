@echo off
chcp 65001 >nul
title 茶搭子作品集预览
cd /d "%~dp0"
echo 正在启动茶搭子作品集网页，请稍候……
if not exist node_modules (
  echo 首次启动，正在安装网页所需组件……
  npm install --cache .npm-cache --logs-dir .npm-logs
  if errorlevel 1 (
    echo 安装失败，请确认网络连接后重试。
    pause
    exit /b 1
  )
)
npm run dev -- --open
pause
