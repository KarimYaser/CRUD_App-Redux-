import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, deletePost, updatePost } from "../redux/postsSlice";

function Posts() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDesc, setUpdatedDesc] = useState("");
  const [isedit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);
  //   console.log(title, desc);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  return (
    <div>
      <div className="form">
        <input
          style={{
            margin: "2px",
            width: "200px",
            height: "40px",
            borderRadius: "2px",
            border: "1px solid #888",
          }}
          value={title}
          type="text"
          placeholder="Enter Post title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          style={{
            margin: "2px",
            width: "200px",
            height: "40px",
            borderRadius: "2px",
            border: "1px solid #888",
          }}
          value={desc}
          type="text"
          placeholder="Enter Post Desc"
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          onClick={() => {
            if (title != "" && desc != "") {
              dispatch(addPost({ id: posts.length + 1, title, desc }));
              setTitle("");
              setDesc("");
              console.log(posts);
              console.log(posts.length);
            } else {
              alert("Please enter all fields");
            }
          }}
        >
          Add Post
        </button>
      </div>
      <div className="Postss">
        {posts.length > 0
          ? posts.map((post) => {
              return (
                <div className="post" key={post.id}>
                  <h2>{post.title}</h2>
                  <p>{post.desc}</p>
                  <button
                    onClick={() => {
                      setIsEdit(true);
                      setId(post.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      dispatch(deletePost({ id: post.id }));
                    }}
                  >
                    Delete
                  </button>
                  <div className="edit">
                    {isedit && id == post.id && (
                      <>
                        <br />
                        <input
                          style={{
                            margin: "2px",
                            width: "200px",
                            height: "40px",
                            borderRadius: "2px",
                            border: "1px solid #888",
                          }}
                          onChange={(e) => setUpdatedTitle(e.target.value)}
                          type="text"
                          placeholder="updated Title"
                        />
                        <input
                          style={{
                            margin: "2px",
                            width: "200px",
                            height: "40px",
                            borderRadius: "2px",
                            border: "1px solid #888",
                          }}
                          onChange={(e) => setUpdatedDesc(e.target.value)}
                          type="text"
                          placeholder="updated Description"
                        />
                        <button
                          onClick={() => {
                            dispatch(
                              updatePost({
                                id: post.id,
                                title: updatedTitle,
                                desc: updatedDesc,
                              })
                            );
                            setIsEdit(false);
                          }}
                        >
                          Update
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          : "There is no posts"}
      </div>
    </div>
  );
}

export default Posts;
