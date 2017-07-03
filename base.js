//创建对象
var $ = function (args) {
     return new Base(args);
}
//对象原型函数
function Base(args) {
	this.elements = [];
	if (typeof args == 'string') {
		if (args.indexOf(' ') != -1) {
			var elements = args.split(' ');			//把节点拆开分别保存到数组里
			var childElements = [];					//存放临时节点对象的数组，解决被覆盖的问题
			var node = [];								//用来存放父节点用的
			for (var i = 0; i < elements.length; i ++) {
				if (node.length == 0) node.push(document);		//如果默认没有父节点，就把document放入
				switch (elements[i].charAt(0)) {
					case '#' :
						childElements = [];				//清理掉临时节点，以便父节点失效，子节点有效
						childElements.push(this.getId(elements[i].substring(1)));
						node = childElements;		//保存父节点，因为childElements要清理，所以需要创建node数组
						break;
					case '.' : 
						childElements = [];
						for (var j = 0; j < node.length; j ++) {
							var temps = this.getClass(elements[i].substring(1), node[j]);
							for (var k = 0; k < temps.length; k ++) {
								childElements.push(temps[k]);
							}
						}
						node = childElements;
						break;
					default : 
						childElements = [];
						for (var j = 0; j < node.length; j ++) {
							var temps = this.getTagName(elements[i], node[j]);
							for (var k = 0; k < temps.length; k ++) {
								childElements.push(temps[k]);
							}
						}
						node = childElements;
				}
			}
			this.elements = childElements;
		} else {
			//find模拟
			switch (args.charAt(0)) {
				case '#' :
					this.elements.push(this.getId(args.substring(1)));
					break;
				case '.' : 
					this.elements = this.getClass(args.substring(1));
					break;
				default : 
					this.elements = this.getTagName(args);
			}
		}
	} else if (typeof args == 'object') {
		if (args != undefined) {    //_this是一个对象，undefined也是一个对象，区别与typeof返回的带单引号的'undefined'
			this.elements[0] = args;
		}
	} else if (typeof args == 'function') {
		this.ready(args);
	}
}
//通过ID获得元素
Base.prototype.getId=function(id){
  return document.getElementById(id); 
};
//通过类名获得元素
Base.prototype.getClass=function(className,parentNode){
  var temps=[];
  var node=document;
  if(parentNode!=undefined)  node=parentNode;
  var all=node.getElementsByTagName('*');
  for(var i=0;i<all.length;i++){
    if((new RegExp('(\\s|^)'+className+'(\\s|$)')).test(all[i].className)){
      temps.push(all[i]);  
    }
  }
  return temps;
};
//添加类名
Base.prototype.addClass=function(className){
  for(var i=0;i<this.elements.length;i++){
    if(!this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
       this.elements[i].className+=' '+className;
    }
  }
  return this;
};
//移除类名
Base.prototype.delClass=function(className){
  for(var i=0;i<this.elements.length;i++){
    if(this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
       this.elements[i].className=this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),'');
    }
  }
  return this;
};
//通过标签获得元素
Base.prototype.getTagName=function(tag,parentNode){
  var node=document;
  if(parentNode!=undefined) node=parentNode;  
  return node.getElementsByTagName(tag);
};
//单击方法
Base.prototype.click=function(fn){
  for(var i=0;i<this.elements.length;i++){
    this.elements[i].onclick=fn;
  }
  return this;
};
//修改、获取元素样式
Base.prototype.css=function(attr,value){
  for(var i=0;i<this.elements.length;i++){
    if(arguments.length==1){
      if(typeof window.getComputedStyle!='undefined'){
        return window.getComputedStyle(this.elements[i],null)[attr];  //W3C
      }else if(typeof this.elements[i].currentStyle!='undefined'){
        return this.elements[i].currentStyle[attr];//IE  
      }
    }else{
      this.elements[i].style[attr]=value;
    }
  }
  return this;
};
//修改、获取元素内容
Base.prototype.html=function(value){
  for(var i=0;i<this.elements.length;i++){
    if(arguments.length==0){
      return this.elements[i].innerHTML;  
    }
    this.elements[i].innerHTML=value;
  }
  return this;
};
//获取某一个节点,返回对象
Base.prototype.eq=function(num){
  var element=this.elements[num];
  this.elements=[];
  this.elements[0]=element;
  return this;
};
//获取指定节点
Base.prototype.ge=function(num){
  return this.elements[num];  
};
//获取首个节点
Base.prototype.first=function(){
  return this.elements[0];  
};
//获取最后一个节点
Base.prototype.last=function(){
  return this.elements[this.elements.length-1];  
};
//鼠标移入移出
Base.prototype.hover=function(over,out){
  for(var i=0;i<this.elements.length;i++){
    addEvent(this.elements[i],'mouseover',over);
    addEvent(this.elements[i],'mouseout',out);
  }
  return this;  
};
//设置显示隐藏
Base.prototype.hide=function(){
  for(var i=0;i<this.elements.length;i++){
    this.elements[i].style.display='none';
  }
  return this;  
};
Base.prototype.show=function(){
  for(var i=0;i<this.elements.length;i++){
    this.elements[i].style.display='block';
  }
  return this;  
};
//设置居中显示
Base.prototype.center=function(width,height){
  for(var i=0;i<this.elements.length;i++){
    this.elements[i].style.top=getScroll().top+(document.documentElement.clientHeight-height)/2-20+'px';
    this.elements[i].style.left=getScroll().left+(document.documentElement.clientWidth-width)/2+'px';
  }
  return this;  
};
//触发浏览器窗口事件
Base.prototype.resize = function (fn) {
	for (var i = 0; i < this.elements.length; i ++) {
		var element = this.elements[i];
		addEvent(window, 'resize', function () {
			fn();
			if (element.offsetLeft > getInner().width + getScroll().left - element.offsetWidth) {
				element.style.left = getInner().width + getScroll().left - element.offsetWidth + 'px';
				if (element.offsetLeft <= 0 + getScroll().left) {
					element.style.left = 0 + getScroll().left + 'px';
				}
			}
			if(element.offsetTop > getInner().height + getScroll().top - element.offsetHeight) {
				element.style.top = getInner().height + getScroll().top - element.offsetHeight + 'px';
				if (element.offsetTop <= 0 + getScroll().top) {
					element.style.top = 0 + getScroll().top + 'px';
				}
			}
		});
	}
	return this;
};
//锁屏
Base.prototype.lock=function(){
  for(var i=0;i<this.elements.length;i++){
    this.elements[i].style.width=getInner().width+getScroll().left+'px';
    this.elements[i].style.height=getInner().height+getScroll().top+'px';
    this.elements[i].style.display='block';
    parseFloat(sys.firefox)<4?document.body.style.overflow='hidden': 
       document.documentElement.style.overflow = 'hidden';
    addEvent(document,'selectstart',predef);
//    addEvent(document,'mousedown',predef);
//    addEvent(document,'mouseup',predef);
  }
  return this;  
};
//解锁屏
Base.prototype.unlock=function(){
  for(var i=0;i<this.elements.length;i++){
    this.elements[i].style.display='none';
    parseFloat(sys.firefox)<4?document.body.style.overflow='auto': 
       document.documentElement.style.overflow = 'auto';
    removeEvent(document,'selectstart',predef);
//    removeEvent(document,'mousedown',predef);
//    removeEvent(document,'mouseup',predef);
  }
  return this;  
};
//设置插件方法
Base.prototype.extend=function(name,fn){
  Base.prototype[name]=fn;  
};


//动画
Base.prototype.animate=function(obj){
  for(var i=0;i<this.elements.length;i++){
    var element=this.elements[i];
    var mul=obj['mul'];
    var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' :
           obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' :
           obj['attr'] == 'o' ? 'opacity' : 'left';
    var start = obj['start'] != undefined ? obj['start'] :attr == 'opacity' ? 
        parseFloat(getStyle(element, attr)) * 100 : parseInt(getStyle(element, attr));
    var t=obj['t']!=undefined?obj['t']:10;
    var step=obj['step']!=undefined?obj['step']:20;
    var speed=obj['speed']!=undefined?obj['speed']:6;
    var type=obj['type']==0?'constant':obj['type']==1?'buffer':'buffer';
    var alter=obj['alter'];
    var target=obj['target'];
    if(alter!=undefined && target==undefined){
      target=alter+start;  
    }else if(alter==undefined && target==undefined && mul==undefined){
      throw new Error('alter,target至少有一个.')  
    }
    if( start > target) step=-step;
    if (attr == 'opacity') {
			element.style.opacity = parseInt(start) / 100;
			element.style.filter = 'alpha(opacity=' + parseInt(start) +')';
		} else {
			element.style[attr] = start + 'px';
		}
		
		if (mul == undefined) {
      mul = {};
      mul[attr] = target;
    }
    clearInterval(element.timer);
    element.timer=setInterval(function(){
      var flag = true;
      for(var i in mul){
        attr = i == 'x' ? 'left' : i == 'y' ? 'top' : i == 'w' ? 'width' : i == 'h' ?
               'height' : i == 'o' ?'opacity' : i != undefined ? i : 'left';
        target = mul[i];  
        if(type=='buffer'){
          var parse= attr=='opacity' ? (target-parseFloat(getStyle(element, attr)) * 100)/speed:
                                  (target-parseInt(getStyle(element,attr)))/speed;
          step=step > 0 ? Math.ceil(parse) : Math.floor(parse);  
        }
        if(attr=='opacity'){
				  if (step == 0) {
						setOpacity();
					} else if (step > 0 && Math.abs(parseFloat(getStyle(element, attr)) * 100 - target) <= step) {
						setOpacity();
					} else if (step < 0 && (parseFloat(getStyle(element, attr)) * 100 - target) <= Math.abs(step)) {
						setOpacity();
					} else {
						var temp = parseFloat(getStyle(element, attr)) * 100;
						element.style.opacity = parseInt(temp + step) / 100;
						element.style.filter = 'alpha(opacity=' + parseInt(temp + step) + ')';
					}  
          if (parseInt(target) != parseInt(parseFloat(getStyle(element, attr)) * 100)) flag = false;
        }else{
					if (step == 0) {
						setTarget();
					} else if (step > 0 && Math.abs(parseInt(getStyle(element, attr)) - target) <= step) {
						setTarget();
					} else if (step < 0 && (parseInt(getStyle(element, attr)) - target) <= Math.abs(step)) {
						setTarget();
					} else {
						element.style[attr] = parseInt(getStyle(element, attr)) + step + 'px';
					}
  				if (parseInt(target) != parseInt(getStyle(element, attr))) flag = false;
        }
      }
      if (flag) {
        clearInterval(element.timer);
        if (obj.fn != undefined) obj.fn();
			}
    },t);
    
		function setTarget() {
			element.style[attr] = target + 'px';
		}

    function setOpacity() {
       element.style.filter = 'alpha(opacity='+ target +')';
       element.style.opacity = target / 100;
    }
  }
  return this;  
};
//设置点击切换
Base.prototype.toggle=function () {
  for(var i=0;i<this.elements.length;i++){
    (function(element,args){
      var count=0;
      addEvent(element,'click',function(){
        args[count++%args.length].call(element);  
      });
    })(this.elements[i],arguments);

  }
  return this;
}
//获取同级元素的下一个元素节点
Base.prototype.next=function(){
  for(var i=0;i<this.elements.length;i++){
    this.elements[i]=this.elements[i].nextSibling;
    if(this.elements[i]==null) throw new Error('找不到下个兄弟节点');
    if(this.elements[i].nodeType==3) this.next();
  }
  return this;  
};
//获取同级元素的上一个元素节点
Base.prototype.prev=function(){
  for(var i=0;i<this.elements.length;i++){
    this.elements[i]=this.elements[i].previousSibling;
    if(this.elements[i]==null) throw new Error('找不到上个兄弟节点');
    if(this.elements[i].nodeType==3) this.prev();
  }
  return this;  
};
//绑定事件
Base.prototype.bind=function(event,fn){
  for(var i=0;i<this.elements.length;i++){
    addEvent(this.elements[i],event,fn);
  }
  return this;  
};
//获取表单字段
Base.prototype.form=function(name){
  for(var i=0;i<this.elements.length;i++){
    this.elements[i]=this.elements[i][name];
  }
  return this;  
};
//设置表单value
Base.prototype.value=function(str){
  for(var i=0;i<this.elements.length;i++){
    if(arguments.length==0){
      return this.elements[i].value;  
    }
    this.elements[i].value=str;
  }
  return this;  
};
//获取节点数组的长度
Base.prototype.length=function(){
  return this.elements.length; 
};
//设置innerText
Base.prototype.text=function(str){
  for(var i=0;i<this.elements.length;i++){
    if(arguments.length==0){
      return getText(this.elements[i],str);  
    }
    setText(this.elements[i],str);
  }
  return this;
};
//获取节点在组中的位置
Base.prototype.index=function(){
  var children=this.elements[0].parentNode.children;
  for(var i=0;i<children.length;i++){
    if(children[i]==this.elements[0])
      return i;  
  }
};
//获取节点的属性值
Base.prototype.attr = function (attr, value) {
    for (var i = 0; i < this.elements.length; i ++) {
          if (arguments.length == 1) {
                return this.elements[i].getAttribute(attr);
          } else if (arguments.length == 2) {
                this.elements[i].setAttribute(attr ,value);
          }
    }
    return this;
};

//设置元素节点透明度
Base.prototype.opacity=function(num){
  for(var i=0;i<this.elements.length;i++){
    this.elements[i].style.opacity = num / 100;
    this.elements[i].style.filter = 'alpha(opacity=' + num + ')';
  }
  return this;  
};
