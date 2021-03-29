import axios from "axios";
import React, { useState } from "react";

const CommentCreate = ({ postId }) => {
const [content, SetContent] =useState('');


const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
        content
    });
    SetContent('');
}
  return (
    <div>
      
        <form onSubmit={onSubmit}>
        <div className="form-group m-2">
          <label>New Comment</label>
          <input value={content} onChange={e => SetContent(e.target.value)} className="form-control" />
          </div>
          <button className="btn btn-primary m-2">Submit</button>
        </form>
      
    </div>
  );
};

export default CommentCreate;
