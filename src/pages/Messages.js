import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {AppContext} from "../App";
import {Chat} from "../components/Chat";
import {ChatWindow} from "../components/ChatWindow";

export const Messages = () => {
    const [activeChat, setActiveChat] = useState(null)
    const navigation = useNavigate()
    const {userInformation, authInfo} = useContext(AppContext)
    const {username} = useParams()
    const [chats, setChats] = useState([])

    useEffect(() => {
        if (userInformation) {
            axios.get(
                `http://192.168.0.106:8080/api/v1/chats/${userInformation?.username}`,
                {
                    headers: {
                        "Authorization": authInfo.token
                    }
                }
            ).then(value => {
                setChats(value.data)
            })
        }
    }, [userInformation])


    useEffect(() => {
        if (username) {
            axios.get(
                `http://192.168.0.106:8080/api/v1/chats/${authInfo.username}/${username}`,
                {
                    headers: {
                        "Authorization": authInfo.token
                    }
                }
            ).then(value => {
                setActiveChat(value.data)
            })
        } else {
            setActiveChat(null)
        }
        console.log(username)
    }, [username])

    return (
        <div
            className="messages-wrapper"
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    // setActiveChat(null)
                    navigation("/messages")
                }
            }}
        >
            <div className="messages-content">
                <div className={`chat-list ${activeChat === null ? "" : "hidden"}`}>
                    {
                        chats.map((chat, index) => {
                            return <Chat key={index} chat={chat} activeChat={activeChat}/>
                        })
                    }
                </div>
                <ChatWindow activeChat={activeChat} setActiveChat={setActiveChat} chats={chats} setChats={setChats}/>
            </div>
        </div>
    )
}