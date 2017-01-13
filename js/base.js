/* Base 基础对象 在Base 对象中添加 css,html,click 方法 返回Base对象*/

var $ = function(args) {
  return new Base(args);
}

function Base(args) {
  // 创建一个数组，来保存获取的节点和阶段数组
  this.elements = [];
  if (typeof args == 'string') {

    // find 模拟
    switch (args.charAt(0)) {
      case '#': this.elements.push(this.getId(args.substring(1)));
      break;
      case '.': this.elements = this.getClass(args.substring(1));
      break;
      default : this.elements = this.getTagName(args);

    }
  } else if (typeof args == 'object') {
    if (args != undefined) {  // _this 是一个对象，undefined 也是一个对象，区别 typeof 返回的 'undefined'
      this.elements[0] = args;
    }
  } else if (typeof args == 'function') {
    this.ready(args);
  }
  
}

// addDomLoaded
Base.prototype.ready = function(fn) {
  addDomLoaded(fn);
}

// 获取ID节点
Base.prototype.getId = function(id) {
  return document.getElementById(id);
}

// 获取元素节点
Base.prototype.getTagName = function(tag,parentNode) {
  var node = null;
  var temps = [];
  if (parentNode != undefined) {
    node = parentNode;
  } else {
    node = document;
  }

  var tags = node.getElementsByTagName(tag);
  for (var i = 0; i < tags.length; i++) {
    temps.push(tags[i]);
  }
  return temps;
}
// 获取className 
Base.prototype.getClass = function(className, parentNode) {
  var node = null;
  var temps = [];
  if (parentNode != undefined) {
    node = parentNode;
  } else {
    node = document;
  }
  var all = node.getElementsByTagName('*');
  for (var i = 0; i < all.length; i++) {
    if ((new RegExp('(\\s|^)' + className + '(\\s|$)')).test(all[i].className)) {
      temps.push(all[i]);
    }
  }
  return temps;
}
// 设置CSS选择器子节点
Base.prototype.find = function(str) {
  var childElements = [];
  for (var i = 0; i < this.elements.length; i++) {
    switch (str.charAt(0)) {
      case '#': 
        childElements.push(this.getId(str.substring(1)));
      break;
      case '.': 
        var temps = this.getClass(str.substring(1), this.elements[i]);
        for (var j = 0; j < temps.length; i++) {
          childElements.push(temps[j]);
        }
      break;
      default : 
        var temps = this.getTagName(str,this.elements[i]);
        for (var j = 0; j < temps.length; i++) {
          childElements.push(temps[j]);
        }

    }
  }
  this.elements = childElements;
  return this;
}
// 获取一个节点，并返回节点对象
Base.prototype.ge = function(num) {
  return this.elements[num];
  
}
// 获取第一个节点，并返回节点对象
Base.prototype.first = function() {
  return this.elements[0];
}
// 获取最后一个节点，并返回节点对象
Base.prototype.last = function() {
  return this.elements[this.elements.length - 1];
}
// 获取当前节点的上一个元素节点
Base.prototype.prev = function() {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i] = this.elements[i].previousSibling;
    if (this.elements[i] == null) {throw new Error('previousSibling not found!');}
    if (this.elements[i].nodeType == 3) {this.prev();}
  }
  return this;
}
// 获取当前节点的下一个元素节点
Base.prototype.next = function() {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i] = this.elements[i].nextSibling;
    if (this.elements[i] == null) {throw new Error('nextSibling not found!');}
    if (this.elements[i].nodeType == 3) {this.next();}
  }
  return this;
}
// 获取某组节点的数量
Base.prototype.length = function() {
  return this.elements.length;
}
// 获取某一个节点的属性
Base.prototype.attr = function(attr) {
  return this.elements[0][attr];
}
// 获取某个节点的索引
Base.prototype.index = function() {
  var children = this.elements[0].parentNode.children;
  for (var i = 0; i < children.length; i++) {
    if (this.elements[0] == children[i]) return i;
  }
}
// 获取一个节点，并返回Base对象
Base.prototype.eq = function(num) {
  var element = this.elements[num];
  this.elements = [];
  this.elements[0] = element;
  return this;
}


Base.prototype.css = function(attr,value) {
  for (var i = 0; i < this.elements.length; i++) {
    if (this.arguments == 1) {
      return getStyle(this.elements[i], attr);
    }
    this.elements[i].style[attr] = value;
  }
  return this;
}
// 添加class
Base.prototype.addClass = function(className) {
  for (var i = 0; i < this.elements.length; i++) {
    if (!hasClass(this.elements[i], className)) {
      this.elements[i].className += ' ' + className;
    }
  }
  return this;
}
// 移除class
Base.prototype.removeClass = function(className) {
  for (var i = 0; i < this.elements.length; i++) {
    if (hasClass(this.elements[i], className)) {
      this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'),'');
    }
  }
  return this;
}
// 添加link 或 style 的css规则
Base.prototype.addRule = function(num,selectorText,cssText,position) {
  var sheet = document.styleSheets[num];
  if (typeof sheet.insertRule != 'undefined') {  // w3c
    sheet.insertRule(selectorText + '{' + cssText +'}', position);
  } else if (typeof sheet.addRule != 'undefined') {  // IE
    sheet.addRule(selectorText,cssText,position);
  }
  return this;
}
// 移除link 或 style 的css规则
Base.prototype.removeRule = function(num,index) {
  var sheet = document.styleSheets[num];
  if (typeof sheet.deletetRule != 'undefined') {  // w3c
    sheet.deleteRule(index);
  } else if (typeof sheet.removeRule != 'undefined') {  // IE
    sheet.removeRule(index);
  }
  return this;
}
// 设置表单字段元素
Base.prototype.form = function(name) {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i] = this.elements[i][name];
  }
  return this;
}
// 设置innerHTML
Base.prototype.html = function(str) {

  for (var i = 0; i < this.elements.length; i++) {
    if (arguments.length == 0) {
      return this.elements[i].innerHTML;
    }
    this.elements[i].innerHTML = str;
  }
  return this;
}
// 设置innerText
Base.prototype.text= function(str) {

  for (var i = 0; i < this.elements.length; i++) {
    if (arguments.length == 0) {
      return getInnerText(this.elements[i]);
    }
    setInnerText(this.elements[i], str);
  }
  return this;
}

// 设置表单内容获取
Base.prototype.value = function(str) {

  for (var i = 0; i < this.elements.length; i++) {
    if (arguments.length == 0) {
      return this.elements[i].value;
    }
    this.elements[i].value = str;
  }
  return this;
}

// 设置事件绑定
Base.prototype.bind = function(event,fn) {
  for (var i = 0; i < this.elements.length; i++) {
    addEvent(this.elements[i],event,fn);
  }
  return this;
}

Base.prototype.click = function(fn) {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].onclick = fn;
  }
  return this;
}

// 设置鼠标移入移除方法
Base.prototype.hover = function(over,out) {
  for (var i = 0; i < this.elements.length; i++) {
    //this.elements[i].onmouseover = over;
    //this.elements[i].onmouseout = out;
    addEvent(this.elements[i],'mouseover',over);
    addEvent(this.elements[i],'mouseout',out);
  }
  return this;
}

// 设置点击切换
Base.prototype.toggle = function() {
  for (var i = 0; i < this.elements.length; i++) {
    (function(element,args) {
      var count = 0;
      //var args =  arguments; // 先接收外部传入的arguments
      addEvent(element, 'click', function() {
        args[count++].call(this);  // 或者 args[count++ % args.length] 省去下一句的if判断
        if (count >= args.length) {
          count = 0;
        }
      });
    })(this.elements[i],arguments);
  }
  return this;
}

// 设置显示
Base.prototype.show = function() {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.display = 'block';
  }
  return this;
}

// 设置隐藏
Base.prototype.hide = function() {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.display = 'none';
  }
  return this;
}
// 设置透明度
Base.prototype.opacity = function(num) {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.opacity = num / 100;
    this.elements[i].style.filter = 'alpha(opacity=' + num +')';
  }
  return this;
}
// 设置居中
Base.prototype.center = function(width,height) {
  var top = (document.documentElement.clientHeight - height)/2;
  var left = (document.documentElement.clientWidth - width)/2 ;

  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.top = top + 'px';
    this.elements[i].style.left = left + 'px';
  }
  return this;
} 

// 触发浏览器窗口改变
Base.prototype.resize = function(fn) {
  for (var i = 0; i < this.elements[i].length; i++) {
    var element = this.elements[i];

    addEvent(window,'resize',function() {
      fn();
      if (element.offsetLeft > getInner().width - element.offsetWidth) {
        element.style.left = getInner().width - element.offsetWidth + 'px';
      }
      if (element.offsetTop > getInner().height - element.offsetHeight) {
        element.style.top = getInner().height - element.offsetHeight + 'px';
      }
    });

  }
  return this;
}

// 锁屏
Base.prototype.lock = function() {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.width = getInner().width + 'px';
    this.elements[i].style.height = getInner().height + 'px';
    this.elements[i].style.display = 'block';
    document.documentElement.style.overflow = 'hidden';

    addEvent(this.elements[i], function(e) {
      e.preventDefault();
      addEvent(document, function(e) {
        e.preventDefault();
      })
    });

    addEvent(window,'scroll', scrollTop);
  }
  return this;
}
// 解屏
Base.prototype.unlock = function() {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.display = 'none';
    document.documentElement.style.overflow = 'auto';
    removeEvent(window,'scroll', scrollTop);
  }
  return this;
}

// 设置动画
Base.prototype.animate = function(obj) {
  for (var i = 0; i < this.elements.length; i++) {
    var element = this.elements[i];
    var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' :
               obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' :
               obj['attr'] == 'o' ? 'opacity' : obj['attr'] != undefined ? obj['attr'] : 'left';

    var start = obj['start'] != undefined ? obj['start'] : 
                attr == 'opacity' ? parseFloat(getStyle(element,attr))*100 : parseInt(getStyle(element,attr));
    var time = obj['time'] != undefined ? obj['time'] : 30;
    var step = obj['step'] != undefined ? obj['step'] : 10;
    var target = obj['target'];
    var alter = obj['alter'];
    var mul = obj['mul']; // 接收同步动画传入的对象 key:value 的形式
    var speed = obj['speed'] != undefined ? obj['speed'] : 6;
    var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer' // 0表示匀速，1表示缓冲

    if (alter != undefined && target == undefined) {
      target = alter + start;
    } else if (alter == undefined && target == undefined && mul == undefined) {
      throw new Error('alter or target which is necessary');
    }

    if (start > target) {
      step = -step;
    }
    
    if (attr == 'opacity') {

      element.style.opacity = parseInt(start)/ 100;

      element.style.filter = 'alpha(opacity='+ parseInt(start) +')';
    } else {
      element.style[attr] = start + 'px';
    }

    if (mul == undefined) { // 判断是否队列动画
      mul = {};
      mul[attr] = target;
    }

    clearInterval(element.timer);
    element.timer = setInterval(function() {

      // 创建一个布尔值，判断动画是否全部执行完毕
      var flag = true;


      for(var i in mul) {  // 遍历mul 中传入的键值对，并赋值给target
        attr = i == 'x' ? 'left' : i == 'y' ? 'top' : i == 'w' ? 'width' : i == 'h' ? 'height' : i == 'o' ? 'opacity' : i != undefined ? i : 'left';
        target = mul[i];
      
        if (type == 'buffer') {
          step = attr == 'opacity' ? (target - parseFloat(getStyle(element,attr))*100) / speed :
                                     (target - parseInt(getStyle(element,attr))) / speed;
          step = step > 0 ? Math.ceil(step) : Math.floor(step); 
        }

        if (attr == 'opacity') {  // 透明度渐变
          
          if (step == 0) {
            setOpacity();
          } else if (step > 0 && Math.abs(parseFloat(getStyle(element,attr))*100 - target) <= step) {
            setOpacity();

          } else if (step < 0 && (parseFloat(getStyle(element,attr))*100 - target) <= Math.abs(step)) {
            setOpacity();
          } else {
            var temp = parseFloat(getStyle(element,attr))*100;

            element.style.opacity = parseInt(temp + step)/100;
            //alert(element.style.opacity)
            element.style.filter = 'alpha(opacity='+ parseInt(temp + step) +')';
          }
          if (parseInt(target) != parseInt(parseFloat(getStyle(element,attr))*100)) {
            flag = false;
          }
          
        } else {  // 运动动画
          if (step == 0) {
            setTarget();
          } else if (step > 0 && Math.abs(parseInt(getStyle(element,attr)) - target) <= step) {
            setTarget();
          } else if (step < 0 && (parseInt(getStyle(element,attr)) - target) <= Math.abs(step)) {
            setTarget();
          } else {
            element.style[attr] = parseInt(getStyle(element, attr)) + step + 'px';
          }
          if (parseInt(target) != parseInt(getStyle(element,attr))) {
            flag = false;
          }
        }
      }

      if (flag) {
        clearInterval(element.timer);
        // 传入一个执行函数
        if (obj.fn != undefined) {
          obj.fn();
        }
      }

    },time);

    function setTarget() {
      element.style[attr] = target + 'px';
      
    }
    function setOpacity() {
      element.style.opacity = parseInt(target)/100;
      element.style.filter = 'alpha(opacity='+ parseInt(target) +')';
      
    }
  }
  return this;
}

// 插件入口
Base.prototype.extend = function(name, fn) {
  Base.prototype[name] = fn;
}















