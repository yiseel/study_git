import React, { useState, useRef } from 'react'; 
import './App.css';


function App() {
  const FocusInput = useRef();

  const [num, setNum] = useState({
    first : Math.ceil(Math.random() * 9),
    second : Math.ceil(Math.random() * 9),
  });

  const [value, setValue] = useState('');
  const [result, setResult] = useState('');


  const Submit = (e) => {
    e.preventDefault();

    if(parseInt(value) === num.first * num.second){
      setNum({
        first : Math.ceil(Math.random() * 9),
        second : Math.ceil(Math.random() * 9),
      })
      setResult('정답:' + value);
      setValue('');
    }else{
      setResult('오답');
      setValue('');
    };
        
  };

  return (
    <div className="App">
      <div> 연습 1. 구구단</div>
      <div className='que'>
           <span>문제 :</span>
           {num.first} 곱하기 {num.second} ?
      </div>
      <form>
           <input type="number" 
            ref={FocusInput}
            value={value} 
            onChange={(e)=>setValue(e.target.value)}
          />
           <button onClick={Submit}>정답 확인</button>
      </form>
      <div className='result'>{result}</div>
    </div>
  );
}

export default App;
