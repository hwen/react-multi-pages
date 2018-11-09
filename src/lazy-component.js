import React, { Component } from 'react';

// react 路由懒加载方案，尽可能精简移动端页面加载的资源
// 参考：https://webpack.js.org/guides/code-splitting/
// 如果对大小不敏感，可以使用 react-loadable 替代

/**
 *
 * @param {*} path
 */
export default function asyncComponent(path) {
  class AsyncComponent extends Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        // Dynamic Imports
        import(path).then(module => {
          AsyncComponent.Component = module.default;
          this.setState({ Component });
        });
      }
    }
    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  }
  return AsyncComponent;
}
