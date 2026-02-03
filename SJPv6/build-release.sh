#!/bin/bash

# 1. Run the Cordova Release Build (Signed APK)
echo "Starting Release Build..."
cordova build android --release -- --packageType=apk

# Check if build succeeded
if [ $? -eq 0 ]; then
    echo "✅ Build Successful!"
    
    # 2. Archive the APK with today's date
    TODAY=$(date +%Y-%m-%d)
    REPO_PATH="/media/sanjay/EXTRA/github/srijagannatha-panchanga/SJPv6"
    
    echo "📦 Archiving APK to $REPO_PATH/sjp$TODAY.apk..."
    cp platforms/android/app/build/outputs/apk/release/app-release.apk "$REPO_PATH/sjp$TODAY.apk"
    
    # 3. Backup Secrets
    BACKUP_DIR=~/github/documents/cordova
    echo "🔒 Backing up keys and config to $BACKUP_DIR..."
    mkdir -p "$BACKUP_DIR"
    cp sjp-release-key.jks build.json config.xml "$BACKUP_DIR/"
    
    echo "🎉 All Done!"
else
    echo "❌ Build Failed."
    exit 1
fi
