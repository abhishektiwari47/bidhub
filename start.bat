@echo off

cd apps\client
start npm run dev

cd ..\server
start node dist\index.js