import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import RoutesList from "./RoutesList";

/** App
 *
 * Props:
 * -none
 *
 * State:
 * - isLoading: boolean
 * - snacks: array of objects [{id, name, description, recipe, serve}...]
 * - drinks: array of objects [{id, name, description, recipe, serve}...]
 *
 * App --> NavBar, Routes
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  //Grabs all of the snacks after first render, updates snacks state
  useEffect(() => {
    async function fetchSnacks() {
      try {
        let snacks = await SnackOrBoozeApi.getItems("snacks");
        setSnacks(snacks);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSnacks();
  }, []);

  //Grabs all of the drinks after first render, updates drinks state
  useEffect(() => {
    async function fetchDrinks() {
      try {
        let drinks = await SnackOrBoozeApi.getItems("drinks");
        setDrinks(drinks);
        setIsLoading(false);
        /** Only want to set isLoading to false in this effect since it
         * should be the last to run.*/
      } catch (err) {
        console.error(err);
      }
    }
    fetchDrinks();
  }, []);

  // Adds a given item to the appropriate place via an API call
  // and sets the appropriate state, depending on the type of item
  async function addItem(item) {
    // Try/catch will occur when this function is actually called
    let addedItem = await SnackOrBoozeApi.addItem(item);

    if (item.type === "drink") {
      setDrinks(currDrinks => [...currDrinks, addedItem]);
      setIsLoading(false);
    }
    else if (item.type === "snack") {
      setSnacks(currSnacks => [...currSnacks, addedItem]);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <RoutesList
            drinks={drinks}
            snacks={snacks}
            addItem={addItem} />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

/**
 * TODO consider reconfiguring the snacks/drinks state to move
 * into a single piece of state, 'menu', an object with keys for
 * each item group. Each key's value could be an object itself, containing
 * a bunch of different information, including the list of options.
 * Could help with dynamically creating components and reducing headache
 * down the line if other types of items are added to the menu.
 */