import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../App";
import {Message} from "./Message";
import {ReactComponent as PrevIcon} from "../images/svg/prev-icon.svg";
import {ReactComponent as GalleryIcon} from "../images/svg/gallery-icon.svg";
import {ReactComponent as SendIcon} from "../images/svg/send-icon.svg";

export const ChatWindow = (props) => {
    const {userInformation} = useContext(AppContext)
    const [newMessage, setNewMessage] = useState("")
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
                userId: userInformation.userId,
                messageType: "text",
                messageContent: newMessage,
                messageTime: "14:41"
            })
            props.setChats([...props.chats])
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
                                <div className="icon-button" onClick={() => props.setActiveChat(null)}>
                                    <PrevIcon/>
                                </div>
                                <div className="chat-header-username">
                                    Username
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="chat-window-messages">
                        {
                            props.activeChat.messages.map((message, index) =>
                                <Message
                                    key={index}
                                    type={message.userId === userInformation.userId ? "sender" : ""}
                                    message={message.messageContent}
                                    time={message.messageTime}
                                    sender={message.userId === userInformation.userId}
                                />
                            )
                        }
                    </div>
                    <div className="chat-window-input-bar">
                        <div className="icon-button">
                            <GalleryIcon/>
                        </div>
                        <textarea
                            className="chat-window-input"
                            placeholder="Write a message..."
                            rows={1}
                            ref={ref}
                            onInput={handleInput}
                            onChange={(event) => {
                                setNewMessage(event.target.value)
                            }}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" && event.shiftKey) {
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