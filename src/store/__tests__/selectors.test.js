import { getAdByID, getLoadedAds, getTagsLoaded, isLoadedTags } from '../selectors';

describe('getLoadedAds / getAdByID ', () => {
  const id = 'id';
  const ads = [ {id} ];
  const state = { ads: { data: ads } };

    test('should getLoadedAds return ads', () => {
      expect(getLoadedAds(state)).toBe(ads);
    });

    test('should getAdByID return ad', () => {
      expect(getAdByID(id)(state)).toBe(ads[0]);
    });

    test('should not return ads', () => {
      expect(getAdByID('2')(state)).toBeUndefined();
    });
});


describe('getTagsLoaded   ', () => {
  const tags = [ 'tag' ];
  const loaded =true
  const state = { tags: { data: tags, loaded}};

    test('should getTagsLoaded return tags', () => {
      expect(getTagsLoaded(state)).toBe(tags);
    });

    test('should isLoadedTags return tags', () => {
      expect(isLoadedTags(state)).toBe(loaded);
    });

});