// utils/prefetch.ts
import axios from 'axios';

export async function prefetchDeckData(deckId: string) {
  try {
    const response = await axios.get(`https://flashsmart.ue.r.appspot.com/get-flashcards`, {
      params: { deck_id: deckId },
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error prefetching deck data:', error);
    throw error;
  }
}