import React, { useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';

const ScrollOnTop = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
        }
    };

    const scrollToTop = () => {
        scroll.scrollToTop();
    };

    useEffect(() => {
        scrollToTop();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    });

    return (
        <div>
            {
                showScroll && <button
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 bg-[#111827] text-white p-3 rounded-full hover:bg-[#1F2937] w-12 h-12 flex items-center justify-center"
                >
                    <i class="fa-solid fa-arrow-up"></i>
                </button>
            }
        </div>
    );
};

export default ScrollOnTop;
