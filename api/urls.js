"use strict"
/**
 * 全局url
 */
const BASE_URL = "https://www.wanandroid.com"

/**
 * 返回数据结构定义:
 * {
 *    "data": ...,
 *    "errorCode": 0,
 *    "errorMsg": ""
 * }
 * errorCode = 0 代表执行成功，不建议依赖任何非0的errorCode。
 * errorCode = -1001 代表登录失效，需要重新登录。
 */
export default {
  /**
   * 首页最新文章列表
   * page:页码，拼接在连接中，从0开始。
   */
  URL_NEWEST_ARTICAL_LIST: BASE_URL + "/article/list/{page}/json",
  /**
   * 首页banner
   */
  URL_BANNER: BASE_URL + "/banner/json",
  /**
   * 常用网站
   */
  URL_FRIEND_WEBSITE: BASE_URL + "/friend/json",
  /**
   * 搜索热词
   * 即目前搜索最多的关键词。
   */
  URL_HOT_KEY: BASE_URL + "/hotkey/json",
  /**
   * 置顶文章
   */
  URL_TOP_ARTICLE: BASE_URL + "/article/top/json",
  /**
   * 知识体系数据
   */
  URL_KNOWLEDGE_TREE: BASE_URL + "/tree/json",
  /**
   * 知识体系下的文章
   * cid:分类的id，上述二级目录的id
   * page:页码，拼接在链接上，从0开始。
   */
  URL_KNOWLEDGE_TREE_ARTICLE_LIST: BASE_URL + "/article/list/{page}/json",
  /**
   * 导航数据
   */
  URL_NAVI: BASE_URL + "/navi/json",
  /**
   * 项目分类
   */
  URL_PROJECT_TREE: BASE_URL + "/project/tree/json",
  /**
   * 项目列表数据
   * cid:分类的id，上述二级目录的id
   * page:页码，拼接在链接上，从1开始。
   */
  URL_PROJECT_TREE_ARTICLE_LIST: BASE_URL + "/project/list/{page}/json",
  /**
   * 登录
   * 登录后会在cookie中返回账号密码，只要在客户端做cookie持久化存储即可自动登录验证。
   * 方法:POST
   * 参数:username,password
   */
  URL_LOGIN: BASE_URL + "/user/login",
  /**
   * 注册
   * 方法:POST
   * 参数:username,password,repassword
   */
  URL_REGISTER: BASE_URL + "/user/register",
  /**
   * 登出
   * 访问了logout后，服务端会让客户端清除Cookie（即cookie max-Age=0），如果客户端Cookie实现合理，可以实现自动清理，如果本地做了用户账号密码和保存，及时清理。
   */
  URL_LOGOUT: BASE_URL + "/user/logout/json",
  /**
   * 收藏文章列表
   * page:页码，拼接在链接中，从0开始。
   */
  URL_COLLECT_ARTICLE_LIST: BASE_URL + "/lg/collect/list/{page}/json",
  /**
   * 收藏站内文章
   */
  URL_COLLECT_INSIDE_ARTICLE: BASE_URL + "/lg/collect/{articleId}/json",
  /**
   * 收藏站外文章
   * title:文章标题
   * author:文章作者
   * link:文章链接
   */
  URL_COLLECT_OUTSIDE_ARTICLE: BASE_URL + "/lg/collect/add/json",
  /**
   * 搜索
   * page:页码，拼接在链接上，从0开始。
   * k:搜索关键词
   */
  URL_QUERY: BASE_URL + "/article/query/{page}/json",
  /**
   * 获取公众号列表
   */
  URL_WXCHAPTER_LIST: BASE_URL + "/wxarticle/chapters/json",
  /**
   * 查看某个公众号历史数据
   * 公众号ID:拼接在 url 中，eg:405
   * 公众号页码:拼接在url 中，eg:1
   */
  URL_WXCHAPTER_ARTICLE_LIST: BASE_URL + "/wxarticle/list/{id}/{page}/json",
  /**
   * 在某个公众号中搜索历史文章
   * k:字符串，eg:Java
   * 公众号ID:拼接在 url 中，eg:405
   * 公众号页码:拼接在url 中，eg:1
   */
  URL_WXCHAPTER_ARTICLE: BASE_URL + "/wxarticle/list/{id}/{page}/json",
  /**
   * 首页最新项目列表
   * 按时间分页展示所有项目
   * page:页码，拼接在连接中，从0开始。
   */
  URL_NEWEST_PROJECT_LIST: BASE_URL + "/article/listproject/{page}/json",

  /**
   * 在文章列表中取消收藏
   */
  URL_CANCEL_COLLECT_ARTICLE_IN_LIST: BASE_URL + "/lg/uncollect_originId/{articleId}/json",
  /**
   * 在我的收藏中取消收藏
   */
  URL_CANCEL_COLLECT_ARTICLE_IN_MY_COLLECT: BASE_URL + "/lg/uncollect/{articleId}/json",

  URL_MEIZI_IMAGE: "https://gank.io/api/data/福利/20/{page}"
}