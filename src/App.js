import React, { useState } from 'react';

// 미리 준비된 영어 지문들
const presetTexts = [
  {
    id: 1,
    title: '일상 대화',
    content:
      "Good morning! How are you today? I'm doing well, thank you. What are your plans for the weekend? I plan to visit my friends and go shopping.",
  },
  {
    id: 2,
    title: '환경 보호',
    content:
      'Climate change is a serious global issue. We need to reduce our carbon footprint. Recycling helps protect the environment. Everyone should use renewable energy sources whenever possible.',
  },
  {
    id: 3,
    title: '기술과 생활',
    content:
      'Technology has changed our daily lives significantly. Smartphones connect us to the world instantly. Social media allows us to share experiences with friends. However, we should use technology wisely and responsibly.',
  },
  {
    id: 4,
    title: '건강한 생활',
    content:
      'Regular exercise is important for good health. Eating nutritious food gives us energy. Getting enough sleep helps our body recover. Drinking plenty of water keeps us hydrated throughout the day.',
  },
  {
    id: 5,
    title: '여행 경험',
    content:
      'Traveling opens our minds to new cultures. Meeting local people creates memorable experiences. Trying different foods is always exciting. Taking photos helps us remember beautiful moments forever.',
  },
  {
    id: 6,
    title: '학습과 성장',
    content:
      'Learning new skills takes time and practice. Making mistakes is part of the learning process. Reading books expands our knowledge and vocabulary. Setting goals helps us stay motivated and focused.',
  },
];

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

  // 프리셋 선택 시 문장 분할 & 섞기
  const handlePresetSelect = (selectedText) => {
    const s = splitSentences(selectedText);
    setSentences(s);
    setShuffled(shuffle(s));
  };

  // 드래그 시작
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
  };

  // 드래그 중(위치 허용)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // 드롭(순서 변경)
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    const items = Array.from(shuffled);
    const [reordered] = items.splice(draggedIndex, 1);
    items.splice(dropIndex, 0, reordered);
    setShuffled(items);
    setDraggedIndex(null);
  };

  // 드래그 종료
  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // 정답 확인
  const check = () => {
    const original = sentences.map((s) => s.content).join('');
    const current = shuffled.map((s) => s.content).join('');
    if (original === current) {
      alert('🎉 정답입니다!');
    } else {
      alert('❌ 순서가 다릅니다! 다시 시도해보세요.');
    }
  };

  // 위로 이동
  const moveUp = (index) => {
    if (index === 0) return;
    const items = Array.from(shuffled);
    [items[index], items[index - 1]] = [items[index - 1], items[index]];
    setShuffled(items);
  };

  // 아래로 이동
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

        {/* 지문 선택 */}
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
                onClick={() => handlePresetSelect(preset.content)}
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

        {/* 드래그앤드롭 영역 */}
        <div style={styles.dropArea}>
          {shuffled.length === 0 ? (
            <div
              style={{
                color: '#64748b',
                textAlign: 'center',
                padding: '40px 20px',
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              ✨ 위에서 지문을 선택해주세요!
            </div>
          ) : (
            shuffled.map((item, idx) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, idx)}
                onDragEnd={handleDragEnd}
                style={styles.cardItem(draggedIndex === idx)}
              >
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
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
            ))
          )}
        </div>

        {/* 정답 확인 버튼 */}
        {shuffled.length > 0 && (
          <div style={{ textAlign: 'center' }}>
            <button style={styles.checkBtn} onClick={check}>
              ✅ 정답 확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
