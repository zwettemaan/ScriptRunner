//
// This code is shared between CEP/JavaScript and ExtendScript
//

if ("undefined" == typeof RoRu) {
    RoRu = {};
}

(function(){

RoRu.shallowClone = function shallowClone(obj) 
{

    var retVal = {};
    for (var x in obj) 
    {
        retVal[x] = obj[x];
    }

    return retVal;
}

RoRu.deepClone = function deepClone(obj) 
{

    var retVal;
    if (obj instanceof Array) {
        retVal = [];
    }
    else {
        retVal = {};        
    }
    for (var x in obj) 
    {
        var val = obj[x];
        if (typeof val == "object")
        {
            retVal[x] = RoRu.deepClone(val);
        }
        else
        {
            retVal[x] = val;
        }
    }

    return retVal;
}

// dQ: Wrap a string in double quotes
RoRu.dQ = function(s) {
    return '"' + s.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r") + '"';
}

// sQ: Wrap a string in single quotes
RoRu.sQ = function(s) {
    return "'" + s.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/\n/g,"\\n").replace(/\r/g,"\\r") + "'";
}

RoRu.logEntry = function(reportingFunctionArguments) {
    if (RoRu.S.LOG_ENTRY_EXIT) {
        RoRu.logTrace(reportingFunctionArguments, "Entry");
    }
}

RoRu.logExit = function(reportingFunctionArguments) {
    if (RoRu.S.LOG_ENTRY_EXIT) {
        RoRu.logTrace(reportingFunctionArguments, "Exit");
    }
}

RoRu.logError = function(reportingFunctionArguments, s) {
    if (RoRu.S.LOG_LEVEL >= RoRu.C.LOG_ERROR) {
        if (! s) {
            s = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        RoRu.logMessage(reportingFunctionArguments, "ERROR  : " + s);
    }
}

RoRu.logWarning = function(reportingFunctionArguments, s) {
    if (RoRu.S.LOG_LEVEL >= RoRu.C.LOG_WARN) {
        if (! s) {
            s = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        RoRu.logMessage(reportingFunctionArguments, "WARNING: " + s);
    }
}

RoRu.logNote = function(reportingFunctionArguments, s) {
    if (RoRu.S.LOG_LEVEL >= RoRu.C.LOG_NOTE) {
        if (! s) {
            s = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        RoRu.logMessage(reportingFunctionArguments, "NOTE   : " + s);
    }
}

RoRu.logTrace = function(reportingFunctionArguments, s) {
    if (RoRu.S.LOG_LEVEL >= RoRu.C.LOG_TRACE) {
        if (! s) {
            s = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        RoRu.logMessage(reportingFunctionArguments, "TRACE  : " + s);
    }
}

})();