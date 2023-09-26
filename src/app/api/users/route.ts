import { NextRequest, NextResponse } from 'next/server'

import connectDB from '../../../db';
import User from '../../../models/User';

connectDB();

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const sender = req.nextUrl.searchParams.get('sender');
        const users = await User.find({ username: { $nin: [sender] } });

        return NextResponse.json({ users })
    } catch (error) {
        return NextResponse.json({ error })
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