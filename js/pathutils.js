//
// This file mirrors the API of jsx/pathUtils.jsx
//

if ("undefined" == typeof RoRu) {
    RoRu = {};
}

(function() {
    
if (! RoRu.path) {
    RoRu.path = {};
}

RoRu.path.exists = function exists(filepath) {
    var retVal;

    var stat = cep.fs.stat(filepath);
    retVal = (stat.err == cep.fs.NO_ERROR);

    return retVal;
};

RoRu.path.isDir = function isDir(filepath) {

    var stat = cep.fs.stat(filepath);
    var retVal = (stat.err == cep.fs.NO_ERROR) && stat.data.isDirectory();

    return isDir;
};

RoRu.path.mkdir = function mkdir(folderPath, separator) {

    var err = cep.fs.ERR_INVALID_PARAMS;

    if (folderPath) {
        if (RoRu.path.exists(folderPath)) {
            err = cep.fs.NO_ERROR;
        }
        else {
            var parentFolderPath = RoRu.path.dirname(folderPath, separator);
            var err = RoRu.path.mkdir(parentFolderPath, separator);
            if (err == cep.fs.NO_ERROR) {
                var result = cep.fs.makedir(folderPath);
                err = result.err;           
            }

        }
    }

    return err;
};

})();