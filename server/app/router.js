'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  
  require('./router/default')(app);
  require('./router/admin')(app);
  
};
// RESTful  APP 前后端 简单和约束性
// 请求方式 get-获取资源 post-新建资源 put-更新资源 delete-删除资源
