import React, { useEffect } from 'react'

// 모달창 외부를 클릭하는 경우, 모달창 닫기
const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {

        if(!ref.current || ref.current.contains(event.target)){
            return;
        }
        handler();
    }

   document.addEventListener("mousedown", listener);
   document.addEventListener("touchstart", listener);

   return () => {
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
   };
  })
}

export default useOnClickOutside
