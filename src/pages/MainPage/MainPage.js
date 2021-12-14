import React, { useState, useRef } from "react";

import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";
import Post from "../../Components/Post/Post";

import "./MainPage.css";

function MainPage() {
  const [openAddPost, setOpenAddPost] = useState(false);
  const [isOpenDetails, setIsOpenDetails] = useState({});
  const [openDetails, setOpenDetails] = useState(false);

  const [edit, setEdit] = useState(false);
  const [editDetails, setEditDetails] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [postsArr, setPostsArr] = useState(
    JSON.parse(localStorage.getItem("posts")) || []
  );
  const titleRef = useRef();
  const categoryRef = useRef();
  const contentRef = useRef();

  const deletePost = (id) => {
    if (!id) return;
    const dummyPosts = [...postsArr];
    const index = dummyPosts.findIndex((post) => post.id === id);
    if (index !== -1) {
      dummyPosts.splice(index, 1);
      setPostsArr(dummyPosts);
      localStorage.setItem("posts", JSON.stringify(dummyPosts));
    }
  };

  const editPost = (id) => {
    if (!id) return;
    const dummyPosts = [...postsArr];
    const index = dummyPosts.findIndex((post) => post.id === id);
    setOpenAddPost(true);
    setEdit(true);
    const post = dummyPosts[index];
    setEditDetails(post);
  };

  const saveEditPost = () => {
    if (
      !titleRef.current.value ||
      !categoryRef.current.value ||
      !contentRef.current.value
    ) {
      setErrorMsg("Enter required Details");
      return;
    }
    const dummyPosts = [...postsArr];
    const index = dummyPosts.findIndex((post) => post.id === editDetails.id);
    let editingPost = dummyPosts[index];
    editingPost = {
      id: editDetails.id,
      title: titleRef.current.value,
      category: categoryRef.current.value,
      content: contentRef.current.value,
    };
    dummyPosts.splice(index, 1, editingPost);
    setPostsArr(dummyPosts);
    setOpenAddPost(false);
    setEdit(false);
    setEditDetails({});
    localStorage.setItem("posts", JSON.stringify(dummyPosts));
  };

  const addPost = () => {
    if (
      !titleRef.current.value ||
      !categoryRef.current.value ||
      !contentRef.current.value
    ) {
      setErrorMsg("Enter required Details");
      return;
    }
    setErrorMsg("");
    const dummyPosts = [...postsArr];
    const newPost = {
      id: Math.floor(Math.random() + Date.now()),
      title: titleRef.current.value,
      category: categoryRef.current.value,
      content: contentRef.current.value,
    };
    dummyPosts.push(newPost);
    setPostsArr(dummyPosts);
    localStorage.setItem("posts", JSON.stringify(dummyPosts) || []);
    setOpenAddPost(false);
  };

  const openDetailsHandler = (id) => {
    if (!id) return;
    const dummyPosts = [...postsArr];
    const index = dummyPosts.findIndex((post) => post.id === id);
    setIsOpenDetails(true);
    setOpenDetails({
      title: dummyPosts[index]?.title,
      category: dummyPosts[index].category,
      content: dummyPosts[index].content,
    });
  };

  return (
    <div className="main-page">
      <div className="navbar">
        <h2>Blog Post App</h2>
        <Button text={`Add New Post`} onClick={() => setOpenAddPost(true)} />
      </div>
      <h2 className="main-page-post-heading">Posts</h2>
      <div className="body">
        {postsArr?.map((post) => (
          <Post
            details={post}
            key={post.id}
            deletePost={deletePost}
            editPost={editPost}
            viewDetails={openDetailsHandler}
          />
        ))}
      </div>
      {openAddPost ? (
        <Modal>
          <h2 className="">Add post</h2>
          <div className="inputContainer">
            <label>Title</label>
            <input
              ref={titleRef}
              type="text"
              defaultValue={edit ? editDetails?.title : ""}
            />
          </div>
          <div className="inputContainer">
            <label>Category</label>
            <input
              ref={categoryRef}
              type="text"
              defaultValue={edit ? editDetails?.category : ""}
            />
          </div>
          <div className="inputContainer">
            <label>Content</label>
            <textarea
              ref={contentRef}
              type="text"
              defaultValue={edit ? editDetails?.content : ""}
            />
          </div>
          <p className="errorMsg">{!errorMsg ? "" : errorMsg}</p>
          <div className="buttonContainer">
            {edit ? (
              <Button text={`Edit post`} onClick={saveEditPost} />
            ) : (
              <Button text={`Add Post`} onClick={addPost} />
            )}
            <Button text={`Close`} onClick={() => setOpenAddPost(false)} />
          </div>
        </Modal>
      ) : (
        ""
      )}
      {isOpenDetails ? (
        <Modal>
          <div className="details">
            <label>Title:</label>
            <p>{openDetails?.title}</p>
          </div>
          <div className="details">
            <label>Category:</label>
            <p>{openDetails?.category}</p>
          </div>
          <div className="details">
            <label>Content:</label>
            <p>{openDetails?.content}</p>
          </div>
          <Button text={`close`} onClick={() => setIsOpenDetails(false)} />
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

export default MainPage;
