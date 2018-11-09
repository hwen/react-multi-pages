// If your plugin is direct dependent to the html webpack plugin:
const HtmlWebpackPlugin = require('html-webpack-plugin');

class HtmlWebpackPluginPublicPath {
  constructor(opt) {
    this.publicPath = opt.publicPath;
  }
  updateAttr(tagAttributeObject) {
    if (tagAttributeObject.href) {
      tagAttributeObject.href = `${this.publicPath}${tagAttributeObject.href}`;
    }
    if (tagAttributeObject.src) {
      tagAttributeObject.src = `${this.publicPath}${tagAttributeObject.src}`;
    }
    return tagAttributeObject;
  }
  apply(compiler) {
    compiler.hooks.compilation.tap('HtmlWebpackPluginPublicPath', compilation => {
      // Staic Plugin interface |compilation |HOOK NAME | register listener
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        'HtmlWebpackPluginPublicPath', // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          // Manipulate the content
          data.headTags = data.headTags.map(tag => {
            tag.attributes = this.updateAttr(tag.attributes);
            return tag;
          });
          data.bodyTags = data.bodyTags.map(tag => {
            tag.attributes = this.updateAttr(tag.attributes);
            return tag;
          });
          // Tell webpack to move on
          cb(null, data);
        }
      );
    });
  }
}

module.exports = HtmlWebpackPluginPublicPath;
