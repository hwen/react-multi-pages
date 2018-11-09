import { T } from 'react-toast-mobile';

/**
 * 直接提示单独信息：alert('mes')
 * 或者：
 * alert({
 *  title: 'title',
 *  message: 'xxx',
 *  text: 'btn',
 *  fn: () => {}
 * })
 */
export const alert = T.alert;
/**
 * confirm({
 *  title: 'title',
 *  message: 'xxx',
 *  option: [
 *    {
 *      text: '按钮1',
 *      fn: () => {}
 *    },
 *    {
 *      text: '按钮2',
 *      fn: () => {}
 *    },
 *    {
 *      text: '按钮3',
 *      fn: () => {}
 *    },
 *  ]
 * })
 */
export const confirm = T.confirm;
export const loading = T.loading;
export const notify = T.notify;
