import React,{useState, useEffect} from 'react'
import marked from 'marked'
import '../static/css/AddArticle.css'
import axios from 'axios'
import {Row,Col,Input,Select,Button,DatePicker, message} from 'antd'
import serverPath from '../config/apiUrl'
const {Option} = Select
const {TextArea} = Input

function AddArticle(props){
    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState('请选择类型') //选择的文章类别
    useEffect(
        ()=>{
            getTypeInfo();
            //获取文章id
            let tmpId = props.match.params.id;
            if (tmpId){
                setArticleId(tmpId);
                getArticleById(tmpId)
            }
        }
    ,[])
    // markdown 配置
    marked.setOptions({
        renderer : new marked.Renderer(),
        gfm : true,
        pedantic : false,
        sanitize : false,
        tables : true,
        breaks : false,
        smartLists : true,
        smartypants : false

    })

    const changeContent = (e)=>{
        setArticleContent(e.target.value);
        let html = marked(e.target.value);
        setMarkdownContent(html);
    }

    const changeIntroduce = (e)=>{
        setIntroducemd(e.target.value);
        let html = marked(e.target.value);
        setIntroducehtml(html)
    }

    // 获得文章信息
    const getTypeInfo = ()=>{
        axios({
            method : 'get',
            url : serverPath.getTypeInfo,
            withCredentials : true //允许携带cookie进行跨域
        }).then(
            (res)=>{
                if (res.data.data === '请登陆！'){
                    localStorage.removeItem('openId');//清除session
                    props.history.push('/');
                }else{
                    setTypeInfo(res.data.data)
                }
            }
        )
    }
    //选择是触发的方法
    const selectTypeHandler = (value)=>{
        setSelectType(value)
    }
    //保存文章方法
    const saveArticle = ()=>{
        if (!selectedType){
            message.error('请选择文章类型');
            return false;
        }else if (!articleTitle){
            message.error('请输入文章标题');
            return false;
        }else if (!articleContent){
            message.error('文章内容不能为空');
            return false;
        }else if (!introducemd){
            message.error('文章简介不能为空');
            return false;
        }else if (!showDate){
            message.error('文章日期不能为空');
            return false;
        }
        let dataProps = {};
        dataProps.type_id = selectedType;
        dataProps.title = articleTitle;
        dataProps.article_content = articleContent;
        dataProps.introduce = introducemd;
        let dateText = showDate.replace('-','/');
        dataProps.addTime = (new Date(dateText).getTime()) / 1000;
        console.log(dataProps)
        //判断文章是保存还是要修改
        if (articleId === 0){
            dataProps.view_count = 0;
            axios({
                method : 'post',
                url : serverPath.addArticle,
                data : dataProps,
                withCredentials : true
            }).then(
                (res)=>{
                    setArticleId(res.data.insertId);
                    if (res.data.isSuccess){
                        message.success('文章保存成功');
                    }else{
                        message.error('文章保存失败');
                    }
                }
            )
        }else{
            dataProps.id = articleId;
            axios({
                method : 'post',
                url : serverPath.updateArticle,
                data : dataProps,
                withCredentials : true
            }).then(
                (res)=>{
                    if (res.data.isSuccess){
                        message.success('文章修改成功');
                    }else{
                        message.error('文章修改失败');
                    }
                }
            )
        }


    }
    //查找文章
    const getArticleById = (id)=>{
        axios(serverPath.getArticleById+id, {withCredentials:true})
        .then(
            (res)=>{
                let articleInfo = res.data.data[0];
                console.log(articleInfo);
                setArticleTitle(articleInfo.title);
                setArticleContent(articleInfo.article_content);
                let html = marked(articleInfo.article_content);
                setArticleContent(articleInfo.article_content)
                setMarkdownContent(html);
                setIntroducemd(articleContent.introduce);
                let tmpInt = marked(articleInfo.article_content);
                setIntroducehtml(tmpInt)
                setIntroducemd(articleInfo.introduce)
                setShowDate(articleInfo.addTime)
                setSelectType(articleInfo.typeId)
            }
        )
    }
    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input 
                                value={articleTitle}
                                placeholder="博客标题"
                                size="large"
                                onChange={(e)=>{setArticleTitle(e.target.value)}}
                            />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item, index)=>{
                                        return (
                                            <Option key={index} value={item.Id}>
                                                {item.typeName}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                placeholder="在这写markdown语法文章内容" 
                                value={articleContent}
                                onChange={changeContent}
                                />
                        </Col>
                        <Col span={12}>
                            <div className="show-html"
                                dangerouslySetInnerHTML={{__html:markdownContent}}
                            >
                                
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <br />
                        </Col>
                        <Col span={24}>
                            <TextArea
                                rows={4}
                                placeholder="文章简介"
                                onChange={changeIntroduce}
                                value={introducemd}
                            />
                            <br />
                            <br />
                            <div className="introduce-html"
                                dangerouslySetInnerHTML={{__html:introducehtml}}
                            ></div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker 
                                    onChange={(date, dateString)=>{setShowDate(dateString);console.log(dateString)}}
                                    placeholder="发布日期"
                                    size="large"
                                />
                            </div>
                        </Col>
                        <Col span={12}></Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}


export default AddArticle