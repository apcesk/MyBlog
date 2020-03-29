import React from 'react'
import Head from 'next/head'
import {Col, Row, Breadcrumb, Affix} from 'antd'
import axios from 'axios'
import Header from '../components/Header'
import {CalendarFilled,FolderFilled,FireFilled} from '@ant-design/icons'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/details.css'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import serverPath from '../config/apiUrl'
const Details = (props) => {
  const tocify = new Tocify();
  const renderer = new marked.Renderer();

  renderer.heading = function(text, level, raw){
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="${anchor}" class="anchor-fix"><h${level}>${text}</h></a>`
  }

  marked.setOptions({
    renderer:renderer,
    gfm:true,//github format形式的代码
    pedantic:false,//纠正markdown
    sanitize:false,//是否忽略html标签
    tables:true,
    breaks:false,//是否可以有换行符
    smartLists:true,//自动列表样式
    highlight:function(code){
      return hljs.highlightAuto(code).value
    }
  })

  let html = marked(props.article_content);

  return (
    <div className="container">
      <Head>
        <title>Details</title>
      </Head>
      <Header />
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={14} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="/">视频列表</a></Breadcrumb.Item>
                <Breadcrumb.Item>文章名</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                React实战视频教程-apcesk小菜鸟更新第n集
              </div>
              <div className="list-icon center">
                <span><CalendarFilled />2020年3月23日14:06:34 </span>
                <span><FolderFilled />视频教程 </span>
                <span><FireFilled />1人 </span>
              </div>
              <div className="detailed-content"
                dangerouslySetInnerHTML={{__html:html}}
              >
                
              </div>
            </div>
          </div>

        </Col>
        <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav common-box">
              <div className="nav-title">文章目录</div>
              {tocify && tocify.render()}
            </div>
          </Affix>
        </Col>
      </Row>

      <Footer />

    </div>
  )
}

Details.getInitialProps = async (context)=>{
  // console.log(context.query.id);
  let id = context.query.id;
  const promise = new Promise((resolve)=>{
    axios(serverPath.getArticleById+id).then(
      (res)=>{
        // console.log(res);
        resolve(res.data.data[0]);
      }
    )
  })

  return await promise;
}

export default Details
