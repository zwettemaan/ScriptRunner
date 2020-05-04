if ("undefined" == typeof RoRu) {
    RoRu = {};
}

RoRu.csInterface = new CSInterface();
RoRu.hostEnvironment = RoRu.csInterface.getHostEnvironment();

function init() {

    getJavaScriptExtensionDirs_PRM().
    then(initHostScript_PRM).
    then(getExtendScriptExtensionDirs_PRM).
    then(getLocale_PRM).
    then(wireUI_PRM).
    then(readPreferences_PRM).
    then(passCollectedInfoToExtendScript_PRM).
    then(savePreferences_PRM).
    then(updateUI_PRM);

}

if (RoRu.S.MANUAL_START_FROM_CHROME) {
    console.log("Running in debug mode. Must call init() from the Chrome console");
}
else {
    init();
}

// ----------------

function closeExtension_PRM() {

    var promise = new Promise(function(resolve, reject) {

        SHORTCODE.csInterface.closeExtension();
        resolve();

    });

    return promise;

}

function getExtendScriptExtensionDirs_PRM() {

    var promise = new Promise(function(resolve, reject) {

        if (RoRu.hostEnvironment.appId == "DRWV") {
            resolve();
        }
        else {
            var script = "JSON.stringify({'home': Folder('~').fsName, 'temp': Folder.temp.fsName })";

            RoRu.csInterface.evalScript(
                script,
                function(data) { 

                    try {
                        var dirs = JSON.parse(data);
                        
                        RoRu.dirs.homeDir = 
                            RoRu.path.addTrailingSeparator(dirs.home);

                        RoRu.dirs.tempDir = 
                            RoRu.path.addTrailingSeparator(dirs.temp);

                        RoRu.dirs.documentsDir = 
                            RoRu.dirs.homeDir + 
                            "Documents" + 
                            RoRu.path.SEPARATOR;

                        RoRu.dirs.adobeScriptsDir = 
                            RoRu.dirs.documentsDir + 
                            "Adobe Scripts" + 
                            RoRu.path.SEPARATOR;

                        RoRu.dirs.appScriptsDir = 
                            RoRu.dirs.adobeScriptsDir + 
                            RoRu.C.appName + 
                            RoRu.path.SEPARATOR;

                        resolve();
                    } 
                    catch (err) {
                        reject();
                    }

                }
            )
        }

    });

    return promise;
}


function getJavaScriptExtensionDirs_PRM() {

    var promise = new Promise(function(resolve, reject) {


        RoRu.dirs.extensionDir = 
            RoRu.path.addTrailingSeparator(
                RoRu.csInterface.getSystemPath(SystemPath.EXTENSION) +
                    RoRu.path.SEPARATOR
            );

        RoRu.dirs.appSupportDir = 
            RoRu.path.addTrailingSeparator(
                RoRu.csInterface.getSystemPath(SystemPath.USER_DATA) +
                    RoRu.path.SEPARATOR
            );

        if (RoRu.isMac) {
            RoRu.dirs.systemPreferencesDir = 
                RoRu.path.dirname(RoRu.dirs.appSupportDir) +
                    RoRu.path.SEPARATOR +
                    "Preferences" +
                    RoRu.path.SEPARATOR;
        }
        else {
            RoRu.dirs.systemPreferencesDir = 
                RoRu.path.addTrailingSeparator(RoRu.dirs.appSupportDir);
        }

        RoRu.dirs.preferencesDir = 
            RoRu.dirs.systemPreferencesDir +
            RoRu.C.DIRNAME_PREFERENCES +
            RoRu.path.SEPARATOR;

        var applicationDir = RoRu.csInterface.getSystemPath(SystemPath.HOST_APPLICATION);
        if (RoRu.isMac) {
            while (
                applicationDir != "" 
            && 
                RoRu.path.filenameExtension(applicationDir) != "app"
            ) {
                applicationDir = RoRu.path.dirname(applicationDir);
            }
        }
        applicationDir = RoRu.path.dirname(applicationDir);

        RoRu.dirs.applicationDir = 
            applicationDir + 
            RoRu.path.SEPARATOR;

        resolve();

    });


    return promise;
}

function getLocale_PRM() {

    var promise = new Promise(function(resolve, reject) {

        if (
            RoRu.hostEnvironment.appId == "DRWV"
        ||
            RoRu.hostEnvironment.appId == "PPRO"
        ||
            RoRu.hostEnvironment.appId == "AEFT"
        ) {
            resolve();
        }
        else {
            var script = "JSON.stringify({'locale': app.locale.toString() })";

            RoRu.csInterface.evalScript(
                script,
                function(data) { 

                    var locale = JSON.parse(data);
                    RoRu.locale = locale;
                    resolve();

                }
            )

        }

    });

    return promise;
}

function initHostScript_PRM() {

    // Function mapAppId(): convert short app code to readable app name 
    // Auto-generated from appMap.json data

    function mapAppId(appId) {var retVal;switch (appId) {case "KBRG":retVal = "Bridge";break;case "DRWV":retVal = "Dreamweaver";break;case "AICY":retVal = "InCopy";break;case "IDSN":retVal = "InDesign";break;case "ILST":retVal = "Illustrator";break;case "PHSH":retVal = "Photoshop";break;case "PPRO":retVal = "Premiere Pro";break;}return retVal;}

    var promise = new Promise(function(resolve, reject) {

        // Convert short code to readable app name based on appMap.json data

        var script = "RoRu.initHostScript(" + RoRu.dQ(RoRu.dirs.extensionDir) + ")";
        RoRu.csInterface.evalScript(
            script,
            function() {
                RoRu.C.appName = mapAppId(RoRu.hostEnvironment.appId);
                resolve();
            }
        );

    });

    return promise;
}


function passCollectedInfoToExtendScript_PRM() {

    var promise = new Promise(function(resolve, reject) {

        RoRu.csInterface.evalScript(
            "RoRu.prefs = JSON.parse(" + RoRu.sQ(JSON.stringify(RoRu.prefs)) + ");" + 
            "RoRu.dirs = JSON.parse(" + RoRu.sQ(JSON.stringify(RoRu.dirs)) + ");",
            function() {

                
                resolve();

            });

    });

    return promise;
}

function readPreferences_PRM() {

    var promise = new Promise(function(resolve, reject) {

        setDefaultPreferences();
        try {
            var prefsFile = RoRu.dirs.preferencesDir + RoRu.C.FILENAME_PREFERENCES;
            var result = cep.fs.readFile(prefsFile, cep.encoding.UTF8);
            if (result.err == cep.fs.NO_ERROR) {
                var loadedPrefs = JSON.parse(result.data);
                for (var key in loadedPrefs) {
                    RoRu.prefs[key] = loadedPrefs[key];
                }
            }
        }
        catch (err) {
            RoRu.logWarning(arguments, "throws " + err);
        }
        resolve();

    });

    return promise;
}

function savePreferences_PRM() {

    var promise = new Promise(function(resolve, reject) {

        var err = cep.fs.NO_ERROR;

        if (! RoRu.path.exists(RoRu.dirs.preferencesDir)) {
            err = RoRu.path.mkdir(RoRu.dirs.preferencesDir);
        }

        if (err == cep.fs.NO_ERROR) {
            var prefsFile = RoRu.dirs.preferencesDir + RoRu.C.FILENAME_PREFERENCES;
            var jsonPrefs = JSON.stringify(RoRu.prefs);       
            var result = cep.fs.writeFile(prefsFile, jsonPrefs, cep.encoding.UTF8);
            err = result.err;
        }
        
        if (err == cep.fs.NO_ERROR) {
            resolve();
        }
        else {
            reject(result.err);
        }

    });

    return promise;

}

function setDefaultPreferences() {

    if (! RoRu.prefs) {
        RoRu.prefs = {};
    }

    /* provide defaults for whatever preferences you want in RoRu.prefs */

}

function updateUI_PRM() {

    var promise = new Promise(function(resolve, reject) {

        var scriptList = RoRu.getAppScriptList();
        if (! RoRu.SCRIPT_LIST || scriptList.toString() != RoRu.SCRIPT_LIST.toString()) {
            RoRu.SCRIPT_LIST = scriptList;

            var $uiScriptList = $('#RoRulist');
            $uiScriptList.find('option').remove();

            for (var scriptIdx = 0; scriptIdx < scriptList.length; scriptIdx++) {
                var scriptFilePath = scriptList[scriptIdx];
                $uiScriptList.append(
                    '<option id="ScriptFile_' + scriptIdx + '">' + 
                        RoRu.path.basename(scriptFilePath) + 
                    '</option>');
            }
        }

        resolve();

    });

    return promise;
}

function wireUI_PRM() {

    var promise = new Promise(function(resolve, reject) {

        themeManager.init();

        // RoRu.csInterface.resizeContent(570, 200);
        $("#RoRubtnRun").click(function(evt) {
        	var scriptText = $("#txtScript").val();
            var quotedScriptText = RoRu.dQ(scriptText);
            var scriptReturningJSONOfEval = "JSON.stringify(eval(" + quotedScriptText + "))";
            RoRu.csInterface.evalScript(scriptReturningJSONOfEval, function(dataJSON) {
                try {
                    var dataObject = JSON.parse(dataJSON);
                    var readableJSON = JSON.stringify(dataObject, null, "\t");
                }
                catch (err) {
                    readableJSON = dataJSON;
                }
                $("#txtReturnData").text(readableJSON);
            });
        });

        $("#RoRubtnRunSelected").click(function(evt) {
            var selectedScriptID = $("#RoRulist option:selected").attr('id');
            // e.g. ScriptFile_12 
            var selectedScriptIdx = parseInt(selectedScriptID.split("_")[1], 10);
            var selectedScriptPath = RoRu.SCRIPT_LIST[selectedScriptIdx];
            var script = 
                "(function(){\n" + 
                "    var retVal;\n" +
                "    try {\n" +
                "        var scriptFile = File(" + RoRu.dQ(selectedScriptPath) + ");\n" +
                "        if (scriptFile.exists) {\n" +
                "           scriptFile.open('r');\n" +
                "           scriptFile.encoding = 'UTF8';\n" +
                "           var script = scriptFile.read();\n" +
                "           scriptFile.close();\n" +
                "           retVal = eval(script);\n" +
                "        }\n" + 
                "    }\n" + 
                "    catch (err) {\n" + 
                "       retVal = err.toString();\n" + 
                "    }\n" + 
                "    return retVal;\n" + 
                "})();";
            RoRu.csInterface.evalScript(script);
        });

        // Some apps don't have an application activate event
        if (
            RoRu.hostEnvironment.appId == "PPRO"
        ) {
            setInterval(function() {
                updateUI_PRM().then();
            },
            RoRu.S.CHECK_SCRIPT_FOLDER_INTERVAL);
        }
        else {
            RoRu.csInterface.addEventListener(
                "applicationActivate",
                function() {
                    updateUI_PRM().then();
                }
            );
        }

        resolve();

    });

    return promise;
}
