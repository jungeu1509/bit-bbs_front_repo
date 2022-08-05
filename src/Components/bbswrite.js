import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import './bbswrite.css';

const Bbswrite = (props) => {
  let bbsId = '';
  const [bbsContent, setBbsContent] = useState('');
  const [bbsTitle, setBbsTitle] = useState('');

  let history = useNavigate();

  function btnClick() {
    if (bbsId.length < 1) {
      alert('id를 입력해주세요');
    } else if (bbsContent.length < 5) {
      alert('제목을 입력해주세요');
    } else if (bbsTitle.length < 5) {
      alert('내용을 입력해주세요');
    } else {
      fetchData(bbsId, bbsContent, bbsTitle);
    }
  }

  function handleBbsContent(e) {
    setBbsContent(e.target.value);
  }

  function handleBbsTitle(e) {
    setBbsTitle(e.target.value);
  }

  const fetchData = async (pId, pContent, pTitle) => {
    await axios
      .post('http://localhost:3000/addBbs', null, {
        params: { id: pId, content: pContent, title: pTitle },
      })
      .then(function (resp) {
        if (resp.data === true) {
          alert('글 작성에 성공했습니다.');
          history('/bbslist');
        } else {
          alert('글 작성에 실패했습니다 : ' + resp.data);
        }
      })
      .catch(function (e) {
        alert(e);
      });
  };

  if (
    props === null ||
    props.login === null ||
    props.login.id === null ||
    props.login.id === ''
  ) {
    alert('로그인해주세요');
    return <Navigate to="/login" replace={true} />;
  } else {
    bbsId = props.login.id;
    return (
      <div>
        <div>
          <table className="table write-table">
            <tbody>
              <tr>
                <th>작성자</th>
                <td>
                  <input
                    className="form-control write-form-control"
                    type="text"
                    value={props.login.id}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <th>제목</th>
                <td>
                  <input
                    className="form-control write-form-control"
                    type="text"
                    onChange={handleBbsContent}
                    maxLength={100}
                  />
                </td>
              </tr>
              <tr>
                <th>내용</th>
                <td>
                  <textarea
                    className="form-control write-form-control"
                    onChange={handleBbsTitle}
                    maxLength={2000}
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table className="mb-5 table">
            <tbody>
              <tr>
                <td className="table-btn-left">
                  <Link className="btn btn-primary" to="/bbslist">
                    취소
                  </Link>
                </td>
                <td className="table-btn-right">
                  <button className="btn btn-primary" onClick={btnClick}>
                    글쓰기
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default Bbswrite;
