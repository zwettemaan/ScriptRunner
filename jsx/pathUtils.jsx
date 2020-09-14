//
// This file mirrors the API of js/pathUtils.js
//

if ("undefined" == typeof RoRu) {
    RoRu = {};
}

(function() {

if (! RoRu.path) {
    RoRu.path = {};
}

RoRu.path.exists = function exists(filepath) {

    var f = File(filepath);
    var retVal = f.exists;

    return retVal;
};

RoRu.path.isDir = function isDir(folderPath) {
    
    // This casts to a File instead of a Folder if the
    // path references a file

    var folder = Folder(folderPath);

    var retVal = (folder instanceof Folder);

    return retVal;
};

RoRu.path.mkdir = function mkdir(folderPath, separator) {

    var success = false;

    do {
        try {
            if (! folderPath) {
                RoRu.logError(arguments, "no folderPath");
                break;
            }

            if (RoRu.path.exists(folderPath)) {
                success = true;
                break;
            }

            var parentFolderPath = RoRu.path.dirname(folderPath, separator);
            success = RoRu.path.mkdir(parentFolderPath, separator);
            if (! success) {
                RoRu.logError(arguments, "cannot create parent folder");
                break;
            }

            var folder = Folder(folderPath);
            folder.create();
            success = folder.exists;
        }
        catch (err) {
            RoRu.logError(arguments, "throws" + err);       
        }
    }
    while (false);

    return success;
};

})();