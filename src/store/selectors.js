export const getIsLogged = state => state.auth;


export const getLoadedAds = state => state.ads.data;

export const isLoadedAds = state => state.ads.loaded;

export const getAdByID = adId => state => getLoadedAds(state).find(ad => ad.id === adId);



export const getFilters = state => state.filters;

export const getSlider = state => state.slider;



export const getError = state => state.ui.error;

export const getPending = state => state.ui.pending;


export const getTagsLoaded = state => state.tags.data;

export const isLoadedTags = state => state.tags.loaded;
