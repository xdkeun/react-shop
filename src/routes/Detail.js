import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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
  useEffect(() => {
    // Detail이 MouseEvent, update시 코드가 실행 됨, 2번 실행되는 이유는 그냥 리액트 디버깅 방식임 index.js의 StrictMode 없애면 해결됨
    // useEffect는 html이 렌더링 된 후에 동작함. useEffect 안에 있는 코드가 오래 걸리면 html을 먼저 로드해서 사용자에게 보여주고, 그 다음에 useEffect를 실행해서 부드럽게 만들어줌, 그래서 보통 시간이 오래 걸리는 코드들을 useEffect에 작성하여 사용함
  });

  setTimeout(()=>{
    // 2초 이내 구매시 할인 div를 숨기기
  }, 2000)
  let [count, setCount] = useState(0);

  let { id } = useParams();
  let detailProduct = props.shoes.find(function (x) {
    return x.id == id;
  });

  return (
    <div className="container">
      {/* styled-components 사용 */}
      {/* <Btn bg="red">빨강 버튼</Btn> */}
      {/* <Btn bg="blue">파랑 버튼</Btn> */}
      <div className="alert alert-warning">2초 이내 구매시 할인</div>
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        1 더하기{" "}
      </button>
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${id}.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{detailProduct.title}</h4>
          <p>{detailProduct.content}</p>
          <p>{detailProduct.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
