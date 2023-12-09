import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { countBy, keys, max, orderBy } from 'lodash'

const Answer7 = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n'))
            })
    }, [])

    const heads = { J: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, T: 10, Q: 12, K: 13, A: 14 }

    const orderFirst = data.reduce((acc, line) => {
        const [hand, bid] = line.split(' ')
        const counted = countBy(hand.split('').filter(d => d !== 'J'))
        const cKeys = keys(counted)
        const maxNb = max(cKeys.map(key => counted[key]))
        const maxValues = cKeys.filter(key => counted[key] === maxNb)
        const orderGoodKey = orderBy(maxValues, d => -heads[d])?.[0]
        // replace J par goodkey
        const reducedHand = countBy(hand.split('').map(d => d === 'J' ? orderGoodKey : d))
        const handValues = Object.keys(reducedHand).reduce((acc, key) => acc + reducedHand[key], '')
        const handValue = (() => {
            switch (handValues) {
                case '5': return 'f'
                case '14':
                case '41': return 'c'
                case '32':
                case '23': return 'fh'
                case '311':
                case '131':
                case '113': return 'b'
                case '221':
                case '212':
                case '122': return 'pp'
                case '11111': return 's'
                default:
                    return 'p'
            }
        })()
        return { ...acc, [handValue]: [...acc[handValue], {bid, hand: hand.split('')}]}
    }, { s: [], p: [], pp: [], b: [], fh: [], c: [], f: []})


    const orderSecond = Object.keys(orderFirst).flatMap(key => {
        return orderFirst[key].sort((a, b) => {
            return a.hand.reduce((acc, val, index) => {
                if (acc !== 0) {
                    return acc
                }
                const [first, second] = [heads[val], heads[b.hand[index]]]
                return first === second ? acc : first < second ? -1 : 1
            }, 0)
        })
    })

    const answer1 = orderSecond.reduce((acc, val, index) => acc + ((index+1) * val.bid), 0)

    return (
        <div className="App">
            Day 7 :
            <div>
                {answer1}
            </div>
            {/* <div>
                {answer2?.[0]?.start}
            </div> */}
        </div>
    );
}

export default Answer7
