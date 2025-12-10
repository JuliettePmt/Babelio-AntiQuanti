# How to generate the Chrome version

Execute 'npx webpack' **in the Chrome folder**.

To build : 'web-ext build' (en modifiant éventuellement la version dans le manifest)

# NB
Toujours faire les changements dans les fichiers de la version Chrome, modifiés grâce au script "createFirefoxVersion.py".s

# NB 2 
Pour charger version de test sur Chrome : 
- Exécuter 'nxp webpack' dans le dossier Chrome, 
- Sélectionner sur Chrome "Charger l'extension non empaquetée"
- Puis sélectionner le fichier (pas le .zip, juste le fichier avec le manifest en root)