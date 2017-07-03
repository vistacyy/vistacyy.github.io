//跨浏览器获取视口大小
function getInner() {
	if (typeof window.innerWidth != 'undefined') {
		return {
			width : window.innerWidth,
			height : window.innerHeight
		}
	} else {
		return {
			width : document.documentElement.clientWidth,
			height : document.documentElement.clientHeight
		}
	}
}
//跨浏览器事件绑定
function addEvent(obj,type,fn) {
  if(typeof addEventListener!='undefined'){
    obj.addEventListener(type,fn,false);  
  }else if(typeof attachEvent != 'undefined'){
    if(!obj.events) obj.events={};
    if(!obj.events[type]){
      obj.events[type]=[];
      obj.events[type][0]=fn;  
    }else{
      if(!addEvent.array(fn,obj.events[type]))
        obj.events[type][addEvent.ID++]=fn;
    }

    obj['on'+type]= function (event) {
      var e = event || addEvent.fixEvent(window.event);
      var es = obj.events[type];
      for (var i in es) {
        es[i].call(this, e);
      }
    };
  }
}
addEvent.array = function (fn, es){
  for (var i in es) {
    if (es[i] == fn) return true;
  }
  return false;
}
//ID 计数器
addEvent.ID = 1;
//获取 IE 的 event，兼容 W3C 的调用
addEvent.fixEvent = function (event) {
  event.preventDefault = addEvent.fixEvent.preventDefault;
  event.stopPropagation = addEvent.fixEvent.stopPropagation;
  event.target=event.srcElement;
  return event;
};
//兼容 IE 和 W3C 阻止默认行为
addEvent.fixEvent.preventDefault = function () {
  this.returnValue = false;
};
//兼容 IE 和 W3C 取消冒泡
addEvent.fixEvent.stopPropagation = function () {
  this.cancelBubble = true;
};

//跨浏览器事件删除
function removeEvent(obj,type,fn) {
  if(typeof addEventListener!='undefined'){
    obj.removeEventListener(type,fn,false);  
  }else if(typeof detachEvent != 'undefined'){
    var es = obj.events[type];
    for (var i in es) {
      if (es[i] == fn) {
            delete obj.events[type][i];
      }
    }  
  }
}
//去除两边空格
function trim(str){
  return str.replace(/(^\s*)|(\s*$)/g,'');  
}

//浏览器检测
(function () {
	window.sys = {};
	var ua = navigator.userAgent.toLowerCase();	
	var s;		
	(s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] : 
	(s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] : 
	(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
	
	if (/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];
})();
//DOM加载
function addDomLoaded(fn) {
	var isReady = false;
	var timer = null;
	function doReady() {
		if (timer) clearInterval(timer);
		if (isReady) return;
		isReady = true;
		fn();
	}
	if ((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)) {
		timer = setInterval(function () {
			if (document && document.getElementById && document.getElementsByTagName && document.body) {
				doReady();
			}
		}, 1);
	} else if (document.addEventListener) {//W3C
		addEvent(document, 'DOMContentLoaded', function () {
			fn();
			removeEvent(document, 'DOMContentLoaded', arguments.callee);
		});
	} else if (sys.ie && sys.ie < 9){
		var timer = null;
		timer = setInterval(function () {
			try {
				document.documentElement.doScroll('left');
				doReady();
			} catch (e) {};
		}, 1);
	}
}
//获取计算后的 style，需要转换为数值
function getStyle(element, attr) {
     var value;
     if (typeof window.getComputedStyle != 'undefined') {//W3C
           value = window.getComputedStyle(element, null)[attr];
     } else if (typeof element.currentStyle != 'undeinfed') {//IE
           value = element.currentStyle[attr];
     }
     return value;
}
//跨浏览器获取滚动条位置
function getScroll() {
	return {
		top : document.documentElement.scrollTop || document.body.scrollTop,
		left : document.documentElement.scrollLeft || document.body.scrollLeft
	}
}
//跨浏览器获取 text
function getText(element, text) {
     return (typeof element.textContent == 'string') ? element.textContent : element.innerText;
}
//跨浏览器设置 text
function setText(element, text) {
     if (typeof element.textContent == 'string') {
           element.textContent = text;
     } else {
           element.innerText = text;
     }
}

//判断某一值是否存在某个数组里
function inArray(array, value) {
     for (var i in array) {
           if (array[i] == value) return true;
     }
     return false;
}
//获取某一个元素到最外层顶点的位置
function offsetTop(element) {
	var top = element.offsetTop;
	var parent = element.offsetParent;
	while (parent != null) {
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return top;
}
//禁止选择文本
function predef(e) {
  e.preventDefault();
}

//创建cookie
function setCookie(name, value, expires, path, domain, secure) {
	var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
	if (expires instanceof Date) {
		cookieText += '; expires=' + expires;
	}
	if (path) {
		cookieText += '; path=' + path;
	}
	if (domain) {
		cookieText += '; domain=' + domain;
	}
	if (secure) {
		cookieText += '; secure';
	}
	document.cookie = cookieText;
}

//获取cookie
function getCookie(name) {
	var cookieName = encodeURIComponent(name) + '=';
	var cookieStart = document.cookie.indexOf(cookieName);
	var cookieValue = null;
	if (cookieStart > -1) {
		var cookieEnd = document.cookie.indexOf(';', cookieStart);
		if (cookieEnd == -1) {
			cookieEnd = document.cookie.length;
		}
		cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
	}
	return cookieValue;
}

//删除cookie
function unsetCookie(name) {
	document.cookie = name + "= ; expires=" + new Date(0);
}