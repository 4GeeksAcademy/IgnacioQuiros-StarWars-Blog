const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			myUrlApi: "https://www.swapi.tech/api/",
			types: {
				people: "people/",
				planets: "planets/",
				starships: "starships/"
			},
			myPeople: [],
			myPlanets: [],
			myStarships: [],
			favorites: [],
			loading: true,
			placeholder: "https://starwars-visualguide.com/assets/img/big-placeholder.jpg"
		},
		actions: {
			getApi: () => {
				const store = getStore();
				setStore({ loading: true });

				fetch(store.myUrlApi + store.types.people)
					.then(res => res.json())
					.then(data => {
						setStore({ myPeople: data.results });
					})
					.catch(err => {
						console.error("Error fetching people:", err);
					});

				fetch(store.myUrlApi + store.types.planets)
					.then(res => res.json())
					.then(data => {
						setStore({ myPlanets: data.results });
					})
					.catch(err => {
						console.error("Error fetching planets:", err);
					});

				fetch(store.myUrlApi + store.types.starships)
					.then(res => res.json())
					.then(data => {
						setStore({ myStarships: data.results });
					})
					.catch(err => {
						console.error("Error fetching starships:", err);
					})
					.finally(() => {
						setStore({ loading: false });
					});
			},
			toggleFavorite: (item) => {
				const store = getStore();
				const index = store.favorites.findIndex(fav => fav.id === item.id && fav.type === item.type);

				if (index === -1) {
					// Add to favorites
					setStore({ favorites: [...store.favorites, item] });
				} else {
					// Remove from favorites
					const newFavorites = store.favorites.filter(fav => !(fav.id === item.id && fav.type === item.type));
					setStore({ favorites: newFavorites });
				}
			}
		}
	};
};

export default getState;
