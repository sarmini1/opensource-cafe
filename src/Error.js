import React from "react";

/**Error
 *
 * Props:
 * - error: string
 *
 * State:
 * - none
 *
 * App, NewItemForm --> Error
 */
function Error({ error }) {
  return (
    <div className="Error alert alert-danger">
      <h3>An error occurred:</h3>
      {error}
    </div>
  );
}

export default Error;