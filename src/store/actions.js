import {
    AUTH_LOGIN_FULFILLED,
    AUTH_LOGIN_REJECTED,
    AUTH_LOGIN_PENDING,
    ADS_LOADED_PENDING,
    ADS_LOADED_FULFILLED,
    ADS_LOADED_REJECTED,
    UPDATE_FILTER_SEARCH,
    UPDATE_FILTER_TAGS,
    UPDATE_FILTER_BUYSELL,
    UPDATE_FILTER_PRICE,
    CLEAR_FILTERS,
    UPDATE_SLIDER,
    UI_RESET_ERROR,
    AD_CREATED_PENDING,
    AD_CREATED_FULFILLED,
    AD_CREATED_REJECTED,
    AD_DETAIL_PENDING,
    AD_DETAIL_FULFILLED,
    AD_DETAIL_REJECTED,
    UPDATE_TAGS_PENDING,
    UPDATE_TAGS_FULFILLED,
    UPDATE_TAGS_REJECTED,
    ADS_DELETED_PENDING,
    ADS_DELETED_FULFILLED,
    ADS_DELETED_REJECTED,
    UI_SET_ERROR,
    AUTH_LOGOUT_PENDING,
    AUTH_LOGOUT_FULFILLED,
    AUTH_LOGOUT_REJECTED,
} from './types';
import { getAdByID, getLoadedAds, isLoadedAds, isLoadedTags } from './selectors';

//----------------Login actions--------------

export const authLogin = (credentials) => async (dispatch, _getState, { services: { login }, router }) => {
    try {
        dispatch(loginPending());
        await login(credentials);
        dispatch(loginFulfilled());
        const to = router.state.location.state?.from || '/';
        router.navigate(to, { replace: true });

    } catch (error) {
        if (error) {
            dispatch(loginRejected(error));
        }
    }
};

export const loginPending = () => ({
    type: AUTH_LOGIN_PENDING,
});
export const loginFulfilled = () => ({
    type: AUTH_LOGIN_FULFILLED,
});
export const loginRejected = (error) => ({
    type: AUTH_LOGIN_REJECTED,
    payload: error,
    error: true,
});

//----------------Logout actions--------------


export const logoutPending = () => ({
    type: AUTH_LOGOUT_PENDING,
});
export const logoutFulfilled = () => ({
    type: AUTH_LOGOUT_FULFILLED,
});
export const logoutRejected = (error) => ({
    type: AUTH_LOGOUT_REJECTED,
    payload: error,
    error: true,
});
export const authLogout = () => async (dispatch, _getState, { services: { logout } }) => {
    try {
        dispatch(logoutPending());
        await logout();
        dispatch(logoutFulfilled());

    } catch (error) {
        console.log(error);
        dispatch(logoutRejected(error));

    }
};

//----------------Ads load actions---------------

export const adsLoader = () => async (dispatch, getState, { services: { getAds } }) => {
    const haveAdsLoaded = isLoadedAds(getState());
    if (!haveAdsLoaded) {

        try {
            dispatch(adsLoadedPending());
            const rawAds = await getAds();
            dispatch(adsLoadedFulfilled(rawAds.data));
            dispatch(setSlider());
        } catch (error) {
            if (error) {
                console.log(error);
                dispatch(adsLoadedRejected(error));
            }
        }
    }
    dispatch(setSlider());
};
export const adsLoadedPending = () => ({
    type: ADS_LOADED_PENDING,
});

export const adsLoadedFulfilled = (ads) => ({
    type: ADS_LOADED_FULFILLED,
    payload: ads,
});

export const adsLoadedRejected = (error) => ({
    type: ADS_LOADED_REJECTED,
    payload: error,
    error: true,
});
//----------------Ad detail actions---------------

export const adDetailLoader = (id) => async (dispatch, getState, { services: { getAd } }) => {
    const state = getState();
    if (!getAdByID(id)(state)) {
        try {
            dispatch(adDetailPending());
            const ad = await getAd(id);
            dispatch(adDetailFulfilled(ad.data));
        } catch (error) {
            dispatch(adDetailRejected(error));
        }
    }

};
export const adDetailPending = () => ({
    type: AD_DETAIL_PENDING,
});

export const adDetailFulfilled = (ads) => ({
    type: AD_DETAIL_FULFILLED,
    payload: ads,
});

export const adDetailRejected = (error) => ({
    type: AD_DETAIL_REJECTED,
    payload: error,
    error: true,
});
//----------------Ad create actions---------------

export const adCreate = (formValues) => async (dispatch, _getState, { services: { postAd }, router }) => {

    try {
        dispatch(adCreatedPending());
        const response = await postAd(formValues);
        dispatch(adCreatedFulfilled(response.data));
        dispatch(setSlider());
        setTimeout(() => {

            const to = `/adverts/${response.data.id}`;
            router.navigate(to, { replace: true });
        }, 1000);


    } catch (error) {
        if (error) {
            dispatch(adCreatedRejected(error));
        }
    }


};

export const adCreatedPending = () => ({
    type: AD_CREATED_PENDING
});

export const adCreatedFulfilled = (ad) => ({
    type: AD_CREATED_FULFILLED,
    payload: ad,
});

export const adCreatedRejected = (error) => ({
    type: AD_CREATED_REJECTED,
    payload: error,
    error: true,
});

//----------------Ad delete actions---------------

export const adDelete = (id) => async (dispatch, _getState, { services: { deleteAd }, router }) => {

    try {

        dispatch(adDeletePending());
        if (id) {
            await deleteAd(id);
            dispatch(uiSetError('Anuncio Borrado'));
            setTimeout(() => {
                router.navigate('/adverts');
                dispatch(uiResetError());
            }, 1000);

            setTimeout(() => {
                dispatch(adDeleteFulfilled(id));
                dispatch(setSlider());
            }, 1200);

        }
    } catch (error) {
        if (error) {
            const msg = error.message;
            dispatch(adDeleteRejected(msg));
        }
    }



};

export const adDeletePending = () => ({
    type: ADS_DELETED_PENDING
});

export const adDeleteFulfilled = (id) => ({
    type: ADS_DELETED_FULFILLED,
    payload: id
});

export const adDeleteRejected = (error) => ({
    type: ADS_DELETED_REJECTED,
    payload: error,
    error: true,
});

//----------------Filters actions---------------


export const updateFilterSearch = (search) => ({
    type: UPDATE_FILTER_SEARCH,
    payload: search,
});
export const updateFilterTags = (tags) => ({
    type: UPDATE_FILTER_TAGS,
    payload: tags,
});
export const updateFilterBuysell = (buySell) => ({
    type: UPDATE_FILTER_BUYSELL,
    payload: buySell,
});
export const updateFilterPrice = (price) => ({
    type: UPDATE_FILTER_PRICE,
    payload: price,
});

export const clearFilters = (maxPrice) => ({
    type: CLEAR_FILTERS,
    payload: maxPrice,
});

export const updateSlider = (maxPrice) => ({
    type: UPDATE_SLIDER,
    payload: maxPrice,
});

export const setSlider = () => (dispatch, getState, { findHighestPrice }) => {
    const state = getState();
    const ads = getLoadedAds(state);
    const maxPrice = findHighestPrice(ads);
    dispatch(updateSlider(maxPrice));
    dispatch(updateFilterPrice([0, maxPrice]));
};
//----------------tags actions---------------

export const tagsLoader = () => async (dispatch, getState, { services: { getTags }, }) => {
    const haveTagsLoaded = isLoadedTags(getState());
    if (!haveTagsLoaded) {

        try {
            dispatch(tagsLoaderPending());
            const tags = await getTags();
            dispatch(tagsLoaderFulfilled(tags.data));


        } catch (error) {
            if (error) {
                dispatch(tagsLoaderRejected(error.message));
            }
        }
    }

};

export const tagsLoaderPending = () => ({
    type: UPDATE_TAGS_PENDING,
});
export const tagsLoaderFulfilled = (tags) => ({
    type: UPDATE_TAGS_FULFILLED,
    payload: tags,
});
export const tagsLoaderRejected = (error) => ({
    type: UPDATE_TAGS_REJECTED,
    payload: error,
    error: true,
});



export const uiResetError = () => ({
    type: UI_RESET_ERROR,
});
export const uiSetError = (error) => ({
    type: UI_SET_ERROR,
    payload: error,
    error: true,
});
