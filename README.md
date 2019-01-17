# Beethoven
Nouveau système de caisse du Pic'Asso qui permet d'acheter au foyer étudiant de l'Université de Technologie de Compiègne.

Cette application permet également de gérer la vente de menus, de modifier l'affichage des Télés et de gérer les cartes étudiantes au sein du foyer.

Frameworks utilisés : Django Rest Framework, Reactjs.

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

- D'annuler un achat qu'ils ont récemment effectué.

Cette partie vente répond à plusieurs besoins. D'une part, elle doit être intuitive d'utilisation afin d'optimiser le temps que chaque utilisateur va passer devant la caisse pour réaliser ses achats. Elle doit également être correctement organisée afin que toutes les informations nécessaires aux utilisateurs se trouve en une seule et unique page fixe (le format des caisses imposant cette contrainte).


### 2 - La partie Menus

Le but de la partie Menus est de lister les personnes qui ont acheté un menu au foyer et qui sont en attente d'être servis. Le besoin étant d'informer les clients  de leur place dans la liste d'attente, mais aussi de permettre aux permanenciers responsables de la préparation et du service des menus de les distribuer dans le bon ordre tout en ayant un suivi efficace de leur stock.<br>

Lorsqu'un menu est créé sur PicSous, on le retrouve directement dans la liste des menus disponibles et les télés affichent automatiquement les prochaines personnes qui vont être servies. En sélectionnant un menu, on peut voir le nombre de menus vendus par rapport au nombre de menus disponibles, ainsi que la liste des personnes qui en ont acheté. Une fois que tous les menus ont été servis, on peut directement supprimer ce menu depuis cette interface.


Il faut également noter qu'un des besoins initial de cette partie était de se défaire de l'utilisation de tickets en papier qui faisaient office de liste d'attente auparavant. la finalité était d'adopter une démarche plus éco-responsable.  

### 3 - La partie Admin

L'application dispose également d'une page d'administration qui n'est accessible que par certains utilisateurs ayant les droits suffisants pour y accéder (tous les droits weezevent sont nécessaires pour accéder à cette interface mais il serait préférable de créer des droits spéciaux qui ne passent pas par Weez).<br>
Cette page d’administration permet : <br>

- #### L'administation des télés
Cette partie permet de gérer facilement les télés (quand elles ne se font pas voler...). Les télés du Pic asso sont reliées a des RaspBerry pi 3 qui affichent une URL (respectivement URL/picbar et URL/picsalle). Cette interface permet sur chaque télé :<br>
De changer l'URL affichée;<br>
D'activer ou de désactiver les messages défilants;<br>
D'uploader une image sur le serveur et de l'afficher (l'image se sauvegarde).

- #### La gestion des cartes
Cette interface permet aux utilisateur de plus facilement gérer les cartes étudiantes. Lorsqu'une carte est badgée, deux choix sont proposés : On peut soit bloquer la carte pour une période de un an (le déblocage se faisant sur weezevent), soit envoyer un mail automatique au propriétaire de la carte pour lui signaler que sa carte a été retrouvée et qu'elle se trouve au pic.

- #### Le tirage au sort des Goodies
Avec la disparition des tickets il a fallu trouver une alternative pour tirer au sort les gagnants hebdomadaires de goodies. Cette interface permet de déterliner le nombre de personnes souhaité qui vont être tirées au sort et la période sur laquelle va s’effectuer le tirage.



## Fonctionnement global de l'application

## Authors
* **[PAIGNEAU Hugo](https://github.com/hugofloter)** - *Initial work*
* **[TERTRAIS Erwan](https://github.com/SuperNach0)** - *Initial work*
* **[RICHARD Quentin](https://github.com/qprichard)** - *Initial work*
* **[OBLED Aymeric](https://github.com/obledaym)** - *Initial work*
