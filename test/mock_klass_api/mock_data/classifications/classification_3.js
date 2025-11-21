module.exports = {
	name: "Standard for gruppering av familier",
	lastModified: "2016-04-11T17:48:53.000+0000",
	description:
		"Standarden beskriver de ulike familitypene som i dag brukes i SSBs familistatistikk",
	primaryLanguage: "Bokmål",
	internal: false,
	copyrighted: false,
	includeShortName: false,
	includeNotes: false,
	user: "Ziggy Stardust",
	owningSection: "714",
	statisticalUnits: [],
	versions: [
		{
			name: "Gruppering av familier 2006",
			_links: {
				self: {
					href: "/versions/11",
				},
			},
		},
	],
	_links: {
		self: {
			href: "/classifications/3",
		},
		codes: {
			href: "/classifications/3/codes{?from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		codesAt: {
			href: "/classifications/3/codesAt{?date=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		variant: {
			href: "/classifications/3/variant{?variantName,from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		variantAt: {
			href: "/classifications/3/variantAt{?variantName,date=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		corresponds: {
			href: "/classifications/3/corresponds{?targetClassificationId,from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
		correspondsAt: {
			href: "/classifications/3/correspondsAt{?targetClassificationId,date=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
		changes: {
			href: "/classifications/3/changes{?from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
	},
};
