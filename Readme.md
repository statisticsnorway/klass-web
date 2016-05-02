# Metadataportal
Søk og utlisting av klassifikasjoner og kodeverk fra Rest API.

Denne applikasjonen bruker følgende teknologier:
- [Webpack](http://webpack.github.io/)
- [npm](https://www.npmjs.com/)
- [Babel](http://babeljs.io/) 6
- [React](https://facebook.github.io/react/) og [JSX](https://facebook.github.io/jsx/)
- [Redux](http://redux.js.org/)
- [Sass](http://sass-lang.com/)
- [Mocha](https://mochajs.org/)
- [Chai](http://chaijs.com/)

## Installasjon
```
$ git clone https://git-adm.ssb.no/scm/klas/klass.ssb.no.git app-name
$ cd app-name
$ npm install
```

## Oppstart
Applikasjonen bruker et Rest API fra [Klass](http://al-klass-app-u1.ssb.no:8080/rest/v1) ([dokumentasjon](http://al-klass-app-u1.ssb.no:8080/docs/api-guide.html)). Dersom API-et er utilgjengelig, kan applikasjonen bruke mock data som ligger i følgende mappe: `src/js/server/`. Da må konfigurasjonsfila endres til å peke BASE_URL mot localhost istedenfor API url-en. konfigurasjonsfila ligger her: `src/js/config/index.js`. For å bruke mockdata, må det kjøres en egen lokal server parallelt med applikasjonen:
```
$ nodemon src/js/server
```

For å starte applikasjonen, kjør følgende kommando:
```
$ npm start
```
