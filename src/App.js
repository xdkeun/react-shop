import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import data from "./data.js";
import { lazy, Suspense, useState, useEffect, useTransition } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// 로딩 시간 단축을 위한 lazy, Suspense 사용
// react는 single page application으로 npm run build를 하면 js 모든 코드를 한 파일에 모으게 되는데 이렇게 되면 로딩 시간이 오래걸림.
// 이걸 방지하기 위해 main 페이지에서 필요없는 Detail, Cart는 필요할때 로딩해달라고 요청하는 lazy
const Detail = lazy(() => import("./routes/Detail.js"));
const Cart = lazy(() => import("./routes/Cart.js"));

// export let Context1 = createContext()
function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [더보기횟수, 더보기횟수변경] = useState(2);
  let [isPending, startTransition] = useTransition();
  // isPending은 로딩중일때 true로 변함. 그러므로 isPending ? "로딩 중" : "로딩 끝" 으로 UI 제작 가능
  //startTransition(()=>{
  //으로 감싸주면 for문을 엄청 많은 횟수를 돌리거나 시간이 오래 걸리는 작업을 할 때 시간 절약 및 성능 개선이 가능함
  // })
  useEffect(() => {
    if (!localStorage.getItem("watched")) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  let result = useQuery(["작명"], () => {
    return axios
      .get("https://codingapple1.github.io/userdata.json")
      .then((a) => {
        return a.data;
      });
  });
  // useQuery 유용한 변수들
  // result.data 실제 데이터가 있을 때 true가 됨
  // result.error 에러가 발생했을 때 true가 됨
  // result.isLoading 로딩 중일때 true가 됨
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            {/* loading 중이면 그냥 shop을 띄우고, 아니면 name(Mark)shop을 띄움 */}
            {result.isLoading ? "shop" : result.data.name + "shop"}
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              장바구니
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Suspense fallback={<div>로딩 중</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="main-bg"></div>
                <div>최근 본 상품</div>
                <div>{localStorage.getItem("watched")}</div>
                <div className="container">
                  <div className="row">
                    {shoes.map((a, i) => {
                      return (
                        <Nav.Link
                          onClick={() => {
                            navigate(`/detail/${i}`);
                          }}
                        >
                          <Product shoes={shoes[i]} i={i + 1} />
                        </Nav.Link>
                      );
                    })}
                  </div>
                </div>
                <button
                  className="more-btn"
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
          <Route
            path="/detail/:id"
            element={
              // <Context1.Provider value={{}}>
              <Detail shoes={shoes} />
              // </Context1.Provider>
            }
          />
          <Route path="/about" element={<About />}>
            <Route
              path="member"
              // 이건 nested routes인데 /about/member로 접속할 때 /about에 화면을 가져가면서 페이지 구성하고 싶을 때 사용, 그냥 /about으로 접속 시 About 컴포넌트 보여주고, /about/member 접속 시 About 컴포넌트 + /about/member로 접속하셨습니다 라는 div까지 보여줌
              element={<div>/about/member로 접속하셨습니다</div>}
            />
          </Route>
          <Route path="/cart" element={<Cart />} />

          <Route path="*" element={<div>없는 페이지</div>} />
        </Routes>
      </Suspense>
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
      <p class="product-content">{props.shoes.content}</p>
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
