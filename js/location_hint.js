
document.addEventListener('DOMContentLoaded', function() {
	updateShardInfo();
});	

function updateShardInfo(){
	
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
		{ locationName:"失落方舟", candleAmount:3.5 },
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
	
	locationHint = document.getElementById("location-hint");
	
	var now = new Date();
	var month = (now.getMonth() + 1); // 获取月份，并在需要时补零
	var date = now.getDate(); // 获取日期，并在需要时补零
	var dayOfWeek = now.getDay(); // 获取星期几
	var dateString = month.toString() + '月' + date.toString() + '日'; // x月x日 星期x 格式
	
	if ( dayOfWeek===1 || dayOfWeek===4 ){
		locationHint.textContent = "今天没有碎片事件。" ;
		return;
	}
	
	// console.log(shardInfo_List);
	// console.log(dayOfWeek);
	// console.log((date-1)%5);
	// console.log(shardInfo_List[dayOfWeek]);
	// console.log(shardInfo_List[6]);
	var infoObj = shardInfo_List[dayOfWeek][(date-1)%5];
	var candleType = (DayOfWeek===2 || DayOfWeek===3) ? "wc" : "ac";
	
	console.log( candleType_mapping );
	console.log( candleType );
	console.log( candleType_mapping["ac"] );
	
	ShardInfoString = "今天（" + dateString + "）的碎片降临在" + infoObj.locationName 
								+ "，提供" + infoObj.candleAmount + candleType_mapping[candleType].chineseHint + "。";
	
	locationHint.textContent = ShardInfoString;				
	return ShardInfoString;
}


