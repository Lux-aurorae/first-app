// 게임에 쓰이는 3개의 아이템 데이터.
// 컴포넌트 "바깥"에 두는 이유: 렌더링될 때마다 객체가 새로 만들어지는 낭비를 막기 위해서.
//
// [배포 팁] 아래 img 주소는 GitHub 첨부 링크입니다.
// 더 안정적으로 쓰려면 이미지를 public/images/ 에 넣고
// img 값을 "/images/scissors.png" 처럼 바꾸세요.
export const choice = {
  scissors: {
    name: "scissors",
    label: "가위",
    roman: "GAWI",
    img: "https://github.com/user-attachments/assets/34c92e24-4d1e-468d-b2b5-07382203cc58",
  },
  rock: {
    name: "rock",
    label: "바위",
    roman: "BAWI",
    img: "https://github.com/user-attachments/assets/b41a54b8-3213-4b36-9bdd-9b5c2992650b",
  },
  paper: {
    name: "paper",
    label: "보",
    roman: "BO",
    img: "https://github.com/user-attachments/assets/29f25ef5-aac1-4f0f-bf59-227b3a3dd8c4",
  },
};

// 시작 화면에 쓰이는 서당 일러스트
export const INTRO_IMG =
  "https://github.com/user-attachments/assets/6b91ffc3-d02a-49b2-88dd-8a328158cca3";