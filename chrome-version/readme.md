# How to generate the Chrome version

Execute 'npx webpack' **in the Chrome folder**.

To build : 'web-ext build' (en modifiant éventuellement la version dans le manifest)



# NB  : Différences entre version Chrome et Firefox
### /!\ Toujours faire les changements dans les fichiers de la version Chrome /!\

Si modifiés dans la version Firefox directement, les changements seront supprimés par le script "createFirefoxVersion.py".

La version Firefox reprend tous les fichiers de Chrome sauf les fichiers présents dans le dossier "firefox-assets/to-overwrite" :
- content.js
- hide-body.css

+ Modification du manifest de la version Firefox gérer par le script Python ("createFirefoxVersion.py").



## NB 2 : Pour exécuter une version de test sur Chrome 
- Exécuter 'nxp webpack' dans le dossier Chrome, 
- Sélectionner sur Chrome "Charger l'extension non empaquetée"
- Puis sélectionner le fichier (pas le .zip, juste le fichier avec le manifest en root)


## NB 3 : Pour exécuter une version de test sur Firefox 
- Exécuter npm run build dans le dossier racine,
- Charger le .zip à cette adresse : ```about:debugging#/runtime/this-firefox```