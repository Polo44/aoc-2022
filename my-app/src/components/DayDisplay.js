import React, { useState } from 'react'
import { Grid, Button } from '@mui/material'

const DayDisplay = ({
    day = 0,
    result1 = 0,
    result2 = 0,
    getResults = () => {},
    current = false,
}) => {
    const [time, setTime] = useState()

    return (
        <Grid
            item
            xs={2.5}
            style={{
                border: `solid ${current ? '#ee2020' : '#4f88b5'} 5px`,
                borderRadius: '15px',
                padding: 10,
                marginTop: 10
            }}
        >
            <Grid
                container
                justifyContent='center'
                alignItems='center'
            >
                <Grid container justifyContent='center' item xs={12}>Day {day} : {time && `${time}ms`}</Grid>
                <Grid container justifyContent='center' item xs={12}>{result1}</Grid>
                <Grid container justifyContent='center' item xs={12}>{result2}</Grid>
                <Grid container justifyContent='center' item xs={12}>
                    <Button
                        variant='contained'
                        onClick={() => {
                            const start = Date.now();
                            getResults(() => {
                                setTime(Date.now() - start)
                            })
                        }}
                    >
                        Calculate
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DayDisplay
