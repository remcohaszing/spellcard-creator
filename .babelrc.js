const presets = [
  ['@babel/env', { modules: false }],
  '@babel/stage-0',
  '@babel/react',
];


const plugins = [
  '@babel/plugin-proposal-export-default-from',
  // 'transform-react-pure-class-to-function',
];


if (process.env.NODE_ENV === 'production') {
  plugins.push(
    '@babel/transform-react-inline-elements',
    'transform-react-remove-prop-types',
  );
}


module.exports = {
  presets,
  plugins,
};
