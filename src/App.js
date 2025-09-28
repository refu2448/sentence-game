import React, { useState } from 'react';
import { getStageTexts, getStageInfo, getTotalStages } from './presetTexts';
import './App.css';

// 문장 단위로 분할 및 고유 id 부여
function splitSentences(text) {
  return text
    .split(/(?<=[.?!])\s+/)
    .filter((s) => s.trim().length > 0)
    .map((sentence, idx) => ({
      id: `sentence-${idx}`,
      content: sentence,
    }));
}

// Fisher-Yates shuffle
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 난이도를 CSS 클래스명으로 변환
function getDifficultyClass(difficulty) {
  switch (difficulty) {
    case '초급': return 'beginner';
    case '중급': return 'intermediate';
    case '중상급': return 'advanced';
    case '고급': return 'expert';
    default: return '';
  }
}

function App() {
  const [sentences, setSentences] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [step, setStep] = useState('stage'); // 'stage' -> 'select' -> 'solve'
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2);
  const [isCorrect, setIsCorrect] = useState(false);
  const [barShrink, setBarShrink] = useState(false);

  const resetToHome = () => {
    setStep('stage');
    setSentences([]);
    setShuffled([]);
    setSelectedStage(null);
    setSelectedTitle('');
  };

  const handleStageSelect = (stageNumber) => {
    setSelectedStage(stageNumber);
    setStep('select');
  };

  const backToStageSelect = () => {
    setSelectedStage(null);
    setStep('stage');
  };

  const handlePresetSelect = (selectedText, title) => {
    const s = splitSentences(selectedText);
    setSentences(s);
    setShuffled(shuffle(s));
    setSelectedTitle(title);
    setStep('solve');
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    const items = Array.from(shuffled);
    const [reordered] = items.splice(draggedIndex, 1);
    items.splice(dropIndex, 0, reordered);
    setShuffled(items);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const check = () => {
    const original = sentences.map((s) => s.content).join('');
    const current = shuffled.map((s) => s.content).join('');
    if (original === current) {
      setIsCorrect(true);
      setTimeLeft(2);
      setShowMessage(true);
    } else {
      setIsCorrect(false);
      setShowMessage(true);
    }
  };

  // 정답일 때 타이머 카운트다운 효과
  React.useEffect(() => {
    if (!showMessage || !isCorrect) return;

    // 타이머 카운트다운
    const countdownTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 2초 후 홈으로 이동
    const homeTimer = setTimeout(() => {
      setShowMessage(false);
      setStep('select');
    }, 2000);

    return () => {
      clearInterval(countdownTimer);
      clearTimeout(homeTimer);
    };
  }, [showMessage, isCorrect]);

  // Effect to control barShrink state
  React.useEffect(() => {
    if (showMessage && isCorrect) {
      setBarShrink(true);
    } else {
      setBarShrink(false);
    }
  }, [showMessage, isCorrect]);

  const moveUp = (index) => {
    if (index === 0) return;
    const items = Array.from(shuffled);
    [items[index], items[index - 1]] = [items[index - 1], items[index]];
    setShuffled(items);
  };

  const moveDown = (index) => {
    if (index === shuffled.length - 1) return;
    const items = Array.from(shuffled);
    [items[index], items[index + 1]] = [items[index + 1], items[index]];
    setShuffled(items);
  };

  return (
    <div className="sentence-game-container">
      <div className="main-card">
        <h2 className="main-title">📝 영어 문장 순서 맞추기</h2>

        {/* 스테이지 선택 화면 */}
        {step === 'stage' && (
          <div style={{ marginBottom: 24 }}>
            <h3 className="stage-select-title">
              🎯 스테이지를 선택하세요
            </h3>
            <div className="stage-grid">
              {Array.from({ length: getTotalStages() }, (_, i) => i + 1).map((stage) => {
                const stageInfo = getStageInfo(stage);
                const difficultyClass = getDifficultyClass(stageInfo?.difficulty);
                return (
                  <button
                    key={stage}
                    className={`stage-btn ${difficultyClass}`}
                    onClick={() => handleStageSelect(stage)}
                  >
                    <div className="stage-info">
                      {stageInfo?.name || `Stage ${stage}`}
                    </div>
                    <div className="stage-description">
                      {stageInfo?.title}
                    </div>
                    <div className={`difficulty-badge ${difficultyClass}`}>
                      {stageInfo?.difficulty}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 지문 선택 화면 */}
        {step === 'select' && (
          <div style={{ marginBottom: 24 }}>
            <button
              onClick={backToStageSelect}
              className="back-btn"
            >
              ← 스테이지 선택으로
            </button>
            
            {(() => {
              const stageInfo = getStageInfo(selectedStage);
              const difficultyClass = getDifficultyClass(stageInfo?.difficulty);
              return (
                <>
                  <h3 className="text-select-title">
                    📚 {stageInfo?.name || `Stage ${selectedStage}`} - {stageInfo?.title}
                  </h3>
                  <div className="stage-detail">
                    {stageInfo?.description} 
                    <span className={`difficulty-badge ${difficultyClass}`}>
                      {stageInfo?.difficulty}
                    </span>
                  </div>
                </>
              );
            })()}
            
            <div className="preset-grid">
              {getStageTexts(selectedStage).map((preset) => (
                <button
                  key={preset.id}
                  className="preset-btn"
                  onClick={() =>
                    handlePresetSelect(preset.content, preset.title)
                  }
                >
                  {preset.title}
                  {preset.topic && (
                    <div className="topic-tag">
                      #{preset.topic}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 문제 풀이 화면 */}
        {step === 'solve' && (
          <>
            <h3 className="solve-title">
              🧩 {selectedTitle}
            </h3>
            <div className="drop-area">
              {shuffled.map((item, idx) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, idx)}
                  onDragEnd={handleDragEnd}
                  className={`card-item ${draggedIndex === idx ? 'dragging' : ''}`}
                >
                  <div className="sentence-content">
                    <span className="number-badge">{idx + 1}</span>
                    <span className="sentence-text">{item.content}</span>
                  </div>
                  <div className="move-buttons">
                    <button
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      className="move-btn"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveDown(idx)}
                      disabled={idx === shuffled.length - 1}
                      className="move-btn"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="action-buttons">
              <button
                onClick={() => {
                  setStep('select');
                  setSentences([]);
                  setShuffled([]);
                  setSelectedTitle('');
                }}
                className="reset-btn"
              >
                🔙 처음으로
              </button>
              <button 
                className="check-btn" 
                onClick={check}
              >
                ✅ 정답 확인
              </button>
            </div>
          </>
        )}

        {/* 결과 모달 */}
        {showMessage && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className={`modal-message ${isCorrect ? 'correct' : 'incorrect'}`}>
                {isCorrect
                  ? `🎉 정답입니다! ${timeLeft}초 후 처음 화면으로 돌아갑니다.`
                  : '❌ 순서가 다릅니다! 다시 시도해보세요.'}
              </div>
              {isCorrect && (
                <div className="progress-container">
                  <div 
                    className="progress-bar"
                    style={{ 
                      width: barShrink ? '0%' : '100%',
                      transition: 'width 2s linear'
                    }}
                  />
                </div>
              )}
              <button
                onClick={() => {
                  setShowMessage(false);
                  if (isCorrect) setStep('select');
                }}
                className={`modal-btn ${isCorrect ? 'correct' : 'incorrect'}`}
              >
                {isCorrect ? '🚪 나가기' : '🔄 다시 시도'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;