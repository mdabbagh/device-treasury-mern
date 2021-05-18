import React, { useEffect, useState } from 'react';
import { useUserContext } from "../context/user.context";
import CheckoutHistoryService from '../services/checkout.history.service'
import History from '../components/History';

function HomePage() {
  const {currUser, } = useUserContext();
  const [history, setHistory] = useState();

  useEffect(() => {
    // Get all devices to populate whole list
    if(currUser) {
      CheckoutHistoryService.getAllHistory()
        .then(res => {
          if(res.status === 200) {
            setHistory(res.data)
          }
        })
    }
  }, [])

  function historyList() {
    if(history !== undefined) {
      if(history.length > 0) {
        return history.map(currHistory => {
          return (
            <History history={currHistory} key={currHistory._id} />
          );
        });
      }
    }
  }

  return (
    <div>
      {
        currUser &&
          <h1 style={{margin: "10px 0px 10px 0px"}}>Welcome {currUser.fullname}</h1>
      }
      <h3>History</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <td>Date</td>
            <td>Device</td>
            <td>User</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {historyList()}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;