// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Adicione outros plugins do Babel aqui se precisar no futuro
      'react-native-reanimated/plugin', // IMPORTANTE: Este deve ser o último plugin na lista
    ],
  };
};