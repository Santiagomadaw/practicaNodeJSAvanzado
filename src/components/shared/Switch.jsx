import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Switch = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    gap: 4px;

    .switch {
        position: relative;
        display: flex;
        width: 60px;
        height: 34px;
    }

    .switchtext {
        color: var(--text-100);
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--bg-200);
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: '';
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: var(--text-100);
        transition: 0.4s;
    }

    input:checked + .slider {
        background-color: var(--bg-200);
    }

    input:focus + .slider {
        box-shadow: 0 0 1px var(--primary-100);
    }

    input:checked + .slider:before {
        transform: translateX(26px);
    }

    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }

    .switch-container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        gap: 4px;
    }
`;

const RawSwitch = ({ onChange, Leftname = '', Rightname = '', Name = 'switch' }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleInputChange = (event) => {
        setIsChecked(event.target.checked);
        onChange(event);
    };

    return (
        <Switch className='switch-container'>
            <h3 className='switchtext'>{Leftname}</h3>
            <label className='switch'>
                <input
                    type='checkbox'
                    name={Name}
                    id='buysellcheck'
                    checked={isChecked}
                    onChange={handleInputChange}
                />
                <span className='slider round'></span>
            </label>
            <h3 className='switchtext'>{Rightname}</h3>
        </Switch>
    );
};

RawSwitch.propTypes = {
    onChange: PropTypes.func.isRequired,
    Leftname: PropTypes.string,
    Rightname: PropTypes.string,
    Name: PropTypes.string,
};

export default RawSwitch;
