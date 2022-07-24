import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List")
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(response => response.json())
    .then(data => setQuestions(data))
  },[])

  function handleAddQuestion(newQuestion) {
    const updatedQuestions = [...questions, newQuestion]; 
    setQuestions(updatedQuestions); 
    setPage(""); 
  }

  function handleDelete(questionID) {
    const updatedQuestions = questions.filter(question => {
      console.log(question.id, questionID)
      return question.id !== questionID})
    setQuestions(updatedQuestions); 
  }; 

  function handleAnswerUpdate(updatedQuestion) {
    const updatedQuestions = questions.map(question => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion; 
      }
      return question; 
    })
    setQuestions(updatedQuestions); 
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion} /> : <QuestionList questions={questions} onDelete={handleDelete} onAnswerUpdate={handleAnswerUpdate}/>}
    </main>
  );
}

export default App;
