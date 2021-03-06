define([
			 // Application.
			 'app'

			 // Modules.
			 //'modules/book'
], function(app /*, Book */) {
    'use strict';

	var Router = Backbone.Router.extend({
		initialize: function() {
			var collections = {
				//books: new Book.Collection()
			};

			// Attach collections to the router
			// i.e. this.books
			_.extend(this, collections);
		},

		routes: {
			'': 'index'
			//'book/:slug': 'book'
		},

		index: function() {
            this.reset();

			// Create main layout (main.jade)
			app.useLayout('main').setViews({
				//'.hello': new Book.Views.List({ collection: this.books })
			}).render();

			//this.books.fetch({ reset: true });
		},

		book: function(slug) {
            console.log(slug);
			//var books = this.books;
			//books.fetch({
				//success: function() {
					//var book = books.get(slug);
					//app.useLayout('main').setViews({
						//'.hello': new Book.Views.Single({ model: book })
					//}).render();
				//}
			//});
		},

		reset: function() {
			// Reset collections to initial state
			//if (this.books.length) {
				//this.books.reset();
			//}
		},

		// Shortcut for building a url
		go: function() {
			return this.navigate(_.toArray(arguments).join('/'), true);
		}
	});

	return Router;
});
