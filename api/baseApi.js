"use strict";
import urls from "./urls";

const cookieName = 'cookie'

/**
 * 网络请求方法
 * @param {请求url} url  
 * @param {请求参数} data 
 * @param {请求方式GET, POST, HEAD, PUT, DELETE, TRACE, CONNECT} requestType 
 */
function request(url, data, requestType) {
  const that = this
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': loadCookie()
      },
      method: requestType, //OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        /*返回数据结构定义:
         * {
         *    "data": ...,
         *    "errorCode": 0,
         *    "errorMsg": ""
         * }
         */
        //success
        if (result.data.errorCode == 0) {
          //登录、注册成功后，需要保存cookie
          if (url.indexOf(urls.URL_LOGIN) !== -1 || url.indexOf(urls.URL_REGISTER) !== -1) {
            saveCookie(result.header['Set-Cookie'])
          }
          //登出后需要清除cookie
          else if (url.indexOf(urls.URL_LOGOUT) != -1) {
            clearCookie()
          }
          resolve(result.data)
        } else {
          reject(result.data)
          that.showToast(result.data.errorMsg)
        }
      },
      fail: (error) => {
        reject(error)
        that.showToast(error)
      }
    });
  })
}

/**
 * 网络请求方法
 * @param {请求url} url  
 * @param {请求参数} data 
 * @param {请求方式GET, POST, HEAD, PUT, DELETE, TRACE, CONNECT} requestType 
 */
function requestForGank(url, data, requestType) {
  const that = this
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': loadCookie()
      },
      method: requestType, //OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        /*返回数据结构定义:
         * {
         *    "error": ...,
         *    "results": ""
         * }
         */
        if (result.data.error === false) {
          resolve(result.data)
        } else {
          reject(result.data)
          that.showToast(result.data.errorMsg)
        }
      },
      fail: (error) => {
        reject(error)
        that.showToast(error)
      }
    });
  })
}

function showToast(msg) {
  wx.showToast({
    title: msg,
    icon: 'none'
  })
}

/**
 * 保存cookie到本地
 * @param {cookie缓存} cookie 
 */
function saveCookie(cookie) {
  wx.setStorageSync(cookieName, cookie)
}

/**
 * 读取cookie
 */
function loadCookie() {
  return wx.getStorageSync(cookieName)
}

/**
 * 清除cookie
 */
function clearCookie() {
  wx.removeStorageSync(cookieName);
}

module.exports = {
  request,
  requestForGank,
  loadCookie
}