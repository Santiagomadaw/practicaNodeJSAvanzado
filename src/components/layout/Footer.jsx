import styled from 'styled-components';

function Footer() {
    return (
        <StyledFooter>
            <p>Powered by React + Vite + JavaScript</p>
        </StyledFooter>
    );
}

export default Footer;

const StyledFooter = styled.footer`
    position: sticky;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90px;
    color: var(--text-100);
    border-top: 1px solid var(--text-100);
    p {
        font-size: medium;
    }
`;
