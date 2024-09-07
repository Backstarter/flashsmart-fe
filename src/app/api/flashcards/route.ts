import { NextResponse } from 'next/server';
import { db } from '../_lib/firebase-admin';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const deck_id = searchParams.get('deck_id');

  if (!deck_id) {
    return NextResponse.json({ error: 'Deck ID is required' }, { status: 400 });
  }

  try {
    const flashcards = await getFlashcards(deck_id);
    if (!flashcards) {
      return NextResponse.json({ error: 'Deck does not exist.' }, { status: 404 });
    }
    return NextResponse.json({ flashcards: flashcards });
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    return NextResponse.json({ error: 'Failed to fetch flashcards' }, { status: 500 });
  }
}

async function getFlashcards(deck_id: string) {
  const deckRef = db.ref(`decks/${deck_id}`);
  const snapshot = await deckRef.once('value');
  const deckData = snapshot.val();

  if (deckData) {
    const flashcards = deckData.flashcards || {};
    console.log(`Deck ${deck_id} has the following flashcards:`, flashcards);
    return flashcards;
  } else {
    console.log(`Deck ${deck_id} does not exist.`);
    return null;
  }
}