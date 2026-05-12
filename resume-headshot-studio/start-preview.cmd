@echo off
setlocal

set "ROOT=%~dp0"
set "NODE_FALLBACK=E:\腾讯电脑管家软件搬家\node.exe"

echo Preview server starting at http://127.0.0.1:4173/
echo Project root: %ROOT%
echo Press Ctrl+C to stop.

if exist "%NODE_FALLBACK%" (
  "%NODE_FALLBACK%" "%ROOT%preview-server.js" "%ROOT%" 4173
) else (
  node "%ROOT%preview-server.js" "%ROOT%" 4173
)

endlocal
