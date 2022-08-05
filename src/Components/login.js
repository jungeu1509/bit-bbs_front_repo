import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ checkLogin, saveLogin, logout }) {
  const [inputId, setInputId] = useState('');
  const [inputPwd, setInputPwd] = useState('');
  let history = useNavigate();

  function handleId(e) {
    e.preventDefault();
    setInputId(e.target.value);
  }

  function handlePwd(e) {
    e.preventDefault();
    setInputPwd(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputId.length < 1 || inputPwd.length < 1) {
      alert('입력해주세요');
      return;
    }
    await axios
      .post('http://localhost:3000/member/login', null, {
        params: { id: inputId, pwd: inputPwd },
      })
      .then(function (resp) {
        if (resp.data.id === inputId) {
          alert('로그인에 성공했습니다.');
          saveLogin(
            resp.data.id,
            resp.data.name,
            resp.data.email,
            resp.data.auth,
          );
          history('/');
        } else {
          alert('로그인에 실패했습니다.');
        }
      })
      .catch(function (e) {
        alert(e);
      });
  };

  if (!checkLogin()) {
    return (
      <div>
        <form className="was-validated">
          <div className="form-group">
            <label for="id">Id:</label>
            <input
              type="text"
              className="form-control"
              id="id"
              placeholder="Enter id"
              name="id"
              onChange={handleId}
              required
            />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <div className="form-group">
            <label for="pwd">Password:</label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="pwd"
              onChange={handlePwd}
              required
            />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          {/* <div className="form-group form-check">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                name="remember"
              />{' '}
              remember me
            </label>
          </div> */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    );
  } else {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();
      window.location.href = '/';
    }
    window.location.href = '/';
  }
}

export default Login;
