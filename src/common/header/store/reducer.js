import * as constants from './constants';
import {fromJS} from 'immutable';
//创建reducer
// const defaultState = {
//     //将之前的数据放在这里
//     focused:false
// };

//利用immutable转换数据对象

const defaultState = fromJS({
    focused:false,
    mouseIn:false,
    list:[],
    page:1,
    totalPage:1
})

//优化代码
export default (state=defaultState,action)=>{
    switch(action.type){
        case constants.SEARCH_FOCUS:
            return state.set('focused',true);
        case constants.SEARCH_BLUR:
            return state.set('focused',false);
        case constants.CHANGE_LIST:
            // return state.set('list',action.data).set('totalPage',action.totalPage);
            //优化对于多个数据的时候可以用merge
            return state.merge({
                list:action.data,
                totalPage:action.totalPage
            })
        case constants.MOUSE_ENTER:
            return state.set('mouseIn',true);
        case constants.MOUSE_LEAVE:
            return state.set('mouseIn',false);
        case constants.CHANGE_PAGE:
            return state.set('page',action.page);
        default:
            return state;
    }
}

// export default (state =defaultState,action )=>{
//     if(action.type===constants.SEARCH_FOCUS){
//         //immutable对象的set方法，会结合之前immutable对象的值
//         //和设置的值，返回一个全新的对象
//         return state.set('focused',true);
//         // return{
//         //     focused:true
//         // }
//     }

//     if(action.type===constants.SEARCH_BLUR){
//         return state.set('focused',false);
//         // return{
//         //     focused:false
//         // }
//     }
//     if(action.type === constants.CHANGE_LIST){
//         console.log(action);
//         return state.set('list',action.data);
//     }
//     return state;
// }
