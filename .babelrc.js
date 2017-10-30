const presets = [
  ['env', { modules: false }],
  'stage-0',
  'react',
];


const plugins = [
  'transform-react-pure-class-to-function',
];


if (process.env.NODE_ENV === 'production') {
  plugins.push(
    'transform-react-inline-elements',
    'transform-react-remove-prop-types',
  );
}


module.exports = {
  presets,
  plugins,
};
