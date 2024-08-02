import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import starsImage from "../../img/stars.png";
import twinklingImage from "../../img/twinkling.png";
import cloudsImage from "../../img/clouds.png";
import "../../styles/home.css";
import { Context } from '../store/appContext';
import Spinner from "../component/Spinner";
import { Link } from 'react-router-dom';

const Details = () => {
  const { type, id } = useParams();
  const { store } = useContext(Context);
  const [detail, setDetail] = useState(null);
  const [description, setDescription] = useState("");
  const [properties, setProperties] = useState({});
  let props = [];
  let imgUrl = "";

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Different props details below for each type
  if (type === "people") {
    props = ["birth_year", "gender", "height", "mass", "hair_color"];
  } else if (type === "planets") {
    props = ["climate", "diameter", "population", "terrain", "rotation_period"];
  } else if (type === "starships") {
    props = ["crew", "length", "model", "consumables", "cargo_capacity"];
  }
  console.log(props);

  // For getting Info of the element such as description and the other details below
  const gettingInfo = () => {
    fetch(`https://www.swapi.tech/api/${type}/${id}`)
      .then(response => response.json())
      .then(data => {
        const result = data.result;
        setDescription(result.description);

        // Filter properties based on `props`
        const filteredProperties = {};
        props.forEach(key => {
          if (result.properties[key] !== undefined) {
            filteredProperties[key] = result.properties[key];
          }
        });
        setProperties(filteredProperties);
      })
      .catch(error => console.error('Error:', error));
  };

  // Getting id & type of the url
  useEffect(() => {
    let item;
    if (type === "people") {
      item = store.myPeople.find(person => Number(person.uid) === Number(id));
    } else if (type === "planets") {
      item = store.myPlanets.find(planet => Number(planet.uid) === Number(id));
    } else if (type === "starships") {
      item = store.myStarships.find(starShip => Number(starShip.uid) === Number(id));
    }
    if (!item) {
      console.warn(`No item found for type "${type}" and id "${id}"`);
    }

    gettingInfo();
    setDetail(item);
  }, [type, id, store]);

  if (!detail || description === "") {
    return <Spinner />;
  }

  // Changing the URL because characters instead of people
  if (type === "people") {
    imgUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  } else {
    imgUrl = `https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`;
  }



  return (
    <div style={{ height: "100%" }}>
      {/* First all the background animations */}
      <div
        className="stars"
        style={{ background: `#000 url(${starsImage}) repeat top center` }}
      ></div>
      <div
        className="twinkling"
        style={{ background: `transparent url(${twinklingImage}) repeat top center` }}
      ></div>
      <div
        className="clouds"
        style={{ background: `transparent url(${cloudsImage}) repeat top center` }}
      ></div>

      <div id="principalDiv">
        <div className="container my-3 custom-div">
          <div className="cardsDiv">
            <div className="cards-container d-flex flex-column" id="characters">
              <div className='d-flex text-light container-fluid justify-content-center row'>
                <img className='border border-light p-1 ms-0 ms-md-4 col-8 col-md-4 col-lg-2' src={imgUrl} alt={detail.name} onError={(e) => { e.target.src = store.placeholder; }} />
                <div className="border border-light p-2 me-0 me-md-4 col-10 col-sm-8" >
                  <h1>{detail.name}</h1>
                  <p className='fs-2'>{description}</p>
                </div>
              </div>
              <div className='text-light p-2 p-sm-4 fs-5'>
                <hr />
                More Details:
                <ul>
                  {Object.entries(properties).map(([key, value]) => (
                    <li key={key}>
                      <strong className='fs-4'>{capitalizeFirstLetter(key)}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <br/>
          </div>
        </div>
        <Link to={"/"} className='d-flex justify-content-center text-decoration-none'>
          <button className='btn btn-warning'>Go Back To Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Details;