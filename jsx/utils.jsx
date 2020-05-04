//
// This file mirrors the API of js/utils.js
//

if ("undefined" == typeof RoRu) {
    RoRu = {};
}

(function() {

RoRu.checkMac = function checkMac() {
    

    var retVal = $.os.substr(0,3) == "Mac";


    return retVal;
};

if (RoRu.ACCUMULATED_ESTK_TO_CHROME_CONSOLE_LOG === undefined) {
    RoRu.ACCUMULATED_ESTK_TO_CHROME_CONSOLE_LOG = "";
}

// Call this from JavaScript side via CSInterface

RoRu.fetchAccumulatedESTKToChromeConsoleLog = function() {

    var retVal = RoRu.ACCUMULATED_ESTK_TO_CHROME_CONSOLE_LOG;

    RoRu.ACCUMULATED_ESTK_TO_CHROME_CONSOLE_LOG = "";

    return retVal;
};

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
                prefix += "ES>>";
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
            
            var estkLogLine = prefix + message;
                    
            if (RoRu.S.LOG_TO_ESTK_CONSOLE) {
                $.writeln(estkLogLine); 
            }

            if (RoRu.S.LOG_TO_CHROME_CONSOLE) {

                if ("string" != typeof RoRu.ACCUMULATED_ESTK_TO_CHROME_CONSOLE_LOG) {
                    RoRu.ACCUMULATED_ESTK_TO_CHROME_CONSOLE_LOG = "";
                }

                RoRu.ACCUMULATED_ESTK_TO_CHROME_CONSOLE_LOG += estkLogLine + "\n";
            }

        }
        catch (err) {
        }
    }
    while (false);

    RoRu.inLogger = savedInLogger;
}

})();