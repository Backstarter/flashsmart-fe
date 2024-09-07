import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Flashcard {
    front: string;
    front_image_url?: string;
    back: string;
    back_image_url?: string;
    title?: string;
}

interface EditDeckProps {
    deckId: string;
    initialData: {
        name: string;
        description: string;
        flashcards: Flashcard[];
    };
    onCancel: () => void;
}

export default function EditDeck({ deckId, initialData, onCancel }: EditDeckProps) {
    const [deckName, setDeckName] = useState(initialData.name);
    const [deckDescription, setDeckDescription] = useState(initialData.description);
    const [cards, setCards] = useState<Flashcard[]>(initialData.flashcards);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleCardChange = (index: number, field: keyof Flashcard, value: string) => {
        const newCards = [...cards];
        newCards[index] = { ...newCards[index], [field]: value };
        setCards(newCards);
    };

    const handleAddCard = () => {
        setCards([...cards, { front: '', back: '', front_image_url: '', back_image_url: '', title: '' }]);
    };

    const handleDeleteCard = (index: number) => {
        const newCards = cards.filter((_, i) => i !== index);
        setCards(newCards);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/edit-deck', {
                deck_id: deckId,
                deck_name: deckName,
                description: deckDescription,
                flashcards: cards,
            });

            if (response.status === 200) {
                router.push(`/app/decks/${deckId}`);
            }
        } catch (error) {
            console.error('Error saving deck:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center py-10 px-6">
            <div className="max-w-screen-lg w-full">
                <h1 className="text-3xl font-bold mb-6">Edit Deck</h1>
                <input
                    type="text"
                    placeholder="Deck Name"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    className="w-full p-4 mb-4 bg-neutral-800 text-white rounded-md"
                />
                <textarea
                    placeholder="Deck Description"
                    value={deckDescription}
                    onChange={(e) => setDeckDescription(e.target.value)}
                    className="w-full p-4 mb-4 bg-neutral-800 text-white rounded-md"
                    rows={3}
                />
                {cards.map((card, index) => (
                    <div key={index} className="bg-neutral-900 p-4 rounded-md shadow-md mb-4">
                        <input
                            type="text"
                            placeholder="Front"
                            value={card.front}
                            onChange={(e) => handleCardChange(index, 'front', e.target.value)}
                            className="w-full p-3 mb-2 bg-neutral-800 text-white rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Back"
                            value={card.back}
                            onChange={(e) => handleCardChange(index, 'back', e.target.value)}
                            className="w-full p-3 mb-2 bg-neutral-800 text-white rounded-md"
                        />
                        <button
                            onClick={() => handleDeleteCard(index)}
                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Delete Card
                        </button>
                    </div>
                ))}
                <button
                    onClick={handleAddCard}
                    className="w-full mt-4 bg-green-500 text-white p-3 rounded-md hover:bg-green-600"
                >
                    Add Card
                </button>
                <div className="flex justify-between mt-6">
                    <button
                        onClick={onCancel}
                        className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}