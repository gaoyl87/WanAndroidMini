import api from "../../api/api"

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle: "首页",
    bannerActiveIndicatorColor: app.globalData.mainThemeColor,
    bannerList: [],
    bannerHeight: 0,
    currentBannerIndex: 0,
    showBannerDot: true,
    bannerTextAnim: null,
    navTop: app.globalData.navHeight,
    isNavFixed: false,
    //当前选中的导航索引
    currentNavIndex: 0,
    //首页导航数据
    navList: ["最新文章", "最新项目"],
    //置顶文章
    topArticleList: [],
    //最新文章
    newestArticlePage: 0,
    newestArticleList: [],
    //最新项目
    newestProjectPage: 0,
    newestProjectList: [],
    //最新文章、最新项目列表的滚动距离
    listScrollTop: [0, 0],
    //记录列表滑动时距离顶部的距离
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    this.scroll = this.selectComponent('.scorllStyle')
    this.requestRemoteData()
    wx.createSelectorQuery().select("#banner").boundingClientRect((res) => {
      that.setData({
        bannerHeight: res.height
      })
    }).exec()
  },

  /**
   * 请求网络数据
   */
  requestRemoteData() {
    this.clearData()
    //获取轮播图列表
    this.getBannerList()
    //获取置顶文章列表
    this.getTopArticleList()
    //获取最新文章列表
    this.getNewestArticleList(0)
    //获取最新项目列表
    this.getNewestProjectList(0)
  },

  clearData() {
    this.setData({
      bannerList: [],
      //置顶文章
      topArticleList: [],
      //最新文章
      newestArticlePage: 0,
      newestArticleList: [],
      //最新项目
      newestProjectPage: 0,
      newestProjectList: [],
    })
  },

  //获取轮播图列表
  getBannerList() {
    const that = this
    api.getBanner()
      .then(result => {
        /**
         * desc: "Android高级进阶直播课免费学习"
          id: 22
          imagePath: "https://wanandroid.com/blogimgs/fbed8f14-1043-4a43-a7ee-0651996f7c49.jpeg"
          isVisible: 1
          order: 0
          title: "Android高级进阶直播课免费学习"
          type: 0
          url: "https://url.163.com/4bj"
         */
        const bannerList = result.data
        that.setData({
          bannerList: bannerList,
          // 8个item以下显示小圆点
          showBannerDot: bannerList.length <= 8
        })

      })
  },

  //获取置顶文章
  getTopArticleList() {
    const that = this
    api.getTopArticle()
      .then(result => {
        that.setData({
          topArticleList: result.data
        })
      })
  },

  //获取最新文章列表
  getNewestArticleList(page) {
    const that = this
    api.getNewestArticleList(page)
      .then(result => {
        let newestArticleList = result.data.datas
        newestArticleList = that.data.newestArticleList.concat(newestArticleList)
        that.setData({
          newestArticleList: newestArticleList,
          //后端返回的curPage比传入的page大1，是个bug
          newestArticlePage: result.data.curPage - 1
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
          newestArticlePage: page === 0 ? 0 : page - 1
        })
        that.scroll.resetFooter()
        that.scroll.stopRefresh()
      });
  },

  //获取最新项目列表
  getNewestProjectList(page) {
    const that = this
    api.getNewestProjectList(page)
      .then(result => {
        let newestProjectList = result.data.datas
        newestProjectList = that.data.newestProjectList.concat(newestProjectList)
        that.setData({
          newestProjectList: newestProjectList,
          newestProjectPage: result.data.curPage - 1
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
          newestProjectPage: page === 0 ? 0 : page - 1
        })
        that.scroll.resetFooter()
        that.scroll.stopRefresh()
      });
  },

  bannerChange(e) {
    this.setData({
      currentBannerIndex: e.detail.current
    })
  },

  /**
   * 点击单个banner图
   */
  clickBannerItem(event) {
    const url = event.currentTarget.dataset.item.url
    const title = event.currentTarget.dataset.item.title
    app.gotoWeb(url, title)
  },

  /**
   * 点击首页导航
   */
  clickTab(e) {
    const index = e.target.dataset.index
    if (this.data.currentNavIndex !== index) {
      this.activeTab(index)
    }
  },

  activeTab(index) {
    const data = this.data
    this.setData({
      currentNavIndex: index,
      scrollTop: data.listScrollTop[index]
    })
  },

  /**
   * 点击图标产生的事件
   */
  doClickLeft: function(event) {
    wx.navigateTo({
      url: '../search/search'
    });
  },
  _onScroll(e) {
    const that = this
    const scrollTop = e.detail.scrollTop
    const isFixed = scrollTop >= that.data.bannerHeight
    that.setData({
      isNavFixed: isFixed
    })

    const array = that.data.listScrollTop
    for (let i = 0; i < array.length; i++) {
      if (that.data.currentNavIndex === i) {
        array[i] = scrollTop
      } else {
        if (isFixed) {
          if (array[i] < that.data.bannerHeight) {
            array[i] = that.data.bannerHeight
          }
        } else {
          array[i] = scrollTop
        }
      }
    }
    that.setData({
      listScrollTop: array
    })
  },

  _refresh() {
    this.requestRemoteData()
  },
  _loadMore() {
    const that = this
    //最新文章
    if (that.data.currentNavIndex === 0) {
      that.getNewestArticleList(that.data.newestArticlePage + 1)
    }
    //最新项目
    else if (that.data.currentNavIndex === 1) {
      that.getNewestProjectList(that.data.newestProjectPage + 1)
    }
  },
  itemClick(event) {
    const url = event.detail.itemData.link
    const title = event.detail.itemData.title
    app.gotoWeb(url, title)
  }
})