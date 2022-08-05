import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import './main.css';

import BbsList from './Components/bbsList';
import Bbsdetail from './Components/bbsdetail';
import Bbswrite from './Components/bbswrite';
import Bbsupdate from './Components/bbsupdate';
import Bbsrewrite from './Components/bbsrewrite';
import Login from './Components/login';
import NotFound from './Components/notfound';
import Mypage from './Components/mypage';
import SignUp from './Components/signup';

function App() {
  const loginStrKey = 'login';

  const [login, setLogin] = useState(null);

  function logout() {
    alert('로그아웃 되었습니다.');
    sessionStorage.removeItem(loginStrKey);
    setLogin(null);
  }

  function checkLogin() {
    let getLogin = null;
    if (login === null || login.id === '') {
      getLogin = JSON.parse(sessionStorage.getItem(loginStrKey));
      if (getLogin !== undefined && getLogin !== null) {
        setLogin(getLogin);
      }
    } else {
      getLogin = login;
    }

    if (getLogin === null || getLogin === undefined) {
      return false;
    } else {
      return true;
    }
  }

  function saveLogin(id, name, email, auth) {
    if (checkLogin()) {
      alert('잘못된 접근입니다. 이미 로그인 되어있습니다.' + getLogin());
      return;
    }
    setLogin({
      id: id,
      name: name,
      email: email,
      auth: auth,
    });
    sessionStorage.setItem(
      loginStrKey,
      JSON.stringify({
        id: id,
        name: name,
        email: email,
        auth: auth,
      }),
    );
  }

  function getLogin() {
    if (checkLogin()) {
      return login;
    }
    alert('로그인이 필요합니다.');
    window.location.href = '/login';
    return null;
  }

  function LoginBtn() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          {checkLogin() ? (
            <Link className="nav-link" to="/mypage">
              <p>마이페이지</p>
            </Link>
          ) : (
            <Link className="nav-link" to="/signup">
              <p>회원가입</p>
            </Link>
          )}
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            {checkLogin() ? <p>Logout</p> : <p>Login</p>}
          </Link>
        </li>
      </ul>
    );
  }

  const moveToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false);
  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY > 100) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch(); // addEventListener 함수를 실행
    return () => {
      window.removeEventListener('scroll', handleFollow); // addEventListener 함수를 삭제
    };
  });

  function goHome() {
    window.location.href = '/';
  }

  return (
    <div>
      <header>
        <div className="container text-center">
          <img
            alt=""
            src="5so4so_Logo.png"
            width="960"
            height="150"
            onClick={goHome}
          />
        </div>
      </header>

      <BrowserRouter>
        <nav className="navbar navbar-expand-md navbar-dark bg-info sticky-top">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbar-content">
              <div className="collapse navbar-collapse" id="navbar-content">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <div
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      게시판
                    </div>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <Link className="dropdown-item" to="/bbslist">
                        글목록
                      </Link>
                      <Link className="dropdown-item" to="/bbswrite">
                        글쓰기
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="collapse navbar-collapse" id="navbar-content">
                <LoginBtn />
              </div>
            </div>
          </div>
        </nav>

        <main>
          <div className="py-5 mb-5">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bbslist" element={<BbsList />} />
                <Route path="/bbswrite" element={<Bbswrite login={login} />} />
                <Route
                  path="/bbsdetail"
                  element={<Bbsdetail login={login} />}
                />
                <Route
                  path="/bbsupdate"
                  element={<Bbsupdate login={login} />}
                />
                <Route
                  path="/bbsrewrite"
                  element={<Bbsrewrite login={login} />}
                />
                <Route
                  path="/login"
                  element={
                    <Login
                      checkLogin={checkLogin}
                      saveLogin={saveLogin}
                      logout={logout}
                    />
                  }
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/mypage" element={<Mypage login={login} />} />
                <Route component={NotFound} />
              </Routes>
            </div>
          </div>
        </main>
      </BrowserRouter>

      <footer className="bg-info text-light">
        <div className="container text-right quick_bar">
          {BtnStatus && (
            <button className="btn btn-outline-dark " onClick={moveToTop}>
              TOP
            </button>
          )}
        </div>
        <div className="container text-center">
          <p style={{ margin: '0px' }}>
            <small>Copyright&copy;Eunwoo Jung</small>
          </p>
        </div>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <div style={{ textAlign: 'center' }}>
        <h3>WELCOME!</h3>
        <img alt="" src="main_1920.jpg" style={{ width: '100%' }} />
      </div>
    </div>
  );
}

export default App;
