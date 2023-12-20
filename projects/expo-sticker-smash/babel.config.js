/* Creamos la configuración para nuestra aplicación, donde ponemos la configuración
de algunos plugins que vamos a utilizar. En este caso, utilizamos el plugin
@babel/plugin-proposal-export-namespace-from y react-native-reanimated. */
module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin'
    ]
  }
}
