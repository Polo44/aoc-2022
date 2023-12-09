import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { orderBy, range } from 'lodash'

const Answer5 = () => {
    const [values, setValues] = useState([])
    const [values2, setValues2] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                const tmpData = text.replaceAll('\r', '').split('\n')
                setData(tmpData.slice(1))
                setValues(tmpData[0].replaceAll('seeds: ', '').split(' ').map(d => ({ end: parseInt(d) })))
                setValues2(tmpData[0].replaceAll('seeds: ', '').split(' ').map(d => parseInt(d)))
            })
    }, [])

    const getNewValue = ([newRange, startRange, nbValues], { start, end }) => {
        if (!end && start >= startRange && start <= startRange + nbValues) {
            return { start, end: newRange + start - startRange  }
        }
        return { start, end }
    }

    const run = (setOfValues) => orderBy(data.reduce((acc, line) => {
        if (line.length === 0) {
            return acc.map(a => ({ start: a.end || a.start }))
        } else if (line.includes('to')) {
            return acc
        }
        return acc.map(value => getNewValue(line.split(' ').map(d => parseInt(d)), value))
    }, setOfValues), 'start')

    const answer1 = run(values)

    const newValues2 = values2.reduce((acc, value, index) => {
        return index % 2 === 0 ?
            { ...acc, current: { start: value } } :
            { ...acc, dataSet: [ ...acc.dataSet, { ...acc.current, end: acc.current.start + value, isRun: false }] }
    }, { current: {}, dataSet: [] })

    const getNewValue2 = ([newRange, startRange, nbValues], current) => {
        const { start, end, isRun } = current
        const endRange = startRange + nbValues

        if (isRun || (startRange > end || endRange < start)) {
            return [current]
        }

        const { newStart, first } = (() => {
            if (start > startRange) {
                return { newStart: { start: start - startRange + newRange, isRun: true }}
            } else if (start === startRange) {
                return { newStart: { start: newRange, isRun: true } }
            }
            return { first: { start, end: startRange - 1 }, newStart: { start: newRange } }
        })()

        const { newEnd, third } = (() => {
            if (end < endRange) {
                return { newEnd: { end: newRange + end - startRange, isRun: true } }
            } else if (end === endRange) {
                return { newEnd: { end: newRange + nbValues, isRun: true } }
            }
            return { third: { start: endRange + 1, end }, newEnd: { end: newRange - startRange + end } }
        })()

        return [first, { ...newStart, ...newEnd }, third].filter(d => !!d )
    }

    const run2 = (setOfValues) => data.reduce((acc, line) => {
        if (line.length === 0) {
            return acc.map(a => ({ ...a, isRun: false }))
        } else if (line.includes('to')) {
            return acc
        }

        return acc.flatMap(value => getNewValue2(line.split(' ').map(d => parseInt(d)), value))
    }, setOfValues)

    const answer2 = orderBy(run2(newValues2?.dataSet), 'start')

    return (
        <div className="App">
            Day 5 :
            <div>
                {answer1?.[0]?.start}
            </div>
            <div>
                {answer2?.[0]?.start}
            </div>
        </div>
    );
}

export default Answer5
