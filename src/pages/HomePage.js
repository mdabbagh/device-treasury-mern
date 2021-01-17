import React, { useEffect, useState } from 'react';
import { useUserContext } from "../context/user.context";
import UserService from '../services/user.service';

function HomePage() {
  const {currUser} = useUserContext();
  const [user, setUser] = useState();

  useEffect(() => {
    // Needed to ensure the http class gets loaded againt after login. There should be better ways to handle this, but will do for now.
    if(localStorage.getItem("hasReloaded") != "true") {
      localStorage.setItem("hasReloaded", true);
      window.location.reload();
    }
  }, [])

  useEffect(() => {
    if(currUser !== null) {
      UserService.getUser(currUser.id).then(res => {
        setUser(res.data);
      });
    }
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