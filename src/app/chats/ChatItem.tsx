"use client"

import { useDispatch, useSelector } from "react-redux";
import { selectSender } from "@/lib/redux/users/userSlice";
import { AppDispatch } from '@/lib/redux/store';


export default function ChatItem({ chat }: { chat: Message }) {

    const dispatch = useDispatch<AppDispatch>();

    const sender = useSelector(selectSender);

    return (
        <div className={`flex mb-2${chat.sender === sender ? ' justify-end' : ''}`}>
            <div className="rounded py-2 px-3" style={{ backgroundColor: chat.sender === sender ? "#E2F7CB" : "#F2F2F2" }}>
                <p className="text-sm text-teal">
                    {chat.sender}
                </p>
                <p className="text-sm mt-1">
                    {chat.content}
                </p>
                <p className="text-right text-xs text-grey-dark mt-1">
                    12:45 pm
                </p>
            </div>
        </div>
    )
}