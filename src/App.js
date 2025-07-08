import React, { useState } from 'react';
import presetTexts from './presetTexts';

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

function App() {
  const [sentences, setSentences] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [step, setStep] = useState('select');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2);

  const resetToHome = () => {
    setStep('select');
    setSentences([]);
    setShuffled([]);
    setSelectedTitle('');
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
      setTimeLeft(2);
      setShowMessage(true);
    } else {
      alert('❌ 순서가 다릅니다! 다시 시도해보세요.');
    }
  };

  React.useEffect(() => {
    if (!showMessage) return;
    if (timeLeft <= 0) {
      setShowMessage(false);
      resetToHome();
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [showMessage, timeLeft]);

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

  // 스타일링 객체
  const styles = {
    container: {
      maxWidth: 800,
      margin: '0 auto',
      padding: 20,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 30,
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      border: '1px solid #e2e8f0',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 24,
      textAlign: 'center',
      color: '#1e293b',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    presetGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: 12,
      marginBottom: 16,
    },
    presetBtn: {
      padding: '16px 20px',
      backgroundColor: 'white',
      border: '2px solid #e2e8f0',
      borderRadius: 12,
      fontSize: 16,
      fontWeight: 600,
      cursor: 'pointer',
      color: '#374151',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      transition: 'all 0.3s',
    },
    dropArea: {
      border: '2px dashed #cbd5e1',
      borderRadius: 12,
      padding: 20,
      minHeight: 200,
      backgroundColor: '#f8fafc',
      transition: 'all 0.3s',
    },
    cardItem: (isDragging) => ({
      backgroundColor: 'white',
      border: '2px solid #e2e8f0',
      borderRadius: 10,
      padding: 16,
      marginBottom: 12,
      cursor: 'move',
      userSelect: 'none',
      fontSize: 17,
      lineHeight: 1.6,
      opacity: isDragging ? 0.5 : 1,
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      transition: 'all 0.3s',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }),
    numberBadge: {
      display: 'inline-block',
      width: 24,
      height: 24,
      backgroundColor: '#3b82f6',
      color: 'white',
      borderRadius: '50%',
      textAlign: 'center',
      lineHeight: '24px',
      fontSize: 14,
      fontWeight: 'bold',
      marginRight: 12,
    },
    upDownBtn: (disabled) => ({
      width: 32,
      height: 32,
      border: 'none',
      borderRadius: 6,
      fontSize: 16,
      fontWeight: 'bold',
      cursor: disabled ? 'not-allowed' : 'pointer',
      backgroundColor: disabled ? '#e2e8f0' : '#3b82f6',
      color: disabled ? '#94a3b8' : 'white',
      transition: 'all 0.2s',
      marginBottom: 4,
    }),
    checkBtn: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      padding: '14px 28px',
      border: 'none',
      borderRadius: 10,
      fontSize: 18,
      fontWeight: 600,
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
      marginTop: 24,
      transition: 'all 0.3s',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 영어 문장 순서 맞추기</h2>

        {step === 'select' && (
          <div style={{ marginBottom: 24 }}>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 16,
                color: '#374151',
                textAlign: 'center',
              }}
            >
              📚 지문을 선택하세요
            </h3>
            <div style={styles.presetGrid}>
              {presetTexts.map((preset) => (
                <button
                  key={preset.id}
                  style={styles.presetBtn}
                  onClick={() =>
                    handlePresetSelect(preset.content, preset.title)
                  }
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#f8fafc';
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                  }}
                >
                  {preset.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'solve' && (
          <>
            <div style={{ textAlign: 'right', marginBottom: 8 }}>
              <button
                onClick={resetToHome}
                style={{ ...styles.checkBtn, background: '#e11d48' }}
              >
                🔙 처음으로
              </button>
            </div>
            <h3
              style={{
                textAlign: 'center',
                marginBottom: 16,
                color: '#1e293b',
              }}
            >
              🧩 {selectedTitle}
            </h3>
            <div style={styles.dropArea}>
              {shuffled.map((item, idx) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, idx)}
                  onDragEnd={handleDragEnd}
                  style={styles.cardItem(draggedIndex === idx)}
                >
                  <div
                    style={{ flex: 1, display: 'flex', alignItems: 'center' }}
                  >
                    <span style={styles.numberBadge}>{idx + 1}</span>
                    <span style={{ color: '#1e293b' }}>{item.content}</span>
                  </div>
                  <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                  >
                    <button
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      style={styles.upDownBtn(idx === 0)}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveDown(idx)}
                      disabled={idx === shuffled.length - 1}
                      style={styles.upDownBtn(idx === shuffled.length - 1)}
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button style={styles.checkBtn} onClick={check}>
                ✅ 정답 확인
              </button>
            </div>
          </>
        )}
        {showMessage && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.4)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <div
              style={{
                position: 'relative',
                backgroundColor: 'white',
                padding: 24,
                borderRadius: 12,
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                textAlign: 'center',
                maxWidth: 360,
                width: '90%',
              }}
            >
              <button
                onClick={() => {
                  setShowMessage(false);
                  resetToHome();
                }}
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: 'transparent',
                  border: 'none',
                  fontSize: 20,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: '#94a3b8',
                }}
              >
                ×
              </button>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#10b981',
                  marginBottom: 12,
                }}
              >
                🎉 정답입니다! {timeLeft}초 후 처음 화면으로 돌아갑니다.
              </div>
              <div
                style={{
                  width: '100%',
                  height: 10,
                  backgroundColor: '#e2e8f0',
                  borderRadius: 6,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${(timeLeft / 2) * 100}%`,
                    height: '100%',
                    backgroundColor: '#10b981',
                    transition: 'width 1s linear',
                  }}
                />
              </div>
              <button
                onClick={() => {
                  setShowMessage(false);
                  resetToHome();
                }}
                style={{
                  marginTop: 16,
                  padding: '10px 20px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                }}
              >
                🚪 나가기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
