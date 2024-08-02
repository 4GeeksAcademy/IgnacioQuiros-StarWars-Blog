import React, { useContext } from "react";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { store, actions } = useContext(Context);

    //Function to handle trash button click
    const handleTrashClick = (fav, event) => {
        //Prevent closing the dropdown
        event.stopPropagation();
        actions.toggleFavorite(fav);
    };

    return (
        <nav className="navbar navbar-expand-lg custom-bg border-bottom border-5 py-1">
            <div className="container-fluid p-1 p-sm-3">
                <h1 className="title" style={{ fontFamily: "Star Wars, sans-serif" }}>STAR WARS</h1>
                <button className="navbar-toggler text-light navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="ms-auto d-none d-lg-block dropdown-container">
                        <div className="btn-group dropstart">
                            <button
                                type="button"
                                className="btn btn-secondary dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ fontFamily: "Star Wars, sans-serif" }}
                            >
                                Favorites
                            </button>
                            <ul className="dropdown-menu custom-dropdown">
                                {store.favorites.length > 0 ? (
                                    store.favorites.map(fav => (
                                        <li key={`${fav.type}-${fav.id}`} className="justify-content-center border-li">
                                            <button
                                                className="btn btn-warning m-0"
                                                onClick={(e) => handleTrashClick(fav, e)}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                            <Link to={`/details/${fav.type}/${fav.id}`} className="ms-3">{fav.name}</Link>
                                        </li>
                                    ))
                                ) : (
                                    <li className="justify-content-center border-li">
                                        <a>No Favorites</a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <ul className="navbar-nav d-lg-none ms-auto custom-dropdown">
                        {store.favorites.length > 0 ? (
                            store.favorites.map(fav => (
                                <li key={`${fav.type}-${fav.id}`} className="justify-content-center border-li">
                                    <button
                                        className="btn btn-warning m-0"
                                        onClick={(e) => handleTrashClick(fav, e)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                    <Link to={`/details/${fav.type}/${fav.id}`} className="ms-3">{fav.name}</Link>
                                </li>
                            ))
                        ) : (
                            <li className="justify-content-center border-li">
                                <a>No Favorites</a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
