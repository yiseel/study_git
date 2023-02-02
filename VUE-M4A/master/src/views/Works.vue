<script>
import { m4aworks } from '/public/json/works.json'
export default {
  data () {
    return {
		worksJson : m4aworks
    }
  },
  methods: {
    //methods
	fnObserverApi(){
		var options = {threhold: 1}
		var io = new IntersectionObserver((entries,observer) => {
			entries.forEach(entry => {
			// 관찰 대상이 viewport 안에 들어온 경우  클래스를 추가
				if (entry.isIntersecting) {
					entry.target.classList.add('observe');
				}
				// 그 외의 경우 ' 클래스 제거
				else {
					entry.target.classList.remove('observe');
				}
			});
		},options);

		// 관찰할 대상을 선언하고, 해당 속성을 관찰시킨다.
		var boxElList = document.querySelectorAll('.list-item');
		boxElList.forEach((el) => {
			io.observe(el);
		});
	} 
  },
  beforeMount() {
    console.log('컴포넌트가 마운트되기 전입니다.')//페이지 인 전단계
  },
  mounted() {
	
		this.fnObserverApi()
  },
  beforeUnmount() {
    console.log('컴포넌트가 언마운트가 되기 전입니다.')//페이지 아웃 전단계
  },
  unmounted() {
    console.log('컴포넌트가 언마운트 되었습니다.')//페이지 아웃
  }
}
</script>
<template>
	<main id="mainContent" class="main-content works" role="main">
		<section class="hidden-obj" aria-hidden="true">
			<h1>WorksList M4A</h1>
		</section>
		<section  class="works-list-sec">
			<slot v-for="(item, idx) in worksJson" :key="{idx}">
				<article class="works-list-art1">
					<div id="worksList0" class="works-list">
						<slot v-for="unit in item.section1" :key="unit.type">
							<div class="list-item w-detail" :class="unit.type">
								<slot v-if="unit.url">
									<a :href="unit.url" class="link-block">
										<div class="img-sec" :style="{'background-image':'url(' + unit.img +')'}"></div>
										<div class="info-sec">
											<div class="ptn">{{unit.ptn}}</div>
											<div class="name" v-html="unit.name"></div>
											<div class="date etc" role="text"><b>DATE.</b> {{unit.date}}</div>
											<div class="kind etc" role="text"><b>OUTPUT.</b> {{unit.kind}}</div>
										</div>
									</a>
								</slot>
								<slot v-else>
									<div class="img-sec" :style="{'background-image':'url(' + unit.img +')'}"></div>
									<div class="info-sec">
										<div class="ptn">{{unit.ptn}}</div>
										<div class="name" v-html="unit.name"></div>
										<div class="date etc" role="text"><b>DATE.</b> {{unit.date}}</div>
										<div class="kind etc" role="text"><b>OUTPUT.</b> {{unit.kind}}</div>
									</div>
								</slot>
							</div>
						</slot>
					</div>
				</article>

				<article class="works-list-art2">
					<div id="worksList1" class="works-list">

					</div>
				</article>
			</slot>
		</section>
	</main>
</template>
