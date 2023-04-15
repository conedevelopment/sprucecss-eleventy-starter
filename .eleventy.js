module.exports = config => {
  config.addPassthroughCopy('./src/img/');
  config.addPassthroughCopy('./src/build/');
  config.addPassthroughCopy('./src/font/');

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
