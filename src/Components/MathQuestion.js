import React, { useEffect, useState } from 'react';
import { MathJax } from 'better-react-mathjax';
import { Form } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import './MathQuestion.css';

const MathQuestion = () => {
    const [isLoading, setIsloading] = useState(true);
    const questionID = ['AreaUnderTheCurve_901', 'BinomialTheorem_901', 'DifferentialCalculus2_901'];
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    let url = `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questionID[id]}`;
    useEffect(() => {
        const fetchApi = async () => {
            const fetchedQues = await fetch(url);
            const data = await fetchedQues.json();
            setQuestion(data[0].Question);
            setTitle(data[0].ChapterID);
            setIsloading(false);
        };
        fetchApi();
    }, [id, url]);
    return (
        <div className={`container mt-5 ${isLoading ? 'loader' : ''}`}>
            {isLoading ? <CircularProgress color="inherit" />
                : <div className='content'>
                    <h2><strong>{title}</strong></h2>
                    {question && <MathJax>{question}</MathJax>}
                    <div>
                        <Form.Group className="mb-3">
                            <Form.Label>Code Editor : </Form.Label>
                            <Form.Control as="textarea" rows={6} placeholder='// Your Code Here...' />
                        </Form.Group>
                    </div>
                    <div className='buttons'>
                        <button onClick={() => setId(prev => prev - 1)} disabled={id === 0} className='btn btn-dark'>PREV</button>
                        <button onClick={() => setId(prev => prev + 1)} disabled={id === questionID.length - 1} className='btn btn-dark'>NEXT</button>
                    </div>
                </div>}
        </div>
    );
};

export default MathQuestion;

