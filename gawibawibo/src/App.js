import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const rspcoords = {
  바위 : '0',
  가위 : '-250px',
  보 : '-530px'
};

const scores = {
  가위 : 1,
  바위 : 0,
  보 : -1
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspcoords).find(function(v){
    console.log(v,imgCoord, rspcoords)
    return v[1] === imgCoord;
  })[0];
};

function App() {
  const [result, setResult] = useState();
  const [imgCoord, setImgCoord] = useState(rspcoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef();
  
  useEffect(() => {
    interval.current = setInterval(ChangeHand, 500);
    return () => {
      clearInterval(interval.current);
    }
  },[imgCoord]);
  

  const ChangeHand = () => {
    if(imgCoord === rspcoords.바위){
      setImgCoord(rspcoords.가위)
    } else if(imgCoord === rspcoords.가위){
      setImgCoord(rspcoords.보)
    } else if(imgCoord === rspcoords.보){
      setImgCoord(rspcoords.바위)
    }
  }

  const onclickbtn = (choice) => () => {
    clearInterval(interval.current);

    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    console.log(cpuScore)
    if(diff === 0){
      setResult('비겼습니다');
    }else if ([-1, 2].includes(diff)){
      setResult('이겼습니다');
      setScore((preveState) => preveState + 1)
    }else {
      setResult('졌습니다');
      setScore((preveState) => preveState - 1)
    };

    setTimeout(()=>{
      interval.current = setInterval(ChangeHand, 500);
    });

  }

  return (
    <div className="App">
      <div id="compter" style={{background: `url(img.jpg) ${imgCoord} 0 no-repeat`}}></div>
      <div>
        <button id="rock" className="btn" onClick={onclickbtn('바위')}>바위</button>
        <button id="scissor" className="btn" onClick={onclickbtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={onclickbtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 : {score}점</div>
    </div>
  );
}

export default App;
