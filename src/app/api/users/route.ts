import { NextRequest, NextResponse } from 'next/server'

import connectDB from '../../../db';
import User from '../../../models/User';

connectDB();

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const sender = req.nextUrl.searchParams.get('sender');
        const receiver = req.nextUrl.searchParams.get('receiver');
        const chats = await User.find({
            $or: [{
                sender: sender, receiver: receiver
            }, {
                sender: receiver, receiver: sender
            }]
        }).sort({ createdAt: 1 });
        return NextResponse.json({ data: chats })
    } catch (error) {
        return NextResponse.json({ data: error })
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json()
        const { content, sender, receiver } = body

        const chat = new User({
            content,
            sender,
            receiver
        });
        await chat.save()

        return NextResponse.json({ chat })
    } catch (error) {
        return NextResponse.json({ data: error })
    }
}