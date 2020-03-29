// 栅格化系统--antd
import React , {useEffect, useState}from 'react';
import '../static/style/components/Header.css'
import {Row,Col,Menu, Icon} from 'antd'
import MenuItem from 'antd/lib/menu/MenuItem';
import {HomeFilled,VideoCameraFilled,TableOutlined} from '@ant-design/icons'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import serverPath from '../config/apiUrl'
import MyIcon from '../config/createIcon'

const Header = ()=>{
    const [navArr, setNavArr] = useState([]);
    /**/useEffect(()=>{
        const fetchData = async ()=>{
            const result = await axios(serverPath.getTypeInfo).then(
                (res)=>{
                    return res.data.data
                }
            )
            setNavArr(result);
        }
        fetchData();
    },[]);
    const handleClick = (e)=>{
        if(e.key == 0){
            Router.push('/index')
        }else{
            Router.push('/list?id='+e.key)
        }
    }
    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">
                        apcesk
                    </span>
                    <span className="header-text">
                        一个自学编程的apcesk
                    </span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="home">
                            <HomeFilled />
                            首页
                        </Menu.Item>
                        {
                            navArr.map((item)=>{
                                // 自己创建一个antd图标
                                return (
                                    // 遇到了问题，无法将antd4.0的版本图标使用从数据库读取出来的样子进行渲染
                                    <Menu.Item key={item.id}>
                                        <MyIcon iconType={item.icon} />
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header