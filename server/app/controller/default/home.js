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
              'article.addTime as addTime ,'+
              'article.view_count as view_count ,'+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.id;'
    const results = await this.app.mysql.query(sql);
    //请求后返回的result是一个数组；
    this.ctx.body = results;
  }

}

module.exports = HomeController;
