# react-native-movie
Réalisation d'une application de recherche et gestion de film en React Native avec l'utilisation de l'API themoviedb.org.

L'application est basée sur le tutoriel suivant : https://openclassrooms.com/fr/courses/4902061-developpez-une-application-mobile-react-native

## Développement
Créer un fichier .env en ajoutant votre clé d'API themoviedb dans la constante TMDB_API_TOKEN. (voir .env.example)

Lancer la commande suivante :
```
npm i && npm start
```

## Build Android

En plus du fichier .env, créer un fichier keystore.properties dans android/app avec les informations de votre keystore.
```
STORE_FILE=react-native-movies.keystore
KEY_ALIAS=my-alias
STORE_PASSWORD=password
KEY_PASSWORD=password
```

Executer la commande suivante pour générer la version.
```
npm i && cd android && ./gradlew assembleRelease
```

## Build iOS
Non testée sous l'environnement Apple.
