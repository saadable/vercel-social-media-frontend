import React, { useEffect } from 'react'
import Follower from '../follower/Follower'
import Post from '../post/Post'
import './Feed.scss'
import {useSelector, useDispatch} from 'react-redux';
import { getFeedData } from '../../redux/slices/feedSlice';

function Feed() {

  const dispatch = useDispatch();
  const feedData = useSelector(state => state.feedDataReducer.feedData)

  useEffect(() => {
    dispatch(getFeedData());
  }, [dispatch])

  return (
    <div className="Feed">
        <div className="container sm-contianer">
          <div className="left-part">
            {feedData?.posts?.map(post => <Post key={post._id} post={post} />)}
          </div>
          <div className="right-part feed-right-part">
            <div className="following">
              <div className="title-div">
              <h3 className="title">You Are Following</h3>
              </div>
              <div className="suggestions-div">
              {feedData?.followings?.map(user => <Follower key={user._id} user={user}/>)}
              </div>
            </div>
            <div className="suggestions">
              <div className="title-div">
                <h3 className="title">Suggested For You</h3>
              </div>
              <div className="suggestions-div">
                {feedData?.suggestions?.map(user => <Follower key={user._id} user={user}/>)}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Feed