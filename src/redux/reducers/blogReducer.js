
import initialState from "./initialState";
import * as actionTypes from "../Actions/actionTypes";


export function blogReducer(state=initialState.currentBlog, action){

     switch (action.type){

         case actionTypes.GET_BLOG_SUCCESS:
             return action.payload
         default :
             return state;


     }

}
// reducer bize o anki state'i döndürür
// Bir reducer tek bir state yönetir
