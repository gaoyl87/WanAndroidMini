import api from "../../../api/api"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: "",
    queryPage: 0,
    searchList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.scroll = this.selectComponent('.scorllStyle')
    this.data.word = options.word
    this.refresh()
  },
  refresh() {
    this.clearData()
    this.query(0)
  },
  clearData(){
      this.setData({
        queryPage: 0,
        searchList: []
      })
  },
  loadmore() {
    let page = this.data.queryPage
    this.query(page + 1)
  },
  query(page) {
    const that = this
    const keyword = that.data.word
    api.query(page, keyword)
      .then(result => {
        /**
         * apkLink: ""
         * author: "GcsSloop"
         * chapterId: 126
         * chapterName: "绘图相关"
         * collect: false
         * courseId: 13
         * desc: ""
         * envelopePic: ""
         * fresh: false
         * id: 8620
         * link: "https://www.gcssloop.com/customview/Path_Over"
         * niceDate: "2019-06-16"
         * origin: ""
         * prefix: ""
         * projectLink: ""
         * publishTime: 1560688514000
         * superChapte rId: 99
         * superChapterName: "自定义控件"
         * tags: []
         * title: "安卓<em class='highlight'>自定义View</em>进阶-Path之完结篇"
         * type: 0
         * userId: -1
         * visible: 1
         * zan: 0
         */
        let searchList = result.data.datas
        searchList = that.data.searchList.concat(searchList)

        that.setData({
          searchList: searchList,
          //后端返回的curPage比传入的page大1，是个bug
          queryPage: result.data.curPage - 1
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