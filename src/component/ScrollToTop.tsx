import React from 'react';

export const ScrollToTop = (behavior: ScrollBehavior ) => {
        window.scrollTo({
        top: 0,
        behavior: behavior,
    });
};

