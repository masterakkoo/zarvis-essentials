import React, { useEffect, useState } from 'react'
import { product, setproduct, s, sset } from "./Usacontextreducer"
import Card from './Card';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import "../css/search.css"
function Search() {
    const [np, snp] = useState({ display: "none" })
    const [load, setload] = useState({ display: "block" })
    const { s1 } = useParams();
    const port = process.env.NODE_ENV === 'development' ?
        import.meta.env.VITE_DEV_MODE : import.meta.env.VITE_PRO_MODE;
    console.log(s1);
    const search = s();
    // console.log(search)
    // const [abc, setabc] = useState("")
    // setabc(search);
    const [a, seta] = useState([]);
    const SHOW = async () => {
        const res = await fetch(`${port}/search`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ word: s1 }),

            }

        );
        const ans = await res.json()
        if (ans.success) {

            seta(ans.Res)
            setload({ display: "none" })
            snp({ display: "block" })
        }
        console.log(ans)

        console.log(a)
    }
    useEffect(() => { SHOW() }, [search])
    return (
        <>
            <div style={load}><Loader /></div>
            <div className='search-item1' style={np}>
                <h4>Showing results for {s1} {"»"} </h4>
                <div className='search-item' >

                    {(a.length !== 0) ? a.map((val) => {
                        return (<Card
                            id={val._id}
                            name={val.model_name}
                            company={val.company}
                            images={val.images}
                            options={val.options}
                            price={val.price}
                            discount={val.discount}
                            discription={val.discription}
                            cartbtn={true}
                        />)
                    }) : <p>NO DATA FOUND</p>}
                </div>
            </div>
        </>
    )
}

export default Search;