import React, { useEffect, useState } from "react";
import raw from './input.txt'

const Answer11 = () => {
    const [data, setData] = useState([])
    const regex = /(\d[\d\.]*)/g

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.split('\n').reduce((acc, d, i) => {
                    switch (i%6) {
                        case 7:
                            return
                        default:
                            console.log(d.match(regex))
                            return acc + d.match(regex)
                    }
                    return acc
                }, ''))
            })
    }, [])

    console.log(data)

    const result = 'test'

    return (
        <div className="App">
            <div>
                {result}
            </div>
        </div>
    )
}

export default Answer11
