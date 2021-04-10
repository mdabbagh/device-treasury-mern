import React, { useState, useEffect } from 'react';
import UserService from '../../services/user.service';
import { useUserContext } from "../../context/user.context";
import CheckoutHistoryService from '../../services/checkout.history.service'
import History from '../../components/History';

function UserPage(props) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const {currUser, setCurrUser} = useUserContext();
  const [history, setHistory] = useState();

  useEffect(() => {
    if(currUser) {
      UserService.getUser(props.match.params.id)
      .then(res => {
        setFullname(res.data.fullname);
        setEmail(res.data.email);
      });
    }
  }, [])

  useEffect(() => {
    // Get all devices to populate whole list
    CheckoutHistoryService.getUserHistory(currUser.id)
      .then(res => {
        if(res.data) {
          setHistory(res.data)
        }
      });
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
      <table className="table">
        <thead className="thead-light">
          <tr>
            <td>Name</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{fullname}</td>
            <td>{email}</td>
          </tr>
        </tbody>
      </table>
      <h3>History</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <td>Date</td>
            <td>Device</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {historyList()}
        </tbody>
      </table>
    </div>
  )
}

export default UserPage;