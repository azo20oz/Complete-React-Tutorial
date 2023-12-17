import React, { useState,useEffect, } from 'react';
import { useHistory ,useParams,Link} from 'react-router-dom';
import useFetch from './useFetch';

const SubmissionsList = () => {
  const history = useHistory();
  const { id } = useParams();
//   const [isPending, setIsPending] = useState(true);
//   const [error, setError] = useState(null);
//   const [submissions, setSubmissions] = useState([]);
  const { data: submissions, error, isPending } = useFetch('http://localhost:3001/submissions/' + id);
//   useEffect(() => {
//     const abortCont = new AbortController();
    

//     fetch("http://localhost:3001/submissions/" + id, { signal: abortCont.signal })
//       .then((res) => {
//         if (!res.ok) {
//           // error coming back from server
//           throw Error("could not fetch the data for that resource");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log(data.submissions);
//         setIsPending(false);
//         setSubmissions(data);
//         setError(null);
//       })
//       .catch((err) => {
//         if (err.name === "AbortError") {
//           console.log("fetch aborted");
//         } else {
//           // auto catches network / connection error
//           setIsPending(false);
//           setError(err.message);
//         }
//       });

//     // abort the fetch
//     return () => abortCont.abort();
//   }, [id]);
  const handleBack = () => {
    history.goBack();
  };

return (
    <div>
        {submissions && (
            <>
                
                {submissions.map((submission, index) => (
                    <div key={index}>
                        <h2>Question: {submission.question_text}</h2>
                        <p>Answer: {submission.answer_text}</p>
                        <p>Score: {submission.score}</p>
                        <p>Date: {new Date(submission.submitted_time).toLocaleDateString()}</p>
                    </div>
                ))}
                <Link to={'/'}>
            <h2>BACK</h2>
            
          </Link>
            </>
            
        )}
    </div>
);
};

export default SubmissionsList;