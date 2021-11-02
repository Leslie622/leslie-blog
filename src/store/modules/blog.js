export const blog = {
  state: () => ({
    articleCacheData: {

    },
    archiveCacheData: {

    }
  }),
  mutations: {
    setArticleCacheData(state, { category, articleData }) {
      state.articleCacheData[category] = articleData
    },
    setArchiveCacheData(state, { category, archiveData }) {
      state.archiveCacheData[category] = archiveData
    }
  },
  actions: {},
  getters: {}
}

