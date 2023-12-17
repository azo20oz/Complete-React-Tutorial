import Navbar from "./Navbar";
// import Home from './Home';
import Home1 from './Home1';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./Create";
import SubmissionsList from "./SubmissionsList";
import CreateForm from "./CreateForm";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";
import FormDetails from "./FormDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home1 />
            </Route>
            <Route path="/create">
              {/* <Create /> */}
              <CreateForm/>
            </Route>
            <Route path="/submissions/:id">
              <SubmissionsList />
            </Route>
            
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="/forms/:id">
              <FormDetails />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
