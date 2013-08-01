'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('Creating a new module by name of ' + this.name + '.');
};

util.inherits(ModuleGenerator, yeoman.generators.NamedBase);

ModuleGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    type: 'confirm',
    name: 'includeViews',
    message: 'Does this module have views?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.includeViews = props.includeViews;

    cb();
  }.bind(this));
};

ModuleGenerator.prototype.files = function files() {
  this.copy('_module.js', 'app/modules/' + this.name.toLowerCase() + '.js');
  this.copy('data/collection.json', 'data/' + this.name.toLowerCase() + '/collection.json');

  if ( this.includeViews ) {
      this.directory('templates', 'app/templates/' + this.name.toLowerCase() );
  }
};
