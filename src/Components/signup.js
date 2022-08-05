import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function SignUp() {
  const [inputId, setInputId] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputPwd, setInputPwd] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [idCheck, setIdCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);

  let history = useNavigate();

  function handleId(e) {
    e.preventDefault();
    setInputId(e.target.value);
  }

  function handlePwd(e) {
    e.preventDefault();
    setInputPwd(e.target.value);
  }

  function handleEmail(e) {
    e.preventDefault();
    setInputEmail(e.target.value);
  }

  function handleName(e) {
    e.preventDefault();
    setInputName(e.target.value);
  }

  const idCheckBtnClick = async (e) => {
    if (idCheck) return;
    await axios
      .post('http://localhost:3000/member/idCheck', null, {
        params: { id: inputId },
      })
      .then(function (resp) {
        if (resp.data === true) {
          alert('사용가능한 id 입니다.');
          setIdCheck(true);
        } else {
          alert('사용중인 id 입니다. 다른 id를 입력해주세요.');
        }
      })
      .catch(function (e) {
        alert(e);
      });
  };

  const emailCheckBtnClick = async (e) => {
    if (emailCheck === true) return;
    await axios
      .post('http://localhost:3000/member/emailCheck', null, {
        params: { email: inputEmail },
      })
      .then(function (resp) {
        if (resp.data === true) {
          alert('사용가능한 email 입니다.');
          setEmailCheck(true);
        } else {
          alert('사용중인 email 입니다. 다른 email를 입력해주세요.');
        }
      })
      .catch(function (e) {
        alert(e);
      });
  };

  function cancleBtnClick() {
    history('/');
  }

  const handleSubmit = async (e) => {
    if (idCheck === false || emailCheck === false) {
      alert('중복확인을 먼저 해주세요');
      return;
    }
    e.preventDefault();
    if (inputPwd.length < 1 || inputEmail.length < 1 || inputName.length < 1) {
      alert('입력해주세요');
      return;
    }
    await axios
      .post('http://localhost:3000/member/addMember', null, {
        params: {
          id: inputId,
          pwd: inputPwd,
          name: inputName,
          email: inputEmail,
        },
      })
      .then(function (resp) {
        if (resp.data === true) {
          alert('회원가입에 성공했습니다.');
          history('/');
        } else {
          alert('회원가입에 실패했습니다.');
        }
      })
      .catch(function (e) {
        alert(e);
      });
  };

  return (
    <div className="container">
      <h2>회원가입</h2>
      <form className="was-validated">
        <div className="form-group">
          <label for="id">Id:</label>
          <input
            type="text"
            className={idCheck ? 'form-control disabled' : 'form-control'}
            id="id"
            placeholder="Enter id"
            name="id"
            onChange={handleId}
            required
            readOnly={idCheck ? true : false}
          />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
          <button
            type="button"
            className={
              idCheck ? 'btn btn-success disabled ' : 'btn btn-primary'
            }
            onClick={idCheckBtnClick}
          >
            Id check
          </button>
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
        <div className="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            name="name"
            onChange={handleName}
            required
          />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
            onChange={handleEmail}
            required
            readOnly={emailCheck ? true : false}
          />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">
            Please fill out this field by valid email.
          </div>
          <button
            type="button"
            className={
              emailCheck ? 'btn btn-success disabled ' : 'btn btn-primary'
            }
            onClick={emailCheckBtnClick}
          >
            Email check
          </button>
        </div>
        <table className="mb-5 table">
          <tbody>
            <tr>
              <td className="table-btn-left">
                <button
                  type="button"
                  onClick={cancleBtnClick}
                  className="btn btn-primary"
                >
                  취소
                </button>
              </td>
              <td className="table-btn-right">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={
                    idCheck ? 'btn btn-primary' : 'btn btn-primary  disabled'
                  }
                >
                  회원가입
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default SignUp;
