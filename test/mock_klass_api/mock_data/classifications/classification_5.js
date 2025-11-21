module.export = {
	name: "Standard for næringsgruppering",
	lastModified: "2016-04-13T12:44:25.000+0000",
	description: "næringsgruppering",
	primaryLanguage: "Bokmål",
	internal: false,
	copyrighted: false,
	includeShortName: false,
	includeNotes: false,
	user: "David Bowie",
	owningSection: "Seksjon for primærnæringsstatistikk (430)",
	statisticalUnits: ["Arbeidsforhold", "Arbeidsforhold"],
	versions: [
		{
			name: "Næringsgruppering 2002",
			_links: {
				self: {
					href: "/versions/16",
				},
			},
		},
		{
			name: "Næringsgruppering 2007",
			_links: {
				self: {
					href: "/versions/17",
				},
			},
		},
	],
	_links: {
		self: {
			href: "/classifications/5",
		},
		codes: {
			href: "/classifications/5/codes{?from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		codesAt: {
			href: "/classifications/5/codesAt{?date=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		variant: {
			href: "/classifications/5/variant{?variantName,from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		variantAt: {
			href: "/classifications/5/variantAt{?variantName,date=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		corresponds: {
			href: "/classifications/5/corresponds{?targetClassificationId,from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
		correspondsAt: {
			href: "/classifications/5/correspondsAt{?targetClassificationId,date=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
		changes: {
			href: "/classifications/5/changes{?from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
	},
};
