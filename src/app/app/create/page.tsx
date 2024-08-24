'use client'
import CreateDeck from "../../../components/CreateDeck";
import { useAuth } from "@clerk/nextjs";

interface Deck {
    deck_description: string;
    deck_name: string;
    deck_owner: string;
    deck_id?: string; // Optional since we'll add it manually
}

export default function Page() {

    const { userId } = useAuth();

    return (
        <CreateDeck userID={userId} />
    );
}


