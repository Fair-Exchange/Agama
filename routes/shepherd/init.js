const fs = require('fs-extra');
const path = require('path');
let _foldersInitRan = false;

module.exports = (shepherd) => {
  shepherd.readVersionFile = () => {
    // read app version
    const rootLocation = path.join(__dirname, '../../');
    const localVersionFile = fs.readFileSync(`${rootLocation}version`, 'utf8');

    return localVersionFile;
  }

  shepherd.createSafewalletDirs = () => {
    if (!_foldersInitRan) {
      const rootLocation = path.join(__dirname, '../../');

      fs.readdir(rootLocation, (err, items) => {
        for (let i = 0; i < items.length; i++) {
          if (items[i].substr(0, 3) === 'gen') {
            shepherd.log(`remove ${items[i]}`);
            fs.unlinkSync(rootLocation + items[i]);
          }
        }
      });

      if (!fs.existsSync(shepherd.safewalletDir)) {
        fs.mkdirSync(shepherd.safewalletDir);

        if (fs.existsSync(shepherd.safewalletDir)) {
          shepherd.log(`created safewallet folder at ${shepherd.safewalletDir}`);
          shepherd.writeLog(`created safewallet folder at ${shepherd.safewalletDir}`);
        }
      } else {
        shepherd.log('safewallet folder already exists');
      }

      if (!fs.existsSync(`${shepherd.safewalletDir}/shepherd`)) {
        fs.mkdirSync(`${shepherd.safewalletDir}/shepherd`);

        if (fs.existsSync(`${shepherd.safewalletDir}/shepherd`)) {
          shepherd.log(`created shepherd folder at ${shepherd.safewalletDir}/shepherd`);
          shepherd.writeLog(`create shepherd folder at ${shepherd.safewalletDir}/shepherd`);
        }
      } else {
        shepherd.log('safewallet/shepherd folder already exists');
      }

      if (!fs.existsSync(`${shepherd.safewalletDir}/shepherd/pin`)) {
        fs.mkdirSync(`${shepherd.safewalletDir}/shepherd/pin`);

        if (fs.existsSync(`${shepherd.safewalletDir}/shepherd/pin`)) {
          shepherd.log(`created pin folder at ${shepherd.safewalletDir}/shepherd/pin`);
          shepherd.writeLog(`create pin folder at ${shepherd.safewalletDir}/shepherd/pin`);
        }
      } else {
        shepherd.log('shepherd/pin folder already exists');
      }

      if (!fs.existsSync(`${shepherd.safewalletDir}/shepherd/csv`)) {
        fs.mkdirSync(`${shepherd.safewalletDir}/shepherd/csv`);

        if (fs.existsSync(`${shepherd.safewalletDir}/shepherd/csv`)) {
          shepherd.log(`created csv folder at ${shepherd.safewalletDir}/shepherd/csv`);
          shepherd.writeLog(`create csv folder at ${shepherd.safewalletDir}/shepherd/csv`);
        }
      } else {
        shepherd.log('shepherd/csv folder already exists');
      }

      if (!fs.existsSync(shepherd.zcashParamsDir)) {
        fs.mkdirSync(shepherd.zcashParamsDir);
      } else {
        shepherd.log('zcashparams folder already exists');
      }

      _foldersInitRan = true;
    }
  }

  return shepherd;
};