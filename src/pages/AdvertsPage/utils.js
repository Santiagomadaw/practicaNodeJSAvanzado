export const FilterOption = (filtersState, ads) => {
    let filteredAds = ads;

    if (filtersState.buysell === 'sell') {
        filteredAds = filteredAds.filter((ad) => ad.sale === true);
    } else if (filtersState.buysell === 'buy') {
        filteredAds = filteredAds.filter((ad) => ad.sale === false);
    } else if (filtersState.buysell !== 'all') {
        filteredAds = ads;
    }

    if (filtersState.search) {
        const searchTerm = filtersState.search.toLowerCase();
        filteredAds = filteredAds.filter((ad) =>
            ad.name.toLowerCase().includes(searchTerm)
        );
    }

    if (filtersState.tags) {
        filteredAds = filteredAds.filter((ad) =>
            filtersState.tags.every((tag) => ad.tags.includes(tag))
        );
    }

    if (filtersState.price) {
        filteredAds = filteredAds.filter((ad) => {
            if (Array.isArray(filtersState.price)) {
                return (
                    ad.price >= filtersState.price[0] &&
                    ad.price <= filtersState.price[1]
                );
            }
            return false;
        });
    }

    return filteredAds;
};


export const findHighestPrice = (ads) => {
    return ads.reduce((maxPrice, ad) => {
        return ad.price > maxPrice ? ad.price : maxPrice;
    }, 0);
};