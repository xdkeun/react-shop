import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import { Context1 } from "./../App.js";
import { useDispatch } from "react-redux";
import { addItem } from "./../store";
// styled-components
let Btn = styled.button`
  all: unset;
  background-color: ${(props) => props.bg};
  color: ${(props) =>
    props.bg == "blue"
      ? "white"
      : "black"}; // props.bg가 blue가 들어오면 color가 white, 아니면 black
  padding: 5px 10px;
  margin-right: 3px;
`;

function Detail(props) {
  // let {재고} = useContext(Context1)
  let [count, setCount] = useState(0);

  let { id } = useParams();
  let detailProduct = props.shoes.find(function (x) {
    return x.id == id;
  });
  let [alert, setAlert] = useState(true);
  let [input, setInput] = useState(0);
  let [탭, 탭변경] = useState(0);
  let dispatch = useDispatch();
  useEffect(() => {
    // Detail이 MouseEvent, update시 코드가 실행 됨, 2번 실행되는 이유는 그냥 리액트 디버깅 방식임 index.js의 StrictMode 없애면 해결됨
    // useEffect는 html이 렌더링 된 후에 동작함. useEffect 안에 있는 코드가 오래 걸리면 html을 먼저 로드해서 사용자에게 보여주고, 그 다음에 useEffect를 실행해서 부드럽게 만들어줌, 그래서 보통 시간이 오래 걸리는 코드들을 useEffect에 작성하여 사용함
    // useEffet 안에 return 문을 쓰면 useEffect 동작 전에 실행 됨
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  }, [count]); //[]쓰면 mount시에만 작동하고, [count]라고 쓰면 mount 시, count state 변경 시에 작동하고, 아무것도 안쓰면 mount, update시에 작동됨
  useEffect(() => {
    if (isNaN(input)) {
      //isNan() 숫자가 있는 문자인지 없는 문자인지 파악, isNan('123') 은 false가 나오고, isNan('ㄱㄴㄷ') 는 true가 나옴
      console.log("숫자를 입력하세요");
    }
  }, [input]);

  return (
    <div className="container">
      {/* styled-components 사용 */}
      {/* <Btn bg="red">빨강 버튼</Btn> */}
      {/* <Btn bg="blue">파랑 버튼</Btn> */}
      {
        // 2초후에 setAlert를 이용해 alert를 false가 됨. 2초 후에 해당 코드가 사라지도록 구현
        alert ? (
          <div className="alert alert-warning time-sale">
            2초 이내 구매시 할인
          </div>
        ) : null
      }
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes1.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{detailProduct.title}</h4>
          <p>{detailProduct.content}</p>
          <p>{detailProduct.price}원</p>
          {/* 숫자가 아닌 값을 입력했을 때 alert창 */}
          <p>
            <input
              type="text"
              placeholder="수량을 입력하세요"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(addItem({ id: 1, name: detailProduct.title, count: 1 }));
            }}
          >
            주문하기
          </button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              탭변경(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              탭변경(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              탭변경(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent 탭={탭} shoes={props.shoes} />
    </div>
  );
}
function TabContent(props) {
  // if문을 여러개 쓰기 위해 컴포넌트로 만들어서 컴포넌트를 넣어주는 방법도 가능
  // if (props.탭 == 0) {
  //   return <div>내용0</div>;
  // } else if (props.탭 == 1) {
  //   return <div>내용1</div>;
  // } else if (props.탭 == 2) {
  //   return <div>내용2</div>;
  // }
  let [fade, setFade] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100); //0.1초의 시간차를 줘야 return문이 가장 먼저 실행되고, 그 다음에 useEffect가 실행되서라고 함
    return () => {
      // useEffect 실행 전에 실행 됨, end라는 class를 없앴다가 다시 넣는 과정임. 없앴다가 넣어야 함
      setFade("");
    };
  }, [props.탭]);
  return (
    <div className={`start ${fade}`}>
      {
        [<div>{props.shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>][
          props.탭
        ]
      }
    </div>
  );
}

export default Detail;
