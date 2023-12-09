import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { range, uniq } from 'lodash'

const Answer3 = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n'))
            });
    }, [])

    const stars = data.reduce((acc, line, index) => {
        const matches = [...line.matchAll('[^0-9|\\.]')]
        return matches.length ? [...acc, ...matches.reduce((accM, v) => ([...accM, { l: index, c: v.index, v: v[0] }]), [])] : acc
    }, [])

    const answer1 = data.reduce((acc, line, index) => {
        const matches = [...line.matchAll('[0-9]+')]
        const lines = range(index - 1, index + 2)

        return acc + matches.reduce((acc, m) => {
            const cols = range(m.index - 1, m.index + m[0].length + 1)
            const condition = lines.some(l => cols.some(c => {
                return stars.some(s => s.l === l && s.c === c)
            }))
            return acc + (condition ? parseInt(m[0]) : 0)
        }, 0)
    }, 0)

    const values = data.reduce((acc, line, index) => {
        const matches = [...line.matchAll('[0-9]+')]
        return matches.length ? [...acc, ...matches.reduce((accM, v) => {
            const toAdd = range(0, v[0].length).map(d => ({ l: index, c: d + v.index, v: v[0] }))
            return [...accM, ...toAdd]
        }, [])] : acc
    }, [])

    const answer2 = data.reduce((acc, line, index) => {
        const matches = [...line.matchAll('\\*')]
        const lines = range(index - 1, index + 2)

        return acc + matches.reduce((acc, m) => {
            const cols = range(m.index - 1, m.index + 2)
            const condition = uniq(lines.flatMap(l => {
                return cols.reduce((accC, c) => {
                    const toAdd = values.find(v => v.c === c && v.l === l)
                    return toAdd ? [...accC, toAdd.v] : accC
                }, [])
            }))
            return condition.length === 2 ? acc + (condition[0] * condition[1]) : acc
        }, 0)
    }, 0)

    return (
        <div className="App">
            Day 3 :
            <div>
                {answer1}
            </div>
            <div>
                {answer2}
            </div>
        </div>
    );
}

export default Answer3
