import React, { useState, useEffect } from 'react'
import Card from './Card'
import Slider from './Slider';
import Footer from './Footer';
const options = ['Brand', 'price', 'discount'];
import Dropdown from './Dropdown';
import Loader from './Loader';
function Smartwatch(p) {

    const port = process.env.NODE_ENV === 'development' ?
        import.meta.env.VITE_DEV_MODE : import.meta.env.VITE_PRO_MODE;
    const [mob, setmob] = useState([]);
    const [np, snp] = useState({ display: "none" })
    const [load, setload] = useState({ display: "block" })
    const [it, setit] = useState([]);
    const arow = ">";
    const Load = async () => {
        console.log("eer");
        const res = await fetch(`${port}/category`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ category: "Smart Watch" }),

            }
        );
        const r = await res.json()
        if (r.success) {
            console.log(r.ans);
            setmob(r.ans)
            setload({ display: "none" })
            snp({ display: "block" })
        }
    }
    const SORT = async (option) => {
        setload({ display: "block" })
        snp({ display: "none" })
        const res = await fetch(`${port}/sort`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ category: "Smart Watch", basis: option, order: "asc" }),

            }
        );
        const r = await res.json()
        if (r.success) {
            setload({ display: "none" })
            snp({ display: "block" })
        }
        setmob(r.Res);

    }
    useEffect(() => { SORT }, [mob])
    useEffect(() => {
        Load();
    }, [it])
    window.scrollTo(0, 0);
    return (
        <>
            <div style={load}><Loader /></div>
            <div style={np}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0px 20px" }}>
                    <h1 className='head-cat'> Smart Watches  {arow}</h1>
                    <div style={{ display: "flex", margin: "10px", alignItems: "center" }}>
                        <p style={{ display: "flex", margin: "10px" }}>Sort by</p>
                        <Dropdown options={options} onSelect={SORT} />

                    </div>
                </div>
                <div>{(mob.length == 0) ? <div className='cards'>
                    {/* {
                        (p.items != []) ? p.items.map((val) => {
                            if (val.category === "Smart Watch")
                                return (
                                    <Card
                                        id={val._id}
                                        company={val.company}
                                        name={val.model_name}
                                        images={val.images}
                                        options={val.options}
                                        price={val.price}
                                        discount={val.discount}
                                        availibilty={val.availibilty}
                                        discription={val.discription}
                                        cartbtn={true}
                                    />
                                );
                        }) : <p>asdf</p>

                    } */}
                </div> : <div className='cards'>
                    {
                        (mob != []) ? mob.map((val) => {
                            return (
                                <Card
                                    id={val._id}
                                    company={val.company}
                                    name={val.model_name}
                                    images={val.images}
                                    options={val.options}
                                    price={val.price}
                                    discount={val.discount}
                                    availibilty={val.availibilty}
                                    discription={val.discription}
                                    cartbtn={true}
                                />
                            );
                        }) : <p>asdf</p>

                    }
                </div>}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Smartwatch