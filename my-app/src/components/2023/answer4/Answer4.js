import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { range } from 'lodash'

const Answer4 = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.split('\n'))
            });
    }, [])

    const answer1 = data.reduce((acc, line) => {
        const parts = line.match('.*.: (.*) \\|(.*)')
        const matches = [...(parts[2] + ' ').matchAll(`(?:(${parts[1].trimStart().replaceAll('  ', ' ').split(' ').map(d => d.length === 1 ? ` ${d} ` : d).toString().replaceAll(',', '|')}))`)]
        return acc + (matches.length ? Math.pow(2, matches.length - 1) : 0)
    }, 0)

    const answer2 = data.reduce((acc, line, index) => {
        const current = (acc[index + 1] || 0) + 1
        const parts = line.match('.*.: (.*) \\|(.*)')
        const matches = [...(parts[2] + ' ').matchAll(`(?:(${parts[1].trimStart().replaceAll('  ', ' ').split(' ').map(d => d.length === 1 ? ` ${d} ` : d).toString().replaceAll(',', '|')}))`)]
        const values = matches.length ? range(index + 1, index + 2 + matches.length).reduce((accValues, value) => ({ ...accValues, [value]: (acc[value] || 0) + current })) : {}
        return {
            ...acc,
            [index + 1]: current,
            total: acc.total + current,
            ...values,
        }
    }, { total: 0 })

    return (
        <div className="App">
            Day 4 :
            <div>
                {answer1}
            </div>
            <div>
                {answer2.total}
            </div>
        </div>
    );
}

export default Answer4
