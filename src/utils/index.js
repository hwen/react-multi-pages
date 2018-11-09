/*
Ex:
stringifyQuery({foo: "bar", baz: ['a','b'], fizz: {foo: [1,2,3], bar: {bees: "knees"}}});
-> ?foo=bar&baz[]=a&baz[]=b&fizz[foo][]=1&fizz[foo][]=2&fizz[foo][]=3&fizz[bar][bees]=knees
Square brackets will be URL encoded; I didn't do so in this example for readability.
*/

export function stringifyQuery(obj, parentName) {
  let res = null;
  if (obj) {
    res = Object.keys(obj)
      .map(key => {
        const val = obj[key];

        if (parentName) key = parentName + '[' + key + ']';
        if (val === undefined) return '';
        if (val === null) return encodeURIComponent(key);

        if (!Array.isArray(val) && typeof val === 'object') {
          return stringifyQuery(val, key).slice(1);
        }

        if (Array.isArray(val)) {
          const result = [];

          val.forEach(val2 => {
            if (val2 === undefined) return;
            if (val2 === null) {
              result.push(encodeURIComponent(key + '[]'));
            } else {
              result.push(encodeURIComponent(key + '[]') + '=' + encodeURIComponent(val2));
            }
          });

          return result.join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
      })
      .filter(x => x.length > 0)
      .join('&');
  }

  return res ? `?${res}` : '';
}

export function getQueryObject(url) {
  const search = url ? url.substring(url.lastIndexOf('?') + 1) : '';
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

export function getType(v) {
  return Object.prototype.toString.call(v).slice(8, -1);
}

// tiny version of lodash get
export function get(obj = {}, path = '') {
  return path
    .replace(/\[(.+?)\]/g, '.$1')
    .split('.')
    .reduce((o, key) => o && o[key], obj);
}

export function omit(obj, omits = []) {
  if (!obj || typeof obj !== 'object') return null;
  return Object.keys(obj).reduce((o, key) => {
    if (!omits.includes(key)) {
      o[key] = obj[key];
    }
    return o;
  }, {});
}

export function pick(obj, picks = []) {
  if (!obj || typeof obj !== 'object') return null;
  return Object.keys(obj).reduce((o, key) => {
    if (picks.includes(key)) {
      o[key] = obj[key];
    }
    return o;
  }, {});
}

/**
 * Format a date like YYYY-MM-DD.
 *
 * @param {string} template
 * @param {Date=} [date]
 * @return {string}
 */
export function formatDate(template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4);
  return date
    .toISOString()
    .split(/[-:.TZ]/)
    .reduce(function(template, item, i) {
      return template.split(specs[i]).join(item);
    }, template);
}

export function countDown(second = 60, hanlder) {
  let countDownId = setInterval(() => {
    if (second < 1) {
      clearInterval(countDownId);
      return;
    }
    second--;
    hanlder && hanlder(second);
  }, 1000);
}
