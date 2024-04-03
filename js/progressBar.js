var Color_BlackShard = '#847272';
var Color_RedShard = '#ff1e14';
var Color_Blank = '#C0C0C0'


var now;
var DayOfWeek;
var currentHour;
var currentMinute;
var timeSegments;
var currentMinutes;
var todayDate;

document.addEventListener('DOMContentLoaded', function() {
	updatePageTimer();
	updateProgress();
	// updateTimeLine();

	setInterval(updatePageTimer, 1000); 	// 每秒钟更新一次日期时间
	setInterval(updateProgress, 60*1000);	//每分钟更新一次进度条
	// setInterval(updateTimeLine, 60*1000);
	
	//window.onload();
});	
	
// window.onload = function() {

// };
function updatePageTimer() {
  getCurrentTime();
  var now = new Date();

  var allTimerElements = document.querySelectorAll('.all-timer');
  allTimerElements.forEach(function(element) {
    var dateTimeString = now.toLocaleString(); // 日期+hhmmss 格式
    element.innerText = dateTimeString;
  });

  var hhmmssTimerElements = document.querySelectorAll('.hhmmss-timer');
  hhmmssTimerElements.forEach(function(element) {
    var hours = now.getHours().toString().padStart(2, '0'); // 获取小时，并在需要时补零
    var minutes = now.getMinutes().toString().padStart(2, '0'); // 获取分钟，并在需要时补零
    var seconds = now.getSeconds().toString().padStart(2, '0'); // 获取秒，并在需要时补零
    var timeString = hours + ':' + minutes + ':' + seconds; // hh:mm:ss 格式
    element.innerText = timeString;
  });

  var hhmmTimerElements = document.querySelectorAll('.hhmm-timer');
  hhmmTimerElements.forEach(function(element) {
    var hours = now.getHours().toString().padStart(2, '0'); // 获取小时，并在需要时补零
    var minutes = now.getMinutes().toString().padStart(2, '0'); // 获取分钟，并在需要时补零
    var timeString = hours + ':' + minutes; // hh:mm 格式
    element.innerText = timeString;
  });

  var datetimerElements = document.querySelectorAll('.date-timer');
  datetimerElements.forEach(function(element) {
	// console.log("where is date-timer???", element );
    var month = (now.getMonth() + 1).toString(); // 获取月份，并在需要时补零
    var date = now.getDate().toString(); // 获取日期，并在需要时补零
    var dayOfWeek = getChineseDayOfWeek(now.getDay()); // 获取星期几的汉字表示
    var dateString = month + '月' + date + '日 ' + dayOfWeek; // x月x日 星期x 格式
    element.innerText = dateString;
  });
  
}

function getChineseDayOfWeek(day) {
  var chineseDays = ['日', '一', '二', '三', '四', '五', '六'];
  return '星期' + chineseDays[day];
}

// 更新进度条的函数
function updateProgress() {
    var progress = document.querySelector(".progress");
	progress.style.overflow = 'visible';
	progress.style.backgroundColor = Color_Blank;
    progress.innerHTML = "";

	  
	// 计算当前时间对应的进度百分比
	var totalMinutes = 24 * 60; // 一天总分钟数

	getCurrentTime();
	// debug_simulateUpdateTime("16:16", 5, 20);
	getTodayTimeSegment();
	// console.log( DayOfWeek );

	// 遍历时间段数组
	// console.log( timeSegments )
	// console.log(timeSegments.length);
	for (var i = 0; i < timeSegments.length; i++) {
		var currentSegment = timeSegments[i];
		// if ( i < timeSegments-1 ) var nextSegment = timeSegments[i+1];
	    var startTime = getTimeInMinutes(currentSegment.start);
	    var endTime = getTimeInMinutes(currentSegment.end);
		
		// console.log( startTime, endTime, currentMinutes, totalMinutes )
			
     	// 计算当前时间段的进度百分比
		var currentSegmentPercentage = (endTime-startTime) / totalMinutes * 100.0;
		var currentSegmentAlreadyPastPercentage = (currentMinutes-startTime) / totalMinutes * 100.0;
		var RemainedShardTimePercentage = (endTime-currentMinutes) / totalMinutes * 100.0;
		// console.log(  currentSegmentPercentage + "%" )

		// 创建进度条元素
		var currentProgressBar = document.createElement("div");
		currentProgressBar.style.backgroundColor = currentSegment.color;
		currentProgressBar.style.position = 'relative';
		// currentProgressBar.style.height = '200px';
		  
		var progressText = document.createElement("span");
		progressText.class = "sr-only";
		progressText.innerText = "qwq";
		 
		//调整这一段的样式和长度
		if (endTime < currentMinutes){ //已经完全流逝的时间段
		    // currentProgressBar.class = "progress-bar progress-bar-striped active";
			// currentProgressBar.classList.add('progress-bar', 'progress-bar-striped', 'active'); // 添加额外的 class
			currentProgressBar.className = "progress-bar progress-bar-striped active";
			currentProgressBar.style.width = currentSegmentPercentage + "%";
			currentProgressBar.style.opacity = 0.5;
		} else if ( startTime<=currentMinutes && currentMinutes<=endTime ){ //当前所在的时间段
			currentProgressBar.className = "progress-bar progress-bar-striped active";
			currentProgressBar.style.width = currentSegmentAlreadyPastPercentage + "%";
			// currentProgressBar.style.opacity = 0.5;
		} else if ( currentMinutes < startTime ){ //还未经历的时间段
			currentProgressBar.className = "progress-bar";
			currentProgressBar.style.width = currentSegmentPercentage + "%";
		}
		
		
		//如果是红石或者黑石： 小圆角
		if ( currentSegment.color == Color_BlackShard || currentSegment.color == Color_RedShard ){
			currentProgressBar.style.borderRadius = '1vh 1vh 1vh 1vh';
			updateLineAndTimer( currentProgressBar, '150%', currentSegment.end, false );
			updateLineAndTimer( currentProgressBar, '120%', currentSegment.start, false, 'L' );
		}
		
			
		
		
		//如果是边界：大圆角
		//lu ru rb lb
		if ( i==0 ){
			currentProgressBar.style.borderTopLeftRadius = '4vh';
			currentProgressBar.style.borderBottomLeftRadius = '4vh';
			// currentProgressBar.style.borderRadius = '4vh 0 0 4vh';
			// currentProgressBar.style.borderRadius = getBorderRadiusString( currentProgressBar, [{angleIdx:0, targetRadius:'4vh'}, {angleIdx:3, targetRadius:'4vh'}] );
		}
		if ( i==timeSegments.length-1 ){
			// console.log("qwq3: this is right edge")
			currentProgressBar.style.borderTopRightRadius = '4vh';
			currentProgressBar.style.borderBottomRightRadius = '4vh';
			// console.log( currentSegment );
			// currentProgressBar.style.borderRadius = '0 4vh 4vh 0';
			// currentProgressBar.style.borderRadius = getBorderRadiusString( currentProgressBar, [{angleIdx:1, targetRadius:'4vh'}, {angleIdx:2, targetRadius:'4vh'}] );
		}
				
		progressText.innerText += '[' + i + ']';

		// currentProgressBar.appendChild(progressText);
		progress.appendChild(currentProgressBar);
		// console.log( "test: string:" + currentProgressBar + "hah?" );
		// console.log( "test: string:" + window.getComputedStyle(currentProgressBar).getPropertyValue('border-radius') + "hah?" );
		
		
		//-----------
		//如果现在正在经历这段，要再加一段 实现分段效果
		if ( startTime<=currentMinutes && currentMinutes<=endTime ){
			var remainedShardTimeBar = document.createElement("div");
			remainedShardTimeBar.class = "progress-bar";
			remainedShardTimeBar.style.backgroundColor = currentProgressBar.style.backgroundColor;
			remainedShardTimeBar.style.width = RemainedShardTimePercentage + "%";
			remainedShardTimeBar.style.opacity = 0.5;
			remainedShardTimeBar.style.borderRadius = '0 0 0 0';
			
			//如果正在经历的是红石是黑石 那么CurrentSegment的剩余段 的右侧 是 小圆角
			if ( currentSegment.color == Color_BlackShard || currentSegment.color == Color_RedShard ){
				// console.log("qwq1: remain is shard")
				remainedShardTimeBar.style.borderTopRightRadius = '1vh';
				remainedShardTimeBar.style.borderBottomRightRadius = '1vh';
				// remainedShardTimeBar.style.borderRadius = getBorderRadiusString( remainedShardTimeBar, [{angleIdx:1, targetRadius:'1vh'}, {angleIdx:2, targetRadius:'1vh'}] );
			}
			// console.log( getBorderRadiusString( remainedShardTimeBar, [{angleIdx:1, targetRadius:'1vh'}, {angleIdx:2, targetRadius:'1vh'}] ) )
			
			//如果是右边界：大圆角
			//lu ru rb lb	
			if ( i==timeSegments.length-1 ){
				// console.log("qwq2: remain is right edge")
				// console.log( currentSegment );
				remainedShardTimeBar.style.borderTopRightRadius = '4vh';
				remainedShardTimeBar.style.borderBottomRightRadius = '4vh';
				// remainedShardTimeBar.style.borderRadius = getBorderRadiusString( remainedShardTimeBar, [{angleIdx:1, targetRadius:'4vh'}, {angleIdx:2, targetRadius:'4vh'}] );
				// remainedShardTimeBar.style.borderRadius = '0 4vh 4vh 0';
			}
			
			//03l, 12r
			// remainedShardTimeBar.style.borderRadius = '0 4vh 4vh 0';
					
			var progressText2 = document.createElement("span");
			progressText2.class = "sr-only";
			progressText2.innerText = "remained";
			  
			remainedShardTimeBar.appendChild(progressText2);
			progress.appendChild(remainedShardTimeBar);
			
			//-----------------------------------
			updateLineAndTimer(currentProgressBar, '200%', 'CurrentTime', true);
			
		}
	}

}

function updateLineAndTimer(progressBar, height, textContent, isDynamic, LorR='R') {
	var TimeLine;
	if ( isDynamic )
		TimeLine = progressBar.querySelector('.currentTimeLine');
	else
		if ( LorR=='L' )
			TimeLine = progressBar.querySelector('.leftShardLine');
		else if ( LorR=='R' )
			TimeLine = progressBar.querySelector('.rightShardLine');
			
	if ( isDynamic )
		if (TimeLine) 
			progressBar.removeChild(TimeLine);
		else 
			console.log( "timeline of this progress bar is null.", "Timeline:"+TimeLine, "ProgressBar:"+progressBar, "Height:"+height );
	else
		if ( TimeLine ) return;

	// 创建当前时间线的元素
	TimeLine = document.createElement('div');
	TimeLine.className = "TimeLine";
	if ( isDynamic ){
		TimeLine.classList.add("currentTimeLine");
	} else {
		if ( LorR=='L' )
			TimeLine.classList.add("leftShardLine");
		else ( LorR=='R' )
			TimeLine.classList.add("rightShardLine");
	}
	TimeLine.style.backgroundColor = '#708090';
	TimeLine.style.width = '1px';
	TimeLine.style.height = height; // 使用传入的高度参数
	TimeLine.style.position = 'absolute';
	TimeLine.style.bottom = 0;
	if ( LorR==='R' ) TimeLine.style.right = 0;
	else TimeLine.style.left = 0;
	TimeLine.style.zIndex = 9999;
	TimeLine.style.overflow = 'visible';

	// 设置当前时间线的位置
	// var totalMinutes = 24 * 60; // 一天总分钟数
	// var currentTimePercentage = (currentMinutes / totalMinutes) * 100.0;
	// TimeLine.style.left = currentTimePercentage + '%';

	// 将当前时间线元素添加到进度条容器中
	progressBar.appendChild(TimeLine);

	// 创建小型文本框元素
	var smallTimer_TimeLine = document.createElement('span');
	if (isDynamic==true) {
		smallTimer_TimeLine.className = 'hhmm-timer'; // 根据 isDynamic 参数决定是否修改类名
	}
	smallTimer_TimeLine.textContent = textContent; // 使用传入的文本内容参数
	smallTimer_TimeLine.style.height = '8vh';
	smallTimer_TimeLine.style.width = '8vh';
	smallTimer_TimeLine.style.position = 'absolute';
	smallTimer_TimeLine.style.top = '-20%'; // 根据需要调整垂直位置
	if ( isDynamic ) smallTimer_TimeLine.style.top = '-10%'; // 根据需要调整垂直位置
	smallTimer_TimeLine.style.left = '-4vh'; // 根据需要调整水平位置
	smallTimer_TimeLine.style.webkitTextFillColor = 'black';
	smallTimer_TimeLine.style.zIndex = 9999;

	// 将小型文本框元素添加到竖线元素中
	TimeLine.appendChild(smallTimer_TimeLine);
}
		

function getCurrentTime(){
	now = new Date();
	DayOfWeek = now.getDay();
	currentHour = now.getHours();
	currentMinute = now.getMinutes();
	currentMinutes = currentHour * 60 + currentMinute;
	todayDate = now.getDate();
}

function debug_simulateUpdateTime(timeString, weekDayNum, dateNum) {
  var timeParts = timeString.split(":");
		
  currentHour = parseInt(timeParts[0]);
  currentMinute = parseInt(timeParts[1]);
  currentMinutes = currentHour * 60 + currentMinute;
  
  DayOfWeek = weekDayNum;
  todayDate = dateNum;
}

	
function getTodayTimeSegment(){
	
	// 定义分时段数组
	var timeSegments_Mon = [
		{ start: "00:00", end: "24:00", color: Color_Blank },
	];
	var timeSegments_Tues = [
		{ start: "00:00", end: "09:08", color: Color_Blank },
		{ start: "09:08", end: "10:00", color: Color_BlackShard },
		{ start: "10:00", end: "14:08", color: Color_Blank },
		{ start: "14:08", end: "15:00", color: Color_BlackShard },
		{ start: "15:00", end: "19:08", color: Color_Blank },
		{ start: "19:08", end: "20:00", color: Color_BlackShard },
		{ start: "20:00", end: "24:00", color: Color_Blank }
	];
	var timeSegments_Wed = [
		{ start: "00:00", end: "09:08", color: Color_Blank },
		{ start: "09:08", end: "10:00", color: Color_BlackShard },
		{ start: "10:00", end: "15:08", color: Color_Blank },
		{ start: "15:08", end: "16:00", color: Color_BlackShard },
		{ start: "16:00", end: "19:08", color: Color_Blank },
		{ start: "19:08", end: "20:00", color: Color_BlackShard },
		{ start: "20:00", end: "24:00", color: Color_Blank }
	];
	var timeSegments_Thur = [
		{ start: "00:00", end: "24:00", color: Color_Blank },
	];
	var timeSegments_Fri = [
		{ start: "00:00", end: "11:08", color: Color_Blank },
		{ start: "11:08", end: "12:00", color: Color_RedShard },
		{ start: "12:00", end: "17:08", color: Color_Blank },
		{ start: "17:08", end: "18:00", color: Color_RedShard },
		{ start: "18:00", end: "23:08", color: Color_Blank },
		{ start: "23:08", end: "24:00", color: Color_RedShard },
	];
	var timeSegments_Sat = [
		{ start: "00:00", end: "10:08", color: Color_Blank },
		{ start: "10:08", end: "11:00", color: Color_RedShard },
		{ start: "11:00", end: "14:08", color: Color_Blank },
		{ start: "14:08", end: "15:00", color: Color_RedShard },
		{ start: "15:00", end: "22:08", color: Color_Blank },
		{ start: "22:08", end: "23:00", color: Color_RedShard },
		{ start: "23:00", end: "24:00", color: Color_Blank }
	];
	var timeSegments_Sun = [
		{ start: "00:00", end: "07:08", color: Color_Blank },
		{ start: "07:08", end: "08:00", color: Color_RedShard },
		{ start: "08:00", end: "13:08", color: Color_Blank },
		{ start: "13:08", end: "14:00", color: Color_RedShard },
		{ start: "14:00", end: "19:08", color: Color_Blank },
		{ start: "19:08", end: "20:00", color: Color_RedShard },
		{ start: "20:00", end: "24:00", color: Color_Blank }
	];
	var list_timeSegments = [
		timeSegments_Sun,
		timeSegments_Mon,
		timeSegments_Tues,
		timeSegments_Wed,
		timeSegments_Thur,
		timeSegments_Fri,
		timeSegments_Sat,
	]
	
	var list_index = DayOfWeek;
	if (  1<=todayDate && todayDate<=15 ){
		if ( DayOfWeek===3 || DayOfWeek===5 ) list_index=1; //前半月的周三周五no shard
	} else if ( 16<=todayDate ) {
		if ( DayOfWeek===2 || DayOfWeek===6 ) list_index=1; //前半月的周二周六no shard
	}
	timeSegments = list_timeSegments[list_index];
	// console.log( "getTodayTimeSegment(): DayOfWeek, todayDate, list_index:  ", DayOfWeek, todayDate, list_index );
	// console.log( "getTodayTimeSegment(): timeSegments for this day:  ", timeSegments );
}

// 将时间字符串转换为分钟数
function getTimeInMinutes(timeString) {
	var parts = timeString.split(":");
	var hours = parseInt(parts[0]);
	var minutes = parseInt(parts[1]);
	return hours * 60 + minutes;
}