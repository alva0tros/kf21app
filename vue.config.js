module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      buildOptions: {
        appId: 'com.kai.kf21app',
        nsis: {
          shortcutName: 'KF21-APP'
        },
        win: {
          target: [
            {
              target: 'nsis',
              arch: ['x64', 'ia32']
            }
          ]
        }
      }
    }
  }
}
