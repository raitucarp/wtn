module.exports = function(grunt) {

    grunt.initConfig({
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['tests/**/*.js']
            }
        },
        watch: {
            files: ['index.js', 'tests/**/*.js'],
            tasks: ['mochaTest']
        }
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', 'mochaTest');
};