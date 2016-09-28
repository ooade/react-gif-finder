module.exports = {
  babelrc: false,
  cacheDirectory: true,
  presets: [
    require.resolve('babel-preset-latest'),
    require.resolve('babel-preset-react')
  ],
  plugins: [
    require.resolve('babel-plugin-transform-class-properties'), // class { handleClick = () => { } }
    require.resolve('babel-plugin-transform-object-rest-spread'), // { ...todo, completed: true }
    [require.resolve('babel-plugin-transform-regenerator'), { // function* () { yield 42; yield 43; }
      // Async functions are converted to generators by babel-preset-latest
      async: false
    }],
    // Polyfills the runtime needed for async/await and generators
    [require.resolve('babel-plugin-transform-runtime'), {
      helpers: false,
      polyfill: false,
      regenerator: true
    }],
    [require.resolve('babel-plugin-react-transform'), {
        transforms: [{
          transform: require.resolve('react-transform-hmr'),
          imports: ['react'],
          locals: ['module']
        }]
    }]
  ]
};
