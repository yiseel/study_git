<script>
export default {
  data () {
    return {
      //변수
    }
  },
  methods: {
    //swiper
    swiperInit(){
      const swiper = new Swiper('.swiper', {
        // Optional parameters
        loop: true,

        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }


  },
  beforeMount() {
    console.log('컴포넌트가 마운트되기 전입니다.')//페이지 인 전단계
  },
  mounted() {
    //swiper API, CSS head 에 삽입
    let swiperJs = document.createElement('script')
    swiperJs.src =
        '/js/swiper-bundle.min.js'
    document.head.appendChild(swiperJs)
    let swiperCss = document.createElement('link')
    swiperCss.rel='stylesheet'
    swiperCss.href =
        '/css/swiper-bundle.min.css'
    document.head.appendChild(swiperJs)
    document.head.appendChild(swiperCss)
    swiperJs.onload = () => {
      this.swiperInit()
    }
    
  },
  beforeUnmount() {
    console.log('컴포넌트가 언마운트가 되기 전입니다.')//페이지 아웃 전단계
  },
  unmounted() {
     //스와이퍼 API,CSS head에서 삭제
     document.querySelector('head').querySelectorAll('script').forEach((elm,idx) =>{
          var src = elm.getAttribute('src');
          if( src && src.indexOf('swiper') > -1 ){
              elm.remove();
          }
      });
      document.querySelector('head').querySelectorAll('link').forEach((elm,idx) =>{
          var href = elm.getAttribute('href');
          if( href && href.indexOf('swiper') > -1 ){
              elm.remove();
          }
      });
  }
}
</script>
<template>
  <main class="home">
    This is an Home page.
    <div class="swiper" style="position:absolute;z-index:100;width:100%;background:#ff9900;top:400px">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide" style="height:300px;width:100%;background:#ff0000">Slide 1</div>
        <div class="swiper-slide" style="height:300px;width:100%;background:#0000ff">Slide 2</div>
        <div class="swiper-slide" style="height:300px;width:100%;background:#eee">Slide 3</div>
      </div>
      <!-- If we need pagination -->
      <div class="swiper-pagination"></div>

      <!-- If we need navigation buttons -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

    </div>
  </main>
</template>
