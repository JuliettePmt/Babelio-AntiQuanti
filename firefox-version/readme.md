
### How to create Firefox version :

- Execute ```npm run build``` in the root folder (conditions of execution in the root 'package.json' file). 
- The zip file is in the '_firefox-version/firefox-plugin/web-ext-artifacts_' directory.

---------
The script will take all files from the Chrome version, except for :
- 'manifest.json' (but the version will still be changed to match the Chrome manifest version, for example : 2.9.0)

---------
Run local test version :
- Execute ```npx webpack``` in the **'_firefox-version/firefox-plugin_' directory**
- Execute ```web-ext build``` also in the '_firefox-version/firefox-plugin_' directory


Charge test version in Firefox on this URL : ```about:debugging#/runtime/this-firefox```