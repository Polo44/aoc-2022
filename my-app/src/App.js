import './App.css';
import React from 'react'
import Answer1 from './components/answer1/Answer1';
import Answer2 from './components/answer2/Answer2';
import Answer3 from './components/answer3/Answer3';

const App = ({
}) => {
    return (
        <div className="App">
            <Answer1 />
            <Answer2 />
            <Answer3 />
        </div>
    )
}

export default App;
