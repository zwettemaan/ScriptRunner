//
// This code is shared between CEP/JavaScript and ExtendScript
//
//
// Tweakable Settings
//

if ("undefined" == typeof RoRu) {
    RoRu = {};
}

if (! RoRu.S) {
    RoRu.S = {}; // stash global settings here
}

RoRu.S.LOG_LEVEL                     = RoRu.C.LOG_NONE;

RoRu.S.MANUAL_START_FROM_CHROME      = false;

// LOG_TO_CHROME_CONSOLE also sends the ESTK log to the Chrome console window, 
// but I am using a trick: the log accumulates on the ESTK side until the JavaScript
// logger needs to output something, at which time it will fetch and output the ESTK
// log info too

RoRu.S.LOG_TO_CHROME_CONSOLE         = false;
RoRu.S.LOG_TO_ESTK_CONSOLE           = false;
RoRu.S.LOG_TO_FILEPATH               = undefined; // file path or undefined
RoRu.S.CHECK_SCRIPT_FOLDER_INTERVAL  = 3000; // MS
RoRu.S.LOG_ENTRY_EXIT                = false;

/* Add any global settings, defaults... here */
