var _ = {
  $: function(id){
    return document.getElementById(id);
  },
  $$: function(cls, ancestor, boolean){
    var eles = ancestor ? ancestor.getElementsByClassName(cls) : document.getElementsByClassName(cls);
    return eles;
  },
  addClassName: function(ele, cls){
    if(ele.className.includes(cls)) return;
    ele.classList.add(cls);
  },
  delClassName: function(ele, cls){
    if(!ele.className.includes(cls)) return;
    ele.classList.remove(cls);    
  },
  extend: function(target, options){
    for(var key in options){
      target[key] = options[key];
    }
  },
  html2node: function(str){
    var contanier = document.createElement('div');
    contanier.innerHTML = str;
    // return container.children[0] 而非 return container
    // 这样就仅是将html str转化为node，生成的html不会有外层的div
    return contanier.children[0];
  }
}