import React from "react";
import { Link } from "react-router-dom";
import "./CafeMenu.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";

/**CafeMenu
 *
 * Props:
 * - type: string
 * - items: array of objects [{id, name, description, recipe, serve}...]
 * - title: string
 *
 * State:
 * - none
 *
 * App --> NavBar, Routes --> CafeMenu
 */
function CafeMenu({ type, items, title }) {

  return (
    <section className="CafeMenu col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {title} Menu
          </CardTitle>
          <CardText>
            Please enjoy some of our {type} listed below!
          </CardText>
          <ListGroup>
            {items.map(item => (
              <Link to={`/${type}/${item.id}`} key={item.id}>
                <ListGroupItem>{item.name}</ListGroupItem>
              </Link>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default CafeMenu;