import React from 'react';

/**
 * Este componente es aquel que se mostrará cuando no haya ninguna nota seleccionada.
 * @module NothingSelected
 */
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