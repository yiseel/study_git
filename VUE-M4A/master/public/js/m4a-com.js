const m4aComm = {
	//한번만 실행될 목록
	runOnce : () => {
		m4aComm.userAgent();//body add agent
		m4aComm.skipNav();//skip nav
		m4aComm.docSize(); //browser size
		m4aComm.runAfter();
	},
	//Dom 변경시 다시 호출 할 목록
	runAfter : () => {
		m4aComm.m4aLoadHTML();//html load
		m4aComm.ariaHidden('[aria-hidden=true]',true);
	},
	//body add agent-class
	userAgent : () => {
		var userAgent=navigator.userAgent.toLowerCase();
		var os = 'os_' + ua_result.os.name;
		var platform = ua_result.platform;
		//웨일브라우저에 따른 변경
		var browser = (userAgent.indexOf('whale')>-1)?'whale':ua_result.browser.name;
		var version = 'ver_' + ua_result.browser.version.major;
		//아이패드 13이후 맥과 같이 나옴에 따른 변경
		if(userAgent.indexOf('ipad') > -1 || userAgent.indexOf('macintosh') > -1 && 'ontouchend' in document){
			platform = 'ipad'
		}
		document.querySelector('body').classList.add(os);
		document.querySelector('body').classList.add(platform);
		document.querySelector('body').classList.add(browser);
		document.querySelector('body').classList.add(version);
		
	},
	//body add skip navigation
	skipNav : () => {
		var elm= document.createElement('div');
		elm.innerHTML='<a href="#mainContent" role="button">본문 바로가기</a>';
		elm.id='skipNav'
		elm.classList.add('skip-nav')
		document.querySelector('body').prepend(elm);
	},
	//body add 팝업영역
	dialogAttach : () => {
		var elm= document.createElement('div');
		elm.id='__dialogAttach'
		document.querySelector('body').append(elm);
	},
	//browser size
	docSize : () => {
		var w = 0;
		var h = 0;
		var resizeTimer = null;
		var elm = document.createElement('div');
		elm.id='docSize';
		elm.classList.add('doc-size');
		elm.setAttribute('aria-hidden',true);
		document.querySelector('body').append(elm);
		var resizeComplete = () => {
			w = window.innerWidth || document.body.clientWidth;
			h = window.innerHeight || document.body.clientHeight;
			document.getElementById('docSize').innerHTML = w + 'px / ' + h + 'px';
			//console.log('resize Complete');
			//console.log(w + ':' + h)
		}
		window.addEventListener('resize', () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(resizeComplete, 300);
		}, false);
		resizeComplete();	
	},
	//html Page Load
	m4aLoadHTML : () => {
		var  obj, i, elmnt, file, xhttp ,data, script;
		obj = document.querySelectorAll('[data-html-load]')
		for (i = 0; i < obj.length; i++) {
			elmnt = obj[i];
			file = elmnt.getAttribute('data-html-load') + "?v=" + vers;
			if (file) {
				xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4) {
						data = this.responseText
						if (this.status == 200) {
							elmnt.removeAttribute("data-html-load");
							elmnt.setAttribute("data-html-loaded",file);
							data = this.responseText
							if(data.indexOf('<script>')>-1){
								addJS=data.substring(data.indexOf('<script>') + 8 ,data.indexOf('</script>'))
								delJS=data.substring(data.indexOf('<script>') ,data.indexOf('</script>') + 9)
								data= data.replace(delJS,'')
								elmnt.innerHTML = data
								script = document.createElement("script");
								script.type = "text/javascript";
								script.text = addJS
								elmnt.appendChild(script);
							}else{
								elmnt.innerHTML = data
							}
						}
						if (this.status == 403) {
							elmnt.innerHTML = "접근이 거절되었습니다.";
							elmnt.removeAttribute("data-html-load");
							elmnt.setAttribute("data-html-load-false-403",file);
						}
						if (this.status == 404) {
							elmnt.innerHTML = "페이지를 찾을 수 없습니다.";
							elmnt.removeAttribute("data-html-load");
							elmnt.setAttribute("data-html-load-false-404",file);
						}
						if (this.status == 500) {
							elmnt.innerHTML = "서버에 오류가 발생했습니다.";
							elmnt.removeAttribute("data-html-load");
							elmnt.setAttribute("data-html-load-false-500",file);
						}
						m4aComm.runAfter();
					}
				}
				xhttp.open("GET", file + '?ver='+vers, true);
				xhttp.send();
				i=0;
				return;
			}
		}
		//console.log('m4aLoadHTML')
	},
	//aria-hidden 포커스제어
	ariaHidden : (elm,flag) => {
		var hideElm, showElm, ariaHidden ,ariaShow
		if(flag==true){	
			ariaHidden=document.querySelectorAll(elm);
			ariaHidden.forEach(hideEll => {
				hideEll.setAttribute('aria-hidden','true');
				hideElm =  hideEll.querySelectorAll('a , button , input , select , textarea , label','[role=button]');
				hideElm.forEach(hideEle => {
					hideEle.setAttribute('tabindex','-1')
					hideEle.classList.add('ariaHiddenTrue');
				})
			});
		}else if(flag==false){
			ariaShow = document.querySelectorAll(elm)
			ariaShow.forEach(hideEll => {
				hideEll.removeAttribute('aria-hidden');
				showElm=hideEll.querySelectorAll('.ariaHiddenTrue')
				showElm.forEach(showEle => {
					showEle.removeAttribute('tabindex')
					showEle.classList.remove('ariaHiddenTrue');
				});
			});
		}
	},
	//swiper slideChange 시 접근성 추가
	swiperA11y:(elm) => {
		var slideAll = document.querySelector(elm).querySelectorAll('.swiper-slide')
		var slideVis = document.querySelector(elm).querySelectorAll('.swiper-slide-visible')
		slideAll.forEach(slideAllfn => {
			slideAllfn.setAttribute('aria-hidden','true');
			hideElm = slideAllfn.querySelectorAll('a , button , input , select , textarea , label','[role=button]')
			hideElm.forEach(hideEle => {
				hideEle.setAttribute('tabindex','-1')
				hideEle.classList.add('swiperAriaHiddenTrue');
			})
		});
		slideVis.forEach(slideVisfn1 => {
			slideVisfn1.removeAttribute('aria-hidden');
			showElm = slideVisfn1.querySelectorAll('.swiperAriaHiddenTrue')
			showElm.forEach(showEle => {
				showEle.removeAttribute('tabindex')
				showEle.classList.remove('swiperAriaHiddenTrue');
			})
		});
		
	},
	//파라미터 받기 m4aComm.getParam(paramName)
	getParam:(paramName) => {
		var url = location.search;
		var pramSetArr = url.substring(1).split("&");  if(url.substring(1).length > 0){
			var paramArr = new Array;
			for(var i=0; i<pramSetArr.length; i++){
				paramArr = pramSetArr[i].split("=");
				if(paramName == paramArr[0]){
					return paramArr[1];
				}
			}
		}  
		return "";
	},
	//다중 setAttributes
	setAttr:(el, attrs) => {
		Object.keys(attrs).forEach(key => {
			el.setAttribute(key, attrs[key])
		});
	}
	//다음기능

}

//document.load
document.addEventListener("DOMContentLoaded", () => {
	m4aComm.runOnce();
});
Element.prototype.setAttr = function(attrs){
	Object.keys(attrs).forEach(key => {
		this.setAttribute(key, attrs[key])
	});
}
/* userAgent.js */
!function(e){"use strict";var o=e.userAgent=function(e){function o(e){var o={},i=/(dolfin)[ \/]([\w.]+)/.exec(e)||/(chrome)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(e)||/(webkit)(?:.*version)?[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(e)||["","unknown"];return"webkit"===i[1]?i=/(iphone|ipad|ipod)[\S\s]*os ([\w._\-]+) like/.exec(e)||/(android)[ \/]([\w._\-]+);/.exec(e)||[i[0],"safari",i[2]]:"mozilla"===i[1]?i[1]=/trident/.test(e)?"msie":"firefox":/polaris|natebrowser|([010|011|016|017|018|019]{3}\d{3,4}\d{4}$)/.test(e)&&(i[1]="polaris"),o[i[1]]=!0,o.name=i[1],o.version=n(i[2]),o}function n(e){var o={},n=e?e.split(/\.|-|_/):["0","0","0"];return o.info=n.join("."),o.major=n[0]||"0",o.minor=n[1]||"0",o.patch=n[2]||"0",o}function i(e){return t(e)?"pc":r(e)?"tablet":a(e)?"mobile":""}function t(e){return e.match(/linux|windows (nt|98)|macintosh/)&&!e.match(/android|mobile|polaris|lgtelecom|uzard|natebrowser|ktf;|skt;/)?!0:!1}function r(e){return e.match(/ipad/)||e.match(/android/)&&!e.match(/mobi|mini|fennec/)?!0:!1}function a(e){return e.match(/ip(hone|od)|android.+mobile|windows (ce|phone)|blackberry|bb10|symbian|webos|firefox.+fennec|opera m(ob|in)i|polaris|iemobile|lgtelecom|nokia|sonyericsson|dolfin|uzard|natebrowser|ktf;|skt;/)?!0:!1}function s(e){var o={},i=/(iphone|ipad|ipod)[\S\s]*os ([\w._\-]+) like/.exec(e)||/(android)[ \/]([\w._\-]+);/.exec(e)||(/android/.test(e)?["","android","0.0.0"]:!1)||(/polaris|natebrowser|([010|011|016|017|018|019]{3}\d{3,4}\d{4}$)/.test(e)?["","polaris","0.0.0"]:!1)||/(windows)(?: nt | phone(?: os){0,1} | )([\w._\-]+)/.exec(e)||(/(windows)/.test(e)?["","windows","0.0.0"]:!1)||/(mac) os x ([\w._\-]+)/.exec(e)||(/(linux)/.test(e)?["","linux","0.0.0"]:!1)||(/webos/.test(e)?["","webos","0.0.0"]:!1)||/(bada)[ \/]([\w._\-]+)/.exec(e)||(/bada/.test(e)?["","bada","0.0.0"]:!1)||(/(rim|blackberry|bb10)/.test(e)?["","blackberry","0.0.0"]:!1)||["","unknown","0.0.0"];return"iphone"===i[1]||"ipad"===i[1]||"ipod"===i[1]?i[1]="ios":"windows"===i[1]&&"98"===i[2]&&(i[2]="0.98.0"),o[i[1]]=!0,o.name=i[1],o.version=n(i[2]),o}function w(e){var o={},i=/(crios)[ \/]([\w.]+)/.exec(e)||/(daumapps)[ \/]([\w.]+)/.exec(e)||["",""];return i[1]?(o.isApp=!0,o.name=i[1],o.version=n(i[2])):o.isApp=!1,o}return e=(e||window.navigator.userAgent).toString().toLowerCase(),{ua:e,browser:o(e),platform:i(e),os:s(e),app:w(e)}};"object"==typeof window&&window.navigator.userAgent&&(window.ua_result=o(window.navigator.userAgent)||null)}(function(){return"object"==typeof exports?(exports.daumtools=exports,exports.util=exports,exports):"object"==typeof window?(window.daumtools="undefined"==typeof window.daumtools?{}:window.daumtools,window.util="undefined"==typeof window.util?window.daumtools:window.util,window.daumtools):void 0}());