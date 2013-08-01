<% lname = _.slugify(name) %>
<% uname = _.capitalize(lname) %>

define([
			 "app"
],
function(app) {

	// Create a module based off
	// the app template (in app.js)
	var <%= uname %> = app.module();

	<%= uname %>.Model = Backbone.Model.extend({
		idAttribute: "slug",

		defaults: {
			author: "",
			title: "",
		},

		initialize: function() {
			this.slugify();
			this.on("change:title", this.slugify);
		},

		slugify: function() {
			this.set("slug", _.slugify( this.get("title") ))
		}
	});

	<%= uname %>.Collection = Backbone.Collection.extend({
		model: <%= uname %>.Model,

		// Where to fetch the data from
		url: function() {
			return "/data/<%= lname %>/collection.json";
		},

		// How to handle the fetched data
		parse: function(obj) {
			return obj;
		},

		initialize: function(models, options) {
		}
	});

<% if (this.includeViews) { %>

	<%= uname %>.Views.Item = Backbone.View.extend({
		template:"<%= lname %>/item",
		tagName:"li",

		// The data that gets passed to the view
		serialize: function() {
			return {
				model: this.model.toJSON()
			};
		},

		// Bind some events
		events: {
			click: "showSingle"
		},

		showSingle: function(ev) {
			app.router.go("<%= lname %>", this.model.get("slug"));
		},

		// Do stuff before the view is rendered
		beforeRender: function() {
			// If this item has been activated...
			if ( app.active === this.model ) {
				this.$el.siblings().removeClass("active");
				this.$el.addClass("active");
			}
		}
	});

	<%= uname %>.Views.List = Backbone.View.extend({
		template: "<%= lname %>/list",
		className: "<%= lname %>--list",

		// The data that gets passed to the view
		serialize: function() {
			return {
				collection: this.options.collection,
				count: this.options.collection.length
			};
		},

		// Do stuff before the view is rendered
		beforeRender: function() {
			var view = this;

			// For each book in collection
			this.options.collection.each(function(model) {

				// Insert a Book item view with book to the ul
				view.insertView("ul", new <%= uname %>.Views.Item({
					model: model
				}));

			});
		},

		initialize: function() {
			// Listen to some events
			this.listenTo(this.options.collection, {
				"reset": function() {
					this.render();
				}
			});
		}
	});

	<%= uname %>.Views.Single = Backbone.View.extend({
		template: "<%= lname %>/single",
		className: "<%= lname %>--single",
		tagName:"section",

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
