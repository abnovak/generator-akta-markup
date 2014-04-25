'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AktaMarkupGenerator = module.exports = function AktaMarkupGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AktaMarkupGenerator, yeoman.generators.Base);

AktaMarkupGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'input',
    name: 'appName',
    message: 'What is the name for this App?'
  },{
    type: 'list',
    name: 'bootstrapType',
    message: 'Would you like to include bootstrap in this project? If so, which version?',
    choices: ['No Bootstrap', 'Bootstrap v3 (Official - Less)', 'Bootstrap v3 (Official Sass Port)', 'Bootstrap v2 (Official - Less)']
  }];

  this.prompt(prompts, function (props) {
    // this.someOption = props.someOption;
    this.appName = props.appName
    this.bootstrapType = props.bootstrapType;

    cb();
  }.bind(this));
};

AktaMarkupGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');
  this.mkdir('app/templates/partials');
  this.mkdir('app/templates/layouts');
  this.mkdir('app/css');
  this.mkdir('app/scss');
  this.mkdir('app/images');
  this.mkdir('app/js');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.template('server.js', 'server.js');
  this.template('build.js', 'build.js');
};

AktaMarkupGenerator.prototype.runtime = function runtime() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
  this.copy('file_config.json', 'file_config.json');
}

AktaMarkupGenerator.prototype.projectfiles = function projectfiles() {
  this.template('_index.html', 'app/templates/index.html');  
  this.copy('main.js', 'app/js/main.js');
};

AktaMarkupGenerator.prototype.bootstrapFiles = function bootstrapFiles() {
  // map format -> package name
  var packages = {
    'No Bootstrap': '',
    'Bootstrap v3 (Official - Less)': 'bootstrap',
    'Bootstrap v3 (Official Sass Port)': 'bootstrap-sass',
    'Bootstrap v2 (Official - Less)':'https://github.com/twbs/bootstrap/tree/v2.3.2'
  };

  this.bowerInstall(packages[this.bootstrapType], { save: true });
};
