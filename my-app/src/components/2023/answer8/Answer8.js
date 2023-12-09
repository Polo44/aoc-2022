import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { keys } from 'lodash'

const Answer8 = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n'))
            })
    }, [])

    const pattern = data[0]

    const nodes = data.slice(2).reduce((acc, line) => {
        const matches = [...line.matchAll('([A-Z|0-9]{3}) = \\(([A-Z|0-9]{3}), ([A-Z|0-9]{3})\\)')]
        return { ...acc, [matches[0][1]]: { l: matches[0][2], r: matches[0][3] } }
    }, {})

    let index = 0
    let current = 0
    let checkNodes = keys(nodes).reduce((acc, key) => key.charAt(2) === 'A' ? [...acc, key] : acc, [])
    let res = checkNodes.map(_ => 0)

    let t

    const gcd = (a, b) => {
        while (b) {
            t = b
            b = a % b
            a = t
        }
        return a
    }

    if (data.length) {
        while (!checkNodes.every(d => d === 'Z')) {
            current = pattern.charAt(index % pattern.length)
            checkNodes = checkNodes.map((nodeName, i) => {
                if (nodeName === 'Z') {
                    return nodeName
                } else if (nodeName.charAt(2) === 'Z') {
                    res[i] = index
                    return 'Z'
                }
                return current === 'L' ? nodes[nodeName].l : nodes[nodeName].r
            })
            index += 1
        }
    }

    console.log({ res })

    const answer2 = checkNodes.length ? res.reduce((acc, val) => (acc / gcd(acc, val)) * val) : 0

    const run = (nodeName, index) => {
        if (nodeName === 'ZZZ') {
            return index
        }
        const node = nodes[nodeName]
        const current = pattern.charAt(index % pattern.length)
        const nextNode = current === 'L' ? node.l : node.r
        const newIndex = index + 1
        return run(nextNode, newIndex)
    }

    const answer1 = data.length ? run('AAA', 0, 0) : 0

    return (
        <div className="App">
            Day 8 :
            <div>
                {answer1}
            </div>
            <div>
                {answer2}
            </div>
        </div>
    );
}

export default Answer8
