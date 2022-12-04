import './App.css';
import React from 'react'
import Answer1 from './components/answer1/Answer1';
import Answer2 from './components/answer2/Answer2';
import Answer3 from './components/answer3/Answer3';
import Answer4 from './components/answer4/Answer4';

const App = ({
}) => {
    return (
        <div className="App">
            <Answer1 />
            <Answer2 />
            <Answer3 />
            <Answer4 />
        </div>
    )
}

export default App;
