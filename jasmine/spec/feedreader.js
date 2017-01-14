/* feedreader.js
/* Author: Shruti Upreti
/* Email: shrutiupreti.nmims@gmail.com 
   References: https://jasmine.github.io/2.2/introduction
 
 * This spec file used Jasmine and contains all the test suites that will be tested against the RSS feeds application
 */

/* All the tests are placed within the $() function,
 * This will check that the tests run only if the DOM is ready. 
 */

$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This test ensures that the
         * allFeeds variable has been defined and not empty.
         */
        it('Are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

		/* This test will loop through the allFeeds object and
         * checks whether or not the url is defined and not empty.
         */
         it('URL is defined and is not empty', function() {
         	for(var i = 0; i < allFeeds.length; i++)
         	{
         		expect(allFeeds[i].url).toBeDefined();
         		expect(allFeeds[i].url.length).not.toEqual(0);
         	}
         });


        /* This test will loop through the allFeeds object and
         * checks whether or not the name is defined and not empty.
         */
         it('Name is defined and not empty', function() {
         	for(var i = 0; i < allFeeds.length; i++)
         	{
         		expect(allFeeds[i].name).toBeDefined();
         		expect(allFeeds[i].name.length).not.toEqual(0);
         	}
         });
    });


    /* Contains the test suite menu */

    describe('The menu', function() {

    	/* This test will grab the menu-hidden class from the DOM 
         * and then the menu is checked to see if its already hidden
         */

         it('Checks if the menu element is hidden by default', function() {
         	expect(document.body.className).toContain('menu-hidden');
         });

         /* This test ensures that the menu changes
          * visibility when the menu icon is clicked and
          * hides back on the second click
          */

         it('Menu changes visibility when menu icon is clicked', function() {
          	$('a.menu-icon-link').click();
          	expect(document.body.className).not.toContain('menu-hidden');

          	$('a.menu-icon-link').click();
          	expect(document.body.className).toContain('menu-hidden');
		});
	});
      
    // Initial Entries test suite

    describe('Initial Entries', function() {

        /* This test that ensures while the loadFeed
         * gets called, then there should atleast be an entry in
         * .feed container.
         */
 		beforeEach(function(done) {
            loadFeed(0, done);
        });
        
        it('Are loaded in feed container', function() {
            var loadedArticle = $(".feed article.entry");
            var articleLength = loadedArticle.length;
            expect(articleLength).toBeGreaterThan(0);
        });
    });

    //New Feed selection test suite

    describe('New Feed selection', function() {
        var oldFeed;
        var newFeed;

        beforeEach(function() {
            // This will store the old content in the variable oldFeed which then will be used for comparision with the old feed.

            loadFeed(0, function() {
                oldFeed = $('.entry').html();
                
            });
        });

        //Checks if the new feed is not the same as the old feed
        it('Loads the new feed', function(done) {
            
            loadFeed(1, function() {
                newFeed = $('.entry').html();
                expect(newFeed).not.toEqual(oldFeed);
                done();
            });
        });
    });
 
 }());
