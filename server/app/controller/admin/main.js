'use strict';
const Controller = require('egg').Controller;

class MainController extends Controller{

    async index(){
        this.ctx.body = "hi api";
    };

    async checkLogin(){
        let userName = this.ctx.request.body.userName;
        let password = this.ctx.request.body.password;
        const sql = "SELECT userName FROM admin_user WHERE userName = '" + userName + "' AND password = '" + password + "' "
        const res = await this.app.mysql.query(sql);
        console.log(res,'-----1')
        if (res.length){
            let openId = new Date().getTime();
            this.ctx.session.openId = {'openId' : openId};
            this.ctx.body = {'data' : '登陆成功', 'openId' : openId};
            console.log(this.ctx.session);
        }else{
            this.ctx.body = {'data' : '登陆失败'};
        }
    }
    // 获取类型信息
    async getTypeInfo(){
        const resType = await this.app.mysql.select(
            'type'
        );
        this.ctx.body = {data:resType};
    }

    //添加文章
    async addArticle(){

        //取得前台的数据
        let tmpArticle = this.ctx.request.body;
        const result = await this.app.mysql.insert('article', tmpArticle);
        const insertSuccess = result.affectedRows === 1;
        const insertId = result.insertId;

        this.ctx.body = {
            isSuccess : insertSuccess,
            insertId : insertId
        }

    }


    //修改文章
    async updateArticle(){
        let tmpArticle = this.ctx.request.body;

        const result = await this.app.mysql.update('article', tmpArticle);
        const updateSuccess = result.affectedRows === 1;
        this.ctx.body = {
            isSuccess : updateSuccess
        }
    }

    //获得文章列表
    async getArticleList(){
        let sql = 'SELECT article.id as id ,'+
                    'article.title as title ,'+
                    'article.introduce as introduce ,'+
                    'FROM_UNIXTIME(article.addTime, "%Y-%m-%s %H-%i-%s") as addTime ,'+
                    'article.view_count as view_count ,'+
                    'type.typeName as typeName '+
                    'FROM article LEFT JOIN type ON article.type_id = type.id '+
                    'ORDER BY article.id DESC'
        
        const resList = await this.app.mysql.query(sql);
        this.ctx.body = {list:resList}
    }

    //删除文章
    async deleteArticle(){
        let id = this.ctx.params.id;
        const res = await this.app.mysql.delete('article',{'id' : id});
        this.ctx.body = {data : res};
    }

    //根据id获得文章内容
    async getArticleById(){
        let id = this.ctx.params.id;
        let sql =  'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.article_content as article_content,'+
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName ,'+
        'type.id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE article.id='+id
        const res = await this.app.mysql.query(sql);
        this.ctx.body = {data:res}
    }

};
module.exports = MainController