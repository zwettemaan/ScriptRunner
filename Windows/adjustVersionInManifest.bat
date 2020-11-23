@ECHO OFF
REM
REM Read BuildSettings/ExtensionVersion.txt and adjust the manifest
REM

IF "%SPRK_COMMANDS_DIR%" == "" (
    SET SPRK_COMMANDS_DIR=%~dp0
)

PUSHD "%SPRK_COMMANDS_DIR%.."
SET PROJECT_ROOT_DIR=%cd%\
POPD

CALL "%SPRK_COMMANDS_DIR%setTarget.bat"

PUSHD "%PROJECT_ROOT_DIR%"

POWERSHELL -Command "(gc CSXS\manifest.xml) -replace '(<Extension +Id=\"".*?\"" +Version=\"")([0-9\.]*)(\"")', '${1}%PROJECT_VERSION%${3}' | Out-File CSXS\manifest.xml.new -encoding Utf8"
DEL CSXS\manifest.xml
POWERSHELL -Command "(gc CSXS\manifest.xml.new) -replace '(ExtensionBundleVersion=\"")([0-9\.]*)(\"")', '${1}%PROJECT_VERSION%${3}' | Out-File CSXS\manifest.xml -encoding Utf8"

POPD

ECHO.
ECHO Version number in CSXS\manifest.xml has been set to %PROJECT_VERSION%.
ECHO.

IF NOT "%1" == "NESTED" (
    SET /P REPLY=Press [Enter] to finalize 
)
