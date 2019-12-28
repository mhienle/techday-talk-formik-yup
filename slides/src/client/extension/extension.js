
module.exports = {
    configure: function(Reveal, config) {
        return config;
    },

    configureCustomDependencies: function(Reveal, dependencies) {

        dependencies.push({ src: 'src/client/plugin/example-plugin.js' });
        return dependencies;
    }
};