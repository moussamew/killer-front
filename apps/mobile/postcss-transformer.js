var upstreamTransformer = require('metro-react-native-babel-transformer');
var postcssTransformer = require('react-native-postcss-transformer');
var postCSSExtensions = ['css', 'pcss'];

module.exports.transform = function ({ src, filename, options }) {
  if (postCSSExtensions.some((ext) => filename.endsWith('.' + ext))) {
    return postcssTransformer.transform({ src, filename, options });
  }
  return upstreamTransformer.transform({ src, filename, options });
};
