require('dotenv').config();
const htmlMinTransform = require('./src/transforms/html-min-transform.js');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = config => {
  config.addPassthroughCopy('./src/img/');
  config.addPassthroughCopy('./src/build/');
  config.addPassthroughCopy('./src/js/');
  config.addPassthroughCopy('./src/font/');

  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
  }

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
