import React, { useEffect, useState } from "react";
import { BALANCE_URL } from "../../configs/api_url";

export default function Balance({token}) {
  const [balance, setBalance] = useState(undefined);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(BALANCE_URL, {
            method: "get",
            headers: {
              'Content-Type': 'application/json', 
              'authorization': `bearer ${token}`
            }
        });
        const data = await response.json();

        if (response.status === 200) {
          setBalance(data.data[0].total);
        } 
      } catch (e) {
        console.error(e);
      }
    }
    fetchBalance()
  }, [token]);

  return (
    <div>
      <h1>Your current balance is{" "}
      <span className="">${balance}</span>
      </h1>
    </div>
  );
}
