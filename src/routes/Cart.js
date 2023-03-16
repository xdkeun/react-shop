import { memo, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCount } from "../store";
import { changeName } from "./../store/userSlice";
let Child = memo(function () {
  // memo를 붙히면 state가 변할때만 재랜더링해줌
  // 추가적으로 useMemo를 사용하여 성능 개선도 가능.
  console.log("zz");
  return <div>자식</div>;
});

function Cart() {
  let state = useSelector((state) => {
    return state;
    // return state.user; 하면 user라는 state만 가져옴 그냥 return state하면 모든 state 다 가져옴
  });

  let dispatch = useDispatch();
  console.log(state);
  let [count, setCount] = useState(0);
  return (
    <div>
      <Child count={count}></Child>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      {/* {state.user.name} */}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => {
            return (
              <tr>
                <td>{state.cart[i].id}</td>
                <td>{state.cart[i].name}</td>
                <td>{state.cart[i].count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(addCount(state.cart[i].id));
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
