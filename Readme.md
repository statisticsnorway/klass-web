# Klass web

Søk og utlisting av klassifikasjoner og kodeverk fra Klass API.

## Avhengigheter

Requires node 20

Installere avhengigheter slik:

```shell
npm install
```

## Oppstart

```shell
npm start
```

NB: Applikasjonen konsumerer Rest APIet fra Klass ([dokumentasjon](https://data.ssb.no/api/klass/v1/api-guide.html)). Dersom API-et er utilgjengelig, kan applikasjonen bruke mock data som ligger i følgende mappe: `src/js/server/`. Da må konfigurasjonsfila endres til å peke BASE_URL mot localhost istedenfor API url-en. konfigurasjonsfila ligger her: `src/js/config/index.js`. For å bruke mockdata, må det kjøres en egen lokal server parallelt med applikasjonen:

### Oppstart med Docker

```shell
npm run docker
```

## Miljøer

Det finnes config for ulike miljøer i `src/env/config/<miljønavn>/index.js`. Disse filene burde kopieres til `src/js/config/index.js` for at verdiene skal gjelde. Det er implementert håndtering av dette i `Dockerfile` der man kan spesifisere `--build-arg "target_env=test"` på kommandolinje for å velge et miljø. Forventede verdier er `test` og `prod`.

## Prosjektstruktur

```
.
+-- bin
|   +-- buildHtml.js // script fil for å generere produksjonskode fra index.html
+-- config    // Konfigurasjonsfiler for webpack
|   +-- webpack.config.dev.js
|   +-- webpack.config.prod.js
+-- src
|   +-- images
|   +-- js
|   |   +-- actions  // Inneholder web api metodekall. Sender/mottar data fra applikasjonen
|   |   |   +-- index.js
|   |   +-- components // Minimale stateless komponenter
|   |   |   +-- List
|   |   |   +-- Modal
|   |   |   +-- Search
|   |   |   +-- Tabs
|   |   |   +-- Sidebar.js
|   |   +-- config  // Konfigurasjoner for applikasjonen
|   |   +-- constants // Definisjoner av type attributter som indikerer hvilken action som blir utført
|   |   +-- containers // connected to the state
|   |   +-- lib   // Biblioteksfiler
|   |   +-- middleware // Mottar request og genererer response i f.eks. asynkrone API kall. Brukes også til å logge state
|   |   +-- reducers // Håndterer state som kommer fra action response. Inneholder metoder som tar inn foregående state og action, og returnerer nye state. Bør være ren og ikke inneholde metoder som manipulerer data.
|   |   +-- server  // Lokal Express server for å lage mock data
|   |   +-- store  // Holder/bevarer applikasjonens state. Håndterer state aksessering
|   |   +-- views  // statiske view
|   |   +-- main.js  // Hoved applikasjonsfil
|   |   +-- ssbFrame.js // Statiske HTML komponenter for å lage ssb.no rammen rundt applikasjonen
|   |   +-- routes.js // Håndterer routing
|   +-- styles   // Felles stil-filer (bl.a. fra ssb.no)
|   +-- index.html
```

## ssb.no ramme

Det er implementert statiske HTML komponenter for å plassere klass.ssb.no applikasjonen innenfor <www.ssb.no> sin ramme (header- og footer seksjon). Komponentene er implementert i ssbFrame.js og blir brukt i main.js å genere header og footer. CSS stiler er lenket direkte til ssb.no og kan forårsake crossdomain problemer. Legg merke til at endringer som blir gjort på rammen til ssb.no må synkroniseres og implementeres i den statiske fila ssbFrame.js.

## Språk

Klass.ssb.no har 2 separate språk implementasjoner. Den ene gjelder språk som blir hentet fra Rest API-et. Her gjøres det kall til API-et med en language parameter når man er inne på en spesifikk klassifikasjon. Den andre gjelder statiske tekster inkludert ssb rammen. Oversettelse av statiske tekster gjøres ved hjelp av et react translate komponent (react-translate-component). Dokumentasjon på hvordan dette brukes, finnes her: <https://github.com/martinandert/react-translate-component>

## Bygg og deploy

Klass-web serves med nginx på Nais.
