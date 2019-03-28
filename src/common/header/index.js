import React, { Component } from 'react';
import {connect} from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import {HeaderWrapper,Logo,Nav,NavItem,NavSearch,Addition,Button,SearchInfo,SearchInfoTitle,SearchInfoSwtch,SearchInfoList,SearchInfoItem,SearchWrapper} from './style';
import {actionCreators}  from './store';
import { Link } from 'react-router-dom';
import { actionCreators as loginActionCreators } from '../../pages/login/store'
//无状态组件可以写成为


// const getListArea = (show)=>{
//     if(show){
//         return(
//             <SearchInfo>
//                 <SearchInfoTitle>
//                     热门搜索
//                     <SearchInfoSwtch>换一批</SearchInfoSwtch>
//                 </SearchInfoTitle>
//                 <SearchInfoList>
//                     <SearchInfoItem>教育</SearchInfoItem>
//                     <SearchInfoItem>教育</SearchInfoItem>
//                     <SearchInfoItem>教育</SearchInfoItem>
//                     <SearchInfoItem>教育</SearchInfoItem>
//                     <SearchInfoItem>教育</SearchInfoItem>
//                     <SearchInfoItem>教育</SearchInfoItem>
//                 </SearchInfoList>
//             </SearchInfo>
//         )
//     }else{
//         return null;
//     }
// }

// const Header = (props)=>{
//     return(
//         <HeaderWrapper>
//             <Logo></Logo>
//             <Nav>
//                 <NavItem className="left active">首页</NavItem>
//                 <NavItem className='left'>下载App</NavItem>
//                 <NavItem className='right'>登录</NavItem>
//                 <NavItem className='right'>
//                     <i className="iconfont">&#xe636;</i>
//                 </NavItem>
//                 <SearchWrapper>
//                     <CSSTransition
//                         in={props.focused}
//                         timeout={200}
//                         classNames="slide"
//                     >
//                         <NavSearch 
//                             onFocus={props.handleInputFocus} 
//                             onBlur={props.handleInputBlur}
//                             className={props.focused ? 'focused' :''}
//                         ></NavSearch>
//                     </CSSTransition>
//                     <i className={props.focused ? 'focused iconfont' :'iconfont'}>&#xe6e4;</i>
//                     {getListArea(props.focused)}
//                     {/* <SearchInfo>
//                         <SearchInfoTitle>
//                             热门搜索
//                             <SearchInfoSwtch>换一批</SearchInfoSwtch>
//                         </SearchInfoTitle>
//                         <SearchInfoList>
//                             <SearchInfoItem>教育</SearchInfoItem>
//                             <SearchInfoItem>教育</SearchInfoItem>
//                             <SearchInfoItem>教育</SearchInfoItem>
//                             <SearchInfoItem>教育</SearchInfoItem>
//                             <SearchInfoItem>教育</SearchInfoItem>
//                             <SearchInfoItem>教育</SearchInfoItem>
//                         </SearchInfoList>
//                     </SearchInfo> */}
//                 </SearchWrapper>
//             </Nav>
//             <Addition>
                
//                 <Button className="writting">
//                 <i className="iconfont">&#xe615;</i>
//                 写文章</Button>
//                 <Button className="reg">注册</Button>
//             </Addition>
//         </HeaderWrapper>
//     )
// }

class Header extends Component {
    getListArea=()=>{
        const newList = this.props.list.toJS();
        const pageList = [];
        //有数据的时候才循环
        if(newList.length){
            for(let i=(this.props.page-1)*10;i<this.props.page*10;i++){
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }
        
        if(this.props.focused || this.props.mouseIn){
            return(
                <SearchInfo 
                    onMouseEnter={this.props.handleMouseEnter}
                    onMouseLeave={this.props.handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwtch 
                            onClick={()=>this.props.handleChangePage(this.props.page,this.props.totalPage,this.spinIcon)}
                        >
                        <i ref={(icon)=>{this.spinIcon = icon}} className="iconfont spin">&#xe851;</i>
                        换一批</SearchInfoSwtch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {/* {
                            this.props.list.map((item)=>{
                                return  <SearchInfoItem key={item}>{item}</SearchInfoItem>
                            })
                        } */}
                        {pageList}
                    </SearchInfoList>
                </SearchInfo>
            )
        }else{
            return null;
        }
    }
    render() {
       // const {focused} = this.props;以后优化代码可以这样写，现在主要是看着简单易懂
        return (
            <HeaderWrapper>
                <Link to='/'>
                    <Logo></Logo>
               </Link>
               <Nav>
                   <NavItem className="left active">首页</NavItem>
                   <NavItem className='left'>下载App</NavItem>
                   {
						this.props.login ? 
							<NavItem onClick={this.props.logout} className='right'>退出</NavItem> : 
							<Link to='/login'><NavItem className='right'>登陆</NavItem></Link>
					}
                   <NavItem className='right'>
                        <i className="iconfont">&#xe636;</i>
                   </NavItem>
                   <SearchWrapper>
                       <CSSTransition
                            in={this.props.focused}
                            timeout={200}
                            classNames="slide"
                       >
                            <NavSearch 
                                onFocus={()=>this.props.handleInputFocus(this.props.list)} 
                                onBlur={this.props.handleInputBlur}
                                className={this.props.focused ? 'focused' :''}
                            ></NavSearch>
                        </CSSTransition>
                        <i className={this.props.focused ? 'focused iconfont zoom' :'iconfont zoom'}>&#xe6e4;</i>
                        {/* {getListArea(this.props.focused)} */}
                         { this.getListArea()}
                   </SearchWrapper>
               </Nav>
               <Addition>
                  <Link to='/write'>
                    <Button className="writting">
                    <i className="iconfont">&#xe615;</i>
                    写文章</Button>
                    </Link>
                    <Button className="reg">注册</Button>
               </Addition>
            </HeaderWrapper>
        );
    }
}



const mapStateToProps = (state)=>{
    return{
      focused:state.getIn(['header','focused']),
      list:state.getIn(['header','list']),
      page:state.getIn(['header','page']),
      mouseIn:state.getIn(['header','mouseIn']),
      totalPage:state.getIn(['header','totalPage']),
      login:state.getIn(['login','login'])
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        handleInputFocus(list){
            console.log(list.size);
           if(list.size ===0){
              dispatch(actionCreators.getList());
           }
            //控制搜索框的长短
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur(){
            dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter(){
            dispatch(actionCreators.mouseEnter());
        },
        handleMouseLeave(){
            dispatch(actionCreators.mouseLeave());
        },
        handleChangePage(page,totalPage,spin){
            let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
			if (originAngle) {
				originAngle = parseInt(originAngle, 10);
			}else {
				originAngle = 0;
			}
			spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';
           // console.log(page,totalPage);
            if(page<totalPage){
                dispatch(actionCreators.changePage(page+1));
            }else{
                dispatch(actionCreators.changePage(1));
            }
            
        },

        logout(){
            dispatch(loginActionCreators.logout());
        }

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Header);