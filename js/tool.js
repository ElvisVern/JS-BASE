// 跨浏览器事件绑定
function addEvent(obj, type, fn) {
  if (typeof addEventListener != 'undefined') {
    obj.addEventListener(type, fn, false);
  } else {
    // 创建一个存放事件的散列表
    if (obj.events) {
      obj.events = {};
    }
    // 第一次执行
    if (!obj.events[type]) {
      // 创建一个存放事件处理函数的数组
      obj.evens[type] = [];
      if (obj.evens[type]) {
        obj.evens[type][0] = fn;
      } 
    } else {
      // 不添加到计数器中
      if (addEvent.equal(obj.events[type],fn)) return false;
    }
    // 第二次执行用计数器存储
    obj.events[type][addEvent.id++] = fn;
    // 执行事件处理函数
    obj['on' + type] = addEvent.exec;
  }
}
// 为每个事件分配一个计数器
addEvent.id = 1;
// 执行事件处理函数
addEvent.exec = function(event) {
  var e = event || addEvent.fixEvent(window.event);
  var es = this.events[e.type];
  for(var i in es) {
    es[i].call(this,e);
  }
}
// 屏蔽同一个注册函数
addEvent.equal = function(es,fn) {
  for (var i in es) {
    if (es[i] == fn) return true; 
  }
  return false;
}
// 把IE常用的Event对象添加到W3C中
addEvent.fixEvent = function(event) {
  event.preventDefault = addEvent.fixEvent.preventDefault;
  event.stopPropagation = addEvent.fixEvent.stopPropagation;
  event.target = event.srcElement;
  return event;
}
// IE阻止默认行为
addEvent.fixEvent.preventDefault = function() {
  this.returnValue = false;
}
// IE取消冒泡
addEvent.fixEvent.stopPropagation = function() {
  this.cancelBubble = true;
}


// 跨浏览器删除事件
function removeEvent(obj, type, fn) {
  if (typeof removeEventListener != 'undefined') {
    obj.removeEventListener(type, fn, false)
  } else {
    if (obj.events) {
      for (var i in obj.events[type]) {
        if (obj.events[type][i] == fn) {
          delete obj.events[type][i];
        }
      }
    }
  }
}

// 跨浏览器获取视口大小
function getInner() {
  if (typeof window.innerWidth != 'undefined') {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  }
}

// 跨浏览器获取 Style
function getStyle(element, attr) {
  var value;
  if (typeof window.getComputedStyle != 'undefined') {  // w3c
    value = window.getComputedStyle(element, null)[attr];
  } else if (typeof element.currentStyle != 'undefined') { // ie
    value = element.currentStyle[attr]; 
  }
  return value;
}

// 判断Class 是否存在
function hasClass(element,className) {
  return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

// 获取Event 对象
function getEvent(event) {
  return event || window.event;
}

// 阻止默认行为
function preDef(event) {
  var e = getEvent(event);
  if (typeof e.preventDefault != 'undefined') {  // W3C
    e.preventDefault();
  } else {
    e.returnValue = false;  // IE
  }

}

// 删除空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$S)/g,'');
}

// 滚动条清零
function scrollTop() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

(function() {
  window.sys = {};  // 保存浏览器信息对象，让外部可以访问
  var ua = navigator.userAgent.toLowerCase();  // 获取浏览器信息字符
  var s;  // 浏览器信息数组

  if ((/msie ([\d.]+)/).test(ua)) {
    s = ua.match(/msie ([\d.]+)/);
    sys.ie = s[1];
  }
  if ((/firefox\/([\d.]+)/).test(ua)) {
    s = ua.match(/firefox\/([\d.]+)/);
    sys.firefox = s[1];
  }
  if ((/chrome\/([\d.]+)/).test(ua)) {
    s = ua.match(/chrome\/([\d.]+)/);
    sys.chrome = s[1];
    //alert('chrome')
  }
  if ((/opera\/.*version\/([\d.]+)/).test(ua)) {
    s = ua.match(/chrome\/([\d.]+)/);
    sys.chrome = s[1];
    //alert("opera")
  }
  if ((/version\/([\d.]+).*safari/).test(ua)) {
    s = ua.match(/chrome\/([\d.]+)/);
    sys.chrome = s[1];
    //alert("opera")
  }

  if (/webkit/.test(ua)) {
    sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];
  }

  
})()

// 非IE的现代DOM加载 可在iframe 节点之前加载
addEvent(document,'DOMContentLoaded',function() {

})

// 封装DOM加载
function addDomLoaded(fn) {
  if (document.addEventListener) {  // w3c
    addEvent(document,'DOMContentLoaded',function() {
      fn();
      removeEvent(document,'DOMContentLoaded',arguments.callee);
    });
  } else {
    var timer = null;
    timer = setInterval(function() {
      try {
        document.documentElement.doScroll('left');
        // do something..
        fn();
      } catch(e) {

      }
    });
  }
}

// 跨浏览器获取滚动条位置
function getScroll() {
  return {
    top : document.documentElement.scrollTop || document.body.scrollTop,
    left : document.documentElement.scrollLeft || document.body.scrollLeft
  }
}

// 跨浏览器获取innerText
function getInnerText(element) {
  return (typeof element.textContent == 'string') ? element.textContent : element.innerText;
}
function setInnerText(element,text) {
  if (typeof element.textContent == 'string') {
    element.textContent = text;
  } else {
    element.innerText = text;
  }
}

function inArray(array,value) {
    for(var i in array) {
      if (array[i] === value) {
        return true;
      } 
      return false;
    }
  }

