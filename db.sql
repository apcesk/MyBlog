
SET NAME UTF8;
DROP DATABASE IF EXISTS react_blog;
CREATE DATABASE react_blog CHARSET=UTF8;
USE react_blog;

CREATE TABLE blog_content(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    type VARCHAR(255),
    introduce TEXT,
    content TEXT
);

INSERT INTO blog_content VALUES(null, '数据库测试文章', '测试类型', '文章介绍', '文章内容');