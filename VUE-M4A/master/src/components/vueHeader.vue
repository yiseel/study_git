<script>
import brochure from '@/components/brochure.vue'
import inquiry from '@/components/inquiry.vue'
export default {
    data() {
        return {
            //gnb 상태
            navActive : false,
        }
    },
    components: {
        brochure, inquiry
    },
    methods: {
        //GNB 
        globalNav() {
            let inqury1 = document.querySelector('#salesInquiry2');
            let inqury2 = document.querySelector('#inquiryTrg');
            if(this.navActive === true){
                this.navActive = false
                m4aComm.ariaHidden('#navGroup',true)
                m4aComm.ariaHidden('#skipNav, #container, #footer',false)
                inqury1.setAttr({'aria-hidden':'false'})
                inqury2.setAttr({'aria-hidden':'false','tabindex':'0'})
            }else{
                this.navActive = true
                if(document.querySelector('#inquiryTrg').classList.contains('on')){
                    document.querySelector('#inquiryTrg').click();
                }
                m4aComm.ariaHidden('#navGroup',false)
                m4aComm.ariaHidden('#skipNav, #container, #footer, #salesInquiry2',true)
            }
        },
        //email Copy
        /*
        copyText(event){
            var textToCopy = event.currentTarget.querySelectorAll('span')[0].innerText
            function copyTo () {
                //※ navigator.clipboard.writeText => http에선 안됨(local 과 https:// 에서만 사용할수 있음 )
                navigator.clipboard.writeText(textToCopy).then(() => {
                    alert('복사되었습니다.')
                });
            }
            copyTo()
        },
        */
        copyText(elm) {
            var textArea
            var textToCopy = event.currentTarget.querySelectorAll('span')[0].innerText
            function isOS () {
                return navigator.userAgent.match(/ipad|iphone/i)
            }
            function createTextArea (text) {
                textArea = document.createElement('textArea')
                textArea.readOnly = true
                textArea.contentEditable = true
                textArea.value = text
                document.body.appendChild(textArea)
            }
            function selectText () {
                var range, selection
                if (isOS()) {
                    range = document.createRange()
                    range.selectNodeContents(textArea)
                    selection = window.getSelection()
                    selection.removeAllRanges()
                    selection.addRange(range)
                    textArea.setSelectionRange(0, 999999)
                } else {
                    textArea.select()
                }
            }
            function copyTo () {
                document.execCommand('copy')
                document.body.removeChild(textArea)
                alert('복사되었습니다.')
            }
            createTextArea(textToCopy)
            selectText()
            copyTo()    
        },
        //영업문의 복제
        inquiryClone(){
            let inqClone = document.querySelector('#salesInquiry2').innerHTML
            let cloneTarget = document.querySelector('#inquiryClone')
            cloneTarget.innerHTML=inqClone
            cloneTarget.querySelector('#inquiryTrg').remove()
            cloneTarget.querySelector('.btn-mailcopy').removeAttribute('aria-hidden')
            cloneTarget.querySelector('.btn-tel').removeAttribute('aria-hidden')
        },
        //Gnb Link 후
        linkAfter(){
            document.querySelector('#navTrg').click();
        },
        symbolClick(){
            if(document.querySelector('#navTrg').classList.contains('on')){
                document.querySelector('#navTrg').click();
                document.querySelector('.m4a-symbol').focus();
            }
        }
    },
    mounted() {
        //영업문의 복제
        this.inquiryClone() 
        //GNB 트리거
        document.querySelector('#navTrg').addEventListener('click', this.globalNav)
        //메일 복사 트리거
        document.querySelectorAll('.btn-mailcopy').forEach(elm =>{
            elm.addEventListener('click', this.copyText)
        })
        
        //Gnb Link 후
        document.querySelectorAll('.nav-item').forEach(navItem =>{
            navItem.addEventListener('click', this.linkAfter)
        })
        //로고 클릭
        document.querySelector('.m4a-symbol').addEventListener('click', this.symbolClick)
    }
}
</script>
<template>
<div class="inc-wrap">
    <button id="navTrg" class="nav-trg" type="button" :aria-expanded="[ navActive ? true : false]"  :aria-label="[ navActive ? '메인메뉴 닫기' : '메인메뉴 열기' ]" aria-controls="navGroup" :class="{ on : navActive }"><span>메인메뉴</span></button>
    <div class="m4a-ci">
        <RouterLink to="/" class="m4a-symbol" role="button" aria-label="홈으로 이동">M4A</RouterLink>
        <div class="vue"><svg class="logo" viewBox="0 0 128 128" width="24" height="24" data-v-b746bafa=""><path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z" data-v-b746bafa=""></path><path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z" data-v-b746bafa=""></path></svg></div>
    </div>
    <div class="sales-mask">
        <inquiry id="salesInquiry2" />
    </div>
    <div id="navGroup" class="nav-group" aria-hidden="true" :class="{ on : navActive }">
        <nav id="mainNav" class="main-nav" aria-label="메인메뉴" role="navigation">
            <ul role="menubar">
                <li role="none"><RouterLink to="/Works" class="nav-item"  role="menuitem">WORKS</RouterLink></li>
                <li role="none"><RouterLink to="/About" class="nav-item"  role="menuitem">ABOUT M4A</RouterLink></li>
                <li role="none"><RouterLink to="/Contact" class="nav-item"  role="menuitem">CONTACT</RouterLink></li>
            </ul>
        </nav>
        <div  class="nav-near-conts">
            <div id="inquiryClone" class="sales-inquiry"></div>
            <brochure />
        </div>
    </div>
</div>
</template>