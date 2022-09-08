import React from "react";
import { Link } from "react-router-dom";


export default function OperationItem({amount, concept, date, id, type, category}) {

    return(
        <div>
            <p> ID transaction:{id} </p>
            <p> Amount:{amount} </p>
            <p> Concept:{concept} </p>
            <p> Date:{date} </p>
            <p> Type:{type} </p>
            <p> Category:{category} </p>
            <p></p>
            <Link to={"/transaction/edit/" + id}>
            Edit
            </Link>
            <Link to={"/transaction/delete/" + id}>
            Delete
            </Link>

        </div>
    )
}