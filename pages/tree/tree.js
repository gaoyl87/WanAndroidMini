import api from "../../api/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle: "体系",
    treeList: [],
    expandId: "",
    secondTreeList: [],
    activeIndex:""
  },

  onChange(event) {
    this.setData({
      activeIndex: event.detail
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.requestRemoteData()
  },

  requestRemoteData() {
    this.requestChapter()
  },

  requestChapter() {
    const that = this
    api.getKnowledgeTree()
      .then((res) => {
        const treeList = res.data
        var secondTreeList = []
        for (var i = 0; i < treeList.length; i++) {
          const key = treeList[i].id
          const value = treeList[i].children
          secondTreeList.push({
            key,
            value
          })
        }
        that.setData({
          treeList: treeList,
          secondTreeList: secondTreeList
        })
        //测量每个chapter高度
        // that.calcChapterHeight(secondTreeList)
      })
  },

  calcChapterHeight(list) {
    const that = this
    //测量每个chapter高度
    const chapterHeightList = []
    for (var i = 0; i < list.length; i++) {
      const index = i
      wx.createSelectorQuery().select(`#chapter${index}`).boundingClientRect((res) => {
        chapterHeightList.push(res.height)
        //最后一个将数组保存到data
        if (index === (list.length - 1)) {
          that.setData({
            chapterHeightList: chapterHeightList
          })
        }
      }).exec()
    }
  },

  clickExpand(e) {
    const that = this
    const id = e.currentTarget.dataset.id
    const index = e.currentTarget.dataset.index

    that.setData({
      expandId: that.data.expandId === id ? "" : id,
      chapterHeight: that.data.expandId === id ? 0 : that.data.chapterHeightList[index]
    })
  },

  showChapter(index) {

  },

  hideChapter(index) {

  },

  clickChapter(e) {
    const cid = e.currentTarget.dataset.id
    const title = e.currentTarget.dataset.name
    wx.navigateTo({
      url: "tree-detail/tree-detail?cid={cid}&title={title}&".format({
        cid: cid,
        title: title
      })
    })
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