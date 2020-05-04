# ScriptRunner

A scripts panel for Adobe Creative Cloud apps that don't have a scripts panel, 
e.g. Premiere Pro.

The ZXP file can be found in the Release folder.

This panel is very rudimentary. It will look for a folder below your Documents folder.
```
<Documents>/Adobe Scripts/<AppName>/whatever.jsx
```
When you run <AppName> (e.g. Premiere Pro, InDesign, Illustrator...) the scripts
in that folder will be listed in a popup menu, and you can select one and click
the 'Run' button. 

For example, for 'Premiere Pro' and you want to install 'myscript.jsx', 
you need to copy the script to (Mac):
```
  ~/Documents/Adobe Scripts/Premiere Pro/myscript.jsx
```
or (Win)
```
  %USERPROFILE%\Documents\Adobe Scripts\Premiere Pro\myscript.jsx
```
to make it appear on the popup menu.
