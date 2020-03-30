//网址
let ipUrl = 'http://127.0.0.1:7001/default/';
let serverPath = {
    getArticleList : ipUrl + 'getArticleList',//首页接口
    getArticleById : ipUrl + 'getArticleById/', //详细页接口
    getTypeInfo : ipUrl + 'getTypeInfo', //获得文章类别接口
    getListById : ipUrl + 'getListById/'  //通过id获取文章列表
}

export default serverPath;
