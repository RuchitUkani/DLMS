import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Nav from './Nav.jsx';
import Section from './Section.jsx';
import axios from 'axios';
import "./worker.css"

function Worker() {
  const user = useSelector(state => state.user.user);
  const [userData, setUserData] = useState({ userName: user });
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/v1/worker/getworkerdata", userData);
        setData(response.data.data);
        setShowPopup(true)
      } catch (err) {
        console.log(err);
      }
    }
    
    fetchUserData();
  }, [userData]);
  
  return (
    <div>
      <Nav userName={user}/>
      {data ? (
        <Section 
          key={data._id} 
          fullName={data.fullName} 
          tableNo={data.tableNo} 
          email={data.email} 
          status={data.status} 
          userName={data.userName}
          diamond={data.diamond}
          diamondColor={data.diamondColor}
        />
      ) : (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>  
  );
}

export default Worker;
