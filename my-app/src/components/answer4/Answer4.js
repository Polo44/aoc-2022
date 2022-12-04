import { sum } from "lodash";
import React, { useEffect, useState } from "react";
import raw from './input.txt'

const Answer4 = ({
}) => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n').map(d => d.split(',').flatMap(d => d.split('-')).map(d => parseInt(d))))
            });
    }, [])

    const result = sum(data.map(v => {
        if ((v[0] <= v[2] && v[1] >= v[3]) || (v[0] >= v[2] && v[1] <= v[3])) {
            return 1
        }
        return 0
    }))

    const result2 = sum(data.map(v => {
        if ((v[0] >= v[2] && v[0] <= v[3]) || (v[1] >= v[2] && v[1] <= v[3])) {
            return 1
        }
        if ((v[2] >= v[0] && v[2] <= v[1]) || (v[3] >= v[0] && v[3] <= v[1])) {
            return 1
        }
        return 0
    }))


    return (
        <div className="App">
            <div>
                {result}
            </div>
            <div>
                {result2}
            </div>
        </div>
    );
}

export default Answer4;
