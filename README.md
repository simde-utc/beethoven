# Beethoven
Nouveau système de caisse du Pic'Asso qui permet d'acheter au foyer étudiant de l'Université de Technologie de Compiègne.

Cette application permet également de gérer la vente de menus, de modifier l'affichage des Télés et de gérer les cartes étudiantes au sein du foyer.

## Installation
Il faut d'abord installer la dernière version de npm :
```
npm install --global npm
```

Ensuite il faut installer React :
```
npm install --global create-react-app
```
Pour finir il faut installer le package reactstrap (**[Documentation](https://reactstrap.github.io/components/alerts/)**):
```
npm install --save reactstrap react react-dom
```

Installez l’ensemble des paquets nécessaires :
```
npm install
```

N'oubliez pas de créer le fichier *config.js* qui se situe dans le dossier **Utils**, à partir de *config_exemple.js*
Pour avoir un fichier fonctionnel, veuillez contacter les Auteurs.

## Démarrage de Beethoven
Une fois les packages installés et le fichier de configuration complété,
il faut ensuite lancer Beethoven :
```
npm start
```

# L'Application
L'application est composée en 3 parties distinctes répondant chacune à des besoins spécifiques.
### 1 - La partie Vente

Il s'agit de la partie la plus utilisée de Beethoven et reprend globalement les fonctionnalités de l'application Mozart.<br>
Elle permet principalement aux utilisateurs :
- De sélectionner les articles disponibles à la vente au foyer en fonction des périodes de la journée.

- D'acheter un ou plusieurs articles qui sont disponibles.

- D'annuler un achat qu'ils on récemment utiliser.

Cette partie vente répond à plusieurs besoins. D'une part, elle doit être intuitive d'utilisation afin d'optimiser le temps que chaque utilisateur va passer devant la caisse pour réaliser ses achats. Elle doit également être correctement organisée afin que toutes les informations nécessaires aux utilisateurs se trouve en une seule et unique page fixe (le format des caisses imposant cette contrainte).


### 2 - La partie Menus

Le but de la partie Menus est de lister les personnes qui ont acheté un menu au foyer et qui sont en attente d'être servis. Le besoin étant d'informer les clients  de leur place dans la liste d'attente, mais aussi de permettre aux permanenciers responsables de la préparation et du service des menus de les distribuer dans le bon ordre tout en ayant un suivi efficace de leur stock.<br>
Il faut également noter qu'un des besoins initial de cette partie était de se défaire de l'utilisation de tickets en papier qui faisaient office de liste d'attente auparavant. la finalité était d'adopter une démarche plus éco-responsable.  

### 3 - La partie Admin

L'application dispose également d'une page d'administration qui n'est accessible que par certains utilisateurs ayant les droits suffisants pour y accéder.<br>
Cette page d’administration permet :

- #### L'administation des télés
- #### La gestion des messages en bas des télés
- #### L'upload d'images
- #### La gestion des cartes
- #### Le tirage au sort des Goodies



## Fonctionnement global de l'application

## Authors
* **[PAIGNEAU Hugo](https://github.com/hugofloter)** - *Initial work*
* **[TERTRAIS Erwan](https://github.com/SuperNach0)** - *Initial work*
* **[RICHARD Quentin](https://github.com/qprichard)** - *Initial work*
* **[OBLED Aymeric](https://github.com/obledaym)** - *Initial work*
