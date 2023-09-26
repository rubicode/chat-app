"use client"

import { useContext, useEffect } from "react";
import ChatItem from "./ChatItem";
import { useDispatch, useSelector } from "react-redux";
import { loadChatAsync, selectChats } from "@/lib/redux/chats/chatSlice";
import { AppDispatch } from "@/lib/redux/store";
import { selectReceiver, selectSender } from "@/lib/redux/users/userSlice";

import { SocketContext } from './ChatBox';

export default function ChatList() {

    const socket = useContext(SocketContext);

    const dispatch = useDispatch<AppDispatch>();
    const chats = useSelector(selectChats);
    const sender = useSelector(selectSender);
    const receiver = useSelector(selectReceiver);

    useEffect(() => {
        dispatch(loadChatAsync({ sender, receiver }))
    }, [sender, receiver])

    return (
        <div className="flex-1 overflow-auto" style={{ backgroundColor: "#DAD3CC" }}>
            <div className="py-2 px-3">

                <div className="flex justify-center mb-2">
                    <div className="rounded py-2 px-4" style={{ backgroundColor: "#DDECF2" }}>
                        <p className="text-sm uppercase">
                            February 20, 2018
                        </p>
                    </div>
                </div>

                <div className="flex justify-center mb-4">
                    <div className="rounded py-2 px-4" style={{ backgroundColor: "#FCF4CB" }}>
                        <p className="text-xs">
                            Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info.
                        </p>
                    </div>
                </div>

                {chats.map((chat: Message) => (<ChatItem key={chat._id} chat={chat} />))}

            </div>
        </div>
    )
}