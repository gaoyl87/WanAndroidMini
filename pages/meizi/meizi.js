import api from "../../api/api.js"

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1
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
      list: [],
      page: 1
    })
    this.requestMeizi(1)
  },

  loadmore() {
    const page = this.data.page + 1
    this.requestMeizi(page)
  },

  requestMeizi(page) {
    const that = this
    api.getMeiziImage(page)
      .then(result => {
        let list = result.results
        list = that.data.list.concat(list)
        that.setData({
          list: list,
          page: page
        })
        //没有更多
        if (result.results.length < 20) {
          that.scroll.noMore()
        } else {
          that.scroll.resetFooter()
        }
        that.scroll.stopRefresh()
      }).catch(function(reason) {
        that.setData({
          queryPage: page === 1 ? 1 : page - 1
        })
        that.scroll.resetFooter()
        that.scroll.stopRefresh()
      });
  },

  clickImage(e) {
    const current = e.currentTarget.dataset.current
    const urls = this.data.list.map(item => {
      return item.url
    })
    //图片预览
    wx.previewImage({
      current: current.url, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  }
})