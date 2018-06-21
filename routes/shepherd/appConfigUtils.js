module.exports = (shepherd) => {    
    shepherd.testLocation = (path) => {
        return new shepherd.Promise((resolve, reject) => {
        if (path.indexOf(' ') > -1) {
            shepherd.log(`error testing path ${path}`);
            resolve(-1);
        } else {
            shepherd.fs.lstat(path, (err, stats) => {
            if (err) {
                shepherd.log(`error testing path ${path}`);
                resolve(-1);
            } else {
                if (stats.isDirectory()) {
                    resolve(true);
                } else {
                    shepherd.log(`error testing path ${path} not a folder`);
                    resolve(false);
                }
            }
            });
        }
        });
    }
    return shepherd;
}