import React, { useState, useEffect } from 'react';

function History(props) {

  return (
    <tr>
      <td>{props.history.createdAt}</td>
      {!window.location.href.includes('devices') && <td>{props.history.device_id.modelName}</td>}
      {!window.location.href.includes('users') && <td>{props.history.user_id.fullname}</td>}
      <td>{props.history.action}</td>
    </tr>
  )
}

export default History;