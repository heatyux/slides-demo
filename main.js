let $slides = $('#slides');
let $buttons = $('#buttonWrapper > button')
let current = 0;
let $images = $slides.children('img');

makeFakeSlides();
$slides.css({transform: 'translateX(-400px)'});
bindEvents();


$(next).on('click', function() {
  goToSlides(current + 1);
})

$(previous).on('click', function() {
  goToSlides(current - 1);
})

let timer = setInterval(function() {
  goToSlides(current + 1)
}, 2000)

$('.container').on('mouseenter', function() {
  window.clearInterval(timer);
}).on('mouseleave', function() {
    timer = setInterval(function() {
      goToSlides(current + 1)
    }, 2000)
})

// 控制页面 隐藏时暂停
$(document).on('visibilitychange', function() {
  if(document.hidden) {
    window.clearInterval(timer)
  }else {
    timer = setInterval(function() {
      goToSlides(current + 1)
    }, 2000)
  }
})

function bindEvents() {
  $(buttonWrapper).on('click', 'button', function(e) {
    let $button = $(e.currentTarget);
    let index = $button.index();
    goToSlides(index);
  })
}

function goToSlides(index){
  if(index > $buttons.length - 1) {
    index = 0;
  }else if (index < 0) {
    index = $buttons.length - 1;
  }

  if(current === $buttons.length - 1 && index === 0) {
    // 从最后一张到第一张
    $slides.css({transform: `translateX(${- ($buttons.length + 1) * 400}px)`}) // -1600
      .one('transitionend', function() {
        $slides.hide().offset();
        $slides.css({transform: `translateX(${- (index + 1) * 400}px)`}).show();
      })
  } else if (current === 0 && index === $buttons.length - 1) {
    // 从第一张到最后一张
    $slides.css({transform: `translateX(0px)`})
      .one('transitionend', function() {
        $slides.hide().offset();
        $slides.css({transform: `translateX(${- (index + 1) * 400}px)`}).show();
      })
  } else {
    $slides.css({transform: `translateX(${- (index + 1) * 400}px)`})
  }
  current = index;
}


function makeFakeSlides() {
  let $firstCopy = $images.eq(0).clone(true);
  let $lastCopy = $images.eq($images.length - 1).clone(true);
  // console.log($firstCopy[0].outerHTML)
  // console.log($lastCopy[0].outerHTML)
  $slides.append($firstCopy);
  $slides.prepend($lastCopy);
}