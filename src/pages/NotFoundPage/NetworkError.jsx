import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getError } from '../../store/selectors';

export default function NetworkError() {
    let error = useSelector(getError)
    
    if (!error){
        error={
            status:'ERROR',
            message:'YOU MUST NOT BE HERE'
        }
    }
    return (
            <StyledNetworkError>
                <Link
                    className='notfound'
                    to='/adverts'
                >
                    <h1>{error.status}</h1>
                    <hr></hr>
                    <h3>{error.message}</h3>
                </Link>
            </StyledNetworkError>
    );
}

const StyledNetworkError = styled.div`

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
