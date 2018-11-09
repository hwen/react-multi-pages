// 多页面入口，不同活动单独一个页面

const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const ilog = console.log;
const HtmlWebpackPluginPublicPath = require('./html-webpack-public-path');
const appPaths = require('./paths');
const getClientEnvironment = require('./env');

const publicPath = appPaths.servedPath;
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

const isDev = /(local|dev|development)/.test(env.stringified['process.env'].NODE_ENV);
const entryModules = pageDirs();

function pageDirs() {
  const dir = path.resolve(appPaths.appSrc, 'modules');
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    return files;
  } else {
    ilog(dir + ' Not Found! ');
    return null;
  }
}

// generate entrys 生成入口节点
function genEntry() {
  if (!entryModules) throw new Error('Do not find any page in src/modules folder');
  return entryModules.reduce((entry, page) => {
    entry[page] = [];
    if (isDev) {
      entry[page].push(require.resolve('react-dev-utils/webpackHotDevClient'));
    }
    // 遍历生成entry
    entry[page].push(path.resolve(appPaths.appSrc, `modules/${page}/index.js`));
    return entry;
  }, {});
}

/**
 * 生成路由重写配置。用于 webpack-dev-server。
 * 生产环境也需要配置相应的路由规则（例如Nginx，Apache等）
 */
function genRewrites() {
  return entryModules.reduce(
    (rewrites, page) => {
      // assets rewrite
      rewrites.push({
        from: new RegExp(`^/${page}/assets/(.*)$`),
        to: ctx => `/assets/${ctx.match && ctx.match[1]}`,
      });
      // modules rewrite
      rewrites.push({
        from: new RegExp(`^/${page}`),
        to: `/${page}.html`,
      });
      return rewrites;
    },
    [
      {
        from: new RegExp(`^/h5-event-static/(.*)$`),
        to: ctx => `/${ctx.match && ctx.match[1]}`,
      },
    ]
  );
}

function genProxy() {
  return {};
}

// 生成 htmlwebpackplugin 配置
function genHtmlPlugin() {
  const HtmlPlugins = entryModules.reduce((htmlPlugins, page) => {
    if (isDev) {
      htmlPlugins.push(
        new HtmlWebpackPlugin({
          inject: true,
          template: appPaths.appHtml,
          chunks: [`${page}`],
          filename: `${page}.html`,
          NODE_ENV: /(production|prod)/.test(process.env.NODE_ENV) ? 'prod' : 'non-prod',
        })
      );
    } else {
      htmlPlugins.push(
        new HtmlWebpackPlugin({
          inject: true,
          template: appPaths.appHtml,
          chunks: [`${page}`],
          filename: `${page}.html`,
          NODE_ENV: /(production|prod)/.test(process.env.NODE_ENV) ? 'prod' : 'non-prod',
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        })
      );
    }

    return htmlPlugins;
  }, []);
  if (isDev) HtmlPlugins.push(new HtmlWebpackPluginPublicPath({ publicPath: '/h5-event-static' }));
  return HtmlPlugins;
}

// for react-loadble
function genManifest() {
  return new ManifestPlugin({
    fileName: 'asset-manifest.json',
    publicPath: '/h5-event-static',
  });
}

module.exports = {
  genEntry,
  genRewrites,
  genProxy,
  genHtmlPlugin,
  genManifest,
};
