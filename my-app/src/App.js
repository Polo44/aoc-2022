import './App.css';
import React from 'react'
import Answer1 from './components/2024/answer1/Answer1';
import { Grid } from '@mui/material';
import Answer2 from './components/2024/answer2/Answer2';
import Answer3 from './components/2024/answer3/Answer3';
import Answer4 from './components/2024/answer4/Answer4';

const App = () => {
    return (
        <Grid
            container
            justifyContent='space-around'
        >
            <Answer1 />
            <Answer2 />
            <Answer3 />
            <Answer4 />
        </Grid>
    )
}

export default App;
