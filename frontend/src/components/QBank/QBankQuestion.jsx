import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function QBankQuestion() {
    const api = import.meta.env.VITE_API_URL;
    const { chapterId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [submittedQuestions, setSubmittedQuestions] = useState({});
    const [currIndex, setCurrIndex] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [timeTaken, setTimeTaken] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    const timerRef = React.useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchQ = async () => {
            try {
                sessionStorage.setItem("redirectTo", window.location.pathname);
                const { data } = await axios.get(`${api}/questions/all/${chapterId}`, { withCredentials: true });
                if (data.success) {
                    setQuestions(data.questions);
                    setStartTime(Date.now()); 
                } else {
                    navigate('/login');
                }
            } catch (error) {
                navigate('/login');
            }
        };
        fetchQ();
    }, [chapterId]);

        useEffect(() => {
        timerRef.current = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);

        return () => clearInterval(timerRef.current); 
        }, [startTime]);
            const handleOption = (questionId, optionNum) => {
                setSelectedOptions(prev => ({
                    ...prev,
                    [questionId]: optionNum
                }));
            };

 const handleSubmit = async() => {
    const question = questions[currIndex];
    const selected = selectedOptions[question._id];
    const isCorrect = question.answer === selected;
    const timeSpent = elapsedTime; 
    const questionId=question._id;
    const workout={questionId,selected,timeSpent};
    const {data}=await axios.post(`${api}/users/workout`,{workout},{withCredentials:true,headers:{"Content-Type" : "application/json"}});
    clearInterval(timerRef.current);

    setSubmittedQuestions(prev => ({
        ...prev,
        [question._id]: isCorrect ? 'correct' : 'wrong'
    }));
    setTimeTaken(prev => [...prev, timeSpent]);
};


const handleSkip = () => {
    clearInterval(timerRef.current); 

    setSubmittedQuestions(prev => ({
        ...prev,
        [questions[currIndex]._id]: 'skipped'
    }));
    console.log(timeTaken);
    setTimeTaken(prev => [...prev, 0]);
    handleNext();
};


const handleNext = () => {
    const next = currIndex + 1;
    if (next < questions.length) {
        setCurrIndex(next);
        setStartTime(Date.now());
        setElapsedTime(0); 
    } else {
        alert("You have completed all questions.");
    }
};


    if (questions.length === 0) return <p className="pt-24 text-center">Loading questions...</p>;

    const question = questions[currIndex];
    const isSubmitted = submittedQuestions[question._id];
    const selected = selectedOptions[question._id];

    return (
        <div className="pt-24 min-h-screen bg-[#f5f7fa] px-6 py-12">
            <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
                📝 Question {currIndex + 1} of {questions.length} 
               <b className='mx-4 text-base text-gray-600'>
     ⏱️ Time spent on this question: {elapsedTime} sec
    </b>
            </h1>

            <div className="bg-white max-w-4xl mx-auto border border-gray-200 rounded-xl shadow-sm p-6">
                <p className="text-lg font-medium text-gray-800 mb-4">{question.question}</p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {question.options.map(option => {
                        const isCorrect = question.answer === option.num;
                        const isSelected = selected === option.num;
                        let bgColor = 'bg-white text-gray-800 border';

                        if (isSubmitted) {
                            if (isCorrect) bgColor = 'bg-green-600 text-white';
                            else if (isSelected) bgColor = 'bg-red-600 text-white';
                        } else if (isSelected) {
                            bgColor = 'bg-sky-500 text-white';
                        }

                        return (
                            <li key={option.content}>
                                <button
                                    onClick={() => handleOption(question._id, option.num)}
                                    className={`w-full py-2 px-4 rounded-lg transition font-semibold shadow-sm ${bgColor}`}
                                    disabled={!!isSubmitted}
                                >
                                    ({option.num}) {option.content}
                                </button>
                            </li>
                        );
                    })}
                </ul>

                {!isSubmitted && (
                    <div className="space-x-4">
                        <button
                            onClick={handleSubmit}
                            className="bg-sky-600 text-white px-6 py-2 rounded-md hover:bg-sky-700 transition"
                        >
                            Submit
                        </button>

                        <button
                            onClick={handleSkip}
                            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
                        >
                            Skip
                        </button>
                    </div>
                )}
                {isSubmitted && (
                    <>
                        <div className="mt-4 text-gray-700">
                            <strong className="text-indigo-800">Explanation:</strong>{' '}
                            {question.explanation || "No explanation provided."}
                        </div>
                        <button
                            onClick={handleNext}
                            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                        >
                            Next
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default QBankQuestion;
