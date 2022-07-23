import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { notesActive } from '../../store/slices/notesSlice';

export const JournalEntry = ({note}) => {

    const { title, body, date, url } = note;

    const dispatch = useDispatch();

    const noteDate = moment(date);

    const handleEntryClick = () => {
        dispatch( notesActive({...note}
        ));
    };

    return(
        <div 
            className='journal__entry pointer'
            onClick={handleEntryClick}
        >
            {
                url &&
                <div 
                    className='journal__entry-picture'
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`,
                    }}
                ></div>
            }
            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    { title }
                </p>

                <p className='journal__entry-content'>
                    { body }
                </p>
            </div>

            <div className='journal__entry-date-box'>
                <span> { noteDate.format('dddd') } </span>
                <h4> { noteDate.format('Do') } </h4>
            </div>
        </div>
    );
};