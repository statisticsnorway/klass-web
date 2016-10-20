////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING!
// /config/index.js will be replaced with files from env/config/ when maven builds are executed.
// changes should be done in the  /env/config/ files
////////////////////////////////////////////////////////////////////////////////////////////////
const config = {
	API_BASE_URL: '//data.ssb.no/api/klass/v1/',
	API_LOCAL_BASE_URL: 'http://localhost:3001',
	API_LOCAL_STORAGE: false,
	LANGUAGES: {
		BOKMAL: 'nb',
		NYNORSK: 'nn',
		ENGLISH: 'en'
	}
}

export default config;
