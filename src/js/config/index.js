////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING!
// /config/index.js will be replaced with files from env/config/ when maven builds are executed.
// changes should be done in the  /env/config/ files
////////////////////////////////////////////////////////////////////////////////////////////////
const config = {
	API_BASE_URL: '//data.ssb.no/api/klass/v1',
	API_LOCAL_BASE_URL: 'http://localhost:3001',
	API_LOCAL_STORAGE: false,
	OM_KLASS_URL: 'https://www.ssb.no/metadata/om-klass',
	OM_KLASS_URL_EN: 'https://www.ssb.no/en/metadata/om-klass',
	LANGUAGES: {
		BOKMAL: 'nb',
		NYNORSK: 'nn',
		ENGLISH: 'en'
	},
    GA_TRACKING_ID:'UA-26520516-2'
}

export default config;
