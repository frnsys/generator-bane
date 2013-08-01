Bane is originally based off of 
[tbranyen](https://github.com/tbranyen)'s brilliant [Backbone
Boilerplate](https://github.com/tbranyen/backbone-boilerplate). All
credit for Backbone Boilerplate goes to him and the
[contributors](https://github.com/tbranyen/backbone-boilerplate/contributors) to that project.

![Bane](http://supermedes.com/assets/bane.jpg)

Bane
====

This is a [Yeoman](http://yeoman.io/) generator for Bane.

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-bane`
- Run: `yo bane`

To create a new module, run:
    `yo bane:module <ModuleName>`
You will have to manually update `app/router.js`.

## About
This is basically a more "opinionated" version of Backbone Boilerplate.

Jade is added to save time from typing out redundant markup tags.
I've added my own Atomic styling microframework, which is a set of
common stylings I use. I encourage you to assemble something similar
that reflects your own style and swap it in!

## Changes
* [Jade](http://jade-lang.com/) added as the templating engine
* [Underscore.string](https://github.com/epeli/underscore.string) added
	to provide some extra string manipulation features
* Added my [Atomic](https://github.com/ftzeng/atomic) styling microframework (built with
	[Sass](http://sass-lang.com/))
* Integrated [Font Custom](http://fontcustom.com/) for generating custom
	icon fonts.
* Build system ([Grunt](http://gruntjs.com/)) customized
* Added some example code
* Distributed as a [Yeoman](http://yeoman.io/) generator
* Swapped out Jam, replaced with [Bower](http://bower.io/)

## Issues
I have been having issues with Bower, RequireJS, and Jade. The main path
as specified by the Bower Jade package's `component.json` (which is
        deprecated) is `vendor/bower/jade/lib/runtime`. However, to use
it as an AMD module, you must instead specify the path as:
```js
    // app/config.js
    paths: {
        // ...
        jade: 'vendor/bower/jade/runtime',
        // ...
    } 
```

## License
Bane is by Francis Tseng ([@frnsys](https://twitter.com/frnsys))

Backbone Boilerplate is Copyright (c) 2013 Tim Branyen
([@tbranyen](https://twitter.com/tbranyen))  

Licensed under the [MIT License](http://en.wikipedia.org/wiki/MIT_License)
