import React from 'react'
import {Card, Button,Form, Image, ListGroup, Col, Row} from 'react-bootstrap';
import Moment from 'react-moment';
import {uncommentPost} from '../flux/actions/postActions'
import './Comment.css'
import {connect} from 'react-redux'

export function Comment({comment, postId, uncommentPost}) {
    return (
        <ListGroup.Item className="border-0">
        <div className="comment-header">
            <div className="comment-image"><Image className="pr-1" src="logo512.png" rounded/></div>
            <div>
            {comment.postedBy.name}&nbsp;&nbsp;<small className="text-muted"><Moment format="DD-MM-YYYY HH:mm">{comment.created}</Moment></small>
            <br/>
            {comment.text}
            </div>
            <div className="remove-comment">
                <p onClick={()=>uncommentPost(postId, comment._id)}>x</p>
            </div>
        </div>
  
        
        </ListGroup.Item>
      
        
    )
}


const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data
  
  })

export default connect(mapStateToProps,{uncommentPost})(Comment)
