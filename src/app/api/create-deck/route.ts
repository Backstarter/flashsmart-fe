import { NextResponse } from 'next/server';
import { db } from '../_lib/firebase-admin';

interface Flashcard {
    front: string;
    back: string;
    front_image_url?: string;
    back_image_url?: string;
    title?: string;
}

export async function POST(request: Request) {
    const { user_id, deck_name, description, flashcards } = await request.json();

    if (!user_id || !deck_name) {
        return NextResponse.json({ error: 'User ID and deck name are required' }, { status: 400 });
    }

    try {
        // Generate a new deck ID
        const newDeckRef = db.ref('decks').push();
        const newDeckId = newDeckRef.key;

        // Create the deck
        await newDeckRef.set({
            owner: user_id,
            name: deck_name.slice(0, 60), // Limit name to 60 characters
            description: description,
            flashcards: flashcards.reduce((acc: { [key: number]: Flashcard }, card: Flashcard, index: number) => {
                acc[index] = card;
                return acc;
            }, {}),
            card_counter: flashcards.length
        });

        // Add the deck to the user's deck list
        const userRef = db.ref(`users/${user_id}/decks`);
        const userDecksSnapshot = await userRef.once('value');
        const userDecks = userDecksSnapshot.val() || [];
        userDecks.push(newDeckId);
        await userRef.set(userDecks);

        console.log(`New deck ${deck_name} added with ID ${newDeckId}. Deck initialized with ${flashcards.length} flashcards.`);
        return NextResponse.json({ deck_id: newDeckId });
    } catch (error) {
        console.error('Error creating deck:', error);
        return NextResponse.json({ error: 'Failed to create deck' }, { status: 500 });
    }
}