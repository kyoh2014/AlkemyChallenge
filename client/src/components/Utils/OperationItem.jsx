import "./OperationItem.css";
import React, { useState } from "react";
import TransactionDelete from "../Transactions/TransactionDelete";
import TransactionEdit from "../Transactions/TransactionEdit";
import dateReformat from "./DateReformat";

export default function OperationItem({ token, amount, concept, date, id, type, category }) {
  const [buttonDelete, setButtonDelete] = useState(false);
  const [buttonEdit, setButtonEdit] = useState(false);

  const handleDelete = (e) => {
    setButtonDelete(true);
  };

  const handleEdit = (e) => {
    setButtonEdit(true);
  };

  const handleClose = (e) => {
    setButtonDelete(false);
    setButtonEdit(false);
  };

  return (
    <div className="operation_main">
      <p className="operation_idtransaction"> ID transaction:{id} </p>
      <p className="operation_amount"> Amount: {amount} </p>
      <p className="operation_concept"> Concept: {concept} </p>
      <p className="operation_date"> Date: {dateReformat(date)} </p>
      <p className="operation_type"> Type: {type} </p>
      <p className="operation_category"> Category: {category} </p>
      <div className="operation_buttons">
        <button className="operation_button" onClick={handleEdit}>
          Edit
        </button>
        {buttonEdit && (
          <div className="overlay">
            <div className="popup">
            <button className="button_close" onClick={handleClose}>x</button>
              <TransactionEdit
                setButtonEdit={setButtonEdit}
                token={token}
                elementId={id}
              />
            </div>
          </div>
        )}
        <button className="operation_button" onClick={handleDelete}>
          Delete
        </button>
        {buttonDelete && (
          <div className="overlay">
            <div className="popup">
            <button className="button_close" onClick={handleClose}>x</button>
              <TransactionDelete
                setButtonDelete={setButtonDelete}
                token={token}
                elementId={id}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
