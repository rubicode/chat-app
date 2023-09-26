import { NextRequest, NextResponse } from 'next/server'

import connectDB from '../../../../db';
import User from '../../../../models/User';

connectDB();

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const username = req.nextUrl.searchParams.get('username');
        const user = await User.findOne({ username })
        user.token = ''
        await user.save()
        return NextResponse.json({ data: { username: user.username } })
    } catch (error) {
        return NextResponse.json({ err: error })
    }
}