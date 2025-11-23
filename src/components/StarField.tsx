import React, { useEffect, useRef } from 'react';

const StarField = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth) * 20;
            const y = (clientY / window.innerHeight) * 20;

            container.style.transform = `translate(-${x}px, -${y}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Generate random stars
    const stars = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        delay: Math.random() * 5,
    }));

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div ref={containerRef} className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)] transition-transform duration-100 ease-out">
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className="absolute rounded-full bg-white animate-pulse"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            opacity: star.opacity,
                            animationDuration: `${3 + star.delay}s`,
                            animationDelay: `${star.delay}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default StarField;
