import React from 'react';
import { Navigate } from 'react-router-dom';

const Mypage = (props) => {
  let login = null;

  if (
    props === null ||
    props.login === null ||
    props.login.id === null ||
    props.login.id === ''
  ) {
    alert('로그인해주세요');
    return <Navigate to="/login" replace={true} />;
  } else {
    login = props.login;
    return (
      <div className="container">
        <h2>Mypage</h2>
        <table className="table">
          <tbody>
            <tr>
              <th>
                <p>id : </p>
              </th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  value={login.id}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th>
                <p>name : </p>
              </th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  value={login.name}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th>
                <p>email : </p>
              </th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  value={login.email}
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

export default Mypage;
