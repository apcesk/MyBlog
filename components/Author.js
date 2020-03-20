// 制作右侧作者相关的栏目条
import {Avatar, Divider} from 'antd'
import '../static/style/components/Author.css'
import {QqCircleFilled, GithubFilled, WechatFilled} from '@ant-design/icons'
const Author = ()=>{

    return (
        <div className="author-div common-box">
            <div>
                <Avatar size={100} src="https://image.baidu.com/search/detail?ct=503316480&z=&tn=baiduimagedetail&ipn=d&word=%E8%8F%9C%E9%B8%9F%E5%A4%B4%E5%83%8F&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&hd=&latest=&copyright=&cs=3745413664,2330510497&os=3018799827,3187652296&simid=3389016413,218208338&pn=4&rn=1&di=94600&ln=1090&fr=&fmq=1584695562819_R&ic=&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=http%3A%2F%2Fimg31.mtime.cn%2FCMS%2FNews%2F2015%2F02%2F16%2F223010.75888844_620X620.jpg&rpstart=0&rpnum=0&adpicid=0&force=undefined" />
            </div>
            <div className="author-introduction">
                一个非常喜欢conding的小白
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<GithubFilled />} className="account" />
                <Avatar size={28} icon={<QqCircleFilled />} className="account" />
                <Avatar size={28} icon={<WechatFilled />} className="account" />    
            </div>
        </div>
    )
}

export default Author