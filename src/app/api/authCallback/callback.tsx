'use server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Callback() {
  try {
    const { userId } = auth();
    let user = await currentUser();
    const username = user?.username;

    const resp = await fetch('http://localhost:5000/add-user', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
            user_id: userId,
            name: username,
          }),
    });
    if (resp){
      console.log(resp, userId, username);
      // Redirect the user to the dashboard or another page
      redirect('/app')
    }
  } catch (error) {
    console.error('Error sending user ID to backend:', error);
  }
}