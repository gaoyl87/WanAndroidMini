const ScrollState = {
  normal: 0, //初始状态
  headPull: 1, //往下拉的状态，高度小于headerRefreshHeight，此时还不能开启刷新
  proStay: 2, //往下拉的状态，高度大于headerRefreshHeight，此时已经开启刷新
  headStay: 3, //此时正在加载，头部固定，开启菊花转
  release: 4, //松开手，开始回弹的状态
};
const headerMaxHeight = 100; //header高度
const headerRefreshHeight = headerMaxHeight * 0.6; //下拉多高开始刷新

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //如果想自加属性，可以写在这里
    needLoadMore: { //是否开启loadmore
      type: Boolean,
      value: false,
    },
    emptyText: {
      type: String,
      value: '暂无相关数据'
    },
    scrollTop: Number
  },
  /**
   * 组件的初始数据
   */
  data: {
    interval: '', //计时器id，控制header回缩动画
    headerHeight: 0, //header高度，初始为0，不可见
    headIconUp: false, //控制header中箭头方向
    isLoading: false, //控制显示箭头还是菊花转
    headerRefreshH: headerRefreshHeight, //控制顶部的高度
    footerStatus: 2, //[0 不显示footer][1 点击加载更多][2 加载中][3 没有更多了]
    isEmpty: false, //有没有数据，控制空白数据显示
  },
  lifetimes: {
    created() {
      // 在组件创建的时候执行
      this.status = ScrollState.normal; //初始化header的状态
      this.sTouchY = 0; //初始化属性，记录每次触摸事件的起始位置
      this.animation = wx.createAnimation({
        duration: 3000,
        timingFunction: 'linear',
        delay: 150,
        transformOrigin: '50% 50% 0',
      });
    },
    attached() {
      // 在组件实例进入页面节点树时执行

    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
      this.status = ScrollState.normal;
      clearInterval(this.data.interval);
    },
  },


  /**
   * 组件的方法列表
   */
  methods: {
    //动态修改顶部
    headerViewScrollTo(height, speed, callback) {
      this.status = ScrollState.release;
      let that = this;
      clearInterval(that.data.interval)
      that.data.interval = setInterval(() => {
        let currentHeaderHeight = that.data.headerHeight;
        if (currentHeaderHeight > height) {
          that.setData({
            headerHeight: currentHeaderHeight - speed > height ? (currentHeaderHeight - speed) : height,
          });
        } else {
          clearInterval(that.data.interval);
          callback && callback();
        }
      }, 10);
    },
    //触摸开始：记录触摸开始位置
    onTouchStart(e) {
      this.sTouchY = e.touches[0].clientY;
      clearInterval(this.data.interval);
    },
    //触摸结束：判断位置，根据status来觉得是否开始加载或者回弹关闭
    onTouchEnd(e) {
      this.sTouchY = 0;
      let that = this;
      if (this.status == ScrollState.proStay) {
        this.setData({
          headIconUp: false,
          isLoading: true,
        });
        this.headerViewScrollTo(headerRefreshHeight, 7, () => {
          this.status = ScrollState.headStay;
          this.handleRefresh();
        });
      } else if (this.status == ScrollState.headPull) {
        this.headerViewScrollTo(0, 4, () => {
          this.status = ScrollState.normal;
        });
      }
    },
    /*
      监听下拉事件：下拉时，动态设置header的高度
      ps:监听scroll-view的bindtouchmove事件，在scroll-view的内容滚动时，
      也就是没达到顶部或者尾部的时候，触摸事件是会被内容消费掉的，所以在能
      获取到触摸事件的时候，一定是scroll-view到达了顶部或者尾部。
    */
    onTouchMove(e) {
      //这里如果想真实可以自己加下拉的阻尼效果
      let detY = (e.touches[0].clientY - this.sTouchY) * 0.4 + this.data.headerHeight;
      if (this.status == ScrollState.normal || this.status == ScrollState.headPull || this.status == ScrollState.proStay) {
        detY = detY > headerMaxHeight ? headerMaxHeight : (detY < 0 ? 0 : detY);
        if (detY >= headerRefreshHeight) {
          this.status = ScrollState.proStay;
          if (!this.data.headIconUp) {
            this.setData({
              headerHeight: detY,
              headIconUp: true
            })
          } else {
            this.setData({
              headerHeight: detY
            })
          }
        } else {
          this.status = ScrollState.headPull;
          if (this.data.headIconUp) {
            this.setData({
              headerHeight: detY,
              headIconUp: false
            })
          } else {
            this.setData({
              headerHeight: detY
            })
          }
        }
      }
      this.sTouchY = e.touches[0].clientY;
    },
    //回调刷新
    handleRefresh() {
      this.triggerEvent("onPullRefresh");
    },
    //对外暴露方法
    onScroll(e) {
      this.triggerEvent("onScroll", e.detail)
    },
    //回调加载更多
    onLoadMore() {
      if (this.data.footerStatus == 2) {
        this.triggerEvent("onLoadMore");
        this.setData({
          footerStatus: 2
        })
      }
    },
    stopRefresh() { //停止刷新
      this.headerViewScrollTo(0, 7, () => {
        this.status = ScrollState.normal;
        this.setData({
          isLoading: false,
          headIconUp: false,
          animation: '',
        })
      })
    },
    noMore() { //没有更多了
      this.setData({
        isEmpty: false,
        footerStatus: 3
      })
    },
    hideFooter() { //隐藏footer
      this.setData({
        isEmpty: false,
        footerStatus: 0
      })
    },
    resetFooter() { //重置footer
      this.setData({
        isEmpty: false,
        footerStatus: 2
      })
    },
    //数据为空的时候显示数据为空提示
    dataEmpty() {
      this.setData({
        isEmpty: true,
        footerStatus: 2
      })
    }
  }
})