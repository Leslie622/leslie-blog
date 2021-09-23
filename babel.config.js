module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  //elementUI按需引入
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
