import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

/** Home 
 * 
 * Props:
 * - drinks: array of objects [{id, name, description, recipe, serve}...]
 * - snacks: array of objects [{id, name, description, recipe, serve}...]
 * 
 * State:
 * - none
 *  
 * App--> NavBar, Routes --> Home
 * */
function Home({ drinks, snacks }) {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Silicon Valley's premier dive cafe!
            </h3>
            <h4>
              Now offering a selection of {snacks.length} different
              snacks and {drinks.length} different drinks!
            </h4>
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;