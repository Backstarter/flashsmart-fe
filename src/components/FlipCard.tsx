import { useState, useEffect } from 'react';

interface Flashcard {
    front: string;
    front_image_url?: string;
    back: string;
    back_image_url?: string;
}

interface FlippyCardProps {
    card: Flashcard;
    isAnimating: boolean;
    direction: 'left' | 'right' | null;
}

export default function FlippyCard({ card, isAnimating, direction }: FlippyCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        setIsFlipped(false);
    }, [card]);

    const handleFlip = () => {
        if (!isAnimating) {
            setIsFlipped(!isFlipped);
        }
    };

    const animationClass = isAnimating ? `slide-${direction}` : '';

    return (
        <div
            className={`flippy-card-container relative w-full h-[400px] mx-auto ${animationClass}`}
            onClick={handleFlip}
        >
            <div
                className={`flippy-card relative w-full h-full transition-transform duration-500 ease-in-out ${
                    isFlipped ? 'is-flipped' : ''
                }`}
            >
                {/* Front Side */}
                <div className="flippy-front absolute w-full h-full backface-hidden flex flex-col items-center justify-center bg-neutral-500 bg-opacity-25 rounded-lg shadow-lg p-6">
                    {card.front_image_url && (
                        <img
                            src={card.front_image_url}
                            alt={card.front}
                            className="w-full h-32 object-cover rounded-md mb-4"
                        />
                    )}
                    <p className="text-lg font-semibold text-white">
                        {card.front}
                    </p>
                </div>

                {/* Back Side */}
                <div className="flippy-back absolute w-full h-full backface-hidden flex flex-col items-center justify-center bg-neutral-500 bg-opacity-25 rounded-lg shadow-lg p-6">
                    {card.back_image_url && (
                        <img
                            src={card.back_image_url}
                            alt={card.back}
                            className="w-full h-32 object-cover rounded-md mb-4"
                        />
                    )}
                    <p className="text-lg font-semibold text-white">
                        {card.back}
                    </p>
                </div>
            </div>
        </div>
    );
}