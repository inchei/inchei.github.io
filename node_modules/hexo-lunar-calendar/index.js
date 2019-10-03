var LunarCalendar = require("lunar-calendar");

hexo.extend.helper.register("dateLunar", function(date) {
    date = date.toString().split("-");
    var year = date[0];
    var month = date[1];
    var day = date[2];
    var lunar = LunarCalendar.solarToLunar(year, month, day);
    return lunar.GanZhiYear + "年"
	 + lunar.lunarMonthName
	 + lunar.lunarDayName;
});
