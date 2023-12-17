import FormList from "./FormList";
import useFetch from "./useFetch";

const Home1 = () => {
  const { error, isPending, data: forms } = useFetch('http://localhost:3001/forms')

  return (
    <div className="forms">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { forms && <FormList forms={forms} /> }
    </div>
  );
}

export default Home1;