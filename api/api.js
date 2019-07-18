"use strict";
import baseApi from "./baseApi"
import urls from "./urls"
const util = require('../utils/util')

const GET = "GET"
const POST = "POST"

export default {
  /**
   * 获取首页最新文章列表
   * page:页码，拼接在链接上，从0开始。
   */
  getNewestArticleList(page) {
    return baseApi.request(urls.URL_NEWEST_ARTICAL_LIST.format({
      page: page
    }), null, GET)
  },

  /**
   * 获取首页banner
   */
  getBanner() {
    return baseApi.request(urls.URL_BANNER, null, GET)
  },

  /**
   * 获取常用网站
   */
  getFriendWebsite() {
    return baseApi.request(urls.URL_FRIEND_WEBSITE, null, GET)
  },

  /**
   * 获取搜索热词
   */
  getHotKey() {
    return baseApi.request(urls.URL_HOT_KEY, null, GET)
  },

  /**
   * 获取置顶文章
   */
  getTopArticle() {
    return baseApi.request(urls.URL_TOP_ARTICLE, null, GET)
  },

  /**
   * 获取知识体系
   */
  getKnowledgeTree() {
    return baseApi.request(urls.URL_KNOWLEDGE_TREE, null, GET)
  },

  /**
   * 获取指定知识体系下的文章列表
   * cid:分类的id，上述二级目录的id
   * page:页码，拼接在链接上，从0开始。
   */
  getKnowledgeTreeArticleList(page, cid) {
    return baseApi.request(urls.URL_KNOWLEDGE_TREE_ARTICLE_LIST.format({
      page: page
    }), {
      cid: cid
    }, GET)
  },

  /**
   * 获取导航数据
   */
  getNavi(page, cid) {
    return baseApi.request(urls.URL_NAVI, null, GET)
  },

  /**
   * 获取项目分类
   */
  getProjectTree() {
    return baseApi.request(urls.URL_PROJECT_TREE, null, GET)
  },

  /**
   * 获取项目列表
   * cid:分类的id，上述二级目录的id
   * page:页码，拼接在链接上，从1开始。
   */
  getProjectList(page, cid) {
    return baseApi.request(urls.URL_PROJECT_TREE_ARTICLE_LIST.format({
      page: page
    }), {
      cid: cid
    }, GET)
  },

  /**
   * 登录
   * @param {用户名} username 登录用户名
   * @param {密码} password 登录密码
   */
  login(username, password) {
    return baseApi.request(urls.URL_LOGIN, {
      username: username,
      password: password
    }, POST)
  },

  /**
   * 新用户注册
   * @param {用户名} username 用户名
   * @param {密码} password 密码
   * @param {确认密码} repassword 确认密码
   */
  register(username, password, repassword) {
    return baseApi.request(urls.URL_REGISTER, {
      username: username,
      password: password,
      repassword: repassword
    }, POST)
  },

  /**
   * 登出，需要清除cookie(已在BaseApi中实现)
   */
  logout() {
    return baseApi.request(urls.URL_LOGOUT, null, GET)
  },

  /**
   * 获取收藏的文章列表
   * page:页码，拼接在链接上，从1开始。
   */
  getCollectArticleList(page) {
    return baseApi.request(urls.URL_COLLECT_ARTICLE_LIST.format({
      page: page
    }), null, GET)
  },

  /**
   * 在文章列表中取消收藏
   * articleId:拼接在链接上
   */
  cancelCollectArticleInList(articleId) {
    return baseApi.request(urls.URL_CANCEL_COLLECT_ARTICLE_IN_LIST.format({
      articleId: articleId
    }), null, POST)
  },

  /**
   * 在我的收藏中取消收藏
   * articleId:拼接在链接上
   */
  cancelCollectArticleInMyCollect(articleId, originId) {
    return baseApi.request(urls.URL_CANCEL_COLLECT_ARTICLE_IN_MY_COLLECT.format({
      articleId: articleId
    }), {
      originId: originId
    }, POST)
  },

  /**
   * 收藏站内文章
   * @param {文章id} articleId 
   */
  collectInnerArticle(articleId) {
    return baseApi.request(urls.URL_COLLECT_INSIDE_ARTICLE.format({
      articleId: articleId
    }), null, POST)
  },

  /**
   * 收藏站外文章
   * @param {文章标题} title 
   * @param {文章作者} author 
   * @param {文章链接} link 
   */
  collectOuterArticle(title, author, link) {
    return baseApi.request(urls.URL_COLLECT_OUTSIDE_ARTICLE, {
      title: title,
      author: author,
      link: link
    }, POST)
  },

  /**
   * 搜索
   * @param {页码：拼接在链接上，从0开始。} page 
   * @param {搜索关键词} keyword 
   */
  query(page, keyword) {
    return baseApi.request(urls.URL_QUERY.format({
      page: page
    }), {
      k: keyword
    }, POST)
  },

  /**
   * 获取微信公众号列表
   */
  getWxChapterList() {
    return baseApi.request(urls.URL_WXCHAPTER_LIST, null, GET)
  },

  /**
   * 查看某个公众号的文章列表
   * @param {公众号id} id 
   * @param {页码：拼接在链接上，从1开始。} page 
   */
  getWxArticleList(id, page) {
    return baseApi.request(urls.URL_WXCHAPTER_ARTICLE_LIST.format({
      id: id,
      page: page
    }), null, GET)
  },

  /**
   * 在某个公众号中搜索文章
   * @param {公众号id} id 
   * @param {页码：拼接在链接上，从1开始。} page
   * @param {搜索关键词} keyword 
   */
  queryWxArticle(id, page, keyword) {
    return baseApi.request(urls.URL_WXCHAPTER_ARTICLE.format({
      id: id,
      page: page
    }), {
      k: keyword
    }, GET)
  },

  /**
   * 获取最新项目列表
   * @param {页码：拼接在链接上，从0开始。} page 
   */
  getNewestProjectList(page) {
    return baseApi.request(urls.URL_NEWEST_PROJECT_LIST.format({
      page: page
    }), null, GET)
  },

  getMeiziImage(page) {
    return baseApi.requestForGank(urls.URL_MEIZI_IMAGE.format({
      page:page
    }), null, GET)
  }
}