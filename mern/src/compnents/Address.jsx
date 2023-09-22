import React, { useState, useContext } from 'react'
import "../css/address.css"
import { json, useNavigate } from "react-router-dom";
import { product, setproduct } from "./Usacontextreducer"
const i = "https://mdbcdn.b-cdn.net/img/Others/extended-example/delivery.webp";
function Address() {

    const port = process.env.NODE_ENV === 'development' ?
        import.meta.env.VITE_DEV_MODE : import.meta.env.VITE_PRO_MODE;

    const data = JSON.parse(localStorage.getItem("data1"))
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let pro = product();
    console.log(pro)
    const navigate = useNavigate();
    const [user, setuser] = useState({ address: "", state: "", city: "", no: "", ano: "" });
    const Handle = (e) => {
        console.log(e);
        const nam = e.target.name;
        const val = e.target.value;
        setuser({ ...user, [nam]: val })
        console.log(user)

        // console.log(arr[user.state - 2])

    }
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;

            script.onload = () => {
                resolve(true);
            }

            script.onerror = () => {
                resolve(false);
            }

            document.body.appendChild(script);
        })
    }
    const checkout = async () => {

        const scri = "https://checkout.razorpay.com/v1/checkout.js";

        const res = await loadScript(scri);
        console.log(res)
        if (!res)
            alert("you are offline....")

        const pro_price = 100 * localStorage.getItem("foot");
        const Order = async () => {
            const res = await fetch(`${port}/order`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email: localStorage.getItem("email"), name: data.name, model_id: data.id, model_name: data.name, price: localStorage.getItem("foot"), image: data.images[0],
                    Date: date, time: time
                })

            })
            const r = await res.json()
            if (r.success == true) {
                navigate("/orderplaced")
            }
        }
        var options = {
            "key": 'rzp_test_4bGLawm7Av2D37', // Enter the Key ID generated from the Dashboard
            "amount": pro_price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Zarvis Essentials", //your business name
            "description": "Make your payment",
            "image": "https://w7.pngwing.com/pngs/571/686/png-transparent-jarvis-logo-edwin-jarvis-iron-man-youtube-marvel-cinematic-universe-male-jarvis-ui-comics-superhero-computer-thumbnail.png",
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "" //Provide the customer's phone number for better conversion rates 
            },
            handler: function (response) {
                Order();
            }

        };

        const payment = new window.Razorpay(options);
        payment.open();
    }
    // const BUY = async (e) => {
    //     e.preventDefault();
    //     console.log(user)
    //     if (localStorage.getItem("authToken")) {
    //         const res = await fetch("https://zarvisessentials.onrender.com/address", {
    //             method: "POST",
    //             headers: {
    //                 "content-type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 email: localStorage.getItem("email"), ...user
    //             })
    //         })


    //         const re = await fetch("https://zarvisessentials.onrender.com/order", {
    //             method: "POST",
    //             headers: {
    //                 "content-type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 email: localStorage.getItem("email"), name: data.name, model_id: data.id, model_name: data.name, price: localStorage.getItem("foot"), image: data.images[0],
    //                 date: date, time: time
    //             })

    //         })
    //         const r = await re.json()
    //         if (r.success == true) {
    //             navigate("/orderplaced")
    //         }
    //     }
    // if (localStorage.getItem("authToken")) {
    //     const res = await fetch("http://localhost:4000/order", {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             email: localStorage.getItem("email"), name: data.name, model_id: data.id, model_name: data.name, price: foot, image: data.images[0]
    //         })
    //     })
    // }
    // else {
    //     navigate("/login")
    // }
    // }
    return (
        <>
            <div className='bbb'>
                <div class="container py-3 add-cont">
                    <div class="row d-flex justify-content-center align-items-center">
                        <div class="col">
                            <div class="card my-4  row-cont card2">
                                <div class="row g-0 ">
                                    <div class="col-xl-6 d-xl-block bg-image">
                                        <img src={i} alt="Sample photo"
                                            class="img-fluid" />
                                        <div class="mask" >
                                            <div class=" justify-content-center align-items-center ">
                                                <div class=" text-center">
                                                    <i class="fas fa-truck text-white fa-3x"></i>
                                                    <p class="text-white title-style">Lorem ipsum delivery</p>
                                                    <p class="text-white mb-0"></p>

                                                    <figure class="text-center mb-0">
                                                        <blockquote class="blockquote text-white">
                                                            <p class="pb-3">
                                                                <i class="fas fa-quote-left fa-xs text-primary"></i>
                                                                <span class="lead font-italic">Everything at your doorstep.</span>
                                                                <i class="fas fa-quote-right fa-xs text-primary"></i>
                                                            </p>
                                                        </blockquote>

                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-6">
                                        <div class="card-body p-md-5 text-black">
                                            <h3 class="mb-4 text-uppercase">Delivery Info</h3>

                                            <div class="row">
                                                <div class="col-md-6 mb-4">
                                                    <div class="form-outline">
                                                        <input type="text" id="form3Example1m" class="form-control form-control-lg" />
                                                        <label class="form-label" for="form3Example1m">First name</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 mb-4">
                                                    <div class="form-outline">
                                                        <input type="text" id="form3Example1n" class="form-control form-control-lg" />
                                                        <label class="form-label" for="form3Example1n">Last name</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-outline mb-4">
                                                <input type="text" id="form3Example8" class="form-control form-control-lg" name="address" value={user.address} onChange={Handle} />
                                                <label class="form-label" for="form3Example8">Address</label>
                                            </div>



                                            <div class="row">
                                                <div class="col-md-6 mb-4">

                                                    <select class="select" name="state" value={user.state} onChange={Handle}  >
                                                        <option value="1">State</option>
                                                        <option value="2">Uttar pradesh</option>
                                                        <option value="3">Punjab</option>
                                                        <option value="4">Uttarkhand</option>
                                                    </select>

                                                </div>
                                                <div class="col-md-6 mb-4">

                                                    <select class="select" name="city" value={user.city} onChange={Handle} >
                                                        <option value="1">City</option>
                                                        <option value="2">Kanpur</option>
                                                        <option value="3">Ludhiana</option>
                                                        <option value="4">Nanital</option>
                                                    </select>

                                                </div>
                                            </div>

                                            <div class="form-outline mb-4">
                                                <input type="text" id="form3Example3" class="form-control form-control-lg" />
                                                <label class="form-label" for="form3Example3">Zip</label>
                                            </div>

                                            <div class="form-outline mb-4">
                                                <input type="tel" id="form3Example2" class="form-control form-control-lg" name="no" value={user.no} onChange={Handle} />
                                                <label class="form-label" for="form3Example2">Contact Number</label>
                                            </div>
                                            <div class="form-outline mb-4">
                                                <input type="tel" id="form3Example2" class="form-control form-control-lg" name="ano" value={user.ano} onChange={Handle} />
                                                <label class="form-label" for="form3Example2">Alternate Contact Number</label>
                                            </div>

                                            <div class="d-flex justify-content-end pt-3">
                                                <button type="button" class="btn btn-success btn-lg ms-2" onClick={checkout}>Checkout</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Address;