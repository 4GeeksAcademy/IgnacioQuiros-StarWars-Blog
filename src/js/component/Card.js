import React, { useContext } from 'react';
import "../../styles/card.css";
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';

const Card = ({ name, img, id, type }) => {
    const { actions, store } = useContext(Context);

    // Check if the card is already in favorites
    const isFavorite = store.favorites.some(fav => fav.id === id && fav.type === type);

    const handleToggleFavorite = () => {
        actions.toggleFavorite({ name, img, id, type });
    };

    return (
        <div className="card">
            <img
                src={img}
                alt={name}
                className="card-img-top"
                onError={(e) => { e.target.src = store.placeholder; }}
            />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <div className="buttonsContainer">
                    <Link to={`/details/${type}/${id}`}>
                        <button className="btn btn-warning">Details</button>
                    </Link>
                    <button
                        className="btn btn-warning"
                        onClick={handleToggleFavorite}
                    >
                        <i className={`fa-heart ${isFavorite ? 'fa-solid' : 'fa-regular'} text-dark`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
