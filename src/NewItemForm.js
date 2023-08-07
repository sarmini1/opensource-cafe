import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "./Error";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import "./NewItemForm.css";

const initialFormData = {
  id: "",
  name: "",
  type: "",
  recipe: "",
  description: "",
  serve: ""
}

/** NewItemForm
 *
 * Props:
 * - addItem: ()
 *
 * State:
 * - NewItemFormData: {}
 * - error: null or ""
 * - isSuccessful: boolean
 *
 * App --> NavBar, Routes --> NewItemForm
 */
function NewItemForm({ addItem }) {

  const [newItemFormData, setNewItemFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //Updates newItemFormData when a change event occurs
  function handleChange(evt) {
    const { name, value } = evt.target;
    setNewItemFormData(currData => ({ ...currData, [name]: value }));
    if (name === "name") {
      setItemID();
    }
  }

  //Adds additional id field to newItemFormData, equal to the
  // item's name, lower case, spaces replaced with dashes
  function setItemID() {
    setNewItemFormData(currData => ({
      ...currData,
      id: currData.name.toLowerCase().replaceAll(" ", "-")
    }));
  }

  //When form is submitted, attempts to add the item via the
  // addItem() function passed from App.
  async function handleSubmit(evt) {
    evt.preventDefault();
    setError(null);

    //Fail fast and check that a valid type was selected
    if (!newItemFormData.type || newItemFormData.type === "default") {
      setError("Please ensure an item type is selected.");
      return;
    }

    try {
      await addItem(newItemFormData);
      setError(null);
      navigate(`/${newItemFormData.type}s`)
    } catch (err) {
      setError(err);
    }
  }

  return (
    <div className="NewItemForm-container">
      <div className="row">
        <div className="col-1 col-sm-2 col-lg-4"></div>
        <div className="col-10 col-sm-8 col-lg-4">
          <Card>
            <CardBody>
              <CardTitle className="font-weight-bold text-center">
                <h3>Add To Our Menu!</h3>
              </CardTitle>
              <form className="NewItemForm-form" onSubmit={handleSubmit}>
                <label htmlFor="NewItemForm-type">
                  Type of Item:
                  </label>
                <select
                  className="NewItemForm-type"
                  name="type"
                  onChange={handleChange}
                >
                  <option value={`default`}>Options:</option>
                  <option value={`snack`}>Snack</option>
                  <option value={`drink`}>Drink</option>
                </select>
                <label htmlFor="NewItemForm-name">
                  Name:
                  </label>
                <input
                  onChange={handleChange}
                  id="NewItemForm-name"
                  name="name"
                  type="text"
                  value={newItemFormData.name}
                  required
                />
                <label htmlFor="NewItemForm-recipe">
                  Recipe:
                  </label>
                <input
                  onChange={handleChange}
                  id="NewItemForm-recipe"
                  name="recipe"
                  type="text"
                  value={newItemFormData.recipe}
                  required
                />
                <label htmlFor="NewItemForm-description">
                  Description:
                  </label>
                <input
                  onChange={handleChange}
                  id="NewItemForm-description"
                  name="description"
                  type="text"
                  value={newItemFormData.description}
                  required
                />
                <label htmlFor="NewItemForm-serving-instructions">
                  Serving Instructions:
                  </label>
                <input
                  onChange={handleChange}
                  id="NewItemForm-serving-instructions"
                  name="serve"
                  type="text"
                  value={newItemFormData.serve}
                  required
                />
                <Button type="submit">Add Item!</Button>
              </form>
              {error && <Error error={error} />}
            </CardBody>
          </Card>
        </div>
        <div className="col-1 col-sm-2 col-lg-4"></div>
      </div>
    </div >
  )

}

export default NewItemForm;