# Klass.ssb.no
Søk og utlisting av klassifikasjoner og kodeverk fra Rest API.

Denne applikasjonen bruker følgende teknologier:
- [Webpack](http://webpack.github.io/)
- [npm](https://www.npmjs.com/)
- [Babel](http://babeljs.io/) 6
- [React](https://facebook.github.io/react/) og [JSX](https://facebook.github.io/jsx/)
- [Redux](http://redux.js.org/)
- [Sass](http://sass-lang.com/)
- [Protractor](https://angular.github.io/protractor/) (e2e testing med [Selenium WebDriver](http://www.seleniumhq.org))
- [Mocha](https://mochajs.org/) / [Chai](http://chaijs.com/) (Test rammeverk for unit testing)

## Installasjon
```
Last ned Node.js
Fungerende versjon: Node (v4.2.2) og npm (v2.14.7)
$ git clone https://git-adm.ssb.no/scm/klas/klass.ssb.no.git app-name
$ cd app-name
$ npm install
```

### Konfiguere Protractor for e2e testing
Protractor blir installert via `npm install` men krever i tillegg Selenium standalone server og Chromedriver for å kunne kjøre testene lokalt via Chrome sin nettleser. Last ned `selenium-server-standalone-{VERSION}.jar` fil fra [Selenium sin hjemmeside](http://selenium-release.storage.googleapis.com/index.html) og plasser den i denne mappen: `/node_modules/protractor/node_modules/webdriver-manager/selenium/`. For å teste med Chrome sin nettleser, last ned [ChromeDriver binary fila](http://chromedriver.storage.googleapis.com/index.html) og plasser den i samme mappe. Protractor konfigurasjonsfila ligger i rotmappen og er pt konfigurert til å bruke følgende versjoner:
- seleniumVersion: 2.53.1
- chromedriverVersion: 2.22

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
|   |   +-- ssbFrame.js	// Statiske HTML komponenter for å lage ssb.no rammen rundt applikasjonen
|   |   +-- routes.js	// Håndterer routing
|   +-- styles			// Felles stil-filer (bl.a. fra ssb.no)
|   +-- index.html
+-- test
```


## ssb.no ramme
Det er implementert statiske HTML komponenter for å plassere klass.ssb.no applikasjonen innenfor www.ssb.no sin ramme (header- og footer seksjon). Komponentene er implementert i ssbFrame.js og blir brukt i main.js å genere header og footer. CSS stiler er lenket direkte til ssb.no og kan forårsake crossdomain problemer. Legg merke til at endringer som blir gjort på rammen til ssb.no må synkroniseres og implementeres i den statiske fila ssbFrame.js.


## Språk
Klass.ssb.no har 2 separate språk implementasjoner. Den ene gjelder språk som blir hentet fra Rest API-et. Her gjøres det kall til API-et med en language parameter når man er inne på en spesifikk klassifikasjon. Den andre gjelder statiske tekster inkludert ssb rammen. Oversettelse av statiske tekster gjøres ved hjelp av et react translate komponent (react-translate-component). Dokumentasjon på hvordan dette brukes, finnes her: https://github.com/martinandert/react-translate-component


## Test
### Ende til ende test
e2e tester ligger følgende mappe: `/test/e2e/spec`.
Åpne tre terminaler for å kjøre testene lokalt:
- `nodemon src/js/server`: Starte opp API mock server lokalt
- `npm run webpack-mock`: Starte opp klass.ssb.no applikasjonen
- `npm run test-e2e`: Starter e2e testene via protractor mot din lokale mock server


### Unit test


## Bygg og deploy
