'use client'
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import CreateDeck from "../../components/CreateDeck";
import { prefetchDeckData } from '../../utils/prefetch';
import { SignOutButton, UserButton, useAuth, useUser } from "@clerk/nextjs";

interface Deck {
    deck_description: string;
    deck_name: string;
    deck_owner: string;
    deck_id?: string; // Optional since we'll add it manually
}

export default function Page() {
    const [currentView, setCurrentView] = useState('home');
    const [decks, setDecks] = useState<Deck[]>([]);
    const [recentDecks, setRecentDecks] = useState<Deck[]>([]);

    const { userId } = useAuth();
    const { user } = useUser();

    useEffect(() => {
        const username = user?.username || '';
        fetchDecks(userId || '', username);
        loadRecentDecks();
    }, [currentView, userId, user]);

    const fetchDecks = async (userId: string, userName: string) => {
        try {
            let response = await axios.get(`https://flashsmart.ue.r.appspot.com/get-decks`, {
                params: { user_id: userId },
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.status === 401) {
                console.log('User not found, adding user...');
                const addUserResponse = await axios.post(`https://flashsmart.ue.r.appspot.com/add-user`, {
                    user_id: userId,
                    name: userName,
                }, {
                    headers: { 'Content-Type': 'application/json' },
                });
    
                if (addUserResponse.status !== 200) {
                    throw new Error(`Error adding user: ${addUserResponse.statusText}`);
                }
    
                response = await axios.get(`https://flashsmart.ue.r.appspot.com/get-decks`, {
                    params: { user_id: userId },
                    headers: { 'Content-Type': 'application/json' },
                });
    
                if (response.status !== 200) {
                    throw new Error(`Error fetching decks after adding user: ${response.statusText}`);
                }
            } else if (response.status !== 200) {
                throw new Error(`Error fetching decks: ${response.statusText}`);
            }
    
            const data = response.data;
    
            const decksArray = Object.entries(data.decks).map(([key, value]) => {
                return {
                    ...value as Deck,  // Ensure value is treated as a Deck object
                    deck_id: key
                };
            });
    
            setDecks(decksArray);
    
        } catch (error) {
            console.error('Error fetching decks:', error);
        }
    };

    const saveRecentDeck = (deck: Deck) => {
        let recentDecks = JSON.parse(localStorage.getItem('recentDecks') || '[]') as Deck[];
        recentDecks = recentDecks.filter(d => d.deck_id !== deck.deck_id); // Remove if already in the list
        recentDecks.unshift(deck); // Add to the beginning
        if (recentDecks.length > 3) {
            recentDecks.pop(); // Limit to 3 items
        }
        localStorage.setItem('recentDecks', JSON.stringify(recentDecks));
        setRecentDecks(recentDecks);
    };

    const loadRecentDecks = () => {
        const storedRecentDecks = JSON.parse(localStorage.getItem('recentDecks') || '[]') as Deck[];
        setRecentDecks(storedRecentDecks);
    };

    const handleDeckHover = (deckId: string) => {
        prefetchDeckData(deckId).catch(console.error);
    };

    const DeckLink = ({ deck, recent = false }: { deck: Deck, recent?: boolean }) => (
        <Link 
            href={"/app/decks/" + deck.deck_id} 
            className='scaffold h-[100px] rounded-lg bg-neutral-500 p-4'
            onClick={() => saveRecentDeck(deck)}
            onMouseEnter={() => handleDeckHover(deck.deck_id!)}
        >
            <h2 className='text-lg font-bold'>{deck.deck_name}</h2>
            <p className='text-sm text-neutral-500'>{deck.deck_description}</p>
        </Link>
    );

    return (
        <>
            <h1 className='text-xl font-semibold mb-3'>Recently Viewed</h1>
            <div className='grid grid-cols-3 gap-6 w-full'>
                {recentDecks.length > 0 ? (
                    recentDecks.map((deck, index) => (
                        <DeckLink key={index} deck={deck} recent={true} />
                    ))
                ) : (
                    <p>No recent decks viewed. Start exploring!</p>
                )}
            </div>
            <h1 className='text-xl font-semibold mb-3 mt-12'>Your Decks</h1>
            <div className='flex gap-6 w-full flex-col-reverse'>
                {decks.length > 0 ? (
                    decks.map((deck, index) => (
                        <DeckLink key={index} deck={deck} />
                    ))
                ) : (
                    <p>No decks found. Create your first deck now!</p>
                )}
            </div>
        </>
    );
}
