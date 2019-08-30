var App = new Object();

// Tabs实现
(function(App) {
  function Tabs(options){
    _.extend(this, options)
    this.index = this.index || 0;
    // 缓存节点
    this.nTab = this.container.getElementsByTagName('ul')[0];
    this.nTabs = this.nTab.children;
    // 动态构建滑动条
    // ...
    this.init();
  }
  Tabs.prototype.init = function(){
    // 绑定事件
    for(var i = 0; i < this.nTabs.length; i++){
      this.nTabs[i].addEventListener('mouseenter', function(i){
        // this.highlight(i);
        this.setCurrent(i);
      }.bind(this, i))
      this.nTabs[i].addEventListener('click', function(i){
        this.setCurrent(i)
      }.bind(this, i))
    }
    this.nTab.addEventListener('mouseleave', function(){
      this.highlight(this.index);
    }.bind(this));

    this.setCurrent(this.index);
  }
  // 高亮当前tab
  Tabs.prototype.highlight = function(index){
    var tab = this.nTabs[index];
    this.nThumb.style.width = tab.offsetWidth + 'px';
    this.nThumb.style.left = tab.offsetLeft + 'px';
  }
  // 设置当前选中tab
  Tabs.prototype.setCurrent = function(index){
    // _.delClassName(this.tabs[this.index], 'z-active');
    _.delClassName(this.nTabs[this.index], 'z-active');
    this.index = index;
    // _.addClassName(this.tabs[index], 'z-active');
    _.addClassName(this.nTabs[index], 'z-active');
    this.highlight(index);
  }
  App.Tabs = Tabs;
})(window.App)

var Tabs = new App.Tabs({
  container: _.$('hdtabs'),
  index: 0,
  nThumb: _.$('hdtabs').getElementsByClassName('tabs_thumb')[0]
});

// 搜索框实现
(function(App){
  function Search(container){
    this.nForm = container;
    this.nKeyword = this.nForm.getElementsByTagName('input')[0];
    this.init();
  }
  Search.prototype.init = function(){
    this.nForm.addEventListener('submit', this.search.bind(this));
    // 将一个方法从对象中拿出来，然后再调用，如在回调中传入该方法,如果不做特殊处理的话，this一般会丢失原来的对象，基于bind方法，用原始对象创建一个绑定函数，可解决该问题
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#创建绑定函数
  }
  Search.prototype.search = function(event){
    // 验证输入是否为空
    // 如果为空，不提交表单
    if(!/\S/.test(this.nKeyword.value)){
      event.preventDefault(); // 阻止默认行为，即可阻止表单提交，又可阻止页面跳转
      // return false; // 可阻止表单提交，但无法阻止页面跳转
    }
  }
  App.Search = Search;
})(window.App)

var Search = new App.Search(_.$('search'));

(function(APP){
  function Guest(log, reg){
    this.nLogin = document.getElementById(log);
    this.nRegister = document.getElementById(reg);
    this.init();
  }
  Guest.prototype.init = function(){
    this.nLogin.addEventListener('click', function(){
      // 弹出登录弹窗
      console.log(this.nLogin);
    }.bind(this));
    this.nRegister.addEventListener('click', function(){
      // 弹出注册弹窗
      console.log(this.nRegister);
    }.bind(this));
  }
  App.Guest = Guest;
})(window.App)

var Guest = new App.Guest('login', 'register');

// 轮播图实现
(function(App){
  var template = '<div class="m-slider"></div>'
  function Slider(options){
    _.extend(this, options);
    // 组件节点
    this.slider = _.html2node(template);
    this.sliders = this.buildSlider();
    this.cursors = this.buildCursor();
    // 初始化事件
    this.slider.addEventListener('mouseenter', this.stop.bind(this));
    this.slider.addEventListener('mouseleave', this.autoPlay.bind(this));
    // 初始化动作
    this.container.appendChild(this.slider);
    this.nav(this.initIndex || 0);
    this.autoPlay();
  }
  // 下一页
  Slider.prototype.next = function(){
    var index = (this.index + 1) % this.imgLength;
    this.nav(index);
  }
  // 跳到指定页
  Slider.prototype.nav = function(index){
    if(this.index === index) return;
    this.last = this.index;
    this.index = index;

    this.fade();
    this.setCurrent();
  }
  // 设置当前选中状态
  Slider.prototype.setCurrent = function(){
    // 去除之前选中节点的选中状态
    _.delClassName(_.$$('z-active')[0], 'z-active');
    // 添加当前选中节点的选中状态
    _.addClassName(this.cursors[this.index], 'z-active');
  }
  // 自动播放
  Slider.prototype.autoPlay = function(){
    this.timer = setInterval(function(){
      this.next();
    }.bind(this), this.interval)
  }
  // 停止自动播放
  Slider.prototype.stop = function(){
    clearInterval(this.timer);
  }
  // 切换效果
  Slider.prototype.fade = function(){
    if(this.last !== undefined){
      this.sliders[this.last].style.opacity = 0;
    }
    this.sliders[this.index].style.opacity = 1;
  }
  // 构造图片列表节点
  Slider.prototype.buildSlider = function(){
    var slider = document.createElement('ul'),
    html = '';

    for(var i = 0; i < this.imgLength; i++){
      html += '<li class="slider_img">' + 
        '<img src="./res/images/banner' + i + '.jpg" alt="slider img">' + 
      '</li>';
    }
    slider.innerHTML = html;
    this.slider.appendChild(slider);
    return slider.children;
  }
  // 构造指示器节点
  Slider.prototype.buildCursor = function(){
    var cursor = document.createElement('ul'),
    html = '';

    cursor.className = 'm-cursor';
    for(var i = 0; i < this.imgLength; i++){
      html += '<li data-index=' + i + '></li>';
    }
    cursor.innerHTML = html;
    this.slider.appendChild(cursor);
    // 处理点击事件
    cursor.addEventListener('click', function(event){
      var index = event.target.dataset.index;
      this.nav(index);
    }.bind(this))
    return cursor.children;
  }

  App.Slider = Slider;
})(window.App)

var slider = new App.Slider({
  container: _.$$('g-banner')[0],
  initIndex: 0,
  interval: 5000,
  imgLength: 4
});