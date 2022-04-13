const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result")
const endPoint = 12;
const select = [0,0,0,0,0,0,0,0,0,0,0,0];

function calResult () {
    var result = select.indexOf(Math.max(...select));
    return result;
}

function setResult () {
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgUrl = 'img/image-' + point + '.png';

    resultImg.src = imgUrl;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult () {
    main.style.webkinAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    
    setTimeout(()=> {
        result.style.webkinAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(()=>{
            qna.style.display = "none";
            result.style.display = "block";
        },450);
    });
    setResult();
}

function addAnswer (answerText, qIdx, idx) {
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('mx-auto');
    answer.classList.add('.fadeIn');

    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        var childern = document.querySelectorAll('.answerList');

        for (let i = 0; i < childern.length; i++ ){
            childern[i].disabled = true;
            childern[i].style.webkinAnimation = "fadeOut 0.5s";
            childern[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(()=> {

            var target = qnaList[qIdx].a[idx].type;
            for (let j = 0; j < target.length; j++){
                select[target[j]] += 1;
            }

            for (let i = 0; i < childern.length; i++ ){
                childern[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 450)
    }, false);
}

function goNext (qIdx) {
    if(qIdx === endPoint){
        goResult();
        return;
    }

    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;

    for (let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }

    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx + 1) + '%';
}

function begin () {
    main.style.webkinAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    
    setTimeout(()=> {
        qna.style.webkinAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(()=>{
            main.style.display = "none";
            qna.style.display = "block";
        },450);
        let qIdx = 0;
        goNext(qIdx);
    },450);
}