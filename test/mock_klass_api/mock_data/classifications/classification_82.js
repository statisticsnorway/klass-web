module.exports = {
	name: "Standard for yrkesklassifisering",
	classificationType: "Klassifikasjon",
	lastModified: "2016-05-18T15:52:02.000+0000",
	description:
		"Standarden er basert på den internasjonale standarden for yrkesklassifisering\n\nsom ILO har utarbeidet (International Standard Classification of Occupations -\n\nISCO 88). EU har utarbeidet en versjon av denne (ISCO-88(COM)) som danner\n\ngrunnlaget for den norske standarden. Standarden skal erstatte Nordisk\n\nYrkesklassifisering (NYK).Standard for yrkesklassifisering er beregnet for bruk i offisiell norsk statistikk og vil også være et viktig verktøy innen arbeidsformidling og yrkesrettledning.\n\nUnder arbeidet med den norske standarden er begge\n\ntyper brukerbehov tatt hensyn til. Ettersom ISCO-88(COM) i utgangspunktet\n\ner utviklet som en statistisk standard, vil nok fortsatt de statistiske behovene\n\nvære best ivaretatt. Arbeidsmarkeds-etaten vil arbeide videre med en\n\ninndeling av yrker for å dekke sine behov knyttet til formidlingsarbeidet. Det\n\nbetyr at noen yrker vil kunne deles inn finere, på 5-6 siffernivå, andre yrker\n\ngrovere, på 2-3 siffernivå. Inndelingen vil imidlertid følge ISCO-88(COM).",
	primaryLanguage: "Bokmål",
	copyrighted: false,
	includeShortName: true,
	includeNotes: true,
	contactPerson: {
		name: "iha",
		email: "iha@ssb.no",
		phone: "62 88 55 48",
	},
	owningSection: "260",
	statisticalUnits: ["Person"],
	versions: [
		{
			name: "Yrkesklassifisering 2011",
			validFrom: "2011-01-01",
			validTo: "+999999999-12-31",
			_links: {
				self: {
					href: "/versions/319",
				},
			},
		},
		{
			name: "Yrkesklassifisering 09-1998",
			validFrom: "1998-09-01",
			validTo: "2010-12-31",
			_links: {
				self: {
					href: "/versions/320",
				},
			},
		},
	],
	_links: {
		self: {
			href: "/classifications/82",
		},
		codes: {
			href: "/classifications/82/codes{?from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		codesAt: {
			href: "/classifications/82/codesAt{?date=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		variant: {
			href: "/classifications/82/variant{?variantName,from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		variantAt: {
			href: "/classifications/82/variantAt{?variantName,date=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		corresponds: {
			href: "/classifications/82/corresponds{?targetClassificationId,from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
		correspondsAt: {
			href: "/classifications/82/correspondsAt{?targetClassificationId,date=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
		changes: {
			href: "/classifications/82/changes{?from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
	},
};
