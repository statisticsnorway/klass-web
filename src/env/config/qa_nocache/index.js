////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING!
// /config/index.js will be replaced with files from env/config/ when maven builds are executed.
// changes should be done in the  /env/config/ files
////////////////////////////////////////////////////////////////////////////////////////////////
const config = {
	API_BASE_URL: 'http://pl-klass-app-qa1.ssb.no:8080/api/klass/v1',
	API_LOCAL_BASE_URL: 'http://localhost:3001',
	API_LOCAL_STORAGE: false,
	OM_KLASS_URL: 'https://www.ssb.no/metadata/om-klass',
	OM_KLASS_URL_EN: 'https://www.ssb.no/en/metadata/om-klass',
	LANGUAGES: {
		BOKMAL: 'nb',
		NYNORSK: 'nn',
		ENGLISH: 'en'
	},
}

export default config;
