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

        return NextResponse.json({ username: user.username, token: jwt.sign({ _id: user._id, username: user.username }, 'rubicamp') })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}