module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: ['dist'],
    copy: {
      dist: {
        files: [
          { expand: true, cwd: 'node_modules/bootstrap/dist/', src: '**', dest: 'dist' }
        ]
      }
    },
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
          'dist/js/bundle.js': [ 'js/main.jsx' ]
        }
      }
    }
  });

  grunt.registerTask('default', ['clean', 'copy', 'browserify']);
}