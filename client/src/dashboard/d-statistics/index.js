import React, { Fragment, useEffect,useState } from "react";
import { Meteor } from "meteor/meteor";
import { withRouter, Redirect, Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import M from 'materialize-css'
// import UserStats from "./UserStats";
import { useLogout } from "../../Accounts/accountsUtils";
import { COL_USER_STATS, COL_Lessons } from "../../../../lib/Collections";
import UsersStatsAverage from "./UsersStatsAverage";
import { Session } from 'meteor/session'
import { FILTERED_LESSONS } from "../d-redux/constants";
import { getlessonsGrandTotal } from "./methods";
import NavBar from "../../components/Layout/NavBar";
import Footer from "../../components/Layout/Footer";

// Session.setDefault(FILTERED_LESSONS, [])


function UserStats({ lessons, stats, history, match }) {
  const { isLoggedOut, logOutUser } = useLogout();
  useEffect(() => M.AutoInit())

  const [_stats, setStats] = useState(stats);
  const [gStats, setGStats] = useState(null);
  const [filteredLessons, setFilteredLessons] = useState([]);

  useEffect(()=>{
    setStats(stats);
    const _gStats = getlessonsGrandTotal(stats);
    setGStats(_gStats);
    setFilteredLessons(_gStats.filteredLessons);
  },[stats])


  useEffect(() => {
    setGStats(getlessonsGrandTotal(_stats));
  }, [_stats])


  const onLessonChange = e => {
    let val = e.target.value;
    val = val.trim();
    val = val.split(',');
    const query = val.length > 1 && {  lang: val[1], lessonNumber: parseInt(val[0]) }
                    || {} ;
    const newStats = COL_USER_STATS.find(query).fetch();
    setStats(newStats);
  }



  if (isLoggedOut) {
    return <Redirect to="/login" />;
  }
  return (
    <Fragment>
      <NavBar />
      <div className="container">
     
        {/* <h4>{user && user.profile.name} </h4> */}
        <h4><code>{"Statistics"} </code> </h4>
    
        <br />
        <ul id="tabs-swipe-demo" className="tabs">
          <li className="tab col s3"><a href="#test-swipe-3">Grand Data</a></li>
        </ul>
        <br />
        <br />
        <div id="test-swipe-3" className="col s12">
    
          <LessonSelector lessons={filteredLessons} onChange={onLessonChange} />

          <UsersStatsAverage pages={[_stats.length]} gStats={gStats}  />
        </div>
        <div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}


function LessonSelector({ lessons, onChange }) {
  return (
    <>
      <label>Lesson</label>
      <select className="browser-default" onChange={onChange} >
        <option value="" disabled defaultValue="">Choose Lesson Number</option>
        <option value="" >Clear</option>
        <GetLessonsOptions lessons={lessons} />
      </select>
    </>
  )
}

function GetLessonsOptions({ lessons }) {
  console.log(lessons)
  return lessons && lessons.map((item, index) => (
    item && <option value={`${item.lessonNumber},${item.lang}`}>{item.lessonNumber + ' | ' + item.lang}</option>
  )) || null
}


// avoiding chanined wraps of two higher components
const RouterStats = withRouter(UserStats);

export default withTracker(props => {
  Meteor.subscribe("user", props.match.params.id);
  Meteor.subscribe("userStats");
  return {
    stats: COL_USER_STATS.find({}).fetch(),
    lessons: COL_Lessons.find({}).fetch(),
  };
})(RouterStats);
