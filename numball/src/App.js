
import React, { useState } from 'react';
import './App.css';
import Try from './Try';

function getNumbers() { //중복되지 않는 숫자 4개 뽑기
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

function App() {
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  
  const Sumbit = (e) => {
    e.preventDefault();

    if(value === answer.join('')){
      setTries((prevTries)=> {
        return [... prevTries, {try: value, result : '홈런!'}]
      });
      alert('홈런! 게임을 다시 시작합니다!');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);

    }else{
      const answerArray = value.split('').map((v)=> parseInt(v));
      let strike = 0;
      let ball = 0;

      if(tries.length >= 9) {
        alert(`10번 넘게 틀려서 실패! 답은 ${answer.join('')}였습니다.`);
        setValue('');
        setAnswer(getNumbers());
        setTries([]);

      }else{

        for(let i = 0; i < 4; i += 1){
          if(answerArray[i] === answer[i]){
            strike += 1;
          }else if(answer.includes(answerArray[i])){
            ball += 1;
          }
        }
        setTries((prevTries)=> {
          return [... prevTries, {try: value, result : `${strike} 스트라이크, ${ball} 볼입니다.`}]
        });
        setValue('');
      }
    }
  }

  return (
    <div className="App">
      <div> 연습 2. 숫자 야구</div>
      <div className='tryInput'>
        <input 
          maxLength={4} 
          value={value} 
          onChange={(e)=> setValue(e.target.value)}
        />
        <button onClick={Sumbit}>확인</button>
      </div>
      <div className='info'>시도 : {tries.length}차</div>
      <div>
        <div className='infoList'>내용 기록</div>
        {tries.map((v,i)=>{
          return <Try key={`${i + 1}차 시도`} tryInfo={v}/> 
        })}
      </div>
    </div>
  );
}

export default App;
