echo Refreshing binaries from artifacts.ipv6admin.com
echo =========================================
echo Step: Removing old binaries
pwd
[ ! -d assets ] && \
  rm -rvf artifacts.tar.gz
  rm -rvf libs_legacy_osx.zip
  mkdir -p assets
cd assets
[ -d artifacts.ipv6admin.com ] && \
  echo Removing old artifacts. && \
  rm -rvf artifacts.ipv6admin.com
echo
echo Step: Cloning latest binaries for build
#wget --recursive --no-parent https://artifacts.ipv6admin.com/latest/
#v0.29.2
wget https://github.com/Fair-Exchange/safewallet/releases/download/data/artifacts.tar.gz
tar zxf artifacts.tar.gz
echo
rm -rvf artifacts.tar.gz
rm -rvf bin
echo
cd ..
echo =========================================
echo
pwd
echo =========================================
echo Step: Permission +x for OSX binaries from artifacts to assets/bin/osx/
echo
rm assets/artifacts.ipv6admin.com/latest/osx/iguana
chmod +x assets/artifacts.ipv6admin.com/latest/osx/safecoin*

mkdir assets/bin
mv assets/artifacts.ipv6admin.com/latest/osx assets/bin/osx

echo Moving legacy libs to assets/bin
wget https://github.com/Fair-Exchange/safewallet/releases/download/data/libs_legacy_osx.zip
checksum=`shasum -a 256 libs_legacy_osx.zip | awk '{ print $1 }'`
if [ "$checksum" = "8203d51e5a22f33ec8604a1980c1d672b701fbf4309a0b486afc302f259f7191" ]; then
    echo "Checksum is correct."
    unzip libs_legacy_osx.zip
    cp -rvf libs_legacy_osx/* assets/bin/osx/.
  else
    echo "Checksum is incorrect!"
    exit 0
fi
echo =========================================
echo Step: Finished Updating binaries from artifacts
echo
echo Step: Removing temp-dir binaries
rm -rvf assets/bin/win64
rm -rvf assets/bin/linux64
rm -rvf assets/artifacts.ipv6admin.com
rm -rvf libs_legacy_osx.zip
rm -rvf libs_legacy_osx
rm -rvf __MACOSX
echo Step: Finished