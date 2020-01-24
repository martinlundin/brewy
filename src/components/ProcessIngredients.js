import React from 'react';

export default function ProcessIngredients(props) {
  return (
    <div>
      {props.name}
      {props.amount}
      {props.measurement}
    </div>
  );
}
