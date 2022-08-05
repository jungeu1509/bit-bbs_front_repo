import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Pagenation from 'react-js-pagination';

import './bbslist.css';
import './page.css';

const Bbslist = () => {
  const [bbsList, setBbsList] = useState([]);

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
        // console.log(resp);
        setBbsList(resp.data.bbslist);
        setTotalCnt(resp.data.cnt);
      })
      .catch(function (e) {
        alert(e);
      });
  };

  useEffect(() => {
    fetchData(choiceVal, searchVal, INIT_PAGENUM);
  }, []);

  const choiceChange = (e) => setChoiceVal(e.target.value);
  const searchChange = (e) => setSearchVal(e.target.value);
  const searchBtn = () => {
    // alert(choiceVal);
    // alert(searchVal);

    history('/bbslist');

    fetchData(choiceVal, searchVal, INIT_PAGENUM);
  };

  const handlePageChagne = (pageVal) => {
    setPage(pageVal);
    fetchData(choiceVal, searchVal, pageVal);
  };

  return (
    <div className="container">
      {/* {검색부분} */}
      <table className="search">
        <tbody>
          <tr>
            <td>
              <select
                className="custom-select"
                value={choiceVal}
                onChange={choiceChange}
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
      <table className="table table-hover">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {bbsList.map(function (object, i) {
            return <TableRow obj={object} key={i} cnt={i + 1} />;
          })}
        </tbody>
      </table>
      <Pagenation
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={totalCnt}
        pageRangeDisplayed={5}
        prevPageText={'‹'}
        nextPageText={'›'}
        onChange={handlePageChagne}
      />

      <div className="my-5 d-flex justify-content-center">
        <Link className="btn btn-primary" to="/bbswrite">
          글쓰기
        </Link>
      </div>
    </div>
  );
};

function TableRow(props) {
  return (
    <tr>
      <th>{props.cnt}</th>
      <td className="underLine">{props.obj.title}</td>
      <td>{props.obj.id}</td>
    </tr>
  );
}

export default Bbslist;
