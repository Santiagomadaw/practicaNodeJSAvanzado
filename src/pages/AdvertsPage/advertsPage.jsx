import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SingleAd from './components/ad';
import Layout from '../../components/layout/Layout';
import ErrorMessage from '../../components/shared/ErrorMessage';
import Noad from './components/Noad';
import { useDispatch, useSelector } from 'react-redux';
import { adsLoader } from '../../store/actions';
import { getFilters, getLoadedAds } from '../../store/selectors';
import { FilterOption } from './utils';

const AdvertsPage = () => {
    const dispatch = useDispatch();
    const filter = useSelector(getFilters);
    const ads = useSelector(getLoadedAds);
    const [error, setError] = useState(null);
    const resetError = () => setError(null);

    useEffect(() => {
        dispatch(adsLoader());
    }, [dispatch]);

    let sellAds = ads;
    if (filter) {
        sellAds = FilterOption(filter, ads);
    }

    return (
        <Layout>
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
                        <h3>{error.toUpperCase()}</h3>
                    </ErrorMessage>
                )}
            </StyledAdList>
        </Layout>
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
