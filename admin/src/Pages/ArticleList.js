import React,{useState,useEffect} from 'react';
import '../static/css/ArticleList.css'
import { List ,Row ,Col , Modal ,message ,Button,Switch} from 'antd';
import axios from 'axios'
import  serverPath  from '../config/apiUrl'
const { confirm } = Modal;

function ArticleList(props){

    const [list,setList]=useState([])
    useEffect(()=>{
        getList()
    },[])
    const getList = ()=>{
        axios({
            method : 'get',
            url : serverPath.getArticleList,
            withCredentials : true
        }).then(
            (res)=>{
                setList(res.data.list)
            }
        )
    }
    //删除文章的方法
    const delArticle = (id)=>{
        confirm({
            title : '确定要删除这篇博客文章嘛？',
            content : '如果你点击ok按钮，文章将永远删除，无法恢复！',
            onOk(){
                axios(serverPath.deleteArticle+id, {withCredentials : true})
                .then(
                    (res)=>{
                        message.success('文章删除成功');
                        getList()
                    }
                )
            },
            onCancel(){
                message.success('无操作')
            }
        })
    }

    //修改文章的跳转方法
    const updateArticle = (id)=>{
        props.history.push('/index/add/'+id);
    }


    return (
        <div>
             <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={4}>
                            <b>浏览量</b>
                        </Col>

                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                             {item.typeName}
                            </Col>
                            <Col span={4}>
                                {item.addTime}
                            </Col>
                            <Col span={4}>
                              {item.view_count}
                            </Col>

                            <Col span={4}>
                              <Button type="primary" onClick={()=>{updateArticle(item.id)}}>修改</Button>&nbsp;
                              <Button type='danger' onClick={()=>{delArticle(item.id)}}>删除 </Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
                />

        </div>
    )

}

export default ArticleList