/**
 * @desc 格式化${dateTime}时间的格式化
 * @param dateTime
 * @param formaStr
 * @returns {String}
 */
function formatDateTime(dateTime, formaStr) {
    if (dateTime.constructor.name === "Date") {{
        var timeStr = {
            "Y+": dateTime.getFullYear(), // 年
            "M+": dateTime.getMonth() + 1, //月份
            "d+": dateTime.getDate(), //日
            "h+": dateTime.getHours(), //小时
            "m+": dateTime.getMinutes(), //分
            "s+": dateTime.getSeconds(), //秒
            "q+": Math.floor((dateTime.getMonth() + 3) / 3), //季度
            "S": dateTime.getMilliseconds() //毫秒
        }
        if (/(y+)/.test(formaStr)) formaStr = formaStr.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in timeStr)
            if (new RegExp("(" + k + ")").test(formaStr)) formaStr = formaStr.replace(RegExp.$1, (RegExp.$1.length == 1) ? (timeStr[k]) : (("00" + timeStr[k]).substr(("" + timeStr[k]).length)));
        return formaStr;
    }}
    return "格式错误";
}

module.exports = formatDateTime;