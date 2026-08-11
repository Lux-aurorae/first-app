import { useState } from "react";
import "./App.css";
import { choice } from "./constants/choice";
import StartScreen from "./component/StartScreen";
import Box from "./component/Box";

// [숙제 1의 핵심] 유저 관점 결과를 컴퓨터 관점으로 뒤집는 표.
// judgement를 두 번 부르는 대신 이 표 하나로 반전시킵니다.
const OPPOSITE = { win: "lose", lose: "win", tie: "tie" };

function App() {
  const [started, setStarted] = useState(false); // 시작 화면 / 게임 화면 전환
  const [userSelect, setUserSelect] = useState(null); // 유저가 낸 아이템(객체)
  const [computerSelect, setComputerSelect] = useState(null); // 컴퓨터가 낸 아이템(객체)
  const [result, setResult] = useState(""); // 유저 기준 승패: win / lose / tie
  const [round, setRound] = useState(0); // 몇 번째 판인지
  const [score, setScore] = useState({ win: 0, lose: 0, tie: 0 }); // 누적 전적

  // ── 컴퓨터의 랜덤 선택 ─────────────────────────────
  const randomChoice = () => {
    const itemArray = Object.keys(choice); // ["scissors", "rock", "paper"]
    const randomIndex = Math.floor(Math.random() * itemArray.length); // 0, 1, 2 중 하나
    return choice[itemArray[randomIndex]]; // 문자열이 아니라 "객체"를 반환해야 함
  };

  // ── 승패 판정 (유저 기준) ──────────────────────────
  // 객체끼리 === 비교하면 항상 false이므로 반드시 .name으로 비교합니다.
  const judgement = (user, computer) => {
    if (user.name === computer.name) return "tie";
    if (user.name === "rock") return computer.name === "scissors" ? "win" : "lose";
    if (user.name === "scissors") return computer.name === "paper" ? "win" : "lose";
    if (user.name === "paper") return computer.name === "rock" ? "win" : "lose";
    return "tie"; // 세 경우를 모두 벗어나는 일은 없지만 안전장치로 둡니다
  };

  // ── 한 판 진행 ────────────────────────────────────
  const play = (userChoice) => {
    const userPick = choice[userChoice];
    const computerPick = randomChoice();
    const newResult = judgement(userPick, computerPick);

    // ⚠️ setState 직후에는 그 state를 읽을 수 없습니다.
    // 그래서 judgement에는 state가 아닌 위의 "지역 변수"를 넘깁니다.
    setUserSelect(userPick);
    setComputerSelect(computerPick);
    setResult(newResult);
    setRound((prev) => prev + 1);
    setScore((prev) => ({ ...prev, [newResult]: prev[newResult] + 1 }));
  };

  // ── 전적 초기화 ───────────────────────────────────
  const reset = () => {
    setUserSelect(null);
    setComputerSelect(null);
    setResult("");
    setRound(0);
    setScore({ win: 0, lose: 0, tie: 0 });
  };

  const headline = {
    win: "이번 판은 이겼습니다",
    lose: "이번 판은 졌습니다",
    tie: "비겼습니다. 다시 냅니다",
  };

  return (
    <main className="stage">
      <div className="frame">
        {!started ? (
          <StartScreen onStart={() => setStarted(true)} />
        ) : (
          <section className="game">
            <header className="game__head">
              <h1 className="game__title">가위바위보</h1>
              <p className="game__round">
                {round === 0 ? "첫 판을 기다리는 중" : `${round}번째 판`}
              </p>
            </header>

            <div className="tally">
              <span className="tally__item tally__item--win">
                승 <b>{score.win}</b>
              </span>
              <span className="tally__sep" />
              <span className="tally__item tally__item--lose">
                패 <b>{score.lose}</b>
              </span>
              <span className="tally__sep" />
              <span className="tally__item tally__item--tie">
                무 <b>{score.tie}</b>
              </span>
            </div>

            <div className="board">
              <Box
                title="나"
                subtitle="YOU"
                item={userSelect}
                result={result}
                round={round}
              />
              <Box
                title="상대"
                subtitle="COMPUTER"
                item={computerSelect}
                // [숙제 1] 유저 기준 결과를 뒤집어서 전달
                result={result ? OPPOSITE[result] : ""}
                round={round}
              />
            </div>

            <p className={`verdict ${result ? `verdict--${result}` : ""}`}>
              {result ? headline[result] : "아래에서 하나를 고르세요"}
            </p>

            <div className="hands">
              {Object.keys(choice).map((key) => (
                <button
                  key={key}
                  className="btn btn--hand"
                  onClick={() => play(key)}
                >
                  <span className="btn__ko">{choice[key].label}</span>
                  <span className="btn__en">{choice[key].roman}</span>
                </button>
              ))}
            </div>

            {round > 0 && (
              <button className="btn btn--ghost" onClick={reset}>
                전적 지우기
              </button>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

export default App;