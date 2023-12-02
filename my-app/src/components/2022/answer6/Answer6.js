import { uniq } from "lodash";
import React, { useEffect, useState } from "react";
import raw from './input.txt'

const Answer6 = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split(''))
            })
    }, [])

    const find = (nbSlice) => data.findIndex((_, i) =>  uniq(data.slice(i, i + nbSlice)).length === nbSlice)

    return (
        <div className="App">
            <div>
                {find(4) + 4}
            </div>
            <div>
                {find(14) + 14}
            </div>
        </div>
    )
}

export default Answer6
