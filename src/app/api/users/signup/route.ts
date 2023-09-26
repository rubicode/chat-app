import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken';

import connectDB from '../../../../db';
import User from '../../../../models/User';

connectDB();

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json()
        const { username, password } = body

        const user = await User.findOne({ username })

        if (user) throw new Error('user already exist')

        const newUser = new User({
            username,
            password
        });
        await newUser.save()

        return NextResponse.json({ username: newUser.username, token: jwt.sign({ _id: newUser._id, username: newUser.username }, 'rubicamp') })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}