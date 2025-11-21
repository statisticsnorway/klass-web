module.exports = {
	name: "Standard for kommuneinndeling",
	classificationType: "Klassifikasjon",
	lastModified: "2016-06-30T11:57:54.000+0000",
	description:
		"Kommuneinndelingen er en administrativ inndeling av Norge. Kommunen er betegnelsen både på en politisk og forvaltningsmessig nivå og betegnelsen på et regionalt nivå i statistikken.",
	primaryLanguage: "Bokmål",
	copyrighted: false,
	includeShortName: false,
	includeNotes: true,
	contactPerson: {
		name: "Hartvedt, Henning",
		email: "Henning.Hartvedt@ssb.no",
		phone: "62885265",
	},
	owningSection: "320",
	statisticalUnits: ["Region"],
	versions: [
		{
			name: "Kommuneinndeling 2014",
			validFrom: "2014-01-01",
			validTo: "+999999999-12-31",
			_links: {
				self: {
					href: "/versions/943",
				},
			},
		},
		{
			name: "Kommuneinndeling 2013",
			validFrom: "2013-01-01",
			validTo: "2014-01-01",
			_links: {
				self: {
					href: "/versions/944",
				},
			},
		},
		{
			name: "Kommuneinndeling 2012",
			validFrom: "2012-01-01",
			validTo: "2013-01-01",
			_links: {
				self: {
					href: "/versions/945",
				},
			},
		},
		{
			name: "Kommuneinndeling 2008",
			validFrom: "2008-01-01",
			validTo: "2012-01-01",
			_links: {
				self: {
					href: "/versions/946",
				},
			},
		},
		{
			name: "Kommuneinndeling 2006",
			validFrom: "2006-01-01",
			validTo: "2008-01-01",
			_links: {
				self: {
					href: "/versions/947",
				},
			},
		},
		{
			name: "Kommuneinndeling 2005",
			validFrom: "2005-01-01",
			validTo: "2006-01-01",
			_links: {
				self: {
					href: "/versions/948",
				},
			},
		},
		{
			name: "Kommuneinndeling 2003",
			validFrom: "2003-01-01",
			validTo: "2005-01-01",
			_links: {
				self: {
					href: "/versions/949",
				},
			},
		},
		{
			name: "Kommuneinndeling 2002",
			validFrom: "2002-01-01",
			validTo: "2003-01-01",
			_links: {
				self: {
					href: "/versions/950",
				},
			},
		},
	],
	_links: {
		self: {
			href: "/classifications/262",
		},
		codes: {
			href: "/classifications/262/codes{?from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		codesAt: {
			href: "/classifications/262/codesAt{?date=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		variant: {
			href: "/classifications/262/variant{?variantName,from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		variantAt: {
			href: "/classifications/262/variantAt{?variantName,date=<yyyy-MM-dd>,csvSeparator,level,selectCodes,presentationNamePattern}",
			templated: true,
		},
		corresponds: {
			href: "/classifications/262/corresponds{?targetClassificationId,from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
		correspondsAt: {
			href: "/classifications/262/correspondsAt{?targetClassificationId,date=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
		changes: {
			href: "/classifications/262/changes{?from=<yyyy-MM-dd>,to=<yyyy-MM-dd>,csvSeparator}",
			templated: true,
		},
	},
};
