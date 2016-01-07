module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          browserifyOptions: {
            ignoreMissing: true,
            extensions:  ['.js', '.jsx']
          },
          transform: [
            [ 'babelify', { presets: [ 'es2015', 'react' ] } ]
          ]
        },
        files: {
          'js/bundle.js': [ 'js/main.jsx' ]
        }
      }
    }
  });

  grunt.registerTask('default', ['browserify']);
}