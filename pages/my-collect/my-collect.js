import api from "../../api/api.js"

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectArticleList: [],
    page: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.scroll = this.selectComponent('.scorllStyle')
    this.refresh()
  },

  refresh() {
    this.setData({
      collectArticleList: [],
      page: 0
    })
    this.requestMyCollect(0)
  },

  loadmore() {
    const page = this.data.page + 1
    this.requestMyCollect(page)
  },

  requestMyCollect(page) {
    const that = this
    api.getCollectArticleList(page)
      .then(result => {
        let collectArticleList = result.data.datas
        collectArticleList = that.data.collectArticleList.concat(collectArticleList)
        that.setData({
          collectArticleList: collectArticleList,
          //我的收藏列表的page会比请求的page大1，是个bug
          page: result.data.curPage - 1
        })
        //没有更多
        if (result.data.curPage === result.data.pageCount) {
          that.scroll.noMore()
        } else {
          that.scroll.resetFooter()
        }
        that.scroll.stopRefresh()
      }).catch(function(reason) {
        that.setData({
          queryPage: page === 0 ? 0 : page - 1
        })
        that.scroll.resetFooter()
        that.scroll.stopRefresh()
      });
  },

  itemClick(event) {
    const url = event.detail.link
    const title = event.detail.title
    app.gotoWeb(url, title)
  }
})