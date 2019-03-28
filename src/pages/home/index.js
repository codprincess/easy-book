import React, { Component } from 'react';
import List from './components/List';
import Recommend from './components/Recommend';
import Topic from './components/Topic';
import Writer from './components/Writer';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import {
    HomeWrapper,
    HomeLeft,
    HomeRight,
    BackTop
} from './style';
class Home extends Component {

    handleScrollTop() {
		window.scrollTo(0, 0);
	}

    render() {
        return (
            <HomeWrapper>
                <HomeLeft>
                    <img alt='' className='banner-img' src="//upload.jianshu.io/admin_banners/web_images/4620/8ce28ed4656eaa9d606d92c60ba6a04e419cf39b.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" />
                    <Topic/>
                    <List/>
                </HomeLeft>
                <HomeRight>
                    <Recommend/>
                    <Writer/>
                </HomeRight>
               {this.props.showScroll? <BackTop onClick={this.handleScrollTop}>顶部</BackTop> :null}
            </HomeWrapper>
        );
    }

    componentDidMount(){
       this.props.changeHomeData();
       this.bindEvents();
    }

    //移除监听
    componentWillUnmount(){
        window.removeEventListener('scroll',this.props.changeScrollTopShow);
    }

    //监听高度变化
    bindEvents(){
        window.addEventListener('scroll',this.props.changeScrollTopShow);
    }

}

const mapState = (state)=>({
    showScroll:state.getIn(['home','showScroll'])
})

const mapDispatch = (dispatch)=>({
    changeHomeData(){
       // const action =actionCreators.getHomeInfo();
       dispatch(actionCreators.getHomeInfo());
    },

    changeScrollTopShow(){
        if(document.documentElement.scrollTop>100){
            dispatch(actionCreators.toggleTopShow(true))
        }else{
            dispatch(actionCreators.toggleTopShow(false))
        }
    }
})

export default connect(mapState,mapDispatch)(Home);