import React, { useState } from 'react';

const CreateForm = () => {
    const [form, setForm] = useState({ title: '', questions: [{ question: '', criteria: [''] }] });

  const handleQuestionChange = (e, index) => {
    const newQuestions = [...form.questions];
    newQuestions[index].question = e.target.value;
    setForm({ ...form, questions: newQuestions });
  };

  const handleCriteriaChange = (e, questionIndex, criteriaIndex) => {
    const newQuestions = [...form.questions];
    newQuestions[questionIndex].criteria[criteriaIndex] = e.target.value;
    setForm({ ...form, questions: newQuestions });
  };
  const handleTitleChange = (e) => {
    setForm({ ...form, title: e.target.value });
  };
  
  const addQuestion = () => {
    setForm({ ...form, questions: [...form.questions, { question: '', criteria: [''] }] });
  };

  const addCriteria = (index) => {
    const newQuestions = [...form.questions];
    newQuestions[index].criteria.push('');
    setForm({ ...form, questions: newQuestions });
  };

  const deleteQuestion = (index) => {
    const newQuestions = [...form.questions];
    newQuestions.splice(index, 1);
    setForm({ ...form, questions: newQuestions });
  };

  const deleteCriteria = (questionIndex, criteriaIndex) => {
    const newQuestions = [...form.questions];
    newQuestions[questionIndex].criteria.splice(criteriaIndex, 1);
    setForm({ ...form, questions: newQuestions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    console.log(form.title);
    console.log(form.questions);
    fetch('http://localhost:3001/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title:form.title,
            questions:form.questions,
            
        
        })
    })
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
    
  };

  return (
    <form onSubmit={handleSubmit}>
        <input
      required
      type="text"
      placeholder="Title"
      value={form.title}
      onChange={handleTitleChange}
    />
      {form.questions.map((q, qIndex) => (
        <div key={qIndex}>
          <input
          required
            type="text"
            placeholder="Question"
            value={q.question}
            onChange={(e) => handleQuestionChange(e, qIndex)}
          />
          <button type="button" onClick={() => deleteQuestion(qIndex)}>Delete Question</button>
          {q.criteria.map((c, cIndex) => (
            <div key={cIndex}>
              <input
              required
                type="text"
                placeholder="Criteria"
                value={c}
                onChange={(e) => handleCriteriaChange(e, qIndex, cIndex)}
              />
              <button type="button" onClick={() => deleteCriteria(qIndex, cIndex)}>Delete Criteria</button>
            </div>
          ))}
          <button type="button" onClick={() => addCriteria(qIndex)}>Add Criteria</button>
        </div>
      ))}
      <button type="button" onClick={addQuestion}>Add Question</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateForm;