import React, { useState, useEffect } from 'react'
import OrderCard from './OrderCard';
import Loader from './Loader';
import { json, useNavigate } from "react-router-dom";


function Orders() {
  const port = process.env.NODE_ENV === 'development' ?
    import.meta.env.VITE_DEV_MODE : import.meta.env.VITE_PRO_MODE;
  const [np, snp] = useState({ display: "none" })
  const [p, sp] = useState({
    // marginTop: "10px",
    display: "block"
  });



  const navigate = useNavigate()
  const [order, setorder] = useState([]);
  const ORDER = async () => {
    const res = await fetch(`${port}/getorder`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ email: localStorage.getItem("email") }),

      }
    );

    const ans = await res.json()
    if (ans.success == true) {
      sp({
        display: "none",
        // marginTop: "40px"
      })
      snp({ display: "block" })
    }
    setorder(ans.Res)
    // console.log(ans)
    // console.log(order)
    // if (order.length == 0) {
    //   navigate("/noitem")
    // }
  }
  useEffect(() => { ORDER() }, [])
  return (
    <>
      <div style={p}><Loader /></div>
      <div>
        {
          (order.length != 0) ? order.map((val, i) => {
            return (
              <OrderCard
                image={val.image}
                name={val.name}
                date={val.Date}
                time={val.time}
                price={val.price}
                _id={val.model_id}
              />
            );
          }) : <p style={np}>You does not place any order yet</p>

        }
      </div>
    </>

  )
}

export default Orders