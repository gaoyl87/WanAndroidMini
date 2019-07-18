import api from "../../api/api"
const app = getApp()

Component({
  data: {
    isLogin: app.globalData.isLogin
  },
  properties: {
    itemData: Array,
    tabData: Array,
    hideCollectImage: Boolean
  },

  methods: {
    clickCollect(e) {
      const index = e.target.dataset.index
      const item = e.target.dataset.item
      const collect = item.collect
      //已登录
      if (this.data.isLogin) {
        //已收藏的取消收藏
        if (collect) {
          this._uncollect(item, index)
        }
        //未收藏的收藏
        else {
          this._collect(item, index)
        }
      }
      //登录
      else {
        app.gotoLogin()
        wx.showToast({
          title: '请先登录',
          icon: "none"
        })
      }
    },

    _collect(item, index) {
      const that = this
      api.collectInnerArticle(item.id)
        .then(res => {
          const temp = 'itemData[' + index + '].collect'
          that.setData({
            [temp]: true
          })
        })
    },

    _uncollect(item, index) {
      const that = this
      api.cancelCollectArticleInList(item.id)
        .then(res => {
          const temp = 'itemData[' + index + '].collect'
          that.setData({
            [temp]: false
          })
        })
    },

    itemClick(event) {
      const itemData = event.currentTarget.dataset.item
      const index = event.currentTarget.dataset.index
      this.triggerEvent("itemClick", {
        itemData,
        index
      })
    }
  },

  ready: function() {
    const that = this
    //监听isLogin的变化
    app.watch("isLogin", (val, old) => {
      that.setData({
        isLogin: val
      })
    })
  }
})