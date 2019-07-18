import api from "../../../api/api.js"

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid: "",
    title: "",
    articleList: [],
    page: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.scroll = this.selectComponent('.scorllStyle')
    this.setData({
      cid: options.cid,
      title: options.title
    })
    this.refresh()
  },

  refresh() {
    this.setData({
      articleList: [],
      page: 0
    })
    this.requestArticle(0)
  },

  loadmore() {
    const page = this.data.page + 1
    this.requestArticle(page)
  },

  requestArticle(page) {
    const that = this
    api.getKnowledgeTreeArticleList(page, that.data.cid)
      .then(result => {

        let articleList = result.data.datas
        articleList = that.data.articleList.concat(articleList)
        that.setData({
          articleList: articleList,
          //后端返回的curPage比传入的page大1，是个bug
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})