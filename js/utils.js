//
// This file mirrors the API of jsx/utils.jsx
//

if ("undefined" == typeof RoRu) {
    RoRu = {};
}

(function() {

RoRu.getAppScriptList = function getAppScriptList() {
    var retVal;

    do {
        try {

            var scriptFilePathList = [];

            if (! RoRu.path.isDir(RoRu.dirs.appScriptsDir)) {
                break;
            }

            var readdirData = window.cep.fs.readdir(RoRu.dirs.appScriptsDir);
            if (readdirData.err) {
                break;
            }

            for (var fileIdx = 0; fileIdx < readdirData.data.length; fileIdx++) {
                var fileName = readdirData.data[fileIdx];
                var extension = RoRu.path.filenameExtension(fileName);
                if (extension == "jsx" || extension == "js") {
                    scriptFilePathList.push(RoRu.dirs.appScriptsDir + fileName);
                }
            }

            if (scriptFilePathList.length == 0) {
                break;
            }

            retVal = scriptFilePathList;
        }
        catch (err) {
           RoRu.logError(arguments, "throws " + err);
        }
    }
    while (false);

    return retVal;
};

RoRu.checkMac = function checkMac() {
    var retVal;

    retVal = (window.navigator.platform.substr(0,3).toLowerCase() == "mac");

	return retVal;
};

RoRu.setPhotoshopPersistent = function setPhotoshopPersistent(in_isPersistent) {  

    if (in_isPersistent) {
        var event = new CSEvent("com.adobe.PhotoshopPersistent", "APPLICATION");
    } else {
        var event = new CSEvent("com.adobe.PhotoshopUnPersistent", "APPLICATION");
    }
    
    event.extensionId = RoRu.C.EXTENSION_ID;

    RoRu.csInterface.dispatchEvent(event);

}

RoRu.logMessage = function(reportingFunctionArguments, message) {

   var savedInLogger = RoRu.inLogger;

    do {
        try {

            if (RoRu.inLogger) {
                break;
            }

            RoRu.inLogger = true;
            
            var prefix = "";

            if (RoRu.S.LOG_TO_CHROME_CONSOLE && RoRu.S.LOG_TO_ESTK_CONSOLE) {
                // Make sure we can tell the difference between the message origins
                prefix += "JS>>";
            }

            if (! message) {

                  message = reportingFunctionArguments;
                  reportingFunctionArguments = undefined;

            }
            else if (reportingFunctionArguments) {

                if ("string" == typeof reportingFunctionArguments) {

                    prefix += reportingFunctionArguments + ": ";
                    
                }
                else {

                    var reportingFunctionName;
                    try {
                        reportingFunctionName = reportingFunctionArguments.callee.toString().match(/function ([^\(]+)/)[1];
                    }
                    catch (err) {
                        reportingFunctionName = "[anonymous function]";
                    }
                    prefix += reportingFunctionName + ": ";

                }
            }
            
            var chromeLogLine = prefix + message;

            RoRu.csInterface.evalScript("RoRu.fetchAccumulatedESTKToChromeConsoleLog()", function(accumulatedESTKToJSLog) {
                if (RoRu.S.LOG_TO_CHROME_CONSOLE) {
                    if (accumulatedESTKToJSLog) {
                        console.log(accumulatedESTKToJSLog);
                    }
                    console.log(chromeLogLine);
                }
            });

            if (RoRu.S.LOG_TO_ESTK_CONSOLE) {
                RoRu.csInterface.evalScript("$.writeln('" + RoRu.sQ(chromeLogLine) + "');");
            }
        }
        catch (err) {        
        }
    }
    while (false);

    RoRu.inLogger = savedInLogger;
}

})();