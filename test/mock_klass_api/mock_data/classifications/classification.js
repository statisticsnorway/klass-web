module.exports = {
	name: "Standard for kommuneinndeling",
	lastModified: "2016-04-15T11:36:16.000+0000",
	description: "kommuneinndeling",
	primaryLanguage: "Bokmål",
	internal: false,
	copyrighted: false,
	includeShortName: false,
	includeNotes: true,
	user: "Ziggy Stardust",
	owningSection: "714",
	statisticalUnits: [
		"Region",
		"Region",
		"Region",
		"Region",
		"Region",
		"Region",
		"Region",
		"Region",
		"Region",
	],
	versions: [
		{
			name: "Kommuneinndeling 2002",
			_links: {
				self: {
					href: "/versions/1",
				},
			},
		},
		{
			name: "Kommuneinndeling 2003",
			_links: {
				self: {
					href: "/versions/2",
				},
			},
		},
		{
			name: "Kommuneinndeling 2005",
			_links: {
				self: {
					href: "/versions/3",
				},
			},
		},
		{
			name: "Kommuneinndeling 2006",
			_links: {
				self: {
					href: "/versions/4",
				},
			},
		},
		{
			name: "Kommuneinndeling 2008",
			_links: {
				self: {
					href: "/versions/5",
				},
			},
		},
		{
			name: "Kommuneinndeling 2012",
			_links: {
				self: {
					href: "/versions/6",
				},
			},
		},
		{
			name: "Kommuneinndeling 2013",
			_links: {
				self: {
					href: "/versions/7",
				},
			},
		},
		{
			name: "Kommuneinndeling 2014",
			_links: {
				self: {
					href: "/versions/8",
				},
			},
		},
		{
			name: "Kommuneinndeling 2026",
			_links: {
				self: {
					href: "/versions/9",
				},
			},
		},
	],
	_links: {
		self: {
			href: "/classifications/1",
		},
		codes: {
			href: "/classifications/1/codes{?from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		codesAt: {
			href: "/classifications/1/codesAt{?date=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		variant: {
			href: "/classifications/1/variant{?variantName,from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		variantAt: {
			href: "/classifications/1/variantAt{?variantName,date=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		corresponds: {
			href: "/classifications/1/corresponds{?targetClassificationId,from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
		correspondsAt: {
			href: "/classifications/1/correspondsAt{?targetClassificationId,date=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
		changes: {
			href: "/classifications/1/changes{?from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
	},
};
