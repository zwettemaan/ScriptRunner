
var dreamweaver;
var app;

if ("undefined" == typeof RoRu) {
    RoRu = {};
}

RoRu.LOG_CRITICAL_ERRORS = false;

RoRu.relativeFilePathsToLoad = [
		"jsx/json2.jsx",
		"shared_js_jsx/globals.js",
		"shared_js_jsx/tweakableSettings.js",
		"shared_js_jsx/utils.js",
		"jsx/utils.jsx",
		"jsx/shared_js_jsx/pathUtils.js",
		"jsx/pathUtils.jsx",
		"jsx/shared_js_jsx/init.js",
		"jsx/init.jsx"
];

RoRu.errorBeforeLoggingAvailable = function(error) {

	if (RoRu.logError) {
		RoRu.logError(error);
	}
	else if (RoRu.LOG_CRITICAL_ERRORS) {

		try {

			var f = File(Folder.desktop + "/criticalErrors.log");
			f.open("a");
			f.writeln(error);
			f.close();

		}
		catch (err) {

			try {
				console.log(error);
			}
			catch (err) {	
			}

		}
	}
}

if (dreamweaver) {

	RoRu.loadScript = function(extensionDir, scriptPath) {
		try {
			var fullPath = extensionDir + scriptPath;
			var script = DWfile.read(fullPath);
			eval(script);
		}
		catch (err) {			
			RoRu.errorBeforeLoggingAvailable("hostscript.jsx loadScript throws " + err + " for " + fullPath);	
		}
	}

}
else {

	RoRu.loadScript = function(extensionDir, scriptPath) {
		try {
			var fullPath = extensionDir + scriptPath;
			var file = File(fullPath);
			file.open("r");
			var script = file.read();
			file.close();
			eval(script);
		}
		catch (err) {			
			RoRu.errorBeforeLoggingAvailable("hostscript.jsx loadScript throws " + err + " for " + fullPath);	
		}
	}

}

RoRu.initHostScript = function initHostScript(extensionDir) {

	for (var idx = 0; idx < RoRu.relativeFilePathsToLoad.length; idx++) {
		var filePath = RoRu.relativeFilePathsToLoad[idx];
		RoRu.loadScript(extensionDir, filePath);
	}

}



