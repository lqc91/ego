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