import React from "react";
import {
  Card,
  CardBody,
  CardTitle
} from "reactstrap";

/** NotFound
 * 
 * Props:
 * - none
 * 
 * State:
 * - none
 * 
 * App --> Routes --> NotFound
 */
function NotFound() {

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            <h1>This page could not be found.</h1>
          </CardTitle>
          <h2>To return home, click <a href="/">here.</a></h2>
        </CardBody>
      </Card>
    </div>
  )

}

export default NotFound;