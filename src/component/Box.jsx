// 결과 문자열을 화면에 보여줄 글자로 바꿔주는 표
const SEAL_TEXT = { win: "勝", lose: "敗", tie: "無" };
const RESULT_TEXT = { win: "이겼다", lose: "졌다", tie: "비겼다" };

function Box({ title, subtitle, item, result, round }) {
  // result가 있을 때만 box--win / box--lose / box--tie 클래스가 붙습니다.
  // 이 클래스가 CSS에서 테두리 색을 바꿔줍니다. (초록 / 빨강 / 노랑)
  const stateClass = result ? `box--${result}` : "";

  return (
    <article className={`box ${stateClass}`}>
      <header className="box__head">
        <span className="box__title">{title}</span>
        <span className="box__subtitle">{subtitle}</span>
      </header>

      <div className="box__frame">
        {item ? (
          <img className="box__img" src={item.img} alt={item.label} />
        ) : (
          <p className="box__empty">아직 내지 않았습니다</p>
        )}

        {/* 낙관(도장). key에 round를 주면 판이 바뀔 때마다 애니메이션이 다시 재생됩니다. */}
        {result && (
          <span key={round} className={`seal seal--${result}`}>
            {SEAL_TEXT[result]}
          </span>
        )}
      </div>

      <footer className="box__foot">
        {item ? (
          <>
            <span className="box__pick">{item.label}</span>
            <span className="box__roman">{item.roman}</span>
          </>
        ) : (
          <span className="box__pick box__pick--idle">—</span>
        )}
        {result && <span className="box__result">{RESULT_TEXT[result]}</span>}
      </footer>
    </article>
  );
}

export default Box;