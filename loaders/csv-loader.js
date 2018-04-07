const csvParse = require('csv-parse');


module.exports = function csvLoader(value) {
  const callback = this.async();

  return csvParse(value, {
    columns: true,
  }, callback);
};
