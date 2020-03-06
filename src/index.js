import { createStore } from 'redux';

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

number.innerText = 0;

const ADD = 'ADD';
const MINUS = 'MINUS';
//이렇게 입력해놓고 스트링 대신 사용해주면 오류를 좀 더 빠르게 찾는데 용이함

const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};
//reducer: function that modifies the data
//이 함수가 return하는 것이 바로 앱의 data가 되는 것
//유일하게 data를 modity할 수 있는 곳
//파라 미터 안에 initial 값을 지정해줄 수 있음

const countStore = createStore(countModifier);
//store: data를 넣는 곳
//redux의 createStore 함수를 사용해서 store 생성
//괄호 안에는 어떤 함수를 사용해서 이 data를 modify 해줄 지

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);
//subscribe: allows us to listen for changes in the store
//store에 변화가 감지될 때마다 불려짐

const handleAdd = () => {
  countStore.dispatch({ type: ADD });
};

const handleMinus = () => {
  countStore.dispatch({ type: MINUS });
};
add.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);
//dispatch를 사용해서 일종의 메세지를 보내는 것
//메세지에는 action을 넣게 되고, 리듀서 함수 내에서 action.type을 확인하는거지

// console.log(countStore.getState());
