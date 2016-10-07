const config = {
	//TEST [no cache]
	// API_BASE_URL: 'http://al-klass-app-u1.ssb.no:8080/api/klass/v1/',
	// API_BASE_URL: 'http://klass-test.ssb.no/api/klass/v1/',
	//PROD
	API_BASE_URL: '//data.ssb.no/api/klass/v1/',
	// API_BASE_URL: 'http://localhost:8080/api/klass/v1',
	// API_BASE_URL: 'http://localhost:8080/rest/v1',
	// API_BASE_URL: 'http://localhost:3001',
	API_LOCAL_BASE_URL: 'http://localhost:3001',
	API_LOCAL_STORAGE: false,
	LANGUAGES: {
		BOKMAL: 'nb',
		NYNORSK: 'nn',
		ENGLISH: 'en'
	}
}

export default config;
