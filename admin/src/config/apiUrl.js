//网址
let ipUrl = 'http://127.0.0.1:7001/admin/';
let serverPath = {
    checkLogin : ipUrl + 'checkLogin', //检查用户名和密码
    getTypeInfo : ipUrl + 'getTypeInfo', //获得文章类别信息
    addArticle : ipUrl + 'addArticle', //添加文章接口
    updateArticle : ipUrl + 'updateArticle', //修改文章接口
    getArticleList : ipUrl + 'getArticleList', //获取文章列表接口
    deleteArticle : ipUrl + 'deleteArticle/', //删除文章接口
    getArticleById : ipUrl + 'getArticleById/', //根据id获得文章详情
}

export default serverPath;
