import React, { useEffect, useState } from "react";
import raw from './input.txt'

const Answer1 = ({
}) => {
    const [data, setData] = useState([0])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.split('\n').map(d => parseInt(d) ? parseInt(d) : null))
            });
    }, [])

    const orderedData = data.reduce((acc, value) => {
        return value ? [...acc.slice(0, acc.length - 1), (parseInt(acc[acc.length - 1]) || 0) + parseInt(value)] : [...acc, 0]
    }, []).sort((a, b) => b - a)

    console.log({ orderedData })

    return (
        <div className="App">
            <div>
                {orderedData[0]}
            </div>
            <div>
                {orderedData[0] + orderedData[1] + orderedData[2]}
            </div>
        </div>
    );
}

export default Answer1;
