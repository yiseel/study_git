import React, { useRef, useState } from 'react';

const Reaction = () => {
    const [state, setState] = useState('waiting');
    const [massage, setMassage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);

    const timeOut = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if (state === 'waiting'){
            setState('ready');
            setMassage('초록색이 되면 클릭하세요.');
            timeOut.current = setTimeout(()=>{
                setState('now');
                setMassage('지금 클릭하세요!');
                startTime.current = new Date();
            },Math.floor(Math.random() * 1000) + 2000);
        }else if (state === 'ready'){
            setState('waiting');
            setMassage('초록색이 된 후에 클릭하세요!');
            clearTimeout(timeOut.current)
        }else if (state === 'now'){
            setState('waiting');
            setMassage('클릭해서 시작하세요.');
            endTime.current = new Date();
            setResult((prevResult) => {
                return [... prevResult , endTime.current - startTime.current];
            });
        }
    };

    const onReset = () => {
        setResult([]);
    };

    const rederAverage = () => {
        return result.length === 0
            ? null
            : <div className='info'>
                <div>평균 시간 : {result.reduce((a,c) => a + c ) / result.length}ms</div>
                <div>횟수 : {result.length} 회</div>
                <button onClick={onReset}>리셋</button>
            </div>
    }

    return (
        <>
            <div className={['clickArea', state].join(' ')} onClick={onClickScreen}>
                {massage}
            </div>
            {rederAverage()}
        </>
    )
}

export default Reaction;