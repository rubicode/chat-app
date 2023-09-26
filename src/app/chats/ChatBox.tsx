"use client"

import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import ChatContact from "./ChatContact";
import ChatRoom from "./ChatRoom";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/lib/redux/store';
import { selectSender } from "@/lib/redux/users/userSlice";

import { io } from "socket.io-client";
import { createContext } from 'react';
import { loadChatAsync } from "@/lib/redux/chats/chatSlice";

var socket: any = io("http://localhost:3001");

export const SocketContext = createContext(socket);

export default function ChatBox() {

    const dispatch = useDispatch<AppDispatch>();

    const sender = useSelector(selectSender);

    const router = useRouter()

    useEffect(() => {
        const account: any = JSON.parse(localStorage.getItem("account") || 'null')
        if (!(account !== null && account.token)) {
            router.push('/users/signin')
        }

        socket.on("connect", () => {
            console.log("SOCKET CONNECTED!", socket.id);
        });

        socket.on("invite", ({ room, receiver }: { room: string, receiver: string }) => {
            console.log("invite", sender, receiver)
            if (sender === receiver) {
                socket.emit("join", { room })
            }
        })

        socket.on("reloadChat", ({ pengirim, penerima }: { pengirim: string, penerima: string }) => {
            console.log('loading chat', sender, penerima);
            if (sender == penerima) {
                dispatch(loadChatAsync({ sender, receiver: pengirim }))
            }
        })
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            <div>
                <div className="w-full h-32" style={{ backgroundColor: "#449388" }}></div>

                <div className="container mx-auto" style={{ "marginTop": "-128px" }}>
                    <div className="py-6 h-screen">
                        <div className="flex border border-grey rounded shadow-lg h-full">
                            <ChatContact />
                            <ChatRoom />
                        </div>
                    </div>
                </div>
            </div>
        </SocketContext.Provider>
    )
}