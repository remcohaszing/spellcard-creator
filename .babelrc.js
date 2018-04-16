module.exports = (api) => {
  const presets = [
    ['@babel/env', { loose: true, modules: false }],
    ['@babel/stage-0', { loose: true }],
    ['@babel/react', { loose: true }],
  ];


  const plugins = [
    // 'transform-react-pure-class-to-function',
  ];

  if (api.env() === 'production') {
    plugins.push(
      '@babel/transform-react-inline-elements',
      'transform-react-remove-prop-types',
    );
  }

  return {
    presets,
    plugins,
  };
};
