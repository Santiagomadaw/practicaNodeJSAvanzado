import styled from 'styled-components';

const Button = styled.button`
    cursor: pointer;
    background-color: var(--accent-100);
    border: 1px solid var(--accent-200);
    padding: 0px 12px;
    border-radius: 5px;
    color: var(--accent-200);
    text-align: center;
    display: inline-block;
    font-size: 16px;
    height: 'fit-content';
    width: ${(props) => props.$customwidth || 'fit-content'};
    &:hover {
        transform: scale(0.96);
    }
    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        transform: scale(1);
        background-color: var(--accent-200);
        color: var(--text-200);
        border: 1px solid var(--accent-100);
    }
`;

export default Button;
