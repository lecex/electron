
let baseUrl = document.getElementsByTagName('meta')['baseUrl'].getAttribute('content')
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://127.0.0.1:8080/'
}
module.exports = {

  title: 'App Desk',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  baseUrl: baseUrl
}
