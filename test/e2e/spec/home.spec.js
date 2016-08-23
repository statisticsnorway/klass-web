describe('Home page', () => {
    // before each 'it' of the following describe:
    beforeEach(() => {
        // go to page (if not yet)
        goToUrl('/#/');
    });

    it('should have a correct title', () => {
        expect(browser.getTitle()).toEqual('Klassifikasjoner og kodelister')
    });

    describe('Load classFamilies', () => {
        it('should load 18 visible classFamilies', () => {
            const classFamilies = element.all(by.css('li.hovedemne'));
            expect(classFamilies.count()).toEqual(18);
        })

        describe('Click on a classification family', () => {
            const naeringsgruppering = element.all(by.css('li.hovedemne')).get(17);
            beforeEach(() => {
                naeringsgruppering.$('a').click().then(() => {
                    waitUntilIsElementPresent(by.css('ol.delemne-children'));
                })
            })
            it('should load 6 classifications', () => {
                const classifications = element.all(by.css('ol.delemne-children > li'));
                expect(classifications.count()).toEqual(6);
            })
        })
    })
})
