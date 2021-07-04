import { Route, Switch } from "react-router-dom";
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
function Routes({ drinks, snacks, addItem }) {

  return (
    <Switch>
      <Route exact path="/">
        <Home snacks={snacks} drinks={drinks} />
      </Route>
      <Route exact path="/snacks">
        <CafeMenu
          type="snacks"
          items={snacks}
          title="Snacks" />
      </Route>
      <Route exact path="/drinks">
        <CafeMenu
          type="drinks"
          items={drinks}
          title="Drinks" />
      </Route>
      <Route path="/snacks/:id">
        <CafeItem items={snacks} cantFind="/snacks" />
      </Route>
      <Route path="/drinks/:id">
        <CafeItem items={drinks} cantFind="/drinks" />
      </Route>
      <Route exact path="/add">
        <NewItemForm
          addItem={addItem}/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )

}

export default Routes;