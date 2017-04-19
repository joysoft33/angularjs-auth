# Dojo AngularJS

Ce répertoire contient un squelette minimal d'application AngularJS.
Vous devrez comprendre le fichier ```index.html``` et :

- construire le module application manquant
- créer le composant manquant
- lui associer une vue HTML permettant d'afficher un champ de saisie *'bindé'* à une variable que vous nommerez ```cityName```
- ajouter un bouton ```Valider``` appelant la fonction ```validate``` du composant à laquelle on passera en paramètre la ville saisie dans le champ d'imput. Le bouton de validation ne doit apparaître que si quelque chose a été saisi dans le champ d'input
- ajouter la ville passée en paramètre de la fonction ```validate``` dans le tableau appellé ```cities```, mais seulement si cette ville n'y est pas déjà présente
- dans la vue du composant, afficher toutes les villes contenues dans le tableau sous forme de ul/li
- gérer le cas d'erreur où la ville validée est déjà présente dans le tableau: afficher un message d'erreur (rouge) sur la vue du composant
- faire disparaitre le message d'erreur après 10 secondes d'affichage
