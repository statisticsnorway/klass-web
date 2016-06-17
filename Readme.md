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
Last ned Node.js
Fungerende versjon: Node (v4.2.2) og npm (v2.14.7)
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

## Kodestruktur

```
.
+-- bin
|   +-- buildHtml.js	// script fil for å generere produksjonskode fra index.html
+-- config				// Konfigurasjonsfiler for webpack
|   +-- webpack.config.dev.js
|   +-- webpack.config.prod.js
+-- src
|   +-- images
|   +-- js
|   |   +-- actions		// Inneholder web api metodekall. Sender/mottar data fra applikasjonen
|   |   |   +-- index.js
|   |   +-- components	// Minimale stateless komponenter
|   |   |   +-- List
|   |   |   +-- Modal
|   |   |   +-- Search
|   |   |   +-- Tabs
|   |   |   +-- Sidebar.js
|   |   +-- config		// Konfigurasjoner for applikasjonen
|   |   +-- constants	// Definisjoner av type attributter som indikerer hvilken action som blir utført
|   |   +-- containers	// connected to the state
|   |   +-- lib			// Biblioteksfiler
|   |   +-- middleware	// Mottar request og genererer response i f.eks. asynkrone API kall. Brukes også til å logge state
|   |   +-- reducers	// Håndterer state som kommer fra action response. Inneholder metoder som tar inn foregående state og action, og returnerer nye state. Bør være ren og ikke inneholde metoder som manipulerer data.
|   |   +-- server		// Lokal Express server for å lage mock data
|   |   +-- store		// Holder/bevarer applikasjonens state. Håndterer state aksessering
|   |   +-- views		// statiske view
|   |   +-- main.js		// Hoved applikasjonsfil
|   |   +-- routes.js	// Håndterer routing
|   +-- styles			// Felles stil-filer (bl.a. fra ssb.no)
|   +-- index.html
+-- test
```
