/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2017-12-06 18:57:22 
 * @Last Modified time: 2017-12-06 18:57:22 
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Layout, message, Select, BackTop } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../utils/config';
import logo from '../../public/images/theme_logo.svg';
import user from '../../public/images/vip.png';
import * as act from '../../redux/actions/login';
// import { MainMenu } from '../../utils/menu';
import { HeaderRoute, ContentRoute, UserRoute } from '../routes'
import styles from './index.css'
const { Header, Sider, Content, Footer } = Layout;

message.config({
    top: 50,
    duration: 1,
});
export class mainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            id: '',
            miniDropMenu: false,
            showHeader: false,
        };
        this.logOut = this.logOut.bind(this);
    }

    state = {
        collapsed: false,
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    componentWillReceiveProps(nextProps) {
        debugger;
        if (nextProps.msgTip !== this.props.msgTip) {
            if (nextProps.msgTip.type === 0)
                message.success(nextProps.msgTip.msg);
            else if (nextProps.msgTip.type === 1) {
                if (nextProps.msgTip.msg == "Request failed with status code 401") {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('usernInfo');
                    this.props.history.push('/login');
                    message.error('登陆信息已过期，请重新登陆');
                } else {
                    message.error(nextProps.msgTip.msg);
                }
            }
        }
        if (nextProps.location.pathname == '/writeAticle') {
            if (!this.state.showHeader) {
                this.setState({ showHeader: true });
            }
        } else {
            if (this.state.showHeader) {
                this.setState({ showHeader: false });
            }
        }
    }
    componentWillUpdate(nextProps) {

    }

    componentDidMount() {
        window.addEventListener('unload', this.handleUnload);
        if (this.props.location.pathname == '/writeAticle') {
            this.setState({ showHeader: true });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('unload', this.handleUnload);
    }

    handleUnload() {
        if (!(this.props.location.pathname == '/writeAticle')) {
            localStorage.removeItem('userInfo');
        }
    }

    showHeadBar = () => {
        let _self = this;
        this.setState({ miniDropMenu: !_self.state.miniDropMenu });
    }

    writeAticle = () => {
        if (JSON.parse(localStorage.getItem('userInfo'))) {
            let url;
            if (process.env.NODE_ENV === 'development') {
                url = 'http://localhost:8081/writeAticle';
            } else {
                url = 'http://www.chinaopensource.top:8081/writeAticle';
            }
            const w = window.open(url);
            // w.location.href = 'http://www.chinaopensource.top:8081/writeAticle'
        } else {
            message.info('请先登录！');
        }
    }

    backTop = () => {
        debugger;
        return this.refs.mainContent;
    }


    render() {
        debugger;
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        let userName = userInfo ? userInfo.loginName : '';
        // let userName = true;
        const HomePage = () => <div>Home Page</div>

        const miniDropMenu = (
            <ul className={styles.miniDropMenuList}>
                <li><i className="fa fa-compass"></i><Link to="/main" className={styles.Aa} onClick={this.loginOpt}>首页</Link> </li>
                <li><i className="fa fa-mobile" aria-hidden="true"></i><Link to="/downloadApp" className={styles.Aa} onClick={this.loginOpt}>下载APP</Link></li>
                <li><div className={styles.searchBox} >
                    <div style={{ display: 'flex' }}>
                        <input type="text" placeholder="你想要的..." />
                        <a href="" className={styles.searchGlass}><i className="fa fa-search" aria-hidden="true"></i></a>
                    </div>
                </div></li>
            </ul>)

        return (
            <section>
                <header>
                    <div className={styles.header}>
                        <a className={styles.headerTitle}>雕虫</a>
                        <div className={styles.headerContent}>
                            {!userName ? (<ul style={{ color: '#333 !important' }}>
                                <li><Link to="/main" style={{ color: '#333' }}><i className="fa fa-compass"></i> 首页</Link></li>
                                <li> <Link to="/downloadApp" style={{ color: '#333' }}><i className="fa fa-mobile" aria-hidden="true"></i>下载APP</Link></li>
                                <li><div className={styles.searchBox} >
                                    <div style={{ display: 'flex' }}>
                                        <input type="text" placeholder="你想要的..." />
                                        <a href="" className={styles.searchGlass}><i className="fa fa-search" aria-hidden="true"></i></a>
                                    </div>
                                </div></li>
                            </ul>) : (<ul>
                                <li><Link to="/main" style={{ color: '#333' }}>发现</Link></li>
                                <li><Link to="/forks" style={{ color: '#333' }}>关注</Link></li>
                                <li><Link to="/message" style={{ color: '#333' }}>消息</Link></li>
                                <li><div className={styles.searchBox} >
                                    <div style={{ display: 'flex' }}>
                                        <input type="text" placeholder="你想要的..." />
                                        <a href="" className={styles.searchGlass}><i className="fa fa-search" aria-hidden="true"></i></a>
                                    </div>
                                </div></li>
                            </ul>)}
                        </div>
                        <div className={styles.headBar}>
                            <Button href="" onClick={this.showHeadBar.bind(this)}>
                                <span style={{ fontSize: 16 }}>
                                    <i className="fa fa-bars" aria-hidden="true"></i>
                                    {this.state.miniDropMenu ? miniDropMenu : null}
                                </span>
                            </Button>
                        </div>
                        <div className="header_button" style={{ display: 'flex', alignItems: 'center' }}>
                            <a className={styles.Aa}>Aa</a>
                            {!userName ?
                                <span>
                                    <Link to={{ pathname: '/login', state: { opt: 'login' } }} className={styles.Aa} onClick={this.loginOpt}>登录</Link>
                                    <Button type="danger" ghost className="register"><Link to={{ pathname: '/login', state: { opt: 'register' } }}>
                                        <span>注册</span></Link></Button>
                                </span>
                                : <span className={styles.userSpan}>
                                    {<img src={user} alt="" className={styles.userImg} />}
                                    <span className={styles.dropFlag}></span>
                                    <ul className={styles.dropMenu}>
                                        <li><a><i className="fa fa-user" aria-hidden="true"></i><span>我的主页</span></a></li>
                                        <li><a><i className="fa fa-bookmark" aria-hidden="true"></i><span>收藏的文章</span></a></li>
                                        <li><a><i className="fa fa-heart" aria-hidden="true"></i><span>喜欢的文章</span></a></li>
                                        <li><Link to="/user/setting" style={{ color: '#333' }}><i className="fa fa-cog" aria-hidden="true"></i><span>设置</span></Link></li>
                                        <li><a onClick={this.logOut}><i className="fa fa-sign-out" aria-hidden="true"></i><span>退出</span></a></li>
                                    </ul>
                                </span>}
                            <Button type="danger" className="acticle" onClick={this.writeAticle}><i className="fa fa-pencil"></i>写文章</Button>
                        </div>
                    </div>
                </header>
                <article ref="mainContainer" style={this.state.showHeader ? { backgroundColor: '#f5f6f7' } : { paddingTop: 57, backgroundColor: '#fff' }}>
                    {/* <BackTop visibilityHeight={400} target={this.refs.mainContainer} /> */}
                    <div className={styles.content}>
                        <div className={styles.midContent}>
                            <HeaderRoute />
                        </div>
                    </div>
                </article>
                {!this.state.showHeader ? <footer className={styles.mainFooter}>
                    <div className={styles.footer}>
                        <div className={styles.infoRow1}>
                            <a href="">关于雕虫</a>
                            <em>·</em>
                            <a href="">联系我们</a>
                            <em>·</em>
                            <a href="">加入我们</a>
                            <em>·</em>
                            <a href="">雕虫出版</a>
                            <em>·</em>
                            <a href="">品牌与徽标</a>
                            <em>·</em>
                            <a href="">帮助中心</a>
                            <em>·</em>
                            <a href="">合作伙伴</a>
                        </div>
                        <div className={styles.infoRow2}>
                            <span>©2017-2020 合肥2B青年团队 / 雕虫 / 皖ICP备11018329号-5 / 皖公网安备31010402002252号 </span>
                        </div>
                    </div>
                </footer> : null}
            </section>
        );
    }

    logOut() {
        axios.get('system/login/signOut', config)
            .then(function (res) {
                if (res.data.code == 0) {
                    message.success('退出成功！');
                } else {
                    message.error('退出失败！');
                }
            })
            .catch(function (err) {
                message.error('退出失败！');
            })
        localStorage.removeItem('userInfo');
        this.props.history.push('/');
    }
}


function mapStateToProps(state) {
    return {
        userInfo: state.Login.userInfo,
        msgTip: state.MsgTip,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        submitClick: (param) => {
            dispatch(act.loginSubmit(param))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(mainPage);

