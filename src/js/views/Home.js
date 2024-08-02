import React, { useContext } from "react";
import "../../styles/home.css";
import Card from "../component/Card";
import { Context } from "../store/appContext";
import Spinner from "../component/Spinner";
import starsImage from "../../img/stars.png";
import twinklingImage from "../../img/twinkling.png";
import cloudsImage from "../../img/clouds.png";

export const Home = () => {
  const { store } = useContext(Context);

  if (store.loading) {
    return <Spinner />;
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
            <div className="cards-container" id="characters">
              {store.myPeople.map(person => (
                <Card
                  key={`people-${person.uid}`}
                  name={person.name}
                  img={`https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`}
                  id={person.uid}
                  type="people"
                />
              ))}
            </div>
          </div>
          <hr />
          <div className="cardsDiv">
            <div className="cards-container" id="planets">
              {store.myPlanets.map(planet => (
                <Card
                  key={`planets-${planet.uid}`}
                  name={planet.name}
                  img={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
                  id={planet.uid}
                  type="planets"
                />
              ))}
            </div>
          </div>
          <hr />
          <div className="cardsDiv">
            <div className="cards-container" id="starShips">
              {store.myStarships.map(starShip => (
                <Card
                  key={`starships-${starShip.uid}`}
                  name={starShip.name}
                  img={`https://starwars-visualguide.com/assets/img/starships/${starShip.uid}.jpg`}
                  id={starShip.uid}
                  type="starships"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
