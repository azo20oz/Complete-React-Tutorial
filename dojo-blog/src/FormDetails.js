import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";

// const FormDetails = () => {
//   const { id } = useParams();
//   const { data: questions, error, isPending } = useFetch('http://localhost:3001/forms/' + id);
//   const history = useHistory();

//   const handleClick = () => {
//     fetch('http://localhost:3001/forms/' + form.id, {
//       method: 'DELETE'
//     }).then(() => {
//       history.push('/');
//     })
//   }

const FormDetails = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [criterias, setCriterias] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState([]);
  //   const {
  //     data: questions,
  //     error,
  //     isPending,
  //   } = useFetch("http://localhost:3001/forms/" + id);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch("http://localhost:3001/forms/" + id, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.questions);
        setIsPending(false);
        setQuestions(data.questions);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      });

    // abort the fetch
    return () => abortCont.abort();
  }, [id]);

  // abort the fetch

  //   const [answers, setAnswers] = useState({

  //   });

  const handleChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

        console.log(id)
          fetch('http://localhost:3001/submit', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  form_id:id,
                  questions:questions,
                  answers:answers,
                
                    // question_text:question.question_text
              })
          })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((question) => (
        <div key={question.question_id}>
          <label htmlFor={`question-${question.question_id}`}>
            {question.question_text}
          </label>
          <input
            required
            type="text"
            id={`question-${question.question_id}`}
            value={answers[question.question_id] || ""}
            onChange={(e) => handleChange(question.question_id, e.target.value)}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormDetails;

// export default FormDetails;
