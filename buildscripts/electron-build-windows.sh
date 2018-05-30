#!/bin/bash
### Build script for Iguana application for Windows x64 platform.
### Created by mmaxian, 3/2017

[ -z $SAFEWALLET_VERSION ] && echo "SAFEWALLET_VERSION variable is not set." && exit 0
[ ! -d build ] && mkdir build

echo
echo "Build script for Iguana application for Windows x64 platform."
echo "Preparing electron package $SAFEWALLET_VERSION"

electron-packager . --platform=win32 \
  --arch=ia32 \
  --icon=assets/icons/safewallet_app_icon.ico \
  --out=build/ \
  --buildVersion=$SAFEWALLET_VERSION \
  --ignore=assets/bin/osx \
  --ignore=assets/bin/linux64 \
  --ignore=react/node_modules \
  --ignore=react/src \
  --ignore=react/www \
  --overwrite \
  --version-string.CompanyName="SafeCoin" \
  --version-string.FileDescription="Safewallet" \
  --version-string.OriginalFilename="Safewallet" \
  --version-string.ProductName="Safewallet" \
  --version-string.InternalName="Safewallet" \
  --app-copyright="Copyright (C) 2017 SuperNET. All rights reserved."
