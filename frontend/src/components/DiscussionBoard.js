import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from 'jwt-decode';
import { useToken } from './useToken.js';

const DiscussionBoard = ( ) => {
  const { id } = useParams();
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState("");
  const { isAuthenticated } = useAuth();
  const [token] = useToken();
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

 useEffect(() => {
   axios
     .get(`http://localhost:8081/api/discussions/${id}`)
     .then((res) => {
      setDiscussions(res.data);
     })
     .catch((err) => console.log(err));
 }, [id]);

 const submitDiscussion = (e) => {
  e.preventDefault();
  if (!isAuthenticated) {
    return;
  }
  
  const discussionData = {
    userId: userId /* the ID of the authenticated user */,
    movieId: id, // the ID of the movie
    content: newDiscussion, // the content of the discussion
   };

  axios
  .post(`http://localhost:8081/api/discussions`, discussionData)
  .then((res) => {
    // If the request was successful, refresh the discussions
    axios
      .get(`http://localhost:8081/api/discussions/${id}`)
      .then((res) => {
        setDiscussions(res.data);
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
  setNewDiscussion("");
 };

 return (
   <div className="discussion-board">
     <h2>Discussion Board</h2>
     {discussions.map((discussion, i) => (
       <div className="discussion" key={i}>
        <p>{discussion.userId}: {discussion.content}</p>
       </div>
     ))}
     <form onSubmit={submitDiscussion}>
       <textarea
         value={newDiscussion}
         onChange={(e) => setNewDiscussion(e.target.value)}
         placeholder="Write a new discussion..."
       />
       <button type="submit">Submit</button>
     </form>     
   </div>
 );
};

export default DiscussionBoard;