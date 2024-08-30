import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();
    const username = user?.username;

    const resp = await axios.post('https://flashsmart.ue.r.appspot.com/add-user', {
      user_id: userId,
      name: username,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (resp.status === 200) {
      console.log(resp.data, userId, username);
      // Use NextResponse to redirect
      return new NextResponse(null, {
        status: 302,
        headers: {
          location: 'https://flashsmart.vercel.app/app'
        }
      });
    } else {
      console.error('Unexpected response:', resp);
    }
  } catch (error) {
    console.error('Error sending user ID to backend:', error);
    return NextResponse.error(); // Return a server error response
  }
}
