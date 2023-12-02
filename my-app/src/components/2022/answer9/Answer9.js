import { max } from "lodash";
import React, { useEffect, useState } from "react";
import raw from './input.txt'

const Answer9 = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n').map(d => d.split(' ')))
            })
    }, [])

    const S = (0, 0)
    const T = (0, 0)

    const result1 = data.reduce((acc, value) => {

    })

    return (
        <div className="App">
            <div>
                {result1}
            </div>
            {/* <div>
                {result2}
            </div> */}
        </div>
    )
}

export default Answer9
