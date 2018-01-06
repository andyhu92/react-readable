import React from 'react';

function goBack(){
    window.history.back();
}

const BackButton = () => (
 <button className='btn btn-default backBtn' onClick={goBack} type="button">
     <i className='glyphicon glyphicon-arrow-left'></i> Back</button>
);

export default BackButton;