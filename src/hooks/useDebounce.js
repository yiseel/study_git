import React, { useEffect, useState } from 'react'

// 검색할 때, 입력한 내용을 딜레이를 줘서 한번에 받아옴 => 불필요한 호출을 줄일 수  있음 
export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(()=>{

        // 딜레이 후 입력한 값을 넣어줌
        const handler = setTimeout(()=>{
            setDebounceValue(value);
        }, delay);

        return () => {
            // 입력 내용이 변경되면 다시 리셋
            clearTimeout(handler);
        }
    },[value, delay]);

    return debounceValue;

}
