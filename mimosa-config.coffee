exports.config =
  minMimosaVersion:'0.10.0'

  modules: ['server', 'require', 'minify', 'live-reload', 'combine', 'mimosa-requirebuild-textplugin-include', 'skeleton', 'web-package']

  combine:
    folders: [
      {
        folder:'Content'
        output:'Content/styles.css'
        order: ['bootstrap.css', 'bootstrap-responsive.css']
        exclude: [/[\\\/]font[\\\/]/, /[\\\/]images[\\\/]/]
      }
      {
        folder:'Scripts'
        output:'Scripts/vendor.js'
        order: ['jquery-1.9.1.js', 'knockout-2.2.1.js']
      }
    ]

  watch:
    javascriptDir: 'App'

  server:
    port: 3000
    path: 'server.js'
    #defaultServer:
      # enabled: true
      # onePager: true


    views:
      compileWith: 'html'
      extension: 'html'

  requireBuildTextPluginInclude:
    pluginPath: 'text'
    extensions: ['html']

  require:
    optimize:
      overrides:
        name: 'durandal/amd/almond-custom'
        inlineText: true
        stubModules: ['text']
        paths:
          text: 'durandal/amd/text'

  webPackage:
    exclude: [".deployment", "mimosa-config.coffee","mimosa-config.js","assets",".git",".gitignore", "*.zip", "azure_error"]
    #archiveName: "app"
    #configName: "config"
    #outPath: "dist"
    #appjs: "app.js"