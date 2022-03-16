import React, { useEffect , useState} from 'react'
import {useParams} from 'react-router-dom'
import { Users } from '../pages/Users'
import '../styles/Profile.css'

const Profile = () => {

    const username = useParams()

    const [user, setUser] = useState()
    const [bio, setBio] = useState()
    const [followers, setFollowers] = useState()
    const [following, setFollowing] = useState()
    const [avatar, setAvatar] = useState()


    var url = `https://api.github.com/users/${username.userProfile}`

    const fetchApi = async () => {
        const response = await fetch(url)
        const responseJson = await response.json()
        fillData(responseJson)
    }

    const fillData = (data) => {
        setUser(data.login)
        setBio(data.bio)
        setFollowers(data.followers)
        setFollowing(data.following)
        setAvatar(data.avatar_url)
    }

    useEffect(() => {
        fetchApi()
    }, [])

    return(
        <div className="Page">
            <div className="container d-flex justify-content-center">
                <div className="profile">
                    <div className="picture">
                        <img src={avatar}/>
                    </div>
                    <div className="Text">
                        <h1>{user}</h1>
                        <h2>{bio}</h2>
                        <div className="follows">
                            <div>
                                <p><b>{followers}</b><br></br>Followers</p>
                            </div>
                            <div>
                                <p><b>{following}</b><br></br>Following</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile