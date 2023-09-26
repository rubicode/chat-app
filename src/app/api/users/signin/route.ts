import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import connectDB from '../../../../db';
import User from '../../../../models/User';

connectDB();

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json()
        const { username, password } = body

        const user = await User.findOne({ username })

        if (!user) throw new Error("user doesn't already exist")

        if (!user.checkPassword(password)) throw new Error("password is wrong")

        user.token = jwt.sign({ _id: user._id, username: user.username }, 'rubicamp')

        await user.save()

        return NextResponse.json({ success: true, username: user.username, token: user.token })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message })
    }
}