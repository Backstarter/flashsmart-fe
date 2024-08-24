'use client'
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation'
import axios from 'axios';

export default function CreateDeck({ userID }) {
    const [deckTitle, setDeckTitle] = useState('');
    const [deckDescription, setDeckDescription] = useState('');
    const [cards, setCards] = useState([{
        front: '',
        back: '',
        front_image_url: '',
        back_image_url: '',
        title: ''
    }, {
        front: '',
        back: '',
        front_image_url: '',
        back_image_url: '',
        title: ''
    }]);
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const handleCardChange = (index, field, value) => {
        const newCards = [...cards];
        newCards[index][field] = value;
        setCards(newCards);
    };

    const handleAddCard = () => {
        setCards([...cards, {
            front: '',
            back: '',
            front_image_url: '',
            back_image_url: '',
            title: ''
        }]);
    };

    const handleDeleteCard = (index) => {
        const newCards = cards.filter((_, i) => i !== index);
        setCards(newCards);
    };

    const handleSubmit = async (shouldPractice = false) => {
        setLoading(true);

        const deckData = {
            user_id: userID,
            deck_name: deckTitle,
            description: deckDescription
        };

        try {
            const response = await axios.post('https://flashsmart.ue.r.appspot.com/create-deck', deckData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const result = response.data;
                console.log(result)

                const cardsData = {
                    user_id: userID,
                    deck_id: result.deck_id,
                    flashcards: cards.map(card => ({
                        title: card.title,
                        front: card.front,
                        back: card.back,
                        front_image_url: card.front_image_url,
                        back_image_url: card.back_image_url
                    })),
                }

                const cardsResponse = await axios.post('https://flashsmart.ue.r.appspot.com/add-flashcards', cardsData,  {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                console.log(cardsResponse)

                if (shouldPractice) {
                    // Redirect to practice page with the created deck
                    router.push(`/app/decks/${result.deck_id}`);
                } else {
                    // Redirect to the deck list page or show a success message
                    router.push(`/app/decks/${result.deck_id}`);
                }
            } else {
                console.error('Failed to create deck:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" text-white flex flex-col items-center py-10 px-6">
            <div className="max-w-screen-lg w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Create a new flashcard deck</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => handleSubmit(false)}
                            className="px-5 py-2 bg-neutral-800 rounded-full text-sm font-semibold hover:bg-neutral-700"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create'}
                        </button>
                        <button
                            onClick={() => handleSubmit(true)}
                            className="px-5 py-2 bg-indigo-600 rounded-full text-sm font-semibold hover:bg-indigo-500"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create and practice'}
                        </button>
                    </div>
                </div>

                <input
                    type="text"
                    placeholder="Enter a title, like 'Biology - Chapter 22: Evolution'"
                    value={deckTitle}
                    onChange={(e) => setDeckTitle(e.target.value)}
                    className="w-full p-4 mb-4 bg-neutral-800 text-white rounded-md placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />

                <textarea
                    placeholder="Add a description..."
                    value={deckDescription}
                    onChange={(e) => setDeckDescription(e.target.value)}
                    className="w-full p-4 mb-4 bg-neutral-800 text-white rounded-md placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    rows={3}
                />

                {/* <div className="flex gap-4 mb-8">
                    <button className="px-4 py-2 bg-neutral-800 rounded-full text-sm font-semibold hover:bg-neutral-700 flex">
                        <Icon icon="ic:baseline-file-upload" className=" text-lg mr-2" />
                        Import
                    </button>
                    <button className="px-4 py-2 bg-neutral-800 rounded-full text-sm font-semibold hover:bg-neutral-700 flex items-center">
                        <Icon icon="solar:diagram-up-bold" className="mr-2" />
                        Add diagram
                    </button>
                </div> */}

                <hr className='my-8 border-t border-white'/>

                <div className="space-y-4">
                    {cards.map((card, index) => (
                        <div key={index} className="bg-neutral-900 p-4 rounded-md shadow-md">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-lg font-semibold">Card {index + 1}</span>
                                <div className="flex items-center gap-2">
                                    {/* <button className="p-2 bg-neutral-800 rounded-full hover:bg-neutral-700">
                                        <Icon icon="mdi:image-outline" />
                                    </button> */}
                                    <button
                                        onClick={() => handleDeleteCard(index)}
                                        className="p-2 bg-red-600 rounded-full hover:bg-red-500"
                                    >
                                        <Icon icon="mdi:trash-can-outline" />
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Enter term"
                                    value={card.front}
                                    onChange={(e) => handleCardChange(index, 'front', e.target.value)}
                                    className="p-3 bg-neutral-800 text-white rounded-md placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Enter definition"
                                    value={card.back}
                                    onChange={(e) => handleCardChange(index, 'back', e.target.value)}
                                    className="p-3 bg-neutral-800 text-white rounded-md placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleAddCard}
                    className="w-full mt-6 bg-teal-500 text-black p-4 rounded-md text-lg font-semibold hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                    + Add Card
                </button>
            </div>
        </div>
    );
}
