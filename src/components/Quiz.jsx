import { useState, useCallback } from "react"
import question from "../question"

import quizCompleteImg from "../assets/quiz-complete.png"
import QuestionTimer from "./QuestionTimer"

export default function Quiz() {
    // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState([])
    const activeQuestionIndex = userAnswer.length
    
    const quizIsComplete = activeQuestionIndex === question.length

        const handleSelectAnswer = useCallback(function handleSelectAnswer(answer){
            console.log(answer)
            setUserAnswer((prevUserAnsert) => {
                return [...prevUserAnsert, answer]
            })
        }, [])

        const handleSkipAnswer = useCallback(
            () => handleSelectAnswer(null),
            [handleSelectAnswer]
        )

        if(quizIsComplete){
            return(
                <>
                <div id="summary">
                <img src={quizCompleteImg} />
                    <h2>Finish</h2>
                </div>
                </>
            )
        }

        const shuffledAnser = [...question[activeQuestionIndex].answers]
        shuffledAnser.sort(() => Math.random() - 0.5)

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer} />
                <p>{question[activeQuestionIndex].text}</p>
                <ul id="answers">
                    {shuffledAnser.map((answer)=>(
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
    </div>
    )
}