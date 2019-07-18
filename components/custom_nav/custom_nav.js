const app = getApp()
Component({
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    navHeight: app.globalData.navHeight
  },
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    navTitle: {
      type: String,
      value: "标题"
    },
    leftNavImage: {
      type: String,
      value: "../../icons/back.png"
    }
  },
  methods: {
    //自定义事件
    _clickLeft: function(event) {
      //如果是返回图片，则执行返回方法
      const leftNavImage = this.data.leftNavImage
      if (leftNavImage == "../../icons/back.png") {
        wx.navigateBack({
          delta: 1
        })
      } else if (leftNavImage != null) {
        let eventDetail = {} // detail对象，提供给事件监听函数
        let eventOption = {} // 触发事件的选项
        this.triggerEvent("clickLeft", eventDetail, eventOption)
      }
    }
  }
})