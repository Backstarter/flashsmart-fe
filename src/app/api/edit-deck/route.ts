import { NextResponse } from 'next/server';
import { db } from '../_lib/firebase-admin';

export async function POST(request: Request) {
    const { deck_id, deck_name, description, flashcards } = await request.json();

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

        await deckRef.update({
            name: deck_name,
            description: description,
            flashcards: flashcards.reduce((acc, card, index) => {
                acc[index] = card;
                return acc;
            }, {}),
            card_counter: flashcards.length
        });

        return NextResponse.json({ message: 'Deck updated successfully' });
    } catch (error) {
        console.error('Error updating deck:', error);
        return NextResponse.json({ error: 'Failed to update deck' }, { status: 500 });
    }
}