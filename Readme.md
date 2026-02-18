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

## ssb.no ramme

Det er implementert statiske HTML komponenter for å plassere klass.ssb.no applikasjonen innenfor <www.ssb.no> sin ramme (header- og footer seksjon). Komponentene er implementert i ssbFrame.js og blir brukt i main.js å genere header og footer. CSS stiler er lenket direkte til ssb.no og kan forårsake crossdomain problemer. Legg merke til at endringer som blir gjort på rammen til ssb.no må synkroniseres og implementeres i den statiske fila ssbFrame.js.

## Språk

Klass.ssb.no har 2 separate språk implementasjoner. Den ene gjelder språk som blir hentet fra Rest API-et. Her gjøres det kall til API-et med en language parameter når man er inne på en spesifikk klassifikasjon. Den andre gjelder statiske tekster inkludert ssb rammen. Oversettelse av statiske tekster gjøres ved hjelp av et react translate komponent (react-translate-component). Dokumentasjon på hvordan dette brukes, finnes her: <https://github.com/martinandert/react-translate-component>

## Bygg og deploy

Klass-web serves med nginx på Nais.

## Release

1. Skap en branch med navn for release versjon f.eks `git checkout -b release/v1.14.10`
1. Kjør kommando for å bumpe versjon f.eks `npm version patch`
1. Åpne PR
1. Etter merge bruk GitHub sin UI for å skape en release
1. Det skal trigge automatisk bygg og deploy til prod
