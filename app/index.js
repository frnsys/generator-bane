'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var BaneGenerator = module.exports = function BaneGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BaneGenerator, yeoman.generators.Base);

BaneGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(bane);

  var prompts = [{
    type: 'input',
    name: 'projectName',
    message: 'What is your project\'s name?',
    default: 'Bane'
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;

    cb();
  }.bind(this));
};

BaneGenerator.prototype.app = function app() {
  this.directory('app', 'app');
  this.directory('assets', 'assets');
  this.directory('source', 'source');
  this.directory('data', 'data');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('index.html', 'index.html');
  this.copy('favicon.ico', 'favicon.ico');
};

BaneGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('gitignore', '.gitignore');
  this.copy('bowerrc', '.bowerrc');
  this.copy('csslintrc', '.csslintrc');
  this.copy('jshintrc', '.jshintrc');
  this.copy('Gruntfile.js', 'Gruntfile.js');
};

BaneGenerator.prototype.h5bp = function h5bp() {
  var cb = this.async();

  this.remote('h5bp', 'html5-boilerplate', 'master', function(err, remote) {
      if (err) {
          return cb(err);
      }
      remote.copy('.htaccess', '.htaccess');
      remote.copy('crossdomain.xml', 'crossdomain.xml');
      remote.copy('humans.txt', 'humans.txt');
      remote.copy('robots.txt', 'robots.txt');
      cb();
  }, true);
};

BaneGenerator.prototype.stylesheets = function stylesheets() {
    var cb = this.async();

    this.remote('ftzeng', 'atomic', 'master', function(err, remote) {
        if (err) {
            return cb(err);
        }
        remote.directory('.', 'app/styles/');
        cb();
    }, true);
};


var bane =
'\n\t _____ _____ _____ _____ '.blue+
'\n\t| __  |  _  |   | |   __|'.blue+
'\n\t| __ -|     | | | |   __|'.blue+
'\n\t|_____|__|__|_|___|_____|'.blue+
'\n\n\t   [A Yeoman generator]\n\n';

