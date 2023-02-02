<script>
import brochure from '@/components/brochure.vue'
export default {
    data() {
        return {
        }
    },
    components: {
        brochure
    },
    methods: {
        //카카오맵 API 실행 함수
        initMap () {
            var container = document.getElementById('m4aMap');
            var options = {
                center: new kakao.maps.LatLng(37.50968, 127.01715),
                level: 2
            };
            var map = new kakao.maps.Map(container, options);
            var imageSrc = '/images/mapin.webp' // 마커이미지 주소
            var imageSize = new kakao.maps.Size(68, 24) // 마커이미지 크기
            var imageOption = { offset: new kakao.maps.Point(2, 26) } // 마커이미지 좌표
            //  마커이미지 생성
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
            var markerPosition = new kakao.maps.LatLng(37.50960, 127.01720)
            // 마커 생성
            var marker = new kakao.maps.Marker({
                position: markerPosition,
                image: markerImage
            })
            // 마커표시
            marker.setMap(map)
            // 센터 위치 리로드
            function reLay () {
                map.relayout()
            }
            function setCenter () {
                var moveLatLon = new kakao.maps.LatLng(37.50960, 127.01720)
                map.setCenter(moveLatLon)
            }
            window.addEventListener('resize', function () {
                setCenter()
                reLay()
            })
        }
    },
    mounted() {
        //카카오맵 API 삽입 후 실행
        let kakaoMap = document.createElement('script')
        kakaoMap.src =
            '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=8ed8b918e8cc516006a162814d55a9fd'
        document.head.appendChild(kakaoMap)
        kakaoMap.onload = () => kakao.maps.load(this.initMap)
    },
    unmounted() {
        //카카오맵 API 삭제
        document.querySelector('head').querySelectorAll('script').forEach((elm,idx) =>{
            var src = elm.getAttribute('src');
            if( src && src.indexOf('kakao') > -1 ){
                elm.remove();
            }
        });
    }
}
</script>
<template>
    <main id="mainContent" class="main-content contact" role="main">
        <section class="hidden-obj" aria-hidden="true">
            <h1>M4A 찾아오시는 길</h1>
        </section>

        <section class="contact-sec">
            <article class="contact-art1">
                <h2 class="hidden-obj" aria-hidden="true">미디어포스얼라이언스 회사 주소</h2>
                <p class="address" role="text">서울시 서초구 <br> 신반포로 304 H1빌딩 <br> 미디어포스얼라이언스</p>
                <p class="address-eng" role="text">Media4th Alliance, inc. H1 Bldg, <br> 304, Shinbanpo-ro, Seocho-gu, Seoul, Korea</p>
                <div class="info">
                    <p class="tel" role="text"><b>TEL.</b> <a href="tel:02-536-0518" aria-label="02-536-0518로 전화하기">02. 536. 0518</a></p>
                    <p class="fax" role="text"><b>FAX.</b> 02. 536. 0578</p>
                </div>
                <div class="brochure">
                    <brochure />
                </div>
            </article>
            <article class="contact-art2" aria-label="M4A 위치">
                <div id="m4aMap" class="m4a-map" ></div>
            </article>
        </section>
    </main>
</template>
