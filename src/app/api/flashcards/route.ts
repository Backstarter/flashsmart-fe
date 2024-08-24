import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const deck_id = searchParams.get('deck_id');

  try {
    const response = await axios.get(`https://flashsmart.ue.r.appspot.com/get-flashcards`, {
      params: { deck_id },
      headers: { 'Content-Type': 'application/json' },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching decks:', error);
    return NextResponse.json({ error: 'Failed to fetch flashcards' }, { status: 500 });
  }
}