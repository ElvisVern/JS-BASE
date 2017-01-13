
$(function() {
  $('.member').hover(function(){
    //$().getId('toggleI').removeClass('icon-caret-down').addClass('icon-caret-up');
    $('.member_ul').show();
  },function(){
    $('.member_ul').hide();
  });
  
  //console.log(document.documentElement.clientHeight - 250)/2
  //console.log(document.documentElement.clientWidth - 350)/2
  // 遮罩画布
  var screen = $('#screen');

  // 登录框
  var login = $('#login');
  
  login.center(350,250).resize(function() {
    //Flogin.center(350,250);
    if (login.css('display') == 'block') {
      screen.lock();
    }
  });
  
  $('.login').click(function() {
    login.center(350,250).css('display', 'block');
    screen.lock().animate({
      attr : 'o',
      target : 50,
      time : 20,
      step : 10
    });
    //$('.text').focus;  //  这里为什么只有第一次会获得焦点
  });

  $('#lclose').click(function() {
    login.css('display', 'none');
    // 先执行渐变动画再执行关闭动作 即 所谓的列队动画
    screen.animate({
      attr : 'o',
      target : 0,
      time : 10,
      step : 10,
      fn : function() {
        screen.unlock();
      }
    });
  });

  // 注册框
  var reg = $('#reg');
  
  reg.center(500,550).resize(function() {
    //Flogin.center(350,250);
    if (reg.css('display') == 'block') {
      screen.lock();
    }
  });
  
  $('.reg').click(function() {
    reg.center(500,550).css('display', 'block');
    screen.lock().animate({
      attr : 'o',
      target : 50,
      time : 20,
      step : 10
    });
    //$('.text').focus;  //  这里为什么只有第一次会获得焦点
  });

  $('#rclose').click(function() {
    reset();
    reg.css('display', 'none');

    // 先执行渐变动画再执行关闭动作 即 所谓的列队动画
    screen.animate({
      attr : 'o',
      target : 0,
      time : 10,
      step : 10,
      fn : function() {
        screen.unlock();
      }
    });
  });
  
  // 拖拽
  // var oDiv = document.getElementById('login');
  // 流程:先点下去，点下的物体被选中进行移动，抬起鼠标，停止移动
  // oDiv.drag();  这里就拿不到Base 对象了
  
  login.drag($('#login-head').first());
  reg.drag($('#reg-head').first());
  //Flogin.drag();

  $('.sidebarh').toggle(function() {
    //console.log(this.innerHTML);
    $(this).next().animate({
      attr : 'h',
      target : 0
    });
  },function() {
    $(this).next().animate({
      attr : 'h',
      target : 150
    })
  });

  //alert($('form').form('user').value());
  // 用户名验证
  $('form').form('user').bind('focus',function() {
    $('.error_user').css('display','none');
    $('.succ_user').css('display','none');
  }).bind('blur',function() {
    if (!check_user()) {
      $('.error_user').css('display','block');
      $('.succ_user').css('display','none');
    }  else {
      $('.succ_user').css('display','block');
      $('.error_user').css('display','none');
    }
  });
  function check_user() {
    if(/[a-zA-Z0-9_]{2,20}/.test(trim($('form').form('user').value()))) {
      return true;
    }
  }


  // 密码确认
  $('form').form('nopass').bind('focus',function() {
    $('.error_nopass').css('display','none');
    $('.succ_nopass').css('display','none');
  }).bind('blur',function() {
    if ($(this).value() != trim($('form').form('pass').value())) {
      $('.error_nopass').css('display','block');
      $('.succ_nopass').css('display','none');
    }  else if($(this).value() == '') {
      $('.succ_nopass').css('display','none');
      $('.error_nopass').css('display','none');
    } else {
      $('.succ_nopass').css('display','block');
      $('.error_nopass').css('display','none');
    }
  });
  function check_nopass() {
    if ($('form').form('nopass').value() == trim($('form').form('pass').value())) {
      return true;
    }
  }

  // 邮箱验证补全
  $('form').form('email').bind('focus',function() {
    // 显示提示
    if ($(this).value().indexOf('@') == -1) {
      $('.all_email').css('display','block');
    }
    $('.error_email').css('display','none');
    $('.succ_email').css('display','none');
  }).bind('blur',function() {
    // 隐藏提示
    $('.all_email').css('display','none');
    if (trim($(this).value()) == '') {
      $('.error_email').css('display','block');
    } else if (/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($(this).value()))) {
      $('.error_email').css('display','none');
      $('.succ_email').css('display','block');
    } else {
      $('.error_email').css('display','block');
      $('.succ_email').css('display','none');
    }
  });

  $('form').form('email').bind('keyup',function(event) {
    if ($(this).value().indexOf('@') == -1) {
      $('.all_email').css('display','block');
      $('.all_email_text').html($(this).value());
    } else {
      $('.all_email').css('display','none');
    }
    //alert(event.keyCode)
    if (event.keyCode == 40) { // 下方向键
      if (this.index == undefined || this.index >= $('.all_email_li').length() -1) {
        this.index = 0;
      } else {
        this.index ++;
      }
      $('.all_email_li').css('color','#000');
      $('.all_email_li').eq(this.index).css('color','#d4bbbb');
    }

    if (event.keyCode == 38) { // 上方向键
      if (this.index == undefined || this.index <= 0) {
        this.index = $('.all_email_li').length() -1;
      } else {
        this.index --;
      }
      $('.all_email_li').css('color','#000');
      $('.all_email_li').eq(this.index).css('color','#d4bbbb');
    }

    if (event.keyCode == 13) { // 回车
      $(this).value($('.all_email_li').eq(this.index).text());
      $('.all_email').css('display','none');
      this.index = undefined;
    }

  });

  function check_email() {
    if (/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').form('email').value()))) {
      return true;
    }
  }

  // 提示点击获取    click是点击弹起时候才触发
  $('.all_email_li').bind('mousedown',function() {
    $('form').form('email').value($(this).text());
  });


  // 生日
  var year = $('form').form('year');
  var month = $('form').form('month');
  var day = $('form').form('day');
  var day30 = [4,6,9,11];
  var day31 = [1,3,5,7,8,10,12];

  // 年
  for (var i = 1980; i <= 2016; i++) {
    year.first().add(new Option(i,i), undefined);
  }

  // 月
  for (var i = 1; i <= 12; i++) {
    month.first().add(new Option(i,i), undefined);
  }
  // 改变年的select
  year.bind('change',function() {
    if ($(this).value() != 0 || month.value() != 0) {
      day.first().options.length = 1;
      // 设置日
      // 不确定的日
      var cur_day = 0;

      if (inArray(day31, parseInt(month.value()))) {
        cur_day = 31;
      } else if (inArray(day30, parseInt(month.value()))) {
        cur_day = 30;
      } else {
        if (parseInt($(this).value()) % 4 == 0 && parseInt($(this).value()) % 100 != 0) {
          cur_day = 29;
        } else {
          cur_day = 28;
        }
      }
      for(var i = 1; i <= 31; i++) {
          day.first().add(new Option(i,i), undefined);
      }

    } else {
      day.first().options.length = 1;
    }
  });
  // 改变月的select
  month.bind('change',function() {
    if (year.value() != 0 || month.value() != 0) {
      day.first().options.length = 1;
      // 设置日
      // 不确定的日
      var cur_day = 0;

      if (inArray(day31, parseInt(month.value()))) {
        cur_day = 31;
      } else if (inArray(day30, parseInt(month.value()))) {
        cur_day = 30;
      } else {
        if (parseInt(year.value()) % 4 == 0 && parseInt(year.value()) % 100 != 0) {
          cur_day = 29;
        } else {
          cur_day = 28;
        }
      }
      for(var i = 1; i <= 31; i++) {
          day.first().add(new Option(i,i), undefined);
      }

    } else {
      day.first().options.length = 1;
    }
  });

  // 备注
  $('form').form('ps').bind('keyup', check_ps).bind('paste',function() {
    setTimeout(check_ps(),0);
  });
  function check_ps() {
    var num = 200 - $('form').form('ps').value().length;
    if (num > 0) {
      $('.tips').css('display','block');
      $('.num').eq(0).html(num);
      $('.tips-ext').css('display','none');
      return true;
    } else {
      $('.tips').css('display','none');
      $('.num').eq(1).html(Math.abs(num)).css('color','#d4bbbb');
      $('.tips-ext').css('display','block');
      return false;
    }
  }

  // 清尾
  $('.clear').click(function() {
    $('form').form('ps').value($('form').form('ps').value().substring(0,num));
    check();
  });

  // 提交
  $('form').form('sub').click(function() {
    var flag = true;
    if (!check_user()) {
      $('.error_user').css('display','block');
      flag = false;
    }
    if (!check_nopass() || $('form').form('pass').value() == '') {
      $('.error_nopass').css('display','block');
      flag = false;
    }
    if (!check_email()) {
      $('.error_email').css('display','block');
      flag = false;
    } 
    
    if (!check_ps()) {
      flag = false;
    }
    if (flag) {
      $('form').first().submit();
    }
  });

  function reset() {
    document.getElementById("form-reg").reset();
    $('.succ_user').css('display','none');
    $('.error_user').css('display','none');

    $('.error_nopass').css('display','none');
    $('.succ_nopass').css('display','none');

    $('.error_email').css('display','none');
    $('.succ_email').css('display','none');

  }

  // 轮播器初始化
  $('.img-l').css('display', 'none');
  $('.img-l').eq(0).css('display', 'block');

  //$('.img-l').css('opacity', '0');
  //$('.img-l').eq(0).css('opacity', '100');

  $('.lun-text').html($('.img-l').eq(0).attr('alt'));
  $('.lun').eq(0).css('color', '#666');
  
  // 自动轮播
  var banner_index = 1;
  var banner_timer = setInterval(banner_fn, 2000);


  // 手动轮播
  $('.lun').hover(function() {
    clearInterval(banner_timer);
    banner(this, banner_index == 0 ? $('.lun').length() - 1 : banner_index -1);
  },function() {
    banner_index = $(this).index() + 1;
    banner_timer = setInterval(banner_fn, 2000);
  });

  function banner(obj) {  //显示隐藏
    $('.img-l').css('display', 'none');
    $('.img-l').eq($(obj).index()).css('display', 'block');
    $('.lun').css('color', '#999');
    $(obj).css('color', '#666');
    $('.lun-text').html($('.img-l').eq($(obj).index()).attr('alt'));
  }

  // function banner(obj, prev) {  //透明度变化
  //   $('.lun').css('color', '#999');
  //   $(obj).css('color', '#666');
  //   $('.lun-text').html($('.img-l').eq($(obj).index()).attr('alt'));
    
  //   var banner_type = 2;
  //   if (banner_type == 1) {  // 透明度
  //     $('.img-l').eq(prev).animate({
  //       attr : 'o',
  //       target : 0,
  //       t : 30,
  //       step : 10
  //     }).css('zIndex', '2');

  //     $('.img-l').eq($(obj).index()).animate({
  //       attr : 'o',
  //       target : 100,
  //       t : 30,
  //       step : 10
  //     }).css('zIndex', '2');
  //   } else if (banner_type == 2) {  // 上下滚动
  //     $('.img-l').eq(prev).animate({
  //       attr : 'y',
  //       target : 150,
  //       t : 30,
  //       step : 10
  //     }).css('zIndex', '2').css('opacity','100');

  //     $('.img-l').eq($(obj).index()).animate({
  //       attr : 'o',
  //       target : 0,
  //       t : 30,
  //       step : 10
  //     }).css('top','-150px').css('zIndex', '2').opacity(100);
  //   }
  // }

  function banner_fn() {  // 显示隐藏
    if (banner_index >= $('.lun').length()) {
      banner_index = 0;
    }
    banner($('.lun').eq(banner_index).first());
    banner_index ++;
  }

  // function banner_fn() {  // 透明度变化
  //   if (banner_index >= $('.lun').length()) {
  //     banner_index = 0;
  //   }
  //   banner($('.lun').eq(banner_index).first(), banner_index == 0 ? $('.lun').length() - 1 : banner_index -1);
  //   banner_index ++;
  // }


});