import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import noImg from '../../../assets/no-image-svgrepo-com.svg';

export default function SingleAd({ id, photo, name, price, sale, tags }) {
    return (
        <Link className='add' to={`/adverts/${id}`}>
            <StyledSingleAd className='single-ad'>
                <div className='img-container'>
                    {photo ? (
                        <img src={photo} alt={'Imagen de' + name} />
                    ) : (
                        <img
                            className='noImg'
                            src={noImg}
                            alt='Articulo sin foto'
                        />
                    )}
                </div>
                <div className='textcontainer'>
                    <strong className=''>{price} €</strong>
                    <p className='item'>{name}</p>
                    <p className='task sell'>{sale ? 'Venta' : 'Compra'}</p>
                    <div className='tags-container'>
                        {tags.map((tag, index) => (
                            <div key={index} className='task'>
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </StyledSingleAd>
        </Link>
    );
}

SingleAd.propTypes = {
    id: PropTypes.string.isRequired,
    photo: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    sale: PropTypes.bool.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const StyledSingleAd = styled.div`
    box-shadow: 0px 0px 9px 4px rgba(0, 0, 0, 0.75);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 240px;
    max-height: 340px;
    gap: 4px;
    transition: 0.09s;
    border-radius: 10px;
    padding-bottom: 10px;

    background: var(--accent-200);
    & .item {
        margin: 0;
        color: var(--accent-100);
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    & .img-container {
        display: flex;
        max-width: 100%;
        height: 200px;
        max-height: 200px;
        justify-content: center;

        align-items: center;
        background: var(--accent-100);
        overflow: hidden;
        &:has(.noImg) img {
            width: 40%;
            height: 40%;
            object-fit: cover;
        }
        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        & .noImg {
            opacity: 0.6;
        }
    }
    & .textcontainer {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding-left: 10px;
        padding-right: 10px;
    }

    & strong {
        font-size: large;
        color: var(--accent-100);
    }
    & .task {
        text-align: center;
        padding: 3px 5px;
        border-radius: 3px;
        color: var(--text-200);
        height: fit-content;
        background: var(--bg-200);
        gap: 4px;
    }
    & .tags-container {
        display: flex;
        overflow: hidden;
        height: fit-content;
        gap: 4px;
    }
    & .sell {
        color: var(--text-100);
        background: var(--accent-100);
    }
    &:hover {
        transform: translate(0, -5px);
    }
`;
