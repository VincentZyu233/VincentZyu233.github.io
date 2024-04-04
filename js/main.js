// import { getShardInfo } from "./location_hint.js";

(function($) {

	"use strict";

	document.addEventListener('DOMContentLoaded', function(){
    var today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth(),
        monthTag =["January","February","March","April","May","June","July","August","September","October","November","December"],
        day = today.getDate(),
		dayOfWeek = today.getDay(),
        days = document.getElementsByTagName('td'),
        selectedDay,
        setDate,
        daysLen = days.length;
		
	var Color_BlackShard = '#847272';
	var Color_RedShard = '#ff1e14';
	
    // options should like '2014-01-01'

    function Calendar(selector, options) {
        this.options = options;
        this.draw();
    }
    
    Calendar.prototype.draw  = function() {
        this.getCookie('selected_day');
        this.getOptions();
        this.drawDays();
        var that = this,
            reset = document.getElementById('reset'),
            pre = document.getElementsByClassName('pre-button'),
            next = document.getElementsByClassName('next-button');
            
            pre[0].addEventListener('click', function(){that.preMonth(); });
            next[0].addEventListener('click', function(){that.nextMonth(); });
            reset.addEventListener('click', function(){that.reset(); });
        while(daysLen--) {
            days[daysLen].addEventListener('click', function(){that.clickDay(this); });
        }
    };
    
    Calendar.prototype.drawHeader = function(e) {
        var headMonth = document.getElementsByClassName('head-month'),
			headDay = document.getElementsByClassName('head-day');
            
			//---------------------
			headMonth[0].innerHTML = monthTag[month] + "<br>" + year;   
			
			//---------------------
            // e ? (headDay[0].innerHTML = e) : (headDay[0].innerHTML = day);
			var dateNum;
			if ( e ) dateNum = e;
			else dateNum = day;
			
			var ChineseWeekDay = ['日', '一', '二', '三', '四', '五', '六'];
			var headDayString = "选中的日期是 [" + month + "月" + dateNum + "日 星期" + ChineseWeekDay[dayOfWeek] + "] ， ";
			
			// return [ infoObj.locationName, infoObj.candleAmount, candleType_mapping[candleType].chineseHint ];
			// const customDate = new Date(2022, 3, 15, 10, 30, 0, 0); 年 月 日 时 分 秒 毫秒
			// console.log(customDate); // 输出：Wed Apr 15 2022 10:30:00 GMT+0000 (Coordinated Universal Time)
			var shardInfoList = getShardInfo( new Date(year,month,dateNum) );
			if ( shardInfoList.length==0 ) 
				headDayString += ("<br>"+ "这一天没有碎片事件。");
			else
				headDayString += ("<br>"+ "这一天的碎片降临在" + shardInfoList[0] + ", 提供" + shardInfoList[1] + shardInfoList[2] ) + "。";
			
			headDay[0].innerHTML = headDayString;
			
			var wrapHeader = document.querySelector('.wrap-header');
			wrapHeader.style.backgroundImage = 'url(images/LocationImages/' + shardInfoList[0] + '.jpg)';
			wrapHeader.style.backgroundSize = 'cover';
			wrapHeader.style.backgroundRepeat = 'no-repeat';
			wrapHeader.style.backgroundPosition = 'center';
            
     };
    
	Calendar.prototype.drawDays = function() {
		var startDay = new Date(year, month, 1).getDay(),
			nDays = new Date(year, month + 1, 0).getDate(),
			n = startDay; //最后一天的格子数，从1开始数

		for (var k = 0; k < 42; k++) {
			days[k].innerHTML = '';
			days[k].id = '';
			days[k].className = '';
		}

		for (var i = 1; i <= nDays; i++) {
			days[n].innerHTML = i;
			n++;
		}
		
		console.log( "Calendar.prototype.drawDays = function() 1号的编号，最后一天的编号，当月的天数： ", startDay, nDays, n );

		for (var j = 0; j < 42; j++) {
			if (days[j].innerHTML === "") {
				days[j].id = "disabled";
			} else if (j === day + startDay - 1) {
				if ((this.options && (month === setDate.getMonth()) && (year === setDate.getFullYear())) || (!this.options && (month === today.getMonth()) && (year === today.getFullYear()))) {
					this.drawHeader(day);
					days[j].id = "today";
				}
			}
			if (selectedDay) {
				if ((j === selectedDay.getDate() + startDay - 1) && (month === selectedDay.getMonth()) && (year === selectedDay.getFullYear())) {
					days[j].className = "selected";
					this.drawHeader(selectedDay.getDate());
				}
			}
		}
		
		var convertHexToRgba = (hexColor, opacity) => {
		    var color = hexColor.replace('#', '');
		    var r = parseInt(color.substring(0, 2), 16);
		    var g = parseInt(color.substring(2, 4), 16);
		    var b = parseInt(color.substring(4, 6), 16);
		    var rgbaColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
		    return rgbaColor;
		  };
		
		
		for ( var j=0; j<42; j++ ){
			days[j].style.backgroundColor = convertHexToRgba('#ffffff', 0.1); //reset bg color
		}
		
		for ( var j=0; j<42; j++ ){ //paint according to shard type
			if ( days[j].innerHTML === "" )
				continue;
			
			var dateNum = j-startDay+1;
			var weekdayNum = (j%7===0) ? 7 : (j%7);

			if (dateNum >= 1 && dateNum <= 15) {
				if (weekdayNum === 2) days[j].style.backgroundColor = convertHexToRgba(Color_BlackShard, 0.5);
				if (weekdayNum === 6 || weekdayNum === 7) days[j].style.backgroundColor = convertHexToRgba(Color_RedShard, 0.5);
			} else if (dateNum >= 16) {
				if (weekdayNum === 3) days[j].style.backgroundColor = convertHexToRgba(Color_BlackShard, 0.5);
				if (weekdayNum === 5 || weekdayNum === 7) days[j].style.backgroundColor = convertHexToRgba(Color_RedShard, 0.5);
			}
		}
		for ( var j=0; j<32; j++ ){
			days[j].style.margin = "20px";
		}
	};
	
 
	
    Calendar.prototype.clickDay = function(o) {
        var selected = document.getElementsByClassName("selected"),
            len = selected.length;
        if(len !== 0){
            selected[0].className = "";
        }
        o.className = "selected";
        selectedDay = new Date(year, month, o.innerHTML);
        this.drawHeader(o.innerHTML);
        this.setCookie('selected_day', 1);
    };
    
    Calendar.prototype.preMonth = function() {
        if(month < 1){ 
            month = 11;
            year = year - 1; 
        }else{
            month = month - 1;
        }
        this.drawHeader(1);
        this.drawDays();
    };
    
    Calendar.prototype.nextMonth = function() {
        if(month >= 11){
            month = 0;
            year =  year + 1; 
        }else{
            month = month + 1;
        }
        this.drawHeader(1);
        this.drawDays();
    };
    
    Calendar.prototype.getOptions = function() {
        if(this.options){
            var sets = this.options.split('-');
                setDate = new Date(sets[0], sets[1]-1, sets[2]);
                day = setDate.getDate();
                year = setDate.getFullYear();
                month = setDate.getMonth();
        }
    };
    
     Calendar.prototype.reset = function() {
         month = today.getMonth();
         year = today.getFullYear();
         day = today.getDate();
         this.options = undefined;
         this.drawDays();
     };
    
    Calendar.prototype.setCookie = function(name, expiredays){
        if(expiredays) {
            var date = new Date();
            date.setTime(date.getTime() + (expiredays*24*60*60*1000));
            var expires = "; expires=" +date.toGMTString();
        }else{
            var expires = "";
        }
        document.cookie = name + "=" + selectedDay + expires + "; path=/";
    };
    
    Calendar.prototype.getCookie = function(name) {
        if(document.cookie.length){
            var arrCookie  = document.cookie.split(';'),
                nameEQ = name + "=";
            for(var i = 0, cLen = arrCookie.length; i < cLen; i++) {
                var c = arrCookie[i];
                while (c.charAt(0)==' ') {
                    c = c.substring(1,c.length);
                    
                }
                if (c.indexOf(nameEQ) === 0) {
                    selectedDay =  new Date(c.substring(nameEQ.length, c.length));
                }
            }
        }
    };
	
	
    var calendar = new Calendar();
    
        
}, false);

})(jQuery);
