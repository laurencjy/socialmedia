import React, {useEffect} from 'react'
import './Posts.css'
import Post from './Post'
import {connect} from 'react-redux'
import {getItems,addItem,getFeed} from '../flux/actions/postActions'
import {clearErrors} from '../flux/actions/errorActions'
import {CustomModal } from './CustomModal'

function Posts({posts_data,getItems,error_data,clearErrors,auth}) {
     //post is object containing posts obj -> contains status and array of data and loading
   
      useEffect(() => {
        if(!auth.isAuthenticated)
            getItems()         
            }, [auth,getItems])
      


       //get status and array of data
        const {posts} = posts_data
        // console.log(posts);

    return (
        <div className="my-feed">
        <div className="create-post">
        {auth.isAuthenticated? <CustomModal clearErrors={clearErrors} error_data={error_data} status={"add"}/>:null}
        </div>
            {posts? posts.map((props, i)=>(<Post key={i} {...props}/>)) : null}
        </div>
    )
}


const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth: state.auth

})

export default connect(mapStateToProps, {getItems,clearErrors,addItem,getFeed})(Posts)