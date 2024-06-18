import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../../components/shared/Button';

const Noad = () => {
    return (
        <StyledNoad className='no-ad'>
            <h1>No se han encontrado anuncios</h1>
            <Button
                as={Link}
                to='/adverts/new'
                state={{ from: location.pathname }}
                $customheight='25px'
                replace
            >
                Crear un anuncio
            </Button>
        </StyledNoad>
    );
};
export default Noad;



const StyledNoad = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    justify-item: center;
`;
