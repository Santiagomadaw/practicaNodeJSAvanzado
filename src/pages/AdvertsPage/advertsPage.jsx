import PropTypes from 'prop-types';
import { useEffect } from 'react';
import styled from 'styled-components';
import SingleAd from './components/ad';
import ErrorMessage from '../../components/shared/ErrorMessage';
import Noad from './components/Noad';
import { useDispatch, useSelector } from 'react-redux';
import { adsLoader, uiResetError } from '../../store/actions';
import { getError, getFilters, getLoadedAds } from '../../store/selectors';
import { FilterOption } from './utils';

const AdvertsPage = () => {
    const dispatch = useDispatch();
    const filter = useSelector(getFilters);
    const ads = useSelector(getLoadedAds);
    const error = useSelector(getError);
    const resetError = () => dispatch(uiResetError());
    let sellAds = ads;
    if (filter) {
        sellAds = FilterOption(filter, ads);
    }
    useEffect(() => {
        dispatch(adsLoader());
        
    }, [dispatch]);

   

    return (
            <StyledAdList className='ad-list'>
                {sellAds.length > 0 ? (
                    sellAds.map((ad, index) => <SingleAd key={index} {...ad} />)
                ) : (
                    <Noad />
                )}
                {error && (
                    <ErrorMessage
                        className='loginPage-error'
                        onClick={resetError}
                    >
                        <h3>{error.message.toUpperCase()}</h3>
                    </ErrorMessage>
                )}
            </StyledAdList>
    );
};

AdvertsPage.propTypes = {
    filtersState: PropTypes.shape({
        search: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        buysell: PropTypes.oneOf(['all', 'sell', 'buy']),
        price: PropTypes.number,
    }),
};

const StyledAdList = styled.div`
    margin: auto;
    display: grid;
    justify-content: center;
    gap: 10px;
    grid-template-columns: repeat(auto-fit, 235px);
    padding-top: 50px;

    &:has(.no-ad[noad]) {
        display: flex;
    }

    .no-ad {
        color: silver;
        text-wrap: nowrap;
        text-align: start;
    }
`;

export default AdvertsPage;
