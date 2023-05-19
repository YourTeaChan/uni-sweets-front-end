import {useState} from "react";
import {Chat} from "../components/Chat";
import {ChatWindow} from "../components/ChatWindow";

export const Messages = () => {
    const [activeChat, setActiveChat] = useState(null)

    const message1 = {
        userId: 2,
        messageType: "text",
        messageContent: "Текст ... текст ... текст ... текст ... текст ... текст ... текст ... текст ... текст ...",
        messageTime: "14:43"
    }

    const message2 = {
        userId: 3,
        messageType: "text",
        messageContent: "Текст ... текст ... текст ... текст ...",
        messageTime: "14:41"
    }

    const [chats, setChats] = useState(
        [
            {
                chatId: 2,
                username: "Клієнт 1",
                messages: [
                    message1,
                    message1,
                    message1,
                    message1,
                    message1
                ],

            },
            {
                chatId: 3,
                username: "Клієнт 2",
                messages: [
                    message2,
                    message2,
                    message2
                ],
            }
        ])

    return (
        <div
            className="messages-wrapper"
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    setActiveChat(null)
                }
            }}
        >
            <div className="messages-content">
                <div className={`chat-list ${activeChat === null ? "" : "hidden"}`}>
                    {
                        chats.map((chat, index) => {
                            return <Chat key={index} chat={chat} activeChat={activeChat} setActiveChat={setActiveChat}/>
                        })
                    }
                </div>
                <ChatWindow activeChat={activeChat} setActiveChat={setActiveChat} chats={chats} setChats={setChats}/>
            </div>
        </div>
    )
}