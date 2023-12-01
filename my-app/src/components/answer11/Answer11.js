import React, { useEffect, useMemo, useState } from "react";
import raw from './input.txt'

const Answer11 = () => {
    const [monkeys, setMonkeys] = useState([])
    const regex = /(\d[\d\.]*)/g

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setMonkeys(text.split('\n').reduce((acc, d, i) => {
                    const nbs = d.match(regex)?.map(d => parseInt(d)) || []
                    switch (i%7) {
                        case 0: return { ...acc, current: { ...acc.current, monkey: nbs[0] } }
                        case 1: return { ...acc, current: { ...acc.current, items: nbs } }
                        case 2: return { ...acc, current: { ...acc.current, op: d.split('=')[1]} }
                        case 3: return { ...acc, current: { ...acc.current, test: nbs[0] } }
                        case 4: return { ...acc, current: { ...acc.current, t: nbs[0] } }
                        case 5: return { ...acc, [acc.current.monkey]: { ...acc.current, f: nbs[0] }, current: null }
                        default: return acc
                    }
                }, ''))
            })
    }, [])

    // console.log({monkeys})
    const items = Object.keys(monkeys).flatMap(key => monkeys[key]?.items?.map(item => ({ item, key }))).filter(d => d)

    const rounds = (packs, round) => {
        // console.log({packs, round})
        if (round === 0) {
            return packs
        }
        return rounds(packs.map(({ item, key }) => {
            const worry = Math.trunc((eval(monkeys[key].op.replaceAll('old', item)) / 3))
            return { item: worry, key: worry % monkeys[key].test === 0 ? monkeys[key].t : monkeys[key].f }
        }), round - 1)
    }

    const t = useMemo(() => rounds(items, 20), [monkeys])

    return (
        <div className="App">
            <div>
                {t[0]?.item}
            </div>
        </div>
    )
}

export default Answer11
