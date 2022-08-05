import React, { useEffect, useState } from 'react';
import axios from 'axios';
import queryStirng from 'query-string';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

import './bbsrewrite.css';

const Bbsrewrite = (props) => {
  let history = useNavigate();

  const location = useLocation();
  const paramObj = queryStirng.parse(location.search);
  const seq = paramObj.seq;
  const urlPath = 'http://localhost:3000/getBbsBySeq?seq=' + seq;

  const [getBbs, setBbs] = useState([]);

  const [bbsContent, setBbsContent] = useState();
  const [bbsTitle, setBbsTitle] = useState();
  let bbsId = '';

  function writeBtnClick() {
    if (getBbs.id !== bbsId) {
      alert('잘못된 접근입니다.');
      cancleBtnClick();
    }
    if (bbsId.length < 1) {
      alert('id를 입력해주세요');
    } else if (bbsContent.length < 5) {
      alert('제목을 5자 이상 입력해주세요');
    } else if (bbsTitle.length < 5) {
      alert('내용을 5자 이상 입력해주세요');
    } else {
      fetchData(seq, bbsId, bbsContent, bbsTitle);
    }
  }

  function cancleBtnClick() {
    history('/bbsdetail?seq=' + seq);
  }

  const getDetailData = async (s) => {
    await axios
      .get(urlPath, {})
      .then(function (resp) {
        setBbs(resp.data);
      })
      .catch(function (e) {
        alert(e);
      });
  };

  useEffect(() => {
    getDetailData(seq);
  }, [seq]);

  function handleBbsContent(e) {
    setBbsContent(e.target.value);
  }

  function handleBbsTitle(e) {
    setBbsTitle(e.target.value);
  }

  const fetchData = async (pSeq, pId, pContent, pTitle) => {
    await axios
      .post('http://localhost:3000/addBbsRewrite', null, {
        params: { seq: pSeq, id: pId, content: pContent, title: pTitle },
      })
      .then(function (resp) {
        if (resp.data === true) {
          alert('답글 작성에 성공했습니다.');
          history('/bbslist');
        } else {
          alert('답글 작성에 실패했습니다 : ' + resp.data);
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
      <div className="container">
        <table className="table rewrite-table rewrite-origin-table">
          <thead>
            <tr>
              <th colSpan={2}>
                <p>원본글</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>제목</th>
              <td>
                <input
                  className="form-control rewrite-origin-form-control"
                  type="text"
                  value={getBbs.title || ''}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th>작성자</th>
              <td>
                <input
                  className="form-control rewrite-origin-form-control"
                  type="text"
                  value={getBbs.id || ''}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea
                  className="form-control rewrite-origin-form-control"
                  defaultValue={getBbs.content}
                  readOnly
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table rewrite-table rewrite-input-table">
          <thead>
            <tr>
              <th colSpan={2}>
                <h4 style={{ textAlign: 'center' }}>답글작성</h4>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>작성자</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  value={bbsId}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  onChange={handleBbsTitle}
                />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea
                  className="form-control rewrite-input-form-control"
                  onChange={handleBbsContent}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <table className="mb-5 table">
            <tbody>
              <tr>
                <td className="table-btn-left">
                  <button className="btn btn-primary" onClick={cancleBtnClick}>
                    취소
                  </button>
                </td>
                <td className="table-btn-right">
                  <button className="btn btn-primary" onClick={writeBtnClick}>
                    답글쓰기
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

export default Bbsrewrite;
