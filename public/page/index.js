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