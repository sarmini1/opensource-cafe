import { Route, Routes } from "react-router-dom";
import CafeMenu from "./CafeMenu";
import CafeItem from "./CafeItem";
import NewItemForm from "./NewItemForm";
import Home from "./Home";
import NotFound from "./NotFound";

/** Routes
 *
 * Props:
 * - snacks: array of objects [{id, name, description, recipe, serve}...]
 * - drinks: array of objects [{id, name, description, recipe, serve}...]
 * - addItem()
 *
 * State:
 * - none
 *
 * App --> Routes --> Home, CafeMenu, CafeItem, NewItemForm
 */
function RoutesList({ drinks, snacks, addItem }) {

  return (
    <Routes>
      <Route
        path="/"
        element={<Home snacks={snacks} drinks={drinks} />}
      />
      <Route
        path="/snacks"
        element={
          <CafeMenu
          type="snacks"
          items={snacks}
          title="Snacks"
          />}
      />
      <Route
        path="/drinks"
        element={
          <CafeMenu
          type="drinks"
          items={drinks}
          title="Drinks"
          />}
      />
      <Route
        path="/snacks/:id"
        element={<CafeItem items={snacks} cantFind="/snacks" />}
      />
      <Route
        path="/drinks/:id"
        element={<CafeItem items={drinks} cantFind="/drinks" />}
      />
      <Route
        path="/add"
        element={<NewItemForm addItem={addItem}/>}
      />
      <Route
        element={<NotFound />}
      />
    </Routes>
  )

}

export default RoutesList;