//
// This code is shared between CEP/JavaScript and ExtendScript
//

if (RoRu.checkMac()) {
    RoRu.path.SEPARATOR = "/";
    RoRu.path.OTHER_PLATFORM_SEPARATOR = "\\";
    RoRu.isMac = true;
    RoRu.isWindows = false;
}
else {
    RoRu.path.SEPARATOR = "\\";
    RoRu.path.OTHER_PLATFORM_SEPARATOR = "/";
    RoRu.isMac = false;
    RoRu.isWindows = true;
}

if (! RoRu.dirs) {
    RoRu.dirs = {};
}
