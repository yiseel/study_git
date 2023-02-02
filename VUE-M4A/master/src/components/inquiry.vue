<script>
export default {
    data() {
        return {
            inquiryActive : false
        }
    },
    methods: {
        inquiryButton() {
            if(this.inquiryActive === true){
                this.inquiryActive = false
            }else{
                this.inquiryActive = true
            }
        }
    },
    mounted() {
        document.querySelector('#inquiryTrg').addEventListener('click', this.inquiryButton)
    }
}
</script>
<template>
<div class="sales-inquiry" :class="{on : inquiryActive}" >
    <div class="email"><button id="inquiryTrg" class="inquiry-trg" :class="{on : inquiryActive}" :aria-expanded="[inquiryActive ? true : false]" aria-controls='salesInquiry2' >영업문의 열기</button><b class="tit">영업문의.</b> <button class="btn-mailcopy" :aria-hidden="[inquiryActive ? false : true]" :tabindex="[inquiryActive ? '0' : '-1']" aria-label="wslee@m4a.co.kr 이메일 주소 복사"><span class="mailID">wslee@m4a.co.kr</span> <span class="btn-copy">COPY</span></button></div>
    <div class="tel"><a class="btn-tel" role="button" :aria-hidden="[inquiryActive ? false : true]" :tabindex="[inquiryActive ? '0' : '-1']" href="tel:02-536-1518" aria-label="02-536-1518로 전화걸기">02.536.1518</a></div>
</div>
</template>