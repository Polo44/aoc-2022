import { compact, uniq } from "lodash";
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

    const find = (nbSlice) => {
        return data.map((_, i) => {
            if (i < data.length - nbSlice) {
                return uniq(data.slice(i, i + nbSlice)).length === nbSlice ? i + nbSlice : null
            }
            return null
        }).filter(d => !!d)
    }

    return (
        <div className="App">
            <div>
                {find(4)[0]}
            </div>
            <div>
                {find(14)[0]}
            </div>
        </div>
    )
}

export default Answer6
