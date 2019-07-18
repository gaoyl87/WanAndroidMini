const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  format: String.prototype.fomat
}

/**
 * 字符串使用占位符拼接
 * var str = "js实现用{two}字符串替换占位符 {one} {two} {three} ".format({one: "I",two: "LOVE",three: "YOU"});
 * var str2 = "js实现用{1}字符串替换占位符 {0} {1} {2} ".format("I","LOVE","YOU");
 */
String.prototype.format = function() {
  if (arguments.length == 0) {
    return this;
  }
  var param = arguments[0];
  var s = this;
  if (typeof(param) == 'object') {
    for (var key in param) {
      s = s.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
    }
  } else {
    for (i = 0; i < arguments.length; i++) {
      s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    }
  }
  return s;
}