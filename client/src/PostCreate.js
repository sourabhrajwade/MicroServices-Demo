import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
      event.preventDefault();

      await axios.post('http://localhost:4000/posts', {
          title
      });

      setTitle('');
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group m-2">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          ></input>
        </div>
        <div className="form-group m-2">
        <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
