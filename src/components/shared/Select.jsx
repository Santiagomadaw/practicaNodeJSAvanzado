import styled from 'styled-components';

const Select = styled.select`
    font-size: medium;
    appearance: none;
    overflow: auto;
    height: ${(props) => props.$customheight || '30px'};
    width: ${(props) => props.$customwidth || '18%'};
    min-height: fit-content;
    border-radius: 5px;

    &[multiple]:hover {
        height: initial;
    }
    & option {
        text-align: center;
    }
    & option:checked {
        background-color: var(--bg-200);
        color: var(--text-100);
    }
`;

export default Select;
