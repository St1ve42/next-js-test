'use client'
import './StarsRatingStyle.css'
import { StarRating } from 'react-flexible-star-rating';

export const StarsRatingComponent = () => {
    return <StarRating starsLength={10} dimension={20} initialRating={0}/>;
};

