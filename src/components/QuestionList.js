import React from "react";
import QuestionItem from "./QuestionItem"

function QuestionList({ questions, onDelete, onAnswerUpdate }) { 
  console.log(questions)
   
  const displayQuestions = questions.map(question => {
    return <QuestionItem key={question.id} question={question} onDelete={onDelete} onAnswerUpdate={onAnswerUpdate} />
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{displayQuestions}</ul>
    </section>
  );
}

export default QuestionList;
