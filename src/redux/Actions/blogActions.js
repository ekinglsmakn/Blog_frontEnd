import * as actionTypes from "./actionTypes";
import { createTheme } from '@material-ui/core/styles'

// type's adı
export function getBlogSuccess(blog) {

    return {
        type: actionTypes.GET_BLOG_SUCCESS,
        payload: blog
    }
}


export function getBlogs(blog) {

    return function (dispatch) {
        let url = "http://localhost:8080/api/blog/tumunuGetir"
        return fetch(url, {
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },

                body: JSON.stringify(blog)
            }
        )
            .then(response => response.json())
            .then(result => dispatch(getBlogSuccess(result)))

    }
}
