
document.addEventListener('DOMContentLoaded', function() {
	var now = new Date();
	console.log( "addEventListener(): ", now );
	getShardInfo( now );
	updateLocationHintElement();
});	

window.onload = function() {
	// document.title = "【光遇国服碎片时间查询】" + getShardInfo();
	document.title = "【光遇国服碎片时间查询】";
};


window.getShardInfo = getShardInfo;
// export function getShardInfo(){
function getShardInfo( now ){	
	console.log( "getShardInfo(): 选中的日期：", now );
	// console.log( now.getMonth() );
	
	var rule1_mapping = {
		0: "云野",
		1: "雨林",
		2: "霞谷",
		3: "暮土",
		4: "禁阁",
	}
	
	var weekdays_mapping = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	
	var candleType_mapping = {
		"wc": { englishHint:"white candle", chineseHint:"点普通烛火" },
		"ac": { englishHint:"ascended candle", chineseHint:"根升华蜡烛" },
	};
	
	var shardInfo_Mon = [];
	var shardInfo_Tues = [
		{ locationName:"蝴蝶平原", candleAmount:200 },
		{ locationName:"荧光森林", candleAmount:200 },
		{ locationName:"滑冰场", candleAmount:200 },
		{ locationName:"边陲荒漠", candleAmount:200 },
		{ locationName:"星光沙漠", candleAmount:200 },
	];
	var shardInfo_Wed = [
		{ locationName:"云中仙乡", candleAmount:200 },
		{ locationName:"密林遗迹", candleAmount:200 },
		{ locationName:"滑冰场", candleAmount:200 },
		{ locationName:"远古战场", candleAmount:200 },
		{ locationName:"星光沙漠", candleAmount:200 },
	];
	var shardInfo_Thur = [];
	var shardInfo_Fri = [
		{ locationName:"云顶浮岛", candleAmount:2.5 },
		{ locationName:"大树屋", candleAmount:3.5 },
		{ locationName:"圆梦村", candleAmount:2.5 },
		{ locationName:"黑水港湾", candleAmount:2.5 },
		{ locationName:"水母港湾", candleAmount:3.5 },
	];
	var shardInfo_Sat = [
		{ locationName:"幽光山洞", candleAmount:2 },
		{ locationName:"神殿后花园", candleAmount:2.5 },
		{ locationName:"圆梦村", candleAmount:2.5 },
		{ locationName:"巨兽荒原", candleAmount:2 },
		{ locationName:"水母港湾", candleAmount:3.5 },
	];
	var shardInfo_Sun = [
		{ locationName:"圣岛", candleAmount:3.5 },
		{ locationName:"秘密花园", candleAmount:3.5 },
		{ locationName:"雪隐峰", candleAmount:3.5 },
		{ locationName:"遗忘方舟", candleAmount:3.5 },
		{ locationName:"水母港湾", candleAmount:3.5 },
	];
	
	var shardInfo_List = [ 
		shardInfo_Sun,
		shardInfo_Mon,
		shardInfo_Tues,
		shardInfo_Wed,
		shardInfo_Thur,
		shardInfo_Fri,
		shardInfo_Sat,
	];
	
	var month = (now.getMonth() + 1); // 获取月份，并在需要时补零
	var date = now.getDate(); // 获取日期，并在需要时补零
	var dayOfWeek = now.getDay(); // 获取星期几
	// dayOfWeek = 6;
	var dateString = month.toString() + '月' + date.toString() + '日'; // x月x日 星期x 格式
	
	var isNoShardDay = false;
	if ( dayOfWeek===1 || dayOfWeek===4 ) isNoShardDay = true; //星期一 星期四 肯定没有
	if ( 1<=date && date<=15 ) //前半月
		if ( dayOfWeek===3 || dayOfWeek===5 ) isNoShardDay = true; //星期三 星期五 肯定没有
	if ( 16<=date ) //后半月
		if ( dayOfWeek===2 || dayOfWeek===6 ) isNoShardDay = true; //星期二 星期六 肯定没有
	
	
	
	
	if ( isNoShardDay ){
		console.log( "getShardInfo(): ", now+"is a no shard day." );
		ShardInfoString = "今天没有碎片事件。"
		// locationHint.textContent = ShardInfoString  ;
		// return ShardInfoString ;
		return [];
	}
	
	// console.log(shardInfo_List);
	// console.log(dayOfWeek);
	// console.log((date-1)%5);
	// console.log(shardInfo_List[dayOfWeek]);
	// console.log(shardInfo_List[6]);
	infoObj = shardInfo_List[dayOfWeek][(date-1)%5];
	candleType = (DayOfWeek===2 || DayOfWeek===3) ? "wc" : "ac";
	
	// console.log( candleType_mapping );
	// console.log( candleType );
	// console.log( candleType_mapping["ac"] );
	ShardInfoString = "今天（" + dateString + "）的碎片降临在 " + infoObj.locationName 
								+ "，提供 " + infoObj.candleAmount + candleType_mapping[candleType].chineseHint + "。";
	// locationHint.textContent = ShardInfoString;	
	// return ShardInfoString;
	
	
	// var body = document.querySelector('body');
	// var bgImageSrc = 'url(images/LocationImages/' + infoObj.locationName + '.jpg)';
	
	// // 设置背景样式
	// body.style.backgroundImage = bgImageSrc;
	// body.style.backgroundRepeat = 'repeat';
	// body.style.backgroundPosition = 'center';
	// body.style.backgroundSize = 'cover';
	
	
	return [ infoObj.locationName, infoObj.candleAmount, candleType_mapping[candleType].chineseHint ];
}

var infoObj, ShardInfoString, candleType;
function updateLocationHintElement(){
	var locationHint = document.getElementById("main-info");
	locationHint.textContent = ShardInfoString;
	
	// 在这里获取已经存在的组件的引用
	var candleTypeImage = document.getElementById("candle-type");
	var candleAmountElement = document.getElementById("candle-amount");
	
	if ( ShardInfoString==="今天没有碎片事件。" ){
		candleTypeImage.src = "";
		candleAmountElement.textContent = "";
		return;
	}
	
	candleTypeImage.src = "./images/" + candleType + ".png";
	
	candleAmountString = "    x" + infoObj.candleAmount;
	if ( candleType=="wc" ) candleAmountString += "滴白蜡烛烛火";
	if ( candleType=="ac" ) candleAmountString += "根升华蜡烛";
	candleAmountElement.textContent = candleAmountString;
}
