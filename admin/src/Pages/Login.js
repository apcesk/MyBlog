import React, {useState} from 'react'
import 'antd/dist/antd.css'
import {Card, Input, Button, Spin,message} from 'antd'
import {UserAddOutlined, KeyOutlined} from '@ant-design/icons'
import '../static/css/Login.css'
import axios from 'axios'
import serverPath from '../config/apiUrl'
function Login(props){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const checkLogin = ()=>{
        setIsLoading(true);
        if (!userName){
            message.error('用户名不能为空');
            setTimeout(()=>{setIsLoading(false);}, 500)
            return false;
        }else if(!password){
            message.error('密码不能为空');
            setTimeout(()=>{setIsLoading(false);}, 500)
            return false;
        }
        let dataProps = {
            'userName' : userName,
            'password' : password
        }
        axios({
            method : 'post',
            url : serverPath.checkLogin,
            data : dataProps,
            withCredentials : true //前后端共享session
        }).then(
            (res)=>{
                console.log(res)
                setIsLoading(false);
                if (res.data.data === '登陆成功'){
                    localStorage.setItem('openId', res.data.openId);
                    props.history.push('/index');
                }else{
                    console.log(res);
                    message.error('用户名或密码错误'); 
                    setTimeout(()=>{setIsLoading(false);}, 500)
                }
            }
        )
    }
    
    
    return (
        <div className="login-div">
            <Spin tip='Loading...' spinning={isLoading}>
                <Card title="Apcesk blog System" bordered={true} style={{width:400}}>
                    <Input 
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<UserAddOutlined style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setUserName(e.target.value)}}
                    />
                    <br />
                    <br />
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<KeyOutlined style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <br />
                    <br />
                    <Button type='primary' size='large' block onClick={checkLogin}>Login in</Button>
                </Card>
            </Spin>
        </div>
    )
}


export default Login;