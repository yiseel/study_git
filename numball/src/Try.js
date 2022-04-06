import React from 'react';

const Try = ({ tryInfo }) => {
    return (
        <div className='tryList'>
            <div className='tryNum'>숫자 : {tryInfo.try}</div>
            <div className='tryContent'>{tryInfo.result}</div>
        </div>
    )    
}

export default Try;