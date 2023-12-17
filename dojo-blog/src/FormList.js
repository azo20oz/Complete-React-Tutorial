import { Link } from 'react-router-dom';

const FormList = ({ forms }) => {



  return (
    <div className="form-list">
      
      {forms.map(form => (
        <div className="form-preview" key={form.form_id} >
          <Link to={`/forms/${form.form_id}`}>
            <h2>{ form.form_name }</h2>
            <p>Created at { form.created_at}</p>
          </Link>
          <Link to={`/submissions/${form.form_id}`}> View Submission</Link>
        </div>
      ))}
    </div>
  );
}

export default FormList;