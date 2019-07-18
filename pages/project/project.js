import api from "../../api/api.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle: "项目",
    //当前选中的导航索引
    currentNavIndex: 0,
    //导航数据
    navList: [],
    //下划线css属性
    lineWidth: 0,
    //导航栏水平滚动距离
    navScrollLeft: 0,
    //导航栏下划线动画
    navAnimate: null,
    projectList: [],
    //存放项目对象，格式为{cid,page,projectList}
    projectData: [],
    firstPage: 1,
    isLogin: app.globalData.isLogin
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.scroll = this.selectComponent('.scorllStyle')
    //请求导航数据
    this.getNavList()
  },

  /**
   * 获取导航数据
   */
  getNavList() {
    const that = this;
    api.getProjectTree()
      .then((res) => {
        const navList = res.data
        navList.sort(function(a, b) {
          return a.order - b.order
        })
        that.setData({
          navList: navList
        })
        //导航数据获取完毕后给第一个选项初始化一个下划线
        that.activeUnderline(0)
        that.refresh()
      })
  },

  //给当前active的导航选项添加下划线(参数是当前active选项的索引，从0开始)
  activeUnderline(index) {
    const that = this
    //获取当前导航选项的位置信息
    wx.createSelectorQuery().select(`#nav${index}`).boundingClientRect((res) => {
      if (!res) return;
      var left = parseInt(res.left) - 5
      const navScrollLeft = that.data.navScrollLeft
      if (navScrollLeft > 0) {
        left += navScrollLeft
      }
      that.setData({
        lineWidth: parseInt(res.width)
      })
      that.translateAnimate(left)
    }).exec()
  },

  translateAnimate(translateX) {
    const animate = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
      delay: 0
    });
    animate.translateX(translateX).step();
    this.setData({
      navAnimate: animate.export()
    });
  },

  /**
   * 点击导航
   */
  clickTab(e) {
    const index = e.target.dataset.index
    if (this.data.currentNavIndex !== index) {
      this.activeTab(index)
    }
  },

  activeTab(index) {
    const projectData = this.data.projectData
    this.setData({
      currentNavIndex: index,
      projectList: projectData[index].projectList
    });
    //给active的菜单选项设置下划线
    this.activeUnderline(index)
  },


  navScroll(e) {
    this.setData({
      navScrollLeft: e.detail.scrollLeft
    })
  },

  refresh() {
    const that = this
    const firstPage = that.data.firstPage
    const navList = that.data.navList
    const projectData = []
    for (var i = 0; i < navList.length; i++) {
      const item = {}
      item.page = firstPage
      item.cid = navList[i].id
      projectData[i] = item
      that.setData({
        projectData: projectData
      })
      //遍历请求项目列表
      that.requestProjectList(i)
    }
  },

  //请求项目列表
  requestProjectList(index) {
    const that = this
    const projectData = that.data.projectData
    let item = projectData[index]
    const firstPage = that.data.firstPage
    let cid
    if (item != null) {
      cid = item.cid
    } else {
      cid = that.data.navList[index].id
    }
    const page = item.page
    const srcProjectList = item ? [] : item.projectList
    api.getProjectList(page, cid)
      .then(result => {
        let projectList = result.data.datas
        projectList = srcProjectList.concat(projectList)
        item.cid = cid
        item.page = result.data.curPage
        item.projectList = projectList
        projectData[index] = item
        that.setData({
          projectData: projectData
        })
        //如果是在当前选项卡，刷新列表
        if (index == that.data.currentNavIndex) {
          that.setData({
            projectList: projectList
          })
        }
        //没有更多
        if (result.data.curPage === result.data.pageCount) {
          that.scroll.noMore()
        } else {
          that.scroll.resetFooter()
        }
        that.scroll.stopRefresh()
      }).catch(function(reason) {
        item.page = page === firstPage ? firstPage : page - 1
        projectData[index] = item
        that.setData({
          projectData: projectData
        })
        that.scroll.resetFooter()
        that.scroll.stopRefresh()
      })
  },

  loadmore() {
    const that = this
    const nav = that.data.navList[that.data.currentNavIndex]
    const cid = nav.id
    //请求项目列表
    that.requestProjectList(cid)
  },

  itemClick(e) {
    const url = e.currentTarget.dataset.url
    const title = e.currentTarget.dataset.title
    app.gotoWeb(url, title)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})