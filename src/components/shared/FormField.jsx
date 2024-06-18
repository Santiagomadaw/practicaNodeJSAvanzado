import styled from 'styled-components';

const FormField = styled.input`
    border: none;
    outline: none;
    border: 1px solid var(--accent-200);
    border-radius: 5px;
    padding-left: 10px;
    height: ${(props) => props.$customheight || '30px'};
    width: ${(props) => props.$customwidth || 'fit-content'};
`;


export default FormField;
