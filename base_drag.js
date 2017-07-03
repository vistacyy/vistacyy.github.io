//移动,传入数组，元素为包含单个节点的$对象
$().extend('drag',function() {
  var tags=arguments;
  for(var i=0;i<this.elements.length;i++){
    addEvent(this.elements[i],'mousedown',function(e){
      if(trim(this.innerHTML).length==0) e.preventDefault();
      var _this=this;
      var diffX=e.clientX-_this.offsetLeft,
          diffY=e.clientY-_this.offsetTop;  
      
      var flag = false;
      for (var i = 0; i < tags.length; i ++) {
        if (e.target == tags[i]) {
          flag = true;
          break;
        }
      }
      if (flag) {
        addEvent(document, 'mousemove', move);
        addEvent(document, 'mouseup', up);
      } else {
        removeEvent(document, 'mousemove', move);
        removeEvent(document, 'mouseup', up);
      }
      
      function move(e){
        if(trim(_this.innerHTML).length==0) e.preventDefault();
        if(_this.setCapture){
          _this.setCapture();  
        }
        var left = e.clientX - diffX;
        var top = e.clientY - diffY;
        if(left < 0){
          left=0;   
        }else if(left<=getScroll().left){
          left=getScroll().left;
        }else if(left > getInner().width - _this.offsetWidth){
          left= getInner().width - _this.offsetWidth;
        }
        if(top < 0){
          top=0;   
        }else if(left<=getScroll().top){
          left=getScroll().top;
        }else if(top > getInner().height - _this.offsetHeight){
          top= getInner().height - _this.offsetHeight;
        }
        _this.style.left=left+'px';
        _this.style.top=top+'px';
      }; 
      function up(){
        if(_this.releaseCapture){
          _this.releaseCapture();  
        }
        removeEvent(document, 'mousemove', move);
        removeEvent(document, 'mouseup', up);
      };
    });
  }
  return this;  
});