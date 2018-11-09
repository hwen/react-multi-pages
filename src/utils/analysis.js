/* eslint-disable */

/**
 * 百度统计事件跟踪
 *
 * category：要监控的目标的类型名称，通常是同一组目标的名字，比如"视频"、"音乐"、"软件"、"游戏"等等。该项必填，不填、填"-"的事件会被抛弃。
 * action：用户跟目标交互的行为，如"播放"、"暂停"、"下载"等等。该项必填，不填、填"-"的事件会被抛弃。
 * opt_label：事件的一些额外信息，通常可以是歌曲的名称、软件的名称、链接的名称等等。该项选填，不填、填"-"代表此项为空。
 * opt_value：事件的一些数值信息，比如权重、时长、价格等等，在报表中可以看到其平均值等数据。该项可选。
 */
export const baiduTrack = (category, action, opt_label, opt_value) => {
  _hmt && _hmt.push(['_trackEvent', category, action, opt_label, opt_value]);
};

/**
 *
 * @param {*} type 类型，'send' 或者 'err'
 * @param {*} opt_label 备注
 * @param {*} opt_value 权重
 */
export const trackRequest = (type, opt_label, opt_value) => {
  if (!/(send|err)/.test(type)) throw new TypeError(`type must be one of ['send', 'err'], but got [${type}]`);
  const typeMap = { send: '发起', err: '错误' };
  baiduTrack('请求', typeMap[type], opt_label, opt_value);
  // other track
};

/**
 *
 * @param {*} opt_label 备注
 * @param {*} opt_value 权重
 */
export const trackEvent = (opt_label, opt_value, event = '点击') => {
  baiduTrack('活动', event, opt_label, opt_value);
  // other track
};
