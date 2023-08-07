import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

/**CafeItem
 *
 * Props:
 * - items: array of objects [{id, name, description, recipe, serve}...]
 * - cantFind: string
 *
 * State:
 * - none
 *
 * App --> NavBar, Routes --> CafeItem
 */
function CafeItem({ items, cantFind }) {
  const { id } = useParams();

  let item = items.find(item => item.id === id);
  if (!item) return <Navigate to={cantFind} />;

  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {item.name}
          </CardTitle>
          <CardText className="font-italic">{item.description}</CardText>
          <p>
            <b>Recipe:</b> {item.recipe}
          </p>
          <p>
            <b>Serve:</b> {item.serve}
          </p>
        </CardBody>
      </Card>
    </section>
  );
}

export default CafeItem;