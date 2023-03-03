# eval-lg

## Contexte du projet

Vous venez de récupérer ce repo avec les sources et exemple. L'outil a commencé à être réalisé par un autre developpeur néophyte, que vous ne pouvez pas contacter. Le projet est "à vous", vous êtes libre de le modifier comme bon vous semble, d'ajouter des dépendances, de l'optimiser, etc.
Vous ne serez pas seulement évalué sur les fonctionalités restaurées à l'application, mais sur l'ensemble des modifications permettant d'améliorer la pérénité du projet, permettant des développements futurs par vous ou vos collègues.

## Projet

Tous les jours, un fichier JSON est déposé sur la machine du client, contenant des informations sur les clients de son entreprise. Le client souhaite ouvrir ces informations client sur Excel, et pour ne pas avoir à filtrer les clients inactifs sur Excel, le client souhaite que le filtrage soit aussi fait lors de la transformation du fichier.

## Bugs relevés

* Le fichier généré est parfois mal ordonné: certaines lignes ne sont pas séparées, d'autres lignes sont séparées de plusieurs retours à la ligne
* Le fichier généré montre des lignes de clients qui ne sont pas actifs
* Le fichier généré affiche mal les lettres accentués et autres caractères Unicode

## Demandes utilisateur

* Un en-tête avec un intitulé des colonnes devrait être ajouté au début du fichier
* Les colonnes du fichier ne sont pas séparées si Excel est installé sur un système qui n'est pas en français

## Performances

Dans le cas d'un fichier de client extrêmement gros, le client relève les deux problèmes suivants :

* Le fichier est long a être généré
* En cas de très gros fichier, l'application se ferme sans avoir terminé, avec une erreur
