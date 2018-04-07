module.exports = (api) => {
  const presets = [
    ['@babel/env', { modules: false }],
    '@babel/stage-0',
    '@babel/react',
  ];


  const plugins = [
    '@babel/plugin-proposal-export-default-from',
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
