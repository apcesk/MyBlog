'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
      // let result = await this.app.mysql.get("blog_content",{});
      // console.log(result)
      this.ctx.body = 'hi api';
      
  }
  async getArticleList(){
    let sql = 'SELECT article.id as id ,'+
              'article.title as title ,'+
              'article.introduce as introduce ,'+
              'FROM_UNIXTIME(article.addTime, "%Y-%m-%s %H-%i-%s") as addTime ,'+
              'article.view_count as view_count ,'+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.id;'
    const results = await this.app.mysql.query(sql);
    //请求后返回的result是一个数组；
    this.ctx.body = {data:results};
  }

  async getArticleById(){
    let id = this.ctx.params.id;
    console.log(this.ctx)
    let sql = 'SELECT article.id as id ,'+
              'article.title as title ,'+
              'article.introduce as introduce ,'+
              'article.article_content as article_content ,'+
              'FROM_UNIXTIME(article.addTime, "%Y-%m-%s %H-%i-%s") as addTime ,'+
              'article.view_count as view_count ,'+
              'type.typeName as typeName ,'+
              'type.id as typeId '+
              'FROM article LEFT JOIN type ON article.type_id = type.id '+
              'where article.id='+id;

    const result = await this.app.mysql.query(sql);

    this.ctx.body = {data:result};
  }
  //得到类别名称和编号

  async getTypeInfo(){
    const result = await this.app.mysql.select('type');
    this.ctx.body = {data:result}
  }

  //根据类别id获取文章列表
  async getListById(){
    //-----
    let id = this.ctx.params.id;
    let sql = 'SELECT article.id as id ,'+
              'article.title as title ,'+
              'article.introduce as introduce ,'+
              'FROM_UNIXTIME(article.addTime, "%Y-%m-%s %H-%i-%s") as addTime ,'+
              'article.view_count as view_count ,'+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.id '+
              'WHERE type_id = ' + id;
    const results = await this.app.mysql.query(sql);
    //------
    //请求后返回的result是一个数组；
    this.ctx.body = {data:results};

  }

}

module.exports = HomeController;
