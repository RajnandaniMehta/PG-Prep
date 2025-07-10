import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function QBankQuestion() {
    const { subjectId, chapterId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [submittedQuestions, setSubmittedQuestions] = useState({});
    useEffect(() => {
        const fetchQ = async () => {
            const { data } = await axios.get(`/api/${subjectId}/${chapterId}`);
            setQuestions(data.questions);
        }
        fetchQ();
    }, [])
    const handleOption = (questionId, optionNum) => {
        console.log(optionNum);
        setSelectedOptions(prev => ({
            ...prev,
            [questionId]: optionNum
        }))
    }
    const handleSubmit = (questionId, correctOption) => {
        const selected = selectedOptions[questionId];
        const isCorrect = correctOption === selected
        setSubmittedQuestions(prev => ({
            ...prev,
            [questionId]: isCorrect ? 'correct' : 'wrong'
        }))

    }
    return (
        <div className="pt-24 min-h-screen bg-[#f5f7fa] px-6 py-12">
            <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
        📝 Practice Questions
      </h1>
            <ul className="space-y-8 max-w-4xl mx-auto">
                {questions.map((item) => (
                    <li key={item._id}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                         <p className="text-lg font-medium text-gray-800 mb-4">
               {item.question}
            </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            {item.options.map((option) => {
                                const isSelected = selectedOptions[item._id] === option.num;
                                const isSubmitted = submittedQuestions[item._id];
                                const isCorrectAnswer = item.answer === option.num;
                                let bgColor = 'bg-white text-gray-800 border';
                                if (isSubmitted) {
                                    if (isCorrectAnswer) {
                                        bgColor = 'bg-green-600 text-white';
                                    } else if (isSelected && !isCorrectAnswer) {
                                        bgColor = 'bg-red-600 text-white';
                                    }
                                } else if (isSelected) {
                                    bgColor = 'bg-sky-500 text-white';
                                }
                                return (
                                    <li key={option.content}>
                                        <button onClick={() => handleOption(item._id, option.num)}
                                            className={` w-full py-2 px-4 rounded-lg transition duration-200 font-semibold shadow-sm ${bgColor}`}>({option.num}){option.content}</button>
                                    </li>
                                );
                            }
                            )}
                        </ul>
                        {!submittedQuestions[item._id] && (
                            <button
                                onClick={() => handleSubmit(item._id, item.answer)}
                                 className="bg-sky-600 text-white px-6 py-2 rounded-md hover:bg-sky-700 transition" >
                                submit
                            </button>
                        )}

                        {submittedQuestions[item._id] && (
                            <div className="mt-4 text-gray-700">
                                <strong className="text-indigo-800">Explanation:</strong> {item.explanation || "No explanation provided."}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default QBankQuestion