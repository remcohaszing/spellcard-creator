module.exports = function stringifyJsonLoader(value) {
  this.cacheable();

  return JSON.stringify(value);
};
