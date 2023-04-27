require('dotenv').config();

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const { parse, stringify } = require('himalaya');
const htmlMinTransform = require('./src/transforms/html-min-transform.js');
const Image = require('@11ty/eleventy-img');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = config => {
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('w3DateFilter', w3DateFilter);

  config.addPlugin(syntaxHighlight);

  config.addPassthroughCopy('./src/img/');
  config.addPassthroughCopy('./src/css/');
  config.addPassthroughCopy('./src/js/');
  config.addPassthroughCopy('./src/font/');

  config.addCollection('blog', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md')];
  });

  config.addNunjucksAsyncShortcode('svgIcon', async (src, cls) => {
    const metadata = await Image(src, {
      formats: ['svg'],
      dryRun: true,
    });
    const svg = parse(metadata.svg[0].buffer.toString());

    svg[0].attributes.push({
      key: 'class',
      value: cls ? cls : 'icon'
    });

    return stringify(svg);
  })

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
