"use client"

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '@/lib/redux/store';
import { setReceiver, selectReceiver, selectSender } from "@/lib/redux/users/userSlice";

import { SocketContext } from './ChatBox';
import { useContext } from "react";

export default function ContactItem({ user }: { user: User }) {

    const socket = useContext(SocketContext);

    const dispatch = useDispatch<AppDispatch>();

    const sender = useSelector(selectSender);
    const receiver = useSelector(selectReceiver);

    const pickReceiver = (receiver: string) => {
        dispatch(setReceiver(receiver))
        socket.emit('join', { room: `${sender}-${receiver}`, receiver })
    }

    return (
        <div className={`px-3 flex items-center cursor-pointer${receiver === user.username ? ' bg-grey-light' : ' bg-white hover:bg-grey-lighter'}`} onClick={() => pickReceiver(user.username)}>
            <div>
                <img className="h-12 w-12 rounded-full"
                    src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" />
            </div>
            <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                <div className="flex items-bottom justify-between">
                    <p className="text-grey-darkest">
                        {user.username}
                    </p>
                    <p className="text-xs text-grey-darkest">
                        12:45 pm
                    </p>
                </div>
                <p className="text-grey-dark mt-1 text-sm">
                    Get Andrés on this movie ASAP!
                </p>
            </div>
        </div>
    )
}