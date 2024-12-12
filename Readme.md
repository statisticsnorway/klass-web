# Klass.ssb.no

Søk og utlisting av klassifikasjoner og kodeverk fra Rest API.

Denne applikasjonen bruker følgende teknologier:

- [Vite](http://vite.dev/)
- [npm](https://www.npmjs.com/)
- [React](https://facebook.github.io/react/) og [JSX](https://facebook.github.io/jsx/)
- [Redux](http://redux.js.org/)
- [Sass](http://sass-lang.com/)

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

## ssb.no ramme

Det er implementert statiske HTML komponenter for å plassere klass.ssb.no applikasjonen innenfor www.ssb.no sin ramme (header- og footer seksjon). Komponentene er implementert i ssbFrame.js og blir brukt i main.js å genere header og footer. CSS stiler er lenket direkte til ssb.no og kan forårsake crossdomain problemer. Legg merke til at endringer som blir gjort på rammen til ssb.no må synkroniseres og implementeres i den statiske fila ssbFrame.js.

## Språk

Klass.ssb.no har 2 separate språk implementasjoner. Den ene gjelder språk som blir hentet fra Rest API-et. Her gjøres det kall til API-et med en language parameter når man er inne på en spesifikk klassifikasjon. Den andre gjelder statiske tekster inkludert ssb rammen. Oversettelse av statiske tekster gjøres ved hjelp av et react translate komponent (react-translate-component). Dokumentasjon på hvordan dette brukes, finnes her: https://github.com/martinandert/react-translate-component

## Test

### Unit test

TODO

## Bygg og deploy

### Windows

Scriptet som kjøres ved bygg bruker linux kommandoer, blandt annet `rm`. For å bygge på Windows må en derfor enten bruke Cygwin (eller andre lignende linux løsninger), eller installere `GNU core utilities`
http://www.gnu.org/software/coreutils/

Kjør `mvn clean deploy -P[MiljøNavn]` for å bygge war fil.

### Linux/Mac

Sørg for at du har riktige versjoner av Node og NPM så skal `mvn clean deploy -P[MiljøNavn]` være tilstrekkelig for å bygge en war fil.

### Generelt

Klass Web bygges til en War fil og i tillegg til de statiske filene JS/html filene så inkluderes det en Java servlet som tar for seg omskriving av url (urlrewritefilter) slik at vi slipper `#!` eller andre parameter i urlen
Klass Web bygges per miljø, dersom en skal lage en release kan `build-and-deploy-all.sh` script benyttes.

## Feilsøking

Har du problemer med å bygge kan det være at du har for ny versjon av node eller NPM. Eldre versjoner kan lastes ned fra nodejs sine sider.
https://nodejs.org/dist/
Alternativt kan en bruke NVM (Node Version Manager) til å bytte versjon

[NVM for Windows](https://github.com/coreybutler/nvm-windows)

[NVM for Mac/Linux](https://github.com/creationix/nvm)
