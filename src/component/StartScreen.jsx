import { INTRO_IMG } from "../constants/choice";

// props로 onStart 함수를 받아서, 버튼을 누르면 App의 started 상태를 true로 바꿉니다.
function StartScreen({ onStart }) {
  return (
    <section className="intro">
      <p className="intro__eyebrow">첫 번째 프로젝트</p>
      <h1 className="intro__title">가위바위보</h1>
      <p className="intro__sub">
        서당에서 배우는 리액트 · component &middot; props &middot; state
      </p>

      <div className="intro__art">
        <img
          src={INTRO_IMG}
          alt="서당에서 리액트를 배우는 학동들을 그린 일러스트"
        />
      </div>

      <button className="btn btn--start" onClick={onStart}>
        판 시작하기
      </button>

      <p className="intro__hint">
        가위 · 바위 · 보 중 하나를 내면 상대가 곧바로 응합니다.
      </p>
    </section>
  );
}

export default StartScreen;