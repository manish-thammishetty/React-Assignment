import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HomePage from './HomePage'
import UserPosts from './UserPosts';
import Post from './Post'

function Routing() {

  return (

    <>
      <Router>
     <button className="ml-5 mt-4"><Link to={`/`} >Home</Link></button>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/posts/:userid" component={UserPosts} />
          <Route path="/postDetails/:postID" component={Post} />
        </Switch>
      </Router>
    </>
  );
}

export default Routing;