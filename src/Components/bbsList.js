import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Pagenation from 'react-js-pagination';

import * as util from './util';
import './bbslist.css';
import './page.css';

const BbsList = () => {
  const [getBbsList, setBbsList] = useState([]);

  //검색용 후크
  const [choiceVal, setChoiceVal] = useState('');
  const [searchVal, setSearchVal] = useState('');

  //페이징용 후크
  const INIT_PAGENUM = 1;
  const [page, setPage] = useState(INIT_PAGENUM);
  const [totalCnt, setTotalCnt] = useState(0);

  // 함수에서 이동(link)용
  let history = useNavigate();

  // c-> choice / s->search / p->pageNumber
  const fetchData = async (c, s, p) => {
    await axios
      .get('http://localhost:3000/getBbsReactList', {
        params: { choice: c, search: s, pageNumber: p - 1 },
      })
      .then(function (resp) {
        setBbsList(resp.data.bbslist);
        setTotalCnt(resp.data.cnt);
      })
      .catch(function (e) {
        alert(e);
      });
  };

  useEffect(() => {
    fetchData(choiceVal, searchVal, INIT_PAGENUM);
  }, [choiceVal, searchVal, INIT_PAGENUM]);

  const choiceChange = (e) => setChoiceVal(e.target.value);
  const searchChange = (e) => setSearchVal(e.target.value);
  const searchBtn = () => {
    history('/bbslist');

    fetchData(choiceVal, searchVal, INIT_PAGENUM);
  };

  const handlePageChagne = (pageVal) => {
    setPage(pageVal);
    fetchData(choiceVal, searchVal, pageVal);
  };

  function checkDepth(props) {
    if (props.obj.del !== 1) {
      let ret = [];
      if (props.obj.depth > 0) {
        for (let j = 0; j < props.obj.depth; j++) {
          //ret.push("&nbsp;");
          //ret.push(' ');
          ret.push(
            <label key={props.obj.seq + j + 'label'}>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </label>,
          );
        }
        ret.push(
          <img
            key={props.obj.seq + 'img'}
            src="reply.png"
            width="20"
            height="20"
          />,
        );
        return ret;
      }
    }
  }

  function getTitleString(props) {
    return props.obj.title.length > 30
      ? props.obj.title.substr(0, 30) + '...'
      : props.obj.title;
  }

  function MakeTitle(props) {
    let linkPath = '/bbsdetail?seq=' + props.obj.seq;
    if (props.obj.del !== 1) {
      return (
        <td className="underLine">
          {checkDepth(props)}
          <Link to={linkPath}>{getTitleString(props)}</Link>
        </td>
      );
    } else {
      return <td className="deleteTitle">삭제된 글입니다.</td>;
    }
  }

  function MakeTbody(props) {
    return (
      <tr>
        <th>{props.obj.seq}</th>
        <td>{props.obj.id}</td>
        {MakeTitle(props)}
        <td>{util.datetimeFormat(new Date(props.obj.wdate))}</td>
        <td>{props.obj.readcount}</td>
      </tr>
    );
  }

  return (
    <div className="pb-5 mb-5">
      <h2>게시판</h2>
      {/* 검색부분 */}
      <table className="search">
        <tbody>
          <tr>
            <td>
              <select
                className="custom-select"
                value={choiceVal}
                onChange={choiceChange}
                style={{ borderColor: 'black', color: 'black' }}
              >
                <option>선택</option>
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="writer">작성자</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholer="검색어"
                value={searchVal}
                onChange={searchChange}
              ></input>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-primary"
                onClick={searchBtn}
              >
                검색
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      {/* 글목록 부분 */}
      <table className="table table-hover table-bbs-list">
        <thead>
          <tr>
            <th>글번호</th>
            <th>작성자</th>
            <th>제목</th>
            <th>작성일시</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {getBbsList.map(function (obj, i) {
            return <MakeTbody obj={obj} key={i} />;
          })}
        </tbody>
      </table>
      <table className="table">
        <tbody>
          <tr>
            <td></td>
            <td>
              <Pagenation
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={totalCnt}
                pageRangeDisplayed={5}
                prevPageText={'‹'}
                nextPageText={'›'}
                onChange={handlePageChagne}
              />
            </td>
            <td>
              {/* 글쓰기 부분 */}
              <div className="my-3 d-flex justify-content-center">
                <Link className="btn btn-primary" to="/bbswrite">
                  글쓰기
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default BbsList;
