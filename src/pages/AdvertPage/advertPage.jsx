import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/shared/Button';
import ErrorMessage from '../../components/shared/ErrorMessage';
import styled from 'styled-components';
import noImg from '../../assets/no-image-svgrepo-com.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getAdByID, getError } from '../../store/selectors';
import { adDelete, adDetailLoader } from '../../store/actions';
import Confirmator from '../../components/shared/Confirmator';

export default function AdvertPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [hideDelete, setHideDelete] = useState(false);
    const { adId } = useParams();
    const ad = useSelector(getAdByID(adId));
    useEffect(() => {
        if (!ad) {
            dispatch(adDetailLoader(adId));
        }
    }, [adId, ad, dispatch]);
    const handleBack = () => {
        const to = location.state?.from || '/';
        navigate(to, { replace: true });
    };
    const handleDeleteAd = () => {
        setHideDelete(true);
    };
    const error = useSelector(getError);

    const handleDeleteConfirm = async () => {
        dispatch(adDelete(adId));
    };

    return (
        <>
            <Confirmator
                textValue='Seguro que desea borrar?'
                onConfirm={handleDeleteConfirm}
                hidden={hideDelete}
                sethiden={setHideDelete}
            />
            <StyledAdvertPage className='advert'>
                {ad && (
                    <>
                        <div className='advert-img-container'>
                            {ad.photo ? (
                                <img
                                    src={ad.photo}
                                    alt={'Imagen de' + ad.name}
                                />
                            ) : (
                                <img
                                    className='advert-noImg'
                                    src={noImg}
                                    alt='Articulo sin foto'
                                />
                            )}
                        </div>
                        <div className='advert-priceNameBlock'>
                            <h2>{ad.name}</h2>
                            <h2>{`${ad.price}  €`}</h2>
                        </div>
                        <div className='advert-tags-container'>
                            {ad.tags.map((tag, index) => (
                                <div key={index} className='advert-tagLink'>
                                    {tag}
                                </div>
                            ))}
                            <div className='advert-tagLink'>
                                {ad.sale ? 'Venta' : 'Compra'}
                            </div>
                        </div>
                        <div>
                            <Button
                                id='removeAdButton'
                                onClick={handleDeleteAd}
                                $customheight='28px'
                            >
                                Borrar
                            </Button>
                            <Button
                                id='backButton'
                                $customheight='28px'
                                onClick={handleBack}
                            >
                                Volver
                            </Button>
                        </div>
                    </>
                )}
                {error && (
                    <ErrorMessage className='advert-loginPage-error'>
                        <h3>{error.message.toUpperCase()}</h3>
                    </ErrorMessage>
                )}
            </StyledAdvertPage>
        </>
    );
}

AdvertPage.propTypes = {
    children: PropTypes.node,
};

const StyledAdvertPage = styled.div`
    box-shadow: 0px 0px 9px 4px rgba(0, 0, 0, 0.75);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 680px;
    max-width: 90%;
    background-color: var(--accent-200);
    padding: 20px 10px;
    border-radius: 10px;
    gap: 10px;
    margin: 0 auto;

    & h2,
    h1 {
        margin-left: 14px;
        color: var(--text-200);
    }

    & .advert-priceNameBlock {
        display: flex;
        flex-direction: column;
        align-items: start;
        width: 100%;
    }

    & .advert-img-container {
        margin-bottom: 20px;
        display: flex;
        width: 640px;
        max-width: 96%;
        height: 480px;
        border-radius: 10px;
        align-items: center;
        justify-content: center;
        background: var(--accent-100);
        overflow: hidden;

        &:has(.advert-noImg) img {
            width: 40%;
            height: 40%;
            object-fit: cover;
        }

        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        & .advert-noImg {
            opacity: 0.6;
        }
    }

    & .advert-tags-container {
        display: flex;
        overflow: hidden;
        height: fit-content;
        gap: 4px;

        & .advert-tagLink {
            text-align: center;
            padding: 3px 5px;
            border-radius: 3px;
            color: var(--text-200);
            height: fit-content;
            background: var(--bg-200);
        }
    }
`;
