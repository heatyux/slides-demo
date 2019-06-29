// $('.images > img:nth-child(1)').addClass('current');
// $('.images > img:nth-child(2)').addClass('enter');
// $('.images > img:nth-child(3)').addClass('enter');
var n = 1
initialize(getImage(n));

let timer = setInterval(() => {
  makeLeave(getImage(n))
    .one('transitionend', (e) => { //只执行一次
      makeEnter($(e.currentTarget));
    })
  makeCurrent(getImage(n + 1));
  n += 1;
}, 3000);

$(document).on('visibilitychange', function() {
  if(document.hidden){
    // console.log(document.hidden)
    window.clearInterval(timer)
  }else {
    timer = setInterval(() => {
      makeLeave(getImage(n))
        .one('transitionend', (e) => { //只执行一次
          makeEnter($(e.currentTarget));
        })
      makeCurrent(getImage(n + 1));
      n += 1;
    }, 3000);
  }
});








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
  // return $('.images > img:nth-child('+ n + ')');
  return $(`.images > img:nth-child(${x(n)})`)
}

// 添加 'current' 状态
function makeCurrent($node) {
  return $node.removeClass('enter leave').addClass('current');
}

// 添加 'leave' 状态
function makeLeave($node) {
  $node.removeClass('current enter').addClass('leave')
  return $node; //重点的精髓
}

// 添加 'enter' 状态
function makeEnter($node) {
  return $node.removeClass('leave current').addClass('enter')
}