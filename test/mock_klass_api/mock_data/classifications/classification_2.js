module.exports = {
	name: "Standard for bydelsinndeling",
	lastModified: "2016-04-11T17:48:52.000+0000",
	description:
		"Bydel utgjør geografiske områder i en kommune. I norsk offisiell statistikk er benevningen bydel knyttet til de fire største kommunene Oslo, Bergen, Trondheim og Stavanger.",
	primaryLanguage: "Bokmål",
	internal: false,
	copyrighted: false,
	includeShortName: false,
	includeNotes: false,
	user: "David Bowie",
	owningSection: "Seksjon for primærnæringsstatistikk (430)",
	statisticalUnits: [],
	versions: [
		{
			name: "Bydelsinndeling 2004",
			_links: {
				self: {
					href: "/versions/10",
				},
			},
		},
	],
	_links: {
		self: {
			href: "/classifications/2",
		},
		codes: {
			href: "/classifications/2/codes{?from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		codesAt: {
			href: "/classifications/2/codesAt{?date=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		variant: {
			href: "/classifications/2/variant{?variantName,from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		variantAt: {
			href: "/classifications/2/variantAt{?variantName,date=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		corresponds: {
			href: "/classifications/2/corresponds{?targetClassificationId,from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
		correspondsAt: {
			href: "/classifications/2/correspondsAt{?targetClassificationId,date=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
		changes: {
			href: "/classifications/2/changes{?from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
	},
};
