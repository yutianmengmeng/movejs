function getStyle(obj,attr){
			if(obj.currentStyle){
				return obj.currentStyle.attr;
			}else{
				return getComputedStyle(obj,false)[attr];
			}
		}

function startMove(obj,json,fnEnd){
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
				var bStop=true;
				for(var attr in json){
					var cur=0;
					if(attr=='opacity'){
						cur=Math.round(parseFloat(getStyle(obj,attr))*100);
					}else{
						cur=parseInt(getStyle(obj,attr));
					}
					
					var speed=(json[attr]-cur)/7;
					if(cur!=json[attr]) bStop=false;
					speed=speed>0?Math.ceil(speed):Math.floor(speed);
					if(attr=='opacity'){
								obj.style.filter="alpha(opacity:"+(cur+speed)+")";
								obj.style.opacity=(cur+speed)/100
							}else{
								obj.style[attr]=cur+speed+"px";
					}
					
				}
				if(bStop){
					clearInterval(obj.timer);
					if(fnEnd)fnEnd();	
				}
			},30)
}