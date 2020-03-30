import React,{useState, useEffect} from 'react'
import Head from 'next/head'
import {Col, Row, List, Breadcrumb} from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import {CalendarFilled, FolderFilled, FireFilled} from '@ant-design/icons'
import axios from 'axios'
import serverPath from '../config/apiUrl'
import Link from 'next/link'

const myList = (list) => {

  
  const[myList,setMyList] = useState(list.data)

  useEffect(()=>{
    setMyList(list.data)
  })


  return (
    <div className="container">
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={14} xl={14}>
          {/* 面包屑导航 */}
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                视频教程
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List 
            // header为列表设置头部
            header={<div>最新日志</div>}
            itemLayout="vertical"
            //数据源
            dataSource={myList}
            //渲染
            renderItem={(item)=>(
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname:'/details', query:{id:item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                {/* 图标展示区域 */}
                <div className="list-icon">
                  <span>{/* 日历图标 */}<CalendarFilled />{/* 时间日期 */} {item.addTIme} </span> 
                  <span>{/* 文件夹图标 */}<FolderFilled /> {item.typeName} </span> 
                  <span><FireFilled /> {item.view_count} </span>
                </div>
                <div className="list-context">
                  {item.introduce}
                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}


myList.getInitialProps = async (context)=>{
  let id = context.query.id
  const promise = new Promise((resolve)=>{
    //默认使用get方法
    axios(serverPath.getListById + id).then(
      (res)=>{
        // console.log('-->',res.data);
        resolve(res.data);
      }
    )
  })
  // console.log(promise);
  return await promise;
}

export default myList
