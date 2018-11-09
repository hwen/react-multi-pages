import './flexible';

// 初始化调试工具
if (/(dev|development)/.test(process.env.NODE_ENV)) {
  const eruda = require('eruda');
  setTimeout(() => {
    eruda.init();
  });
}
