import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import data from "./data.js";
import { useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail.js";
import axios from "axios";
// export let Context1 = createContext()
function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [더보기횟수, 더보기횟수변경] = useState(2);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            shop
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              DETAIL
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((a, i) => {
                    return <Product shoes={shoes[i]} i={i + 1} />;
                  })}
                </div>
              </div>
              <button
                onClick={() => {
                  더보기횟수변경(더보기횟수 + 1);
                  //Promise.all이라는 거 사용하면 동시에 ajax 요청 여러개도 가능하다고 함
                  axios
                    .get(
                      `https://codingapple1.github.io/shop/data${더보기횟수}.json`
                    )
                    .then((data) => {
                      //성공시에는 then
                      let copy = [...shoes, ...data.data];
                      // 원본데이터 shoes와 새로 받아온 데이터 data.data를 합침
                      // 서버와는 문자만 주고받을 수 있음 그래서 array, object도 ""를 붙혀 문자처럼 주고 받음 이걸 json이라고 함 이걸 axios가 자동으로 바꾸어주는 것, 만약 fetch를 쓰면 json 데이터를 가져오기 때문에 array,object로 변환하는 과정이 필요함
                      // fetch('url')
                      // .then(data => data.json())
                      // .then(data => {})
                      // fetch는 이런식으로 받아온 json 형식을 array, object로 바꿔야 함
                      setShoes(copy);
                      console.log("로딩 끝");
                    })
                    .catch(() => {
                      //실패시에는 catch
                      console.log("실패하였습니다");
                    });
                }}
              >
                더 보기
              </button>
            </>
          }
        />
        <Route path="/detail/:id" element={
          // <Context1.Provider value={{}}>
        <Detail shoes={shoes} />
        // </Context1.Provider>
        } />
        <Route path="/about" element={<About />}>
          <Route
            path="member"
            // 이건 nested routes인데 /about/member로 접속할 때 /about에 화면을 가져가면서 페이지 구성하고 싶을 때 사용, 그냥 /about으로 접속 시 About 컴포넌트 보여주고, /about/member 접속 시 About 컴포넌트 + /about/member로 접속하셨습니다 라는 div까지 보여줌
            element={<div>/about/member로 접속하셨습니다</div>}
          />
        </Route>
        <Route path="*" element={<div>없는 페이지</div>} />
      </Routes>
    </div>
  );
}

function Product(props) {
  return (
    <div className="col-md-4">
      <img
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
        alt="상품 사진"
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사 정보</h4>
      {/* Outlet을 작성한 자리에 member element를 보여줌 */}
      <Outlet />
    </div>
  );
}
export default App;
