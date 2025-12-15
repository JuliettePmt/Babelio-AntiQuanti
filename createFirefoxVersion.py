import os
import shutil
import json
import subprocess
from zipfile import ZipFile

current_path = os.getcwd()  # Get file path
folder_name_firefox = "firefox-version/firefox-plugin"
folder_path_firefox = os.path.join(current_path, folder_name_firefox)
manifest_directory = os.path.join("./", "firefox-version/firefox-assets")
overwrite_directory = os.path.join("./", "firefox-version/firefox-assets/to-overwrite")
chrome_directory = os.path.join(current_path, "chrome-version")


def createFirefoxVersion():
    createFolder(current_path, folder_path_firefox, folder_name_firefox)
    copyFiles(current_path, folder_path_firefox, folder_name_firefox,
              chrome_directory)  # Copy new files in firefox directory
    replaceJSFiles(folder_name_firefox, "chrome.", "browser.")
    replaceJSFiles(folder_name_firefox, "91.0", "109.0")

    # Copy manifest from the firefox-version directory and update version
    copyManifest(manifest_directory, folder_path_firefox,
                 current_path, chrome_directory)
    executeWebpack()
    # zipFile(folder_path_firefox, folder_name_firefox)


def createFolder(current_path, folder_path_firefox, folder_name_firefox):
    if os.path.exists(folder_path_firefox):
        shutil.rmtree(folder_path_firefox)  # Delete previous
    os.makedirs(folder_path_firefox)


def copyFiles(current_path, folder_path_firefox, folder_name_firefox, chrome_directory):

    for item in os.listdir(chrome_directory):
        item_path = os.path.join(chrome_directory, item)
        destination_path = os.path.join(folder_path_firefox, item)

        if os.path.isfile(item_path):
            shutil.copy(item_path, destination_path)
            # print("Copied file")

        elif os.path.isdir(item_path):
            shutil.copytree(item_path, destination_path)
            # print("Copied directory")


def replaceJSFiles(directory, old_text, new_text):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".js"):
                file_path = os.path.join(root, file)

                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()

                updated_content = content.replace(old_text, new_text)

                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(updated_content)


def copyManifest(manifest_directory, folder_path_firefox, current_path, chrome_directory):
    source_file = os.path.join(manifest_directory, "manifest.json")
    destination_file = os.path.join(folder_path_firefox, "manifest.json")
    reference_file = os.path.join(chrome_directory, "manifest.json")

    if not os.path.exists(source_file):
        print(
            f"Le fichier 'manifest.json' n'existe pas dans {manifest_directory}.")
        return
    if not os.path.exists(reference_file):
        print(f"Le fichier 'manifest.json' n'existe pas dans {current_path}.")
        return

    with open(reference_file, "r", encoding="utf-8") as f:
        reference_data = json.load(f)
        reference_version = reference_data.get("version")
        if not reference_version:
            print("Aucune clé 'version' trouvée dans le manifest.json de référence.")
            return

    with open(source_file, "r", encoding="utf-8") as f:
        manifest_data = json.load(f)
        manifest_data["version"] = reference_version
        manifest_data["manifest_version"] = 2

        # Only add "applications" if using Manifest V2
        if manifest_data.get("manifest_version") == 2:
            manifest_data["applications"] = {
                "gecko": {
                    "id": "{60039cbc-b65e-4b32-bede-27223614a338}",
                    "strict_min_version": "91.0"
                }
            }
    os.makedirs(folder_path_firefox, exist_ok=True)

    with open(destination_file, "w", encoding="utf-8") as f:
        json.dump(manifest_data, f, indent=4)

    print(f"Manifest updated.")


def overwriteFiles(overwrite_directory, folder_path_firefox):
    
    for item in os.listdir(overwrite_directory):
    item_path = os.path.join(overwrite_directory, item)
    destination_path = os.path.join(folder_path_firefox, item)

    if os.path.isfile(item_path):
        shutil.copy(item_path, destination_path)
        # print("Copied file")

    elif os.path.isdir(item_path):
        shutil.copytree(item_path, destination_path)
        # print("Copied directory")


# def copyManifest(manifest_directory, folder_path_firefox, current_path, chrome_directory):
#     source_file = os.path.join(manifest_directory, "manifest.json")
#     destination_file = os.path.join(folder_path_firefox, "manifest.json")
#     reference_file = os.path.join(chrome_directory, "manifest.json")


def executeWebpack():
    commande = ["npx", "webpack"]
    webpack_file = os.path.join(current_path, "firefox-version/firefox-plugin")

    try:
        os.chdir(webpack_file)
        result = subprocess.run(
            commande, capture_output=True, text=True, check=True)
        print("Webpack ok")
    except Exception as e:
        print(f"Erreur inattendue : {e}")



def zipFile(firefox_folder, firefox_version_folder):
    zip_path = os.path.join(current_path, "firefox-version/firefox-plugin.zip")

    # Delete old version
    if os.path.exists(zip_path):
        os.remove(zip_path)

    with ZipFile(zip_path, 'w') as zipf:
        for root, dirs, files in os.walk(firefox_folder):
            for file in files:
                file_path = os.path.join(root, file)
                # Chemin relatif dans le ZIP
                arcname = os.path.relpath(file_path, start=firefox_folder)
                zipf.write(file_path, arcname)

    print(f"Created ZIP file.")


createFirefoxVersion()
