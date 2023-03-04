import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import data from "./data.js";
import { useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail.js";
function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
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
            </>
          }
        />
        <Route path="/detail" element={<Detail />} />
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
      <Outlet/>
    </div>
  );
}
export default App;
