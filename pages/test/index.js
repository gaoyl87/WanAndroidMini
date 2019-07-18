Page({

  /**
   * 页面的初始数据
   */
  data: {
    //最新文章
    page: 1,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.scroll = this.selectComponent('.scorllStyle')
    this.refresh()
  },

  clearData() {
    this.setData({
      page: 1,
      list: []
    })
  },

  getUrls(page) {
    console.log(page)
    const that = this

    let list = []
    const max = page * 20
    const min = max - 20
    for (var i = min; i < max; i++) {
      const index = i < 10 ? "00" + i : i < 100 ? "0" + i : i
      const url = "http://cued.xunlei.com/demos/publ/img/P_" + index + ".jpg"
      list.push({
        url: url
      })
    }
    list = that.data.list.concat(list)

    that.setData({
      list: list,
      page: page
    })
    if (page === 10) {
      that.scroll.noMore()
    } else {
      that.scroll.resetFooter()
    }
    that.scroll.stopRefresh()
  },

  refresh() {
    this.clearData()
    this.getUrls(1)
  },
  loadmore() {
    const page = this.data.page + 1
    this.getUrls(page)
  }
})