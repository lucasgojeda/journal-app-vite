import React from 'react';

export const NothingSelected = () => {
    return(
        <div className='nothing__main-content'>
            <div>
                <p>Select something</p>
                <hr />
                <p>or create an entry!</p>
            </div>

            <i className='far fa-star fa-x4 mt-5'></i>
        </div>
    );
};