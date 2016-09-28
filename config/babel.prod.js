module.exports = {
  babelrc: false,
  presets: [
    require.resolve('babel-preset-latest'),
    require.resolve('babel-preset-react')
  ],
  plugins: [
    require.resolve('babel-plugin-transform-class-properties'), // { ...todo, completed: true }
    require.resolve('babel-plugin-transform-object-rest-spread'), // function* () { yield 42; yield 43; }
    [require.resolve('babel-plugin-transform-regenerator'), {
      // Async functions are converted to generators by babel-preset-latest
      async: false
    }],
    [require.resolve('babel-plugin-transform-runtime'), { // Polyfills the runtime needed for async/await and generators
      helpers: false,
      polyfill: false,
      regenerator: true
    }],
    require.resolve('babel-plugin-transform-react-constant-elements') // Optimization: hoist JSX that never changes out of render()
  ]
};
