@echo off
:: Mengubah judul jendela CMD
title Git Force Pull Script

:: Konfigurasi nama remote dan branch (sesuaikan jika bukan 'main')
set REMOTE_NAME=origin
set BRANCH_NAME=main

echo ====================================================
echo  Mencari update terbaru dari GitHub...
echo ====================================================
git fetch %REMOTE_NAME%
if %errorlevel% neq 0 (
    echo [ERROR] Gagal melakukan git fetch. Periksa koneksi internet atau hak akses.
    pause
    exit /b
)

echo.
echo ====================================================
echo  PERINGATAN: Semua perubahan lokal yang belum di-commit
echo  akan di-wipe/dihapus secara permanen!
echo ====================================================
choice /M "Apakah kamu yakin ingin force pull"
if %errorlevel% neq 1 (
    echo Operasi dibatalkan.
    pause
    exit /b
)

echo.
echo [1/2] Melakukan Hard Reset ke %REMOTE_NAME%/%BRANCH_NAME%...
git reset --hard %REMOTE_NAME%/%BRANCH_NAME%

echo.
echo [2/2] Membersihkan file/folder tak terlacak (untracked files)...
git clean -df

echo.
echo ====================================================
echo  BERHASIL! Repositori lokal sudah sinkron dengan GitHub.
echo ====================================================
pause