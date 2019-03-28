import * as constants from './constants';
import axios from 'axios';
import {fromJS} from 'immutable';

export const searchFocus = ()=>({
    // type:'search_focus'
    type:constants.SEARCH_FOCUS
});
export const searchBlur = ()=>({
    //type:'search_blur'
    type:constants.SEARCH_BLUR
});

export const mouseEnter = ()=>({
    type:constants.MOUSE_ENTER
});

export const mouseLeave = ()=>({
    type:constants.MOUSE_LEAVE
});

export const changePage = (page)=>({
    type:constants.CHANGE_PAGE,
    page
})

const changeList = (data)=>({
    type: constants.CHANGE_LIST,
    data:fromJS(data),
    totalPage:Math.ceil(data.length/10)
})

export const getList = ()=>{
    return (dispatch)=>{
       // console.log(123);
       axios.get('/api/headerList.json').then((res)=>{
            //console.log(res);
            const data = res.data;
            //console.log(data);
            // const action = {
            //     type:'change_list',
            //     data:data.data
            // }
            //const action = changeList(data.data);
            dispatch(changeList(data.data));
       }).catch(()=>{
           console.log('error');
       })
    }
}
