import React from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {useDispatch} from 'react-redux';
import { likeAndUnlikePost } from "../../redux/slices/postsSlice";
import { Route, useNavigate, useParams } from "react-router";
import { showToast } from "../../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";
import { getItem, KEY_ACCESS_TOKEN } from "../../utils/localStorageManager";
import { axiosClient } from "../../utils/axiosClient";

function Post({ post }) {
    const dispatch = useDispatch();
    const params = useParams()
    const navigate = useNavigate();
    async function handlePostLiked() {
        dispatch(likeAndUnlikePost({
            postId: post._id
        }))
    }
   
    return (
        <div className="Post">
            <div className="heading" onClick={() => navigate(`/profile/${post.owner._id}`)}>
                <Avatar src={post.owner?.avatar?.url} />
                <h4>{post.owner?.name}</h4>
                
            </div>
            <div className="content">
                <img src={post?.image?.url} alt="" />
            </div>
            <div className="footer">
                <div className="like" onClick={handlePostLiked}>
                    {post.isLiked ? <AiFillHeart style={{color: 'red'}} className="icon" /> : <AiOutlineHeart className="icon" />}
                    <h4>{`${post.likesCount} likes`}</h4>
                </div>
                <p className="caption">{post.caption}</p>
                <h6 className="time-ago">{post?.timeAgo}</h6>
            </div>
        </div>
    );
}

export default Post;
