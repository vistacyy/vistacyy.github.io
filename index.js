addDomLoaded(function(){
  //个人中心
  $('#header .member').hover(function () {
       $(this).css('background', 'url(images/arrow2.png) no-repeat 55px center');
       $('#header .member .member_ul').show().animate({mul:{h:110,o:100},t:50,step:5});
  }, function () {
       $(this).css('background', 'url(images/arrow.png) no-repeat 55px center');
       $('#header .member .member_ul').animate({mul:{h:0,o:0},t:50,step:5,fn:function(){
          $('#header .member_ul').hide();
       }});
  });
  //登陆框 锁屏
  var screen=$('#screen');
  var login=$('#login');
  login.center(350,250).resize(function(){ 
    if(login.css('display')=='block'){
      screen.lock();  
    }
  });
  $('#header .login').click(function(){
    login.show(); 
    screen.lock().animate({attr:'o',target:30,t:50,step:5});  
  });
  $('#login h2 .close').click(function () {
    login.css('display','none');
    screen.animate({attr:'o',target:0,t:50,step:5,fn:function(){
      screen.unlock();  
    }}); 
  });
  //登陆框 拖拽
  login.drag($('#login h2').first(),$('#login .other span').first());
	//会员登陆
	$('form').eq(1).form('sub').click(function () {
	  if (/[\w]{2,20}/.test(trim($('form').eq(1).form('user').value()))
	      && $('form').eq(1).form('pass').value().length >= 6) {
	    var _this = this;
	    _this.disabled = true;
	    $(_this).css('backgroundPosition', 'right');
	    $('#loading').css('display', 'block').center(200, 40);
	    $('#loading p').html('正在尝试登录...');
	    ajax({
	      method : 'post',
	      url : 'is_login.php',
	      data : $('form').eq(1).serialize(),
	      success : function (text) {
	        $('#loading').css('display', 'none');
	        _this.disabled = false;
	        $(_this).css('backgroundPosition', 'left');
	        if (text == 1) {//失败
	          $('#login .info').html('登录失败，用户名或密码不正确！');
	        } else {//成功
	          setCookie('user', trim($('form').eq(1).form('user').value()));
	          $('#login .info').html('');
	          $('#success').css('display', 'block').center(200, 40);
	          $('#success p').html('登录成功...');
	          setTimeout(function () {
	            $('#success').css('display', 'none');
	            login.css('display', 'none');
	            $('form').eq(1).first().reset();
	            screen.animate({
	              attr : 'o',
	              target : 0,
	              fn : function () {
	                screen.unlock();
	              }
	            });
	            $('#header .reg').css('display', 'none');
	            $('#header .login').css('display', 'none');
	            $('#header .info').css('display', 'block').html(getCookie('user') +' 您好！');
	          }, 1500);
	        }
	      },
	      async : true
	    }); 
	  } else {
	    $('#login .info').html('登录失败，用户名或密码不合法！');
	  }
	});

  //百度分享栏
  $('#share').css('top',getScroll().top +(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+'px');
  addEvent(window,'scroll',function(){
    $('#share').css('top',getScroll().top +(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+'px');  
  });
  $('#share').hover(function(){
    $(this).animate({attr:'x',target:0});  
  },function(){
    $(this).animate({attr:'x',target:-211});
  });
  //滑动导航
  $('#nav .about li').hover(function(){
    var target=$(this).first().offsetLeft; 
    $('#nav .nav_bg').animate({attr:'x',
                              target:target+20,
                              t:30,step:10,
                              fn:function(){
                                $('#nav .white').animate({attr:'x',target:-target});  
                              }}); 
  },function(){
    $('#nav .nav_bg').animate({attr:'x',
                              target:20,
                              t:30,step:10,
                              fn:function(){
                              $('#nav .white').animate({attr:'x',target:0});  
                              }}); 
  });
  //博文列表菜单
  $('#sidebar h2').toggle(function(){
    $(this).next().animate({mul:{h:0,o:0}});  
  },function(){
    $(this).next().animate({mul:{h:150,o:100}});
  });
  //注册框
  var reg=$('#reg');
  reg.center(600,550).resize(function(){
    if(reg.css('display')=='block') screen.lock();  
  });
  $('#header .reg').click(function(){
    reg.center(600,550).css('display','block');
    screen.lock().animate({attr:'o',target:30,t:30,step:10}); 
  });
  $('#reg .close').click(function(){
    reg.css('display','none');
    screen.animate({attr:'o',target:0,t:30,step:10,fn:function(){
      screen.unlock();  
    }});  
  });
  reg.drag($('#reg h2').first());
  
  
  //注册验证 用户名
  $('form').eq(0).form('user').bind('focus',function(){msgFocus('user')})
  		.bind('blur',function(){msgBlur(this,check_user,'user')});
  //注册字段信息提示
  function msgFocus(name){
  	var info='#reg .info_'+name;
  	var error='#reg .error_'+name;
  	var succ='#reg .succ_'+name;
    $(info).css('display','block');
    $(error).css('display','none');
    $(succ).css('display','none');
  }
  function msgBlur(_this,fn,name){
  	var info='#reg .info_'+name;
  	var error='#reg .error_'+name;
  	var succ='#reg .succ_'+name;
  	var value=$(_this).value();
  	if(trim(value)==''){
      $(info).css('display','block');
      $(error).css('display','none');
      $(succ).css('display','none'); 
    } else if (!fn()) {
      $(info).css('display','none');
      $(error).css('display','block');
      $(succ).css('display','none');
    }else{
      $(info).css('display','none');
      $(error).css('display','none');
      $(succ).css('display','block');  
    }
  }
	//用户名检测
  function check_user() {
		var flag = true;
		if (!/[\w]{2,20}/.test(trim($('form').eq(0).form('user').value()))) {
			$('#reg .error_user').html('输入不合法，请重新输入！');
			return false;
		} else {
			$('#reg .loading').css('display','block');
			$('#reg .info_user').css('display','none');
			ajax({
				method : 'post',
				url : 'is_user.php',
				data : $('form').eq(0).serialize(),
				success : function (text) {
					if (text == 1) {
						$('#reg .error_user').html('用户名被占用！');
						flag = false;
					} else {
						flag = true;
					}
					$('#reg .loading').css('display','none');
				},
				async : false
			});
		}
		return flag;
  }
  
  //注册验证 密码
  $('form').eq(0).form('pass').bind('focus',function(){msgFocus('pass')})
  		.bind('blur',function(){msgBlur(this,check_pass,'pass')});
  $('form').eq(0).form('pass').bind('keyup', function () {
     check_pass()
  });
  
  //密码验证函数
  function check_pass() {
  	var value = trim($('form').eq(0).form('pass').value());
  	var value_length = value.length;
  	var code_length = 0;
  	
  	//第一个必须条件的验证6-20位之间
  	if (value_length >= 6 && value_length <= 20) {
  		$('#reg .info_pass .q1').html('●').css('color', 'green');
  	} else {
  		$('#reg .info_pass .q1').html('○').css('color', '#666');
  	}
  	
  	//第二个必须条件的验证，字母或数字或非空字符，任意一个即可
  	if (value_length > 0 && !/\s/.test(value)) {
  		$('#reg .info_pass .q2').html('●').css('color', 'green');
  	} else {
  		$('#reg .info_pass .q2').html('○').css('color', '#666');
  	}
  	
  	//第三个必须条件的验证，大写字母，小写字母，数字，非空字符 任意两种混拼即可
  	if (/[\d]/.test(value)) {
  		code_length++;
  	}
  	
  	if (/[a-z]/.test(value)) {
  		code_length++;
  	}
  	
  	if (/[A-Z]/.test(value)) {
  		code_length++;
  	}
  	
  	if (/[^\w]/.test(value)) {
  		code_length++;
  	}
  	
  	if (code_length >= 2) {
  		$('#reg .info_pass .q3').html('●').css('color', 'green');
  	} else {
  		$('#reg .info_pass .q3').html('○').css('color', '#666');
  	}
  	
  	//安全级别
  	if (value_length >= 10 && code_length >= 3) {
  		$('#reg .info_pass .s1').css('color', 'green');
  		$('#reg .info_pass .s2').css('color', 'green');
  		$('#reg .info_pass .s3').css('color', 'green');
  		$('#reg .info_pass .s4').html('高').css('color', 'green');
  	} else if (value_length >= 8 && code_length >= 2) {
  		$('#reg .info_pass .s1').css('color', '#f60');
  		$('#reg .info_pass .s2').css('color', '#f60');
  		$('#reg .info_pass .s3').css('color', '#ccc');
  		$('#reg .info_pass .s4').html('中').css('color', '#f60');
  	} else if (value_length >= 1) {
  		$('#reg .info_pass .s1').css('color', 'maroon');
  		$('#reg .info_pass .s2').css('color', '#ccc');
  		$('#reg .info_pass .s3').css('color', '#ccc');
  		$('#reg .info_pass .s4').html('低').css('color', 'maroon');
  	} else {
  		$('#reg .info_pass .s1').css('color', '#ccc');
  		$('#reg .info_pass .s2').css('color', '#ccc');
  		$('#reg .info_pass .s3').css('color', '#ccc');
  		$('#reg .info_pass .s4').html(' ');
  	}	
  	
  	if (value_length >= 6 && value_length <= 20 && !/\s/.test(value) && code_length >= 2) {
  		return true;
  	} else {
  		return false;
  	}
  }
  
  //注册验证 确认密码
  $('form').eq(0).form('notpass').bind('focus',function(){msgFocus('notpass')})
  		.bind('blur',function(){msgBlur(this,check_notpass,'notpass')});
  
  function check_notpass() {
    if (trim($('form').eq(0).form('pass').value()) ==
      trim($('form').eq(0).form('notpass').value())) return true;
  }
  
  
  //注册验证 提问
  $('form').eq(0).form('ques').bind('change', function () {
    if ($(this).value() != 0) $('#reg .error_ques').css('display', 'none');
  });
  
  function check_ques() {
    if ($('form').eq(0).form('ques').value() != 0) return true;
  }
  
  //注册验证 回答
  $('form').eq(0).form('ans').bind('focus',function(){msgFocus('nas')})
  		.bind('blur',function(){msgBlur(this,check_ans,'nas')});
  
  function check_ans() {
    if (trim($('form').eq(0).form('ans').value()).length >= 2 &&
      trim($('form').eq(0).form('ans').value()).length <= 32) return true;
  }
  
  //注册验证 电子邮箱
  $('form').eq(0).form('email').bind('focus',function(){
    if($(this).value().indexOf('@')==-1) $('#reg .all_email').css('display','block');
    $('#reg .info_email').css('display','block');
    $('#reg .succ_email').css('display','none');
    $('#reg .error_email').css('display','none'); 
  }).bind('blur',function(){
    $('#reg .all_email').css('display','none');
    if(trim($(this).value())==''){
      $('#reg .info_email').css('display','block');  
    }else if(!check_email()){
      $('#reg .info_email').css('display','none');
      $('#reg .succ_email').css('display','none');
      $('#reg .error_email').css('display','block');
    }else{
      $('#reg .info_email').css('display','none');
      $('#reg .succ_email').css('display','block');
      $('#reg .error_email').css('display','none');
    }
  });
  //注册验证 邮箱补全
  $('#reg .all_email li').bind('mousedown',function(){
    $('form').eq(0).form('email').value($(this).text()); 
    $('#reg .all_email').css('display','none');
    if(trim($(this).value())==''){
      $('#reg .info_email').css('display','block');  
    }else if(!check_email()){
      $('#reg .info_email').css('display','none');
      $('#reg .succ_email').css('display','block');
      $('#reg .error_email').css('display','none');
    }else{
      $('#reg .info_email').css('display','none');
      $('#reg .succ_email').css('display','none');
      $('#reg .error_email').css('display','block');
    }
  });
  $('form').eq(0).form('email').bind('keyup',function(event){
    if($(this).value().indexOf('@')==-1){
      $('#reg .all_email').css('display','block');
      $('#reg .all_email li span').html($(this).value());
    }else{
      $('#reg .all_email').css('display','none');  
    }
    $('#reg .all_email li').css('background','none').css('color','#666');
    
    if(event.keyCode==40){
      if( this.index==undefined || this.index >= $('#reg .all_email li').length-1){
        this.index=0;
      }else{
        this.index++;  
      }
      $('#reg .all_email li').eq(this.index).css('background', '#E5EDF2');
      $('#reg .all_email li').eq(this.index).css('color', '#369');
    }

    if(event.keyCode==38){
      if( this.index==undefined || this.index <= 0){
        this.index=$('#reg .all_email li').length-1;
      }else{
        this.index--;  
      }
      $('#reg .all_email li').eq(this.index).css('background', '#E5EDF2');
      $('#reg .all_email li').eq(this.index).css('color', '#369');
    }
    if(event.keyCode==13){
      $(this).value($('#reg .all_email li').eq(this.index).text());
      $('#reg .all_email').css('display', 'none');
      this.index = undefined;
    }
  });
  
  $('#reg .all_email li').hover(function () {
    $(this).css('background', '#E5EDF2');
    $(this).css('color', '#369');
  }, function () {
    $(this).css('background', 'none');
    $(this).css('color', '#666');
  });

  //Email验证函数
	function check_email() {
		if (/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').eq(0).form('email').value()))) return true;
	}
  
  //注册验证 生日
  var year=$('form').eq(0).form('year');
  var month=$('form').eq(0).form('month');
  var day=$('form').eq(0).form('day');
  for(var i=1950;i<=2013;i++){
    year.first().add(new Option(i,i),undefined);  
  }
  for(var i=1;i<=12;i++){
    month.first().add(new Option(i,i),undefined);  
  }
  var day30=[4,6,9,11];
  var day31=[1,3,5,7,8,10,12];
  year.bind('change',select_day);
  month.bind('change',select_day);
  //日期生成
  function select_day(){
    if(month.value()!=0 && year.value()!=0){
      var cur_day=0;
      if(inArray(day31,parseInt(month.value()))){
        cur_day=31;  
      }else if (inArray(day30,parseInt(month.value()))) {
        cur_day=30;
      }else{
        if((parseInt(year.value())%4==0 && parseInt(year.value())%4!=0)
            || parseInt(year.value())%400==0){
          cur_day=29; 
        }else{
          cur_day=28;  
        }
      }
      day.first().options.length=1;
      for(var i=1;i<=cur_day;i++){
        day.first().add(new Option(i,i),undefined);  
      }
    }else{
      day.first().options.length=1;
    }
  }
  //选择日后自动消失
  day.bind('change', function () {
    if (check_birthday()) $('#reg .error_birthday').css('display', 'none');
  });
  //年月日检测
  function check_birthday() {
    if (year.value() != 0 && month.value() != 0 && day.value() != 0) return true;
  }
  //注册验证 备注
	$('form').eq(0).form('ps').bind('keyup', check_ps).bind('paste', function () {
		setTimeout(check_ps, 50);
	});
	
	//清尾
	$('#reg .ps .clear').click(function () {
		$('form').eq(0).form('ps').value($('form').eq(0).form('ps').value().substring(0,200));
		check_ps();
	});
	
	function check_ps() {
		var num = 200 - $('form').eq(0).form('ps').value().length;
		if (num >= 0) {
			$('#reg .ps').eq(0).show();
			$('#reg .ps .num').eq(0).html(num);
			$('#reg .ps').eq(1).hide();
			return true;
		} else {
			$('#reg .ps').eq(0).hide();
			$('#reg .ps .num').eq(1).html(Math.abs(num)).css('color', 'red');
			$('#reg .ps').eq(1).show();
			return false;
		}
	}
	
  //注册验证 提交表单
  $('form').eq(0).form('sub').click(function () {
    var flag = true;
    if (!check_user()) {
      $('#reg .error_user').css('display', 'block');
      flag = false;
    }
    if (!check_pass()) {
      $('#reg .error_pass').css('display', 'block');
      flag = false;
    }
    if (!check_notpass()) {
      $('#reg .error_notpass').css('display', 'block');
      flag = false;
    }
    if (!check_ques()) {
      $('#reg .error_ques').css('display', 'block');
      flag = false;
    }
    if (!check_ans()) {
      $('#reg .error_ans').css('display', 'block');
      flag = false;
    }
    if (!check_email()) {
      $('#reg .error_email').css('display', 'block');
      flag = false;
    }
    if (!check_birthday()) {
      $('#reg .error_birthday').css('display', 'block');
      flag = false;
    }
		
		if (!check_ps()) {
			flag = false;
		}
		
		if (flag) {
			var _this = this;
			$('#loading').css('display','block').center(200, 40);
			$('#loading p').html('正在提交注册中...');
			_this.disabled = true;
			$(_this).css('backgroundPosition', 'right');
			ajax({
				method : 'post',
				url : 'add.php',
				data : $('form').eq(0).serialize(),
				success : function (text) {
					if (text == 1) {
						$('#loading').css('display','none');
						$('#success').css('display','block').center(200, 40);
						$('#success p').html('注册成功，请登录...');
						setTimeout(function () {
							$('#success').css('display','none');
							reg.css('display','none');
							$('#reg .succ').css('display','none');
							$('form').eq(0).first().reset();
							_this.disabled = false;
							$(_this).css('backgroundPosition', 'left');
							screen.animate({
								attr : 'o',
								target : 0,
								fn : function () {
									screen.unlock();
								}
							});
						}, 1500);
					}
				},
				async : true
			});
		}
		
  });


  

  //轮播器
  $('#banner img').opacity(0);
  $('#banner img').eq(0).opacity(100);
  $('#banner strong').html($('#banner img').eq(0).attr('alt'));
  $('#banner ul li').eq(0).css('color','#333');
  for(var i=0;i<$('#banner img').length();i++){
    $('#banner img').eq(i).css('top',0+(i*150)+'px');  
  }
  var banner_index=1;
  var banner_type=1;//1透明 2上下滚动
  var banner_timer=setInterval(banner_fn,3000);//自动
  //手动
  $('#banner ul li').hover(function(){
    clearInterval(banner_timer);
    if($(this).css('color')!='rgb(51,51,51)'){
      banner(this,banner_index==0?$('#banner ul li').length()-1:banner_index-1);  
    }  
  },function(){
    banner_index=$(this).index()+1;
    banner_timer=setInterval(banner_fn,3000);  
  });
  function banner(obj,prev){
    $('#banner img').css('zIndex',1); 
    $('#banner ul li').css('color','#999');
    $(obj).css('color','#333');
    $('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
    if(banner_type==1){
      $('#banner img').eq(prev).animate({attr:'o',target:0});
      $('#banner img').eq($(obj).index()).animate({attr:'o',target:100}).css('top',0).css('zIndex','2');
    }else if(banner_type==2){
      $('#banner img').opacity(100);
      $('#banner img').eq(prev).animate({attr : 'y',target : 150});
      $('#banner img').eq($(obj).index()).animate({attr : 'y', target : 0}).css('top', '-150px').css('zIndex', 2);
    }
  }
  function banner_fn() {
    if (banner_index >= $('#banner ul li').length()) banner_index = 0;
    banner($('#banner ul li').eq(banner_index).first(), banner_index == 0 ?
                                      $('#banner ul li').length() - 1 : banner_index - 1);
    banner_index++;
  }
  //延迟加载
  var wait_load=$('.wait_load');
  wait_load.opacity(0);
  $(window).bind('scroll',function(){
    setTimeout(function(){
      for(var i=0;i<wait_load.length();i++){
        var _this=wait_load.ge(i); 
        if((getInner().height+getScroll().top)>=offsetTop(_this)){
          $(_this).attr('src',$(_this).attr('xsrc')).animate({attr:'o',target:100});  
        } 
      }  
    },100);  
  });
  //大图
  var photo_big=$('#photo_big');
  photo_big.center(620,510).resize(function(){
    if(photo_big.css('display')=='block') screen.lock();  
  });
  $('#photo dt img').click(function(){
    photo_big.center(620,510).css('display','block');
    screen.lock().animate({attr:'o',target:30});
    var temp_img=new Image();
    $(temp_img).bind('load',function(){
      $('#photo_big .big img').attr('src',temp_img.src).animate({attr:'o',target:100
          }).css('width', '600px').css('height', '450px').css('top', 0).opacity(0);
    }); 
    temp_img.src=$(this).attr('bigsrc');
    var children=this.parentNode.parentNode;
    prev_next_img(children);
  });
  $('#photo_big .close').click(function () {
    photo_big.css('display', 'none');
    screen.animate({attr : 'o',target : 0,
        fn : function () {
          screen.unlock();
        }});
    $('#photo_big .big img').attr('src', 'images/loading.gif').css('width', '32px').
      css('height', '32px').css('top', '190px');
  });
  //拖拽
  photo_big.drag($('#photo_big h2').last());
  //图片鼠标划过
  $('#photo_big .big .left').hover(function () {
    $('#photo_big .big .sl').animate({attr : 'o',target : 50});
  }, function () {
    $('#photo_big .big .sl').animate({attr : 'o',target : 0});
  });
  $('#photo_big .big .right').hover(function () {
    $('#photo_big .big .sr').animate({attr : 'o',target : 50});
  }, function () {
    $('#photo_big .big .sr').animate({attr : 'o',target : 0});
  });
  //图片点击上一张
  $('#photo_big .big .left').click(function () {
    $('#photo_big .big img').attr('src', 'images/loading.gif').css('width', '32px').css('height', '32px').css('top', '190px');
    var current_img = new Image();
    $(current_img).bind('load', function () {
      $('#photo_big .big img').attr('src', current_img.src).animate({
          attr : 'o',
          target : 100
      }).opacity(0).css('width', '600px').css('height', '450px').css('top', 0);
    });
    current_img.src = $(this).attr('src');
    var children = $('#photo dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'), $('#photo').first())).parentNode.parentNode;
    prev_next_img(children);
  });
  //图片点击下一张
  $('#photo_big .big .right').click(function () {
    $('#photo_big .big img').attr('src', 'images/loading.gif').css('width', '32px').
           css('height', '32px').css('top', '190px');
    var current_img = new Image();
    $(current_img).bind('load', function () {
      $('#photo_big .big img').attr('src', current_img.src).animate({
          attr : 'o',
          target : 100
      }).opacity(0).css('width', '600px').css('height', '450px').css('top', 0);
    });
    current_img.src = $(this).attr('src');
    var children = $('#photo dl dt img').ge(nextIndex($('#photo_big .big img').attr('index'), $('#photo').first())).parentNode.parentNode;
    prev_next_img(children);
  });
  //返回组中前个，后个索引
  function prevIndex(current,parent){
    var length=parent.children.length;
    if(current==0)return length-1;
    return parseInt(current)-1;
  }
  function nextIndex(current,parent){
    var length=parent.children.length;
    if(current==length-1) return 0;
    return parseInt(current)+1;
  }
  function prev_next_img(children){
    var prev=prevIndex($(children).index(),children.parentNode);
    var next=nextIndex($(children).index(),children.parentNode);
    var prev_img=new Image();
    var next_img=new Image();
    prev_img.src=$('#photo dl dt img').eq(prev).attr('bigsrc');
    next_img.src=$('#photo dl dt img').eq(next).attr('bigsrc');
    $('#photo_big .big .left').attr('src',prev_img.src);
    $('#photo_big .big .right').attr('src',next_img.src);
    $('#photo_big .big img').attr('index',$(children).index());
    $('#photo_big .big .index').html(parseInt($(children).index()) + 1 + '/' + $('#photo dl dt img').length());
  }
	//发表博文
  var blog=$('#blog');
  blog.center(580,320).resize(function(){ 
    if(blog.css('display')=='block'){
      screen.lock();  
    }
  });
  $('#header .member li').eq(0).click(function(){
    blog.css('display','block'); 
    screen.lock().animate({attr:'o',target:30,t:50,step:5});  
  });
  $('#blog h2 .close').click(function () {
    blog.css('display','none');
    screen.animate({attr:'o',target:0,t:50,step:5,fn:function(){
      screen.unlock();  
    }}); 
  });
  blog.drag($('#blog h2').first());
  
	$('form').eq(2).form('sub').click(function () {
	  if (trim($('form').eq(2).form('title').value()).length <= 0
	                  || trim($('form').eq(2).form('content').value()).length <= 0) {
	    $('#blog .info').html('发表失败：标题或内容不得为空！');
	  } else {
	    var _this = this;
	    _this.disabled = true;
	    $(_this).css('backgroundPosition', 'right');
	    $('#loading').css('display','block').center(200, 40);
	    $('#loading p').html('正在发表博文...');
	    ajax({
	      method : 'post',
	      url : 'add_blog.php',
	      data : $('form').eq(2).serialize(),
	      success : function (text) {
	      $('#loading').css('display','none');
	      if (text == 1) {
	        $('#blog .info').html('');
	        $('#success').css('display','block').center(200, 40);
	        $('#success p').html('发表成功...');
	        setTimeout(function () {
	          $('#success').css('display','none');
	          $('#blog').css('display','none');
	          $('form').eq(2).first().reset();
	          screen.animate({
	                attr : 'o',
	                target : 0,
	                fn : function () {
	                  screen.unlock();
	                }
	          });
	          _this.disabled = false;
	          $(_this).css('backgroundPosition', 'left');
	        }, 1500);
	      }
	      },
	      async : true
	    });
	  }
	  readBlog();
	});
	
	readBlog();
	//提取博文
	function readBlog(){
		ajax({
		  method : 'post',
		  url : 'get_blog.php',
		  data : {},
		  success : function (text) {
		    var json = JSON.parse(text);
		    var html = '';
		    for (var i = 0; i < json.length; i ++) {
		      html += '<div class="content"><h2><em>' + json[i]['date'] + '</em>'
		            + json[i]['title'] + '</h2><p>' + json[i]['content'] + '</p></div>';
		    }
		    $('#index').html(html);
		    for (var i = 0; i < json.length; i ++) {
		      $('#index .content').eq(i).animate({
		        attr : 'o',
		        target : 100
		      });
		    }
		  },
		  async : true
		});
	}
  //换肤
  var skin=$('#skin');
  skin.center(650,360).resize(function(){ 
    if(skin.css('display')=='block'){
      screen.lock();  
    }
  });
  $('#header .member li').eq(1).click(function(){
    skin.css('display','block'); 
    screen.lock().animate({attr:'o',target:30,t:50,step:5});  
    
		ajax({
		  method : 'post',
		  url : 'get_skin.php',
		  data : {'type' : 'all'},
		  success : function (text) {
		    var json = JSON.parse(text);
		    var html = '';
		    for (var i = 0; i < json.length; i ++) {
		      html += '<dl><dt><img src="images/' + json[i].small_bg +
		        '" big_bg="images/' + json[i].big_bg + '" bg_color="' +
		      json[i].bg_color + '"><dt><dd>' + json[i].bg_text + '</dd></dl>';
		    }
		    $('#skin .skin_bg').html(html).opacity(0).animate({
		      attr : 'o',
		      target : 100
		    });
		    $('#skin .skin_bg dl dt img').click(function () {
		      $('body').css('background', $(this).attr('bg_color') + ' ' +
		        'url(' + $(this).attr('big_bg') + ') repeat-x');
		      ajax({
		        method : 'post',
		        url : 'get_skin.php',
		        data : {
		          'type' : 'set',
		          'big_bg' : $(this).attr('big_bg').substring(7)
		        },
		        success : function (text) {
		        if (text == 1) {
		          $('#success').css('display','block').center(200, 40);
		          $('#success p').html('皮肤更换成功...');
		          setTimeout(function () {
		          $('#success').css('display','none');
		          }, 1500);
		          }
		        },
		        async : true
		      });
		    }); 
		  },
		  async : true
		});
		
	  ajax({
	    method : 'post',
	    url : 'get_skin.php',
	    data : {'type' : 'main'},
	    success : function (text) {
	      var json = JSON.parse(text);
	      $('body').css('background', json.bg_color + ' ' + 'url(images/' + json.big_bg + ') repeat-x');
	    },
	    async : true
	  });
	  
  });
  
  ajax({
	    method : 'post',
	    url : 'get_skin.php',
	    data : {'type' : 'main'},
	    success : function (text) {
	      var json = JSON.parse(text);
	      $('body').css('background', json.bg_color + ' ' + 'url(images/' + json.big_bg + ') repeat-x');
	    },
	    async : true
	  });
  
  $('#skin h2 .close').click(function () {
    skin.css('display','none');
    screen.animate({attr:'o',target:0,t:50,step:5,fn:function(){
      screen.unlock();  
    }}); 
  });
  skin.drag($('#skin h2').first());
  
});