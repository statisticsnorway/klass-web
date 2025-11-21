module.exports = {
	name: "Standard for kommuneinndeling",
	classificationType: "Klassifikasjon",
	lastModified: "2016-05-18T15:46:56.000+0000",
	description:
		"Kommuneinndelingen er en administrativ inndeling av Norge. Kommunen er betegnelsen både på en politisk og forvaltningsmessig nivå og betegnelsen på et regionalt nivå i statistikken.",
	primaryLanguage: "Bokmål",
	copyrighted: false,
	includeShortName: false,
	includeNotes: true,
	contactPerson: {
		name: "hhe",
		email: "hhe@ssb.no",
		phone: "62 88 55 48",
	},
	owningSection: "320",
	statisticalUnits: ["Region"],
	versions: [
		{
			name: "Kommuneinndeling 2014",
			validFrom: "2014-01-01",
			validTo: "2015-12-01",
			_links: {
				self: {
					href: "/versions/175",
				},
			},
		},
		{
			name: "Kommuneinndeling 01-2013",
			validFrom: "2013-01-01",
			validTo: "2013-12-31",
			_links: {
				self: {
					href: "/versions/176",
				},
			},
		},
		{
			name: "Kommuneinndeling 01-2012",
			validFrom: "2012-01-01",
			validTo: "2012-12-31",
			_links: {
				self: {
					href: "/versions/177",
				},
			},
		},
		{
			name: "Kommuneinndeling 2008",
			validFrom: "2008-01-01",
			validTo: "2011-12-31",
			_links: {
				self: {
					href: "/versions/178",
				},
			},
		},
		{
			name: "Kommuneinndeling 2006",
			validFrom: "2006-01-01",
			validTo: "2007-12-31",
			_links: {
				self: {
					href: "/versions/179",
				},
			},
		},
		{
			name: "Kommuneinndeling 01-2005",
			validFrom: "2005-01-01",
			validTo: "2005-12-31",
			_links: {
				self: {
					href: "/versions/180",
				},
			},
		},
		{
			name: "Kommuneinndeling 2003",
			validFrom: "2003-01-01",
			validTo: "2004-12-31",
			_links: {
				self: {
					href: "/versions/181",
				},
			},
		},
		{
			name: "Kommuneinndeling 01-2002",
			validFrom: "2002-01-01",
			validTo: "2002-12-31",
			_links: {
				self: {
					href: "/versions/182",
				},
			},
		},
		{
			name: "Kommuneinndeling 2016",
			validFrom: "2016-01-01",
			validTo: "+999999999-12-31",
			_links: {
				self: {
					href: "/versions/470",
				},
			},
		},
	],
	_links: {
		self: {
			href: "/classifications/49",
		},
		codes: {
			href: "/classifications/49/codes{?from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		codesAt: {
			href: "/classifications/49/codesAt{?date=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		variant: {
			href: "/classifications/49/variant{?variantName,from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		variantAt: {
			href: "/classifications/49/variantAt{?variantName,date=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		corresponds: {
			href: "/classifications/49/corresponds{?targetClassificationId,from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
		correspondsAt: {
			href: "/classifications/49/correspondsAt{?targetClassificationId,date=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
		changes: {
			href: "/classifications/49/changes{?from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
	},
};
