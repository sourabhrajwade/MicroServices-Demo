import React from 'react'


const CommentList = ({comments}) => {
    
    const renderedComments = comments.map(comment => {
        let content;
        if (content.status === 'approved' || 'Approved') {
            content = comment.content;
        }
        if (content.status === 'pending' || 'Pending') {
            content = 'This comment is awaiting moderation'
        }
        if (content.status === 'rejected' || 'Rejected') {
            content = 'This comment is rejected'
        }
        return <li key={comment.id}>{content}</li>
    })
    return (
        <ul>
         {renderedComments}   
        </ul>
    )
}

export default CommentList
