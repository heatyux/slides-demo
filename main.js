var n = 1
initialize(getImage(n));

setInterval(() => {
  makeLeave(getImage(n))
    .one('transitionend', (e) => {
      makeEnter($(e.currentTarget));
    })
  makeCurrent(getImage(n + 1));
  n += 1;
}, 3000);

var images = $('.images > img').length; // 获取 'img' 数量
function x(n) {
  if(n > images) {
    n = n % images
    if(n === 0) {
      n = images
    }
  }
  return n;
}

// 初始化添加状态机
function initialize($node) {
  $node.addClass('current')
    .siblings().addClass('enter');
}

// 获得节点
function getImage(n) {
  return $(`.images > img:nth-child(${x(n)})`)
}

// 添加 'current' 状态
function makeCurrent($node) {
  return $node.removeClass('enter leave').addClass('current');
}

// 添加 'leave' 状态
function makeLeave($node) {
  return $node.removeClass('current enter').addClass('leave')
}

// 添加 'enter' 状态
function makeEnter($node) {
  return $node.removeClass('leave current').addClass('enter')
}