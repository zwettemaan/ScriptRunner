//
// This code is shared between CEP/JavaScript and ExtendScript
//

// Don't use 'var' - some engines call this within a non-global scope
// if using var we end up defining this in the wrong scope
if ("undefined" == typeof RoRu) {
    RoRu = {};
}

(function(){

if (! RoRu.path) {
    RoRu.path = {};
}

RoRu.path.addTrailingSeparator = function addTrailingSeparator(filePath, separator) {    
    var retVal = filePath;

    do {

        if (! filePath) {
            break;            
        }

        var lastChar = filePath.substr(-1);        
        if (lastChar == RoRu.path.SEPARATOR || lastChar == RoRu.OTHER_PLATFORM_SEPARATOR) {
            break;
        }

        if (! separator) {
            separator = RoRu.path.SEPARATOR;
        }

        retVal += separator;
    }
    while (false);

    return retVal;
};

RoRu.path.basename = function basename(filePath, separator) {    
    var endSegment;

    if (! separator) {
        separator = RoRu.path.SEPARATOR;
    }

    // toString() handles cases where filePath is an ExtendScript File/Folder object
    var splitPath = filePath.toString().split(separator);
    do {
        endSegment = splitPath.pop();   
    }
    while (splitPath.length > 0 && endSegment == "");

    return endSegment;
};

RoRu.path.dirname = function dirname(filePath, separator) {    
    var retVal;

    if (! separator) {
        separator = RoRu.path.SEPARATOR;
    }

    // toString() handles cases where filePath is an ExtendScript File/Folder object
    var splitPath = filePath.toString().split(separator);
    do {
        var endSegment = splitPath.pop();   
    }
    while (splitPath.length > 0 && endSegment == "");

    retVal = splitPath.join(separator);

    return retVal;
};

RoRu.path.filenameExtension = function filenameExtension(filePath, separator) {
    var retVal;

    var splitName = RoRu.path.basename(filePath).split(".");
    var extension = "";
    if (splitName.length > 1) {
        extension = splitName.pop();
    }

    retVal = extension.toLowerCase();

    return retVal;
};

RoRu.path.stripTrailingSeparator = function stripTrailingSeparator(filePath, separator) {    
    var retVal = filePath;

    do {

        if (! filePath) {
            break;            
        }

        var lastChar = filePath.substr(-1);        
        if (! separator) {
            if (lastChar == RoRu.path.SEPARATOR || lastChar == RoRu.OTHER_PLATFORM_SEPARATOR) {
                retVal = filePath.substr(0, filePath.length - 1); 
            }
        }
        else {
            if (lastChar == separator) {
                retVal = filePath.substr(0, filePath.length - 1); 
            }
        }

    }
    while (false);

    return retVal;
};

})();