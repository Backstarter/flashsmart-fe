'use client'
import { useState, useEffect } from 'react';
import FlippyCardCarousel from '@/components/CardCarousel';
import { prefetchDeckData } from '../../../../utils/prefetch';
import Image from 'next/image';
import axios from 'axios';

interface Flashcard {
    front: string;
    front_image_url?: string;
    back: string;
    back_image_url?: string;
    title?: string;
}

interface FlashcardDeck {
    card_counter: number;
    description: string;
    flashcards: Flashcard[];
    name: string;
    owner: string;
}

export default function Page({ params }: { params: { slug: string } }) {
    const [cards, setCards] = useState<Flashcard[]>([]);
    const [deckInfo, setDeckInfo] = useState<FlashcardDeck | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showList, setShowList] = useState(false);

    useEffect(() => {
        const loadDeckData = async () => {
            try {
                setIsLoading(true);
                // Try to get prefetched data
                const data = await prefetchDeckData(params.slug);
                setDeckInfo(data.flashcards);
                setCards(data.flashcards.flashcards);
            } catch (error) {
                console.error('Error loading deck data:', error);
                // Handle error (e.g., show error message to user)
            } finally {
                setIsLoading(false);
            }
        };

        loadDeckData();
    }, [params.slug]);

    const toggleList = () => {
        setShowList(!showList);
    };

    if (isLoading) {
        return <div></div>;
    }

    return (
        <div className="flex flex-col max-w-3xl py-10 mx-auto">
            <h1 className="text-3xl font-bold mb-2">{deckInfo?.name}</h1>
            <p>{deckInfo?.description}</p>
            <div className="grid grid-cols-1 gap-8 w-full">
                <FlippyCardCarousel cards={cards}/>

                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Terms in this deck ({deckInfo?.card_counter})</h1>
                    <button
                        onClick={toggleList}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {showList ? 'Hide List' : 'Show List'}
                    </button>
                </div>

                {showList && cards.map((card, index) => (
                    <div key={index} className="bg-neutral-500 bg-opacity-25 rounded-lg shadow-lg p-6 flex min-h-[200px]">
                        <div className='w-3/12 border-r-2 border-white px-3'>
                            {card.front_image_url && (
                                <Image src={card.front_image_url} alt={card.front} className="w-full h-48 object-cover rounded-lg mb-4"/>
                            )}
                            <p className="text-white">{card.front}</p>
                        </div>
                        <div className='w-full px-6'>
                            {card.back_image_url && (
                                <Image src={card.back_image_url} alt={card.back} className="w-full h-48 object-cover rounded-lg"/>
                            )}
                            <p className="text-white">{card.back}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}