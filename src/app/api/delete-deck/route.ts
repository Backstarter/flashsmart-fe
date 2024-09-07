import { NextResponse } from 'next/server';
import { db } from '../_lib/firebase-admin';

export async function POST(request: Request) {
    const { deck_id } = await request.json();

    if (!deck_id) {
        return NextResponse.json({ error: 'Deck ID is required' }, { status: 400 });
    }

    try {
        const deckRef = db.ref(`decks/${deck_id}`);
        const snapshot = await deckRef.once('value');
        const deckData = snapshot.val();

        if (!deckData) {
            return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
        }

        // Delete the deck
        await deckRef.remove();

        // Remove the deck from the user's deck list
        const userRef = db.ref(`users/${deckData.owner}/decks`);
        const userDecksSnapshot = await userRef.once('value');
        const userDecks = userDecksSnapshot.val() || [];
        const updatedUserDecks = userDecks.filter((id: string) => id !== deck_id);
        await userRef.set(updatedUserDecks);

        return NextResponse.json({ message: 'Deck deleted successfully' });
    } catch (error) {
        console.error('Error deleting deck:', error);
        return NextResponse.json({ error: 'Failed to delete deck' }, { status: 500 });
    }
}