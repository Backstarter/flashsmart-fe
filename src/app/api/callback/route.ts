import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '../_lib/firebase-admin';

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();
    const username = user?.username;

    if (!userId || !username) {
      console.error('Missing user information');
      return NextResponse.json({ error: 'Missing user information' }, { status: 400 });
    }

    const newUserId = await addUser(userId, username);

    if (newUserId) {
      console.log(`New user added: ${username} with ID: ${newUserId}`);
      // Redirect to the app page
      return NextResponse.redirect('https://flashsmart.vercel.app/app');
    } else {
      console.error('Failed to add user');
      return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error adding user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function addUser(clerkUserId: string, name: string): Promise<string | null> {
  try {
    const userRef = db.ref(`users/${clerkUserId}`);
    await userRef.set({
      name: name.slice(0, 30), // Limit name to 30 characters
      decks: [],
    });
    console.log(`New user ${name} added with Clerk ID ${clerkUserId}. User initialized with empty flashcard collection.`);
    return clerkUserId;
  } catch (error) {
    console.error('Error adding user to Firebase:', error);
    return null;
  }
}