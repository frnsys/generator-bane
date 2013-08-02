define([
			 'app'
],
function(app) {
    'use strict';
<% lname = _.slugify(name); uname = _.capitalize(lname) %>
	// Create a module based off
	// the app template (in app.js)
	var <%= uname %> = app.module();

	<%= uname %>.Model = Backbone.Model.extend({
		idAttribute: 'slug',

		defaults: {
			author: '',
			title: '',
		},

		initialize: function() {
			this.slugify();
			this.on('change:title', this.slugify);
		},

		slugify: function() {
			this.set('slug', _.slugify( this.get('title') ));
		}
	});

	<%= uname %>.Collection = Backbone.Collection.extend({
		model: <%= uname %>.Model,

		// Where to fetch the data from
		url: function() {
			return '/data/<%= lname %>/collection.json';
		},

		// How to handle the fetched data
		parse: function(obj) {
			return obj;
		},

		initialize: function(models, options) {
            // Remove this method you don't need it.
            console.log(models);
            console.log(options);
		}
	});

<% if (includeViews) { %>

	<%= uname %>.Views.Item = Backbone.View.extend({
		template:'<%= lname %>/item',
		tagName:'li',

		// The data that gets passed to the view
		serialize: function() {
			return {
				model: this.model.toJSON()
			};
		},

		// Bind some events
		events: {
			click: 'showSingle'
		},

		showSingle: function() {
			app.router.go('<%= lname %>', this.model.get('slug'));
		}
	});

	<%= uname %>.Views.List = Backbone.View.extend({
		template: '<%= lname %>/list',
		className: '<%= lname %>--list',

		// The data that gets passed to the view
		serialize: function() {
			return {
				collection: this.options.collection,
				count: this.options.collection.length
			};
		},

		initialize: function() {
			// Listen to some events
			this.listenTo(this.options.collection, {
				'reset': function() {
					this.render();
				}
			});

            this.on('beforeRender', function(view) {
                // For each <%= lname %> in collection
                this.options.collection.each(function(model) {
                    // Insert a <%= uname %> item view with <%= lname %> to the ul
                    view.insertView("ul", new <%= uname %>.Views.Item({
                        model: model
                    }));
                });
            });
		}
	});

	<%= uname %>.Views.Single = Backbone.View.extend({
		template: '<%= lname %>/single',
		className: '<%= lname %>--single',
		tagName:'section',

		serialize: function() {
			return {
				model: this.model.toJSON()
			};
		}
	});

<% } %>

	// Return the module for AMD compliance
	return <%= uname %>;
});
