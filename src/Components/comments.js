import React, { useEffect, useState } from 'react';
import axios from 'axios';

import * as util from './util';
import './comments.css';

const CommentDetail = (props) => {
  const seq = props.seq;
  const [getCommentList, setCommentList] = useState([]);
  const [content, setContent] = useState('');
  const [memberId, setMemberId] = useState('');

  const [contentCnt, setContentCnt] = useState(0);

  const fetchData = async (s) => {
    await axios
      .get('http://localhost:3000/getComments?seq=' + s, {})
      .then(function (resp) {
        setCommentList(resp.data);
      })
      .catch(function (e) {
        alert(e);
      });
  };

  useEffect(() => {
    fetchData(seq);
  }, [seq]);

  function handleId(e) {
    setMemberId(e.target.value);
  }

  function handleContent(e) {
    if (e.target.value.length <= 500) {
      setContent(e.target.value);
      setContentCnt(e.target.value.length);
    }
  }

  function addComment() {
    if (content.length > 500) {
      alert('500자를 초과할 수 없습니다.');
    } else if (content.length < 5) {
      alert('댓글을 5자 이상 작성해주세요');
    } else if (memberId.length < 1) {
      alert('id를 입력해주세요');
    } else {
      addCommentData(seq, memberId, content);
    }
  }

  const addCommentData = async (pSeq, pId, pContent) => {
    await axios
      .post('http://localhost:3000/addComment', null, {
        params: { seq: pSeq, memberId: pId, content: pContent },
      })
      .then(function (resp) {
        if (resp.data === true) {
          alert('댓글 작성에 성공했습니다.');
          window.location.href = '/bbsdetail?seq=' + seq;
        } else {
          alert('댓글 작성에 실패했습니다 : ' + resp.data);
        }
      })
      .catch(function (e) {
        alert(e);
      });
  };

  function MakeContentBody(props) {
    return (
      <tbody>
        <tr>
          <th>No:{props.cnt}</th>
          <th style={{ textAlign: 'left' }}>
            <label>ID:</label>
            {props.obj.memberId}
          </th>
          <td style={{ textAlign: 'right' }}>
            <label>Date:</label>
            {util.dateFormat(new Date(props.obj.wdate))}
          </td>
        </tr>
        <tr>
          <td colSpan={3}>
            <textarea
              className="comment-show-form-control form-control"
              value={props.obj.content}
              readOnly
            ></textarea>
          </td>
        </tr>
      </tbody>
    );
  }

  function ContentTable() {
    if (getCommentList.length < 1) {
      return (
        <div>
          <h3>댓글이 없습니다.</h3>
        </div>
      );
    } else {
      return (
        <div>
          <h3>{getCommentList.length} 개의 댓글</h3>
          <table className="table table-striped">
            {getCommentList.map(function (obj, i) {
              return <MakeContentBody obj={obj} key={i} cnt={i + 1} />;
            })}
          </table>
        </div>
      );
    }
  }

  return (
    <div>
      <div>
        <table className="table comment-input-table">
          <tbody>
            <tr>
              <td colSpan={3}>
                <input
                  type="text"
                  id="id"
                  className="form-control"
                  placeholder="작성자 ID를 입력해주세요"
                  onChange={handleId}
                />
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>
                <textarea
                  id="content"
                  className="comment-input-form-control form-control"
                  onChange={handleContent}
                  placeholder="댓글 내용을 입력해주세요"
                  maxLength={500}
                ></textarea>
              </td>
              <td style={{ margin: 'auto' }}>
                <label>{contentCnt}/500</label>
              </td>

              <td style={{ textAlign: 'right' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addComment}
                >
                  댓글 등록
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* 댓글 목록 부분 */}
      <ContentTable />
    </div>
  );
};

export default CommentDetail;
