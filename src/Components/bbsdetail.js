import React, { useEffect, useState } from 'react';
import axios from 'axios';
import queryStirng from 'query-string';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';

import './bbsdetail.css';
import CommentDetail from './comments';

const Bbsdetail = (props) => {
  let loginId = '';
  let history = useNavigate();
  const location = useLocation();
  const paramObj = queryStirng.parse(location.search);
  const seq = paramObj.seq;
  const [getBbs, setBbs] = useState([]);

  const fetchData = async (s) => {
    const urlPath = 'http://localhost:3000/getbbsbyMemberId?';
    await axios
      .get(urlPath, {
        params: {
          seq: s,
          memberId: loginId,
        },
      })
      .then(function (resp) {
        setBbs(resp.data);
      })
      .catch(function (e) {
        alert(e);
      });
  };

  useEffect(() => {
    fetchData(seq);
  }, [seq]);

  const deleteAction = async (s) => {
    const deletePath = 'http://localhost:3000/deleteBbs?seq=' + s;
    await axios
      .get(deletePath, {})
      .then(function (resp) {
        if (resp.data === true) {
          alert('삭제에 성공했습니다.');
          window.location.href = '/bbslist';
        } else {
          alert('삭제에 실패했습니다. : ' + resp.data);
        }
      })
      .catch(function (e) {
        alert(e);
      });
  };

  function rewriteBtnClick() {
    history('/bbsrewrite?seq=' + seq);
  }

  function updateBtnClick() {
    if (loginId === getBbs.id) {
      if (window.confirm('수정하시겠습니까?')) {
        history('/bbsupdate?seq=' + seq);
      }
    } else {
      alert('잘못된 접근입니다.');
    }
  }
  function deleteBtnClick() {
    if (loginId === getBbs.id) {
      if (window.confirm('삭제하시겠습니까?')) {
        deleteAction(seq);
      }
    } else {
      alert('잘못된 접근입니다.');
    }
  }

  function LoginCheckForUpdateBtn() {
    if (loginId === getBbs.id) {
      return (
        <button className="btn btn-primary" onClick={updateBtnClick}>
          수정하기
        </button>
      );
    }
    return;
  }
  function LoginCheckForDeleteBtn() {
    if (loginId === getBbs.id) {
      return (
        <button className="btn btn-primary" onClick={deleteBtnClick}>
          삭제하기
        </button>
      );
    }
    return;
  }

  function MakeTableRightSide() {
    return (
      <td className="table-btn-right">
        <button className="btn btn-primary" onClick={rewriteBtnClick}>
          답글쓰기
        </button>
        <LoginCheckForUpdateBtn />
        <LoginCheckForDeleteBtn />
      </td>
    );
  }

  if (
    props === null ||
    props.login === null ||
    props.login.id === null ||
    props.login.id === ''
  ) {
    alert('로그인해주세요');
    return <Navigate to="/login" replace={true} />;
  } else {
    loginId = props.login.id;
    return (
      <div className="container">
        <h4>{getBbs.title}</h4>
        <br />
        <table className="table detail-table">
          <tbody>
            <tr>
              <th>작성자</th>
              <td>
                <input
                  className="detail-form-control form-control"
                  type="text"
                  value={getBbs.id || ''}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th>작성일시</th>
              <td>
                <input
                  className="detail-form-control form-control"
                  type="text"
                  value={getBbs.wdate || ''}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th>조회수</th>
              <td>
                <input
                  className="detail-form-control form-control"
                  type="number"
                  value={getBbs.readcount || 0}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea
                  className="detail-form-control form-control detail-form-control"
                  value={getBbs.content || ''}
                  readOnly
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
                  <Link className="btn btn-primary" to="/bbslist">
                    글목록
                  </Link>
                  <Link className="btn btn-primary" to="/bbswrite">
                    새글쓰기
                  </Link>
                </td>
                <MakeTableRightSide />
              </tr>
            </tbody>
          </table>

          <CommentDetail seq={seq} />
        </div>
      </div>
    );
  }
};

export default Bbsdetail;
