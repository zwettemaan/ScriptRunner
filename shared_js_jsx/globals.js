//
// This code is shared between CEP/JavaScript and ExtendScript
//

// Don't use 'var' - some engines call this within a non-global scope
// if using var we end up defining this in the wrong scope
if ("undefined" == typeof RoRu) {
    RoRu = {};
}

if (! RoRu.C) {
    RoRu.C = {}; // stash constants here   
}

RoRu.C.TARGET_DIRNAME       = "RorohikoScriptRunner";
RoRu.C.DIRNAME_PREFERENCES  = "RorohikoScriptRunner";
RoRu.C.FILENAME_PREFERENCES = "RorohikoScriptRunnerPreferences.json";
RoRu.C.EXTENSION_ID         = "com.rorohiko.sparker.scriptrunner";

RoRu.C.LOG_NONE                      = 0;
RoRu.C.LOG_ERROR                     = 1;
RoRu.C.LOG_WARN                      = 2;
RoRu.C.LOG_NOTE                      = 3;
RoRu.C.LOG_TRACE                     = 4;

/* Add any global constants */
