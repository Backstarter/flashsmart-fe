import { useState, useEffect } from 'react';
import FlippyCard from './FlipCard';

interface Flashcard {
    front: string;
    front_image_url?: string;
    back: string;
    back_image_url?: string;
    title?: string;
}

export default function FlippyCardCarousel({ cards }: { cards: Flashcard[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState<'left' | 'right' | null>(null);

    const handleNext = () => {
        if (!isAnimating) {
            setDirection('left');
            setIsAnimating(true);
        }
    };

    const handlePrevious = () => {
        if (!isAnimating) {
            setDirection('right');
            setIsAnimating(true);
        }
    };

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setCurrentIndex((prevIndex) => {
                    if (direction === 'left') {
                        return (prevIndex + 1) % cards.length;
                    } else if (direction === 'right') {
                        return (prevIndex - 1 + cards.length) % cards.length;
                    }
                    return prevIndex;
                });
                setIsAnimating(false);
                setDirection(null);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isAnimating, direction, cards.length]);

    if (!cards || cards.length === 0) {
        return <div>No cards available</div>;
    }

    const safeIndex = Math.max(0, Math.min(currentIndex, cards.length - 1));
    const currentCard = cards[safeIndex];

    return (
        <div className="flex flex-col items-center py-10">
            <FlippyCard 
                card={currentCard} 
                isAnimating={isAnimating}
                direction={direction}
            />

            <div className="flex justify-between mt-4 w-full max-w-sm">
                <button 
                    className="border border-white hover:bg-neutral-700 text-white font-bold text-2xl px-4 py-2 rounded-full"
                    onClick={handlePrevious}
                    disabled={cards.length <= 1 || isAnimating}
                >
                    &lt;
                </button>
                <p className='flex items-center font-bold font-montserrat'>{safeIndex + 1} / {cards.length}</p>
                <button 
                    className="border border-white hover:bg-neutral-700 text-white font-bold text-2xl px-4 py-2 rounded-full"
                    onClick={handleNext}
                    disabled={cards.length <= 1 || isAnimating}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}