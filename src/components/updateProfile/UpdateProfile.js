import React, { useEffect, useState } from "react";
import "./UpdateProfile.scss";
import "./UpdateProfile.scss";
import dummyUserImg from '../../assets/user.png'
import { useSelector, useDispatch } from "react-redux";
import { setLoading, showToast, updateMyProfile } from "../../redux/slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import Login from "../../pages/login/Login";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";

import { TOAST_SUCCESS } from "../../App";

function UpdateProfile() {
    const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [userImg, setUserImg] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        setName(myProfile?.name || '');
        setBio(myProfile?.bio || '');
        setUserImg(myProfile?.avatar?.url)
    }, [myProfile]);

    function handleImageChange(e) {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if(fileReader.readyState === fileReader.DONE) {
                setUserImg(fileReader.result)
                console.log('img data', fileReader.result);
            }
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(updateMyProfile({
            name,
            bio,
            userImg
        }));
    }

    async function deleteProfile(){
        try {
           const deleteProfile = await axiosClient.delete('/user/');
           removeItem(KEY_ACCESS_TOKEN)
        navigate('/login')
        return deleteProfile;
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <div className="UpdateProfile">
            <div className="container sm-container">
                <div className="left-part">
                    <div className="input-user-img">
                        <label htmlFor="inputImg" className="labelImg">
                            <img src={userImg ? userImg : dummyUserImg} alt={name} />
                        </label>
                        <input
                            className="inputImg"
                            id="inputImg"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                <div className="right-part">
                    <form onSubmit={handleSubmit}>
                       
                            
                            <input
                                value={name}
                                type="text"
                                placeholder="Your Name"
                                onChange={(e) => setName(e.target.value)}
                            />
                            
                        
                       
                        
                            <input
                                value={bio}
                                type="text"
                                placeholder="Your Bio"
                                onChange={(e) => setBio(e.target.value)}
                            />
                       
                        <input type="submit" className="btn-primary" onClick={handleSubmit}/>
                    </form>

                    <button className="delete-account btn-primary" onClick={deleteProfile}>
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfile;
