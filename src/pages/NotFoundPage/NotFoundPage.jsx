import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import styled from 'styled-components';

export default function NotFoundPage() {
    return (
        <Layout>
            <StyledNotFound>
                <Link
                    className='notfound'
                    to='/adverts'
                >
                    <h1>404</h1>
                    <hr></hr>
                    <h3>Not Found</h3>
                </Link>
            </StyledNotFound>
        </Layout>
    );
}

const StyledNotFound = styled.div`

display: flex;

align-items: center;
justify-content: center;
width: 100%;
height: 100%;
color: var(--text-100);
.notfound{
    
display: flex;
flex-direction: row;

align-items: center;
gap:20px

}
hr{
    height: 50px;
    width: 2px;
`;
