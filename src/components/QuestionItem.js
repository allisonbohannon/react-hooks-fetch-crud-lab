import React from "react";

function QuestionItem({ question, onDelete, onAnswerUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(event) {
    const questionID = event.target.parentNode.id

    fetch(`http://localhost:4000/questions/${questionID}`, {
      method: "DELETE"})
      .then(response => response.json())
      .then(() => onDelete(parseInt(questionID)))
  }

  function handleChange(event) {
    const newCorrectIndex = event.target.value
    const questionID = event.target.parentNode.parentNode.id
    console.log(questionID)
    console.log(`http://localhost:4000/questions/${questionID}`)

    fetch(`http://localhost:4000/questions/${questionID}`, {
      method:"PATCH",
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({correctIndex : newCorrectIndex})
    })
    .then(response => response.json())
    .then(data => onAnswerUpdate(data))

  }

  return (
    <li id={id}>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
