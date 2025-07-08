import React, { useState } from 'react';

function splitSentences(text) {
  return text
    .split(/(?<=[.?!])\s+/)
    .filter((s) => s.trim().length > 0)
    .map((sentence, idx) => ({
      id: `sentence-${idx}`,
      content: sentence,
    }));
}

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function App() {
  const [input, setInput] = useState('');
  const [sentences, setSentences] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleSplit = () => {
    const s = splitSentences(input);
    setSentences(s);
    setShuffled(shuffle(s));
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.dataTransfer.setData('text/plain', e.target.textContent);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
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
      alert('🎉 정답입니다!');
    } else {
      alert('❌ 순서가 다릅니다! 다시 시도해보세요.');
    }
  };

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
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0',
        }}
      >
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '24px',
            textAlign: 'center',
            color: '#1e293b',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          📝 영어 문장 순서 맞추기
        </h2>

        <textarea
          rows={6}
          style={{
            width: '100%',
            padding: '16px',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '16px',
            fontFamily: 'inherit',
            resize: 'vertical',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#fafbfc',
            lineHeight: '1.5',
          }}
          placeholder="영어 지문을 입력하세요... 
예: I love programming. It is very interesting. Programming helps me solve problems."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6';
            e.target.style.backgroundColor = 'white';
            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.backgroundColor = '#fafbfc';
            e.target.style.boxShadow = 'none';
          }}
        />

        <div style={{ marginTop: '16px', marginBottom: '24px' }}>
          <button
            onClick={handleSplit}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            }}
          >
            🔀 문장 분할 & 섞기
          </button>
        </div>

        <div
          style={{
            border: '2px dashed #cbd5e1',
            borderRadius: '12px',
            padding: '20px',
            minHeight: '200px',
            backgroundColor: '#f8fafc',
            transition: 'all 0.3s ease',
          }}
        >
          {shuffled.length === 0 ? (
            <div
              style={{
                color: '#64748b',
                textAlign: 'center',
                padding: '40px 20px',
                fontSize: '18px',
                fontWeight: '500',
              }}
            >
              ✨ 문장을 입력하고 섞어보세요!
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
                style={{
                  backgroundColor: 'white',
                  border: '2px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '12px',
                  cursor: 'move',
                  transition: 'all 0.3s ease',
                  userSelect: 'none',
                  fontSize: '17px',
                  lineHeight: '1.6',
                  opacity: draggedIndex === idx ? 0.5 : 1,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
                onMouseOver={(e) => {
                  if (draggedIndex !== idx) {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                  }
                }}
                onMouseOut={(e) => {
                  if (draggedIndex !== idx) {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                  }
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      paddingRight: '16px',
                      color: '#1e293b',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: '24px',
                        height: '24px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        borderRadius: '50%',
                        textAlign: 'center',
                        lineHeight: '24px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        marginRight: '12px',
                      }}
                    >
                      {idx + 1}
                    </span>
                    {item.content}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <button
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: idx === 0 ? 'not-allowed' : 'pointer',
                        backgroundColor: idx === 0 ? '#e2e8f0' : '#3b82f6',
                        color: idx === 0 ? '#94a3b8' : 'white',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseOver={(e) => {
                        if (idx !== 0) {
                          e.target.style.backgroundColor = '#2563eb';
                          e.target.style.transform = 'scale(1.1)';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (idx !== 0) {
                          e.target.style.backgroundColor = '#3b82f6';
                          e.target.style.transform = 'scale(1)';
                        }
                      }}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveDown(idx)}
                      disabled={idx === shuffled.length - 1}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor:
                          idx === shuffled.length - 1
                            ? 'not-allowed'
                            : 'pointer',
                        backgroundColor:
                          idx === shuffled.length - 1 ? '#e2e8f0' : '#3b82f6',
                        color:
                          idx === shuffled.length - 1 ? '#94a3b8' : 'white',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseOver={(e) => {
                        if (idx !== shuffled.length - 1) {
                          e.target.style.backgroundColor = '#2563eb';
                          e.target.style.transform = 'scale(1.1)';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (idx !== shuffled.length - 1) {
                          e.target.style.backgroundColor = '#3b82f6';
                          e.target.style.transform = 'scale(1)';
                        }
                      }}
                    >
                      ↓
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {shuffled.length > 0 && (
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <button
              onClick={check}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '14px 28px',
                border: 'none',
                borderRadius: '10px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
              }}
            >
              ✅ 정답 확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
