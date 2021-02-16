import React, { useEffect, useState } from 'react';
import { useUserContext } from "../context/user.context";
import UserService from '../services/user.service';

function HomePage() {
  const {currUser, setCurrUser} = useUserContext();
  const [user, setUser] = useState();

  useEffect(() => {
    // Needed to ensure the http class gets loaded again after login. There should be better ways to handle this, but will do for now.
    /*if(localStorage.getItem("hasReloaded") != "true") {
      localStorage.setItem("hasReloaded", true);
      window.location.reload();
    }*/
  }, [])

  useEffect(() => {
    console.log("IN USE EFFECT FOR HOMEPAGE");

    UserService.getUser(currUser.id).then(res => {
      setUser(res.data);
    }).catch(err => {
      console.log("THE ERROR IS " + err);
    });

  }, [currUser])

  return (
    <div>
      { 
        user?
          <div>Welcome {user.fullname}</div>
        : null
      }
      
    </div>
  );
}

export default HomePage;