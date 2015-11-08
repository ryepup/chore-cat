module.exports = function(config) {
  config.set({
    files: ['src/**/*.spec.js'],
    frameworks: ['jasmine', 'browserify'],
    browsers: ['PhantomJS'],
    preprocessors: {
      'src/**/*.js': 'browserify'
    }
  });
};
