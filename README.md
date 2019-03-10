# Application Cadeaux
Réalisé par Clément ARESCALDINO, Philippe PRADELLE et Dimitri DUMONT.

Notre application est une application web et mobile (PWA) réalisé dans le cadre du 3ème projet de la licence professionnelle WIMSI de l'IUT de Reims.

## Choix technoogiques
Nous avons choisi de réaliser une Progressive Web Application pour ce projet. Nous avons fait ce choix pour répondre à la problématique du projet : notre application doit être disponible sur le web et sur mobile.

Pour ce qui est de l'API, nous avons choisi d'utiliser GraphQL.
Pour la partie front-end nous utilisons React.

Pour la connexion, nous avons choisi d'utiliser les JSON Web Tokens. Cependant, nous avons rencontré des difficultés pour le stockage en local sécurisé du token. Nous avons essayé d'utiliser react-x-keychain sans succès. Pour résoudre ce problème, nous avons choisi d'utiliser le localStorage étant donné que c'est un projet universitaire (cette solution n'est pas recommandée pour un projet commercialisé).

Pour mener à bien notre projet, nous avons utilisé plusieurs outils :
- redux : https://redux.js.org/
- material-ui : https://material-ui.com/
- react-calendar : https://www.npmjs.com/package/react-calendar
- react-x-keychain : https://www.npmjs.com/package/react-x-keychain

## Fonctionnement de l'application
Le but de l'application est de ne pas oublier les événenements importants à venir (comme par exemple les anniversaires, les fêtes de fin d'année, etc). 

Pour cela, notre application répond à cette problèmatique. Pour commencer, vous pouvez ajouter des contacts. Ainsi, la date de leur anninversaire est ajoutée dans votre calendrier.

Dans ce calendrier, vous pourrez ajouter des événéments qui seront liés à une date chacun. Une fois l'événement créé, vous pouvez ajouter un contact à celui-ci. Enfin, vous pouvez aussi modifier les informations de l'événement afin de lui ajouter une description et un budget.

Afin d'utiliser l'application, vous devez vous créer un compte. Une fois votre compte créé, vous pouvez vous connecter. Il se peut que vous oubliez votre mot de passe, si cela arrive, n'ayez crainte ! Il suffit de se rendre sur la page "Mot de passe oublié". Une fois votre nom d'utilisateur entré, vous recevrez un nouveau mot de passe sur votre adresse mail. 

Si vous le souhaitez, vous pourrez modifier vos informations personnelles en allant sur votre profil.

## Documentation technique
L'application ce connecté a l'api et ne réalise que de l'affichage, tout en évitant la surcharger de requête, telle que redemander les mêmes informations ou fetch après une modification. Mais l'application a étais un gros enjeu pour créer des composant modulable pour tout les format d'écran afin de respecter notre projet de développer une PWA.

On as donc eu recours a des dialogue et l'utilisation de state et redux afin de permettre à l'utilisateur un grand dynamisme dans l'utilisation.   