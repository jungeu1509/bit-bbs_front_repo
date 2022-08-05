import React, { useEffect, useState } from 'react';
import axios from 'axios';
import queryStirng from 'query-string';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

import './bbsupdate.css';

const Bbsupdate = (props) => {
  let history = useNavigate();

  const location = useLocation();
  const paramObj = queryStirng.parse(location.search);
  const seq = paramObj.seq;
  const urlPath = 'http://localhost:3000/getBbsBySeq?seq=' + seq;

  const [getBbs, setBbs] = useState([]);

  const [bbsContent, setBbsContent] = useState('');
  const [bbsTitle, setBbsTitle] = useState('');
  let bbsId = '';

  function updateBtnClick() {
    if (getBbs.id !== bbsId) {
      alert('잘못된 접근입니다.');
      cancleBtnClick();
    }
    // if (!(bbsContent !== getBbs.content || bbsTitle !== getBbs.title)) {
    if (bbsContent === undefined && bbsTitle === undefined) {
      alert('수정한 내용이 없습니다.(undefined)' + bbsContent + '/' + bbsTitle);
    } else {
      if (bbsContent !== undefined && bbsContent.length < 5) {
        alert('제목을 5자 이상 입력해주세요');
      } else if (bbsTitle !== undefined && bbsTitle.length < 5) {
        alert('내용을 5자 이상 입력해주세요');
      } else {
        fetchData(seq, getBbs.id, bbsContent, bbsTitle);
      }
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

        setBbsContent(getBbs.content);
        setBbsTitle(getBbs.title);
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
      .post('http://localhost:3000/updateBbs', null, {
        params: { seq: pSeq, id: pId, content: pContent, title: pTitle },
      })
      .then(function (resp) {
        if (resp.data === true) {
          alert('글 수정에 성공했습니다.');
          history('/bbsdetail?seq=' + seq);
        } else {
          alert('글 수정에 실패했습니다 : ' + resp.data);
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
        <h4>{getBbs.title}</h4>
        <br />
        <table className="table">
          <tbody>
            <tr>
              <th>작성자</th>
              <td>
                <input
                  className="update-form-control form-control"
                  type="text"
                  value={getBbs.id || ''}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td>
                <input
                  className="update-form-control form-control"
                  type="text"
                  defaultValue={getBbs.title}
                  onChange={handleBbsTitle}
                />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea
                  className="update-form-control  form-control"
                  defaultValue={getBbs.content}
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
                  <button className="btn btn-primary" onClick={updateBtnClick}>
                    수정하기
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

export default Bbsupdate;
