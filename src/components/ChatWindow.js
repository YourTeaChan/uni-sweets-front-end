import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../App";
import axios from "axios";
import {Message} from "./Message";
import {ReactComponent as PrevIcon} from "../images/svg/prev-icon.svg";
import {ReactComponent as GalleryIcon} from "../images/svg/gallery-icon.svg";
import {ReactComponent as SendIcon} from "../images/svg/send-icon.svg";
import {useNavigate} from "react-router-dom";

export const ChatWindow = (props) => {
    const {userInformation, authInfo} = useContext(AppContext)
    const interlocutor = props.activeChat?.firstUser.username === userInformation?.username ? props.activeChat?.secondUser : props.activeChat?.firstUser;
    const [newMessage, setNewMessage] = useState("")
    const navigation = useNavigate()
    const ref = useRef(null)

    const handleInput = (event) => {
        if (ref.current) {
            ref.current.style.height = "auto"
            ref.current.style.height = `${event.target.scrollHeight - 20}px`
        }
    }

    useEffect(() => {
        if (props.activeChat) {
            const chatWindow = document.querySelector(".chat-window-messages")
            chatWindow.scrollTop = chatWindow.scrollHeight
        }
    }, [props.activeChat])

    const handleNewMessage = () => {
        if (newMessage.trim() !== "") {
            props.activeChat.messages.push({
                receiverUsername: interlocutor.username,
                senderUsername: userInformation.username,
                text: newMessage,
                time: new Date().toISOString()
            })
            props.setChats([...props.chats])
            axios.post(
                `http://192.168.0.106:8080/api/v1/chats/${interlocutor.username}/${userInformation.username}`,
                {
                    receiverUsername: interlocutor.username,
                    senderUsername: userInformation.username,
                    text: newMessage
                },
                {
                    headers: {
                        "Authorization": authInfo.token
                    }
                }
            ).then(response => props.setChats(response.data))
            document.querySelector(".chat-window-input").value = ""
            const chatWindow = document.querySelector(".chat-window-messages")
            setNewMessage("")
            ref.current.style.height = "auto"
            ref.current.focus()
            setTimeout(() => chatWindow.scrollTop = chatWindow.scrollHeight, 0)
        }
    }

    return (
        <>
            {props.activeChat &&
                <div className="chat-window">
                    <div className="chat-header-wrapper">
                        <div className="chat-header">
                            <div className="chat-header-content">
                                <div className="icon-button" onClick={(e) => {
                                    navigation("/messages")
                                }}>
                                    <PrevIcon/>
                                </div>
                                <div className="chat-header-username">
                                    {interlocutor?.firstName + " " + interlocutor?.lastName}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="chat-window-messages">
                        {
                            props.activeChat.messages.map((message, index) =>
                                <Message
                                    key={index}
                                    type={message.senderUsername === userInformation.username ? "sender" : ""}
                                    message={message.text}
                                    time={message.time}
                                    sender={message.senderUsername === userInformation.username ? userInformation : interlocutor}
                                />
                            )
                        }
                    </div>
                    <div className="chat-window-input-bar">
                        <div className="div" style={{width:"10px"}}></div>
                        {/*<div className="icon-button">*/}
                        {/*    <GalleryIcon/>*/}
                        {/*</div>*/}
                        <textarea
                            className="chat-window-input"
                            placeholder="Напишіть повідомлення..."
                            rows={1}
                            ref={ref}
                            onInput={handleInput}
                            onChange={(event) => {
                                setNewMessage(event.target.value)
                            }}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" && !event.shiftKey) {
                                    handleNewMessage()
                                    event.preventDefault()
                                }
                                if (event.key === "Tab") {
                                    event.preventDefault()
                                    setNewMessage(event.target.value + "\t")
                                    event.target.value += "\t"
                                }
                            }}
                        />
                        <div
                            className="icon-button"
                            onClick={handleNewMessage}
                        >
                            <SendIcon/>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}