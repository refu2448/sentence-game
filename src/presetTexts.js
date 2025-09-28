// 스테이지별로 구조화된 지문 데이터
const stageData = {
  1: {
    name: "구로고2학년",
    title: "기초 일상 회화",
    description: "간단한 일상 대화와 기본 표현들",
    difficulty: "초급",
    texts: [
      {
        id: 1,
        title: '22',
        content: "All of the restaurants are using carefully chosen words to evoke vivid mental images of delicious food and rich desserts in order to draw the potential customer to their particular establishment. Just like the restaurants, nature has its own dining establishments. In a fashion similar to the restaurants’ financial dependence upon drawing in many customers, the restaurateurs of the natural world (i.e., flowers) must also attract potential diners to sample their offerings. In the natural world, there are no neon signs or flashy words in which to market a potential meal to hungry animals. These restaurants that I am referring to are the world’s flowers, and the potential guests are the host of organisms that visit flowers to obtain nectar and other valuable resources. Instead of using a written language or neon sign, they advertise their offerings just as effectively using the language of smell.",
        topic: "꽃은 동물과 곤충을 유인하기 위해 냄새, 향기를 이용하는 자연의 ‘식당’입니다"
      },
      {
        id: 2,
        title: '23',
        content: "Would you rather receive $1,000 in a year or $1,100 in a year and a month? Most people will opt for the larger sum in thirteen months — where else will you find a monthly interest rate of 10 percent. A wise choice, since the interest will compensate you generously for any risks you face by waiting the extra few weeks. Second question: Would you prefer $1,000 today cash on the table or $1,100 in a month? If you think like most people, you’ll take the $1,000 right away. This is amazing. In both cases, if you hold out for just a month longer, you get $100 more. In the first case, it’s simple enough. You figure: “I’ve already waited twelve months; what’s one more?” Not in the second case. The introduction of “now” causes us to make inconsistent decisions. Science calls this phenomenon hyperbolic discounting. The closer a reward is, the higher our “emotional interest rate” rises and the more we are willing to give up in exchange for it.",
        topic: "?"
      },
      {
        id: 3,
        title: '24',
        content: "Of central importance for understanding the development of handedness is the answer to the question of when in development it is actually determined whether a child will be left‐handed or right‐handed. It was long thought that handedness could only be reliably determined in elementary school, when a child learns to write. However, this assumption is incorrect. In fact, scientific studies show that left‐handedness is established in many children long before elementary school — interestingly, even before birth in most people. In such studies, the hand and arm movements of unborn children in the womb are recorded using ultrasound images. Using this technique, it was shown that a clear preference for the movement of the right arm exists as early as 10 weeks after fertilization. In this study, ultrasound images of 72 unborn children 10 weeks after fertilization were evaluated and 85% showed more movements of the right arm than the left. This number is already very close to the approximately 89.4% right‐handers among adults.",
        topic: "사람의 잘 쓰는 손은 태아 시기부터 이미 결정된다"
      },
      {
        id: 4,
        title: '29',
        content: "In art, there are a number of ways to use perspective to obtain the illusion of depth, including using colors and graduated values of black and white, and accurately drawing the subject by applying the rules of the geometric system of perspective. In order to achieve perspective, you must make a number of observations. The forms or objects that you draw on a flat surface actually have depth and dimension in real life. As you view them and place their shapes and forms on a drawing surface, try to represent that depth to make the objects appear realistic and three‐ dimensional. Objects appear differently when viewed from various positions. Because of this, it’s important to establish the viewpoint, and stick with  it. When observing a subject, you see depth and three dimensions. When you draw this subject onto a flat surface as it appears to the eye, you are drawing in perspective.",
        topic: "원근법을 활용하면 평면 위에 입체감과 깊이를 사실적으로 표현할 수 있다"
      },
      {
        id: 5,
        title: '30',
        content: "Low oil prices are a good thing, because it means lower energy costs of production for the majority of industries, not least the automobile and the logistics industries. Firms directly benefit from the decrease in their costs of production and provision of services. This has the effect of stimulating the aggregate supply and provides a stimulus for growth. Conversely, a sudden rise in oil prices due to a shrink in oil production is never good news, even though it definitely gives a big boost to the energy sector. A look through the history of oil price fluctuations confirms this notion, as this has been the subject of much economic research. Following an oil price jump of 10 per cent due to a contraction in supply, an economy (as typified by the US economy) typically sees its output (GDP) slowed by close to 1 percentage point. For a $15 trillion economy, that is a loss of $150 billion in potential wealth or economic growth. Conversely, there has never been much concern with oil price decreases following an excess in its supply.",
        topic: "원유가격 변동은 산업 비용과 경제 성장에 직결되어, 하락은 성장에 도움을 주고 급등은 경제에 악영향을 미친다"
      },
      {
        id: 123,
        title: '31',
        content: "We might forget an anecdote about a stranger because it makes few connections with our existing associations, but we won’t forget a piece of gossip about our cousin. There’s one complex network that is larger and quicker to access than all others — the self. We’ve been thinking about ourselves in our whole lives. (In fact, there were entire years during junior high when we weren’t capable of thinking about much else.) So if a new piece of information has something to do with us, it will be more easily and thoroughly processed. It hits even closer to home than our actual home — we can take a vacation away from our home, but not from ourselves. The most effective communicators find ways to make the abstract personal. Consider the warning that law schools give to motivate first‐year law students concerning the rigors of their program. Hearing that “the first‐year dropout rate is 33%” is an abstract statistic. “Look to your left, look to your right. One of the three of you won’t be joining us next fall” wakes up the self.",
        topic: "추상적인 정보를 개인과 연결하면 더 쉽게 기억하고 이해 할 수 있다"
      },
      {
        id: 6,
        title: '32',
        content: 'Steve Jobs used analogy to get people to embrace the new technology. Before computers, people worked in a physical world. We used paper and pens and physical file folders and so on. The idea of working in a virtual world was radically different. Or at least seemed radically different. What Jobs understood was that a physical office was fundamentally similar to a virtual office. To win over the masses, Jobs drew strong analogies between the traditional workplace people knew well with the new, unfamiliar virtual workplace. In the pre‐computer workplace, when ideas were written on paper it was called a document. When those documents needed to be stored they were put in a folder. And those folders were kept on a desk. Documents, folders, and desktops are the terms we use in our virtual work because Steve Jobs understood that using familiar terms would make the new technology easier to understand. The parallels between the physical and virtual workplace now seem obvious.',
        topic: "스티브 잡스는 익숙한 용어를 사용한 비유로 새로운 컴퓨터 기술을 쉽게 이해시켰다."
      },
      {
        id: 6,
        title: '33',
        content: 'Turtle hatchlings have, it seems, evolved to crawl toward the light. For millions of years this was a highly rational and effective strategy because the light on a dark beach represented the reflection of the moon and stars on the water’s surface. Following the lights led baby turtles back home to the sea. The problems started when humans began building beachfront homes and sparkling hotels on the other side of the beach. Now after hatching, turtles heading for the brightest nearby lights were being guided straight into traffic. Are self‐ destructive sea turtles naturally irrational? Yes, in the modern world. But there’s a deeper truth. Turtles are basing their decisions on simple cues that were perfectly rational for their ancestors; these days, however, their evolved decision‐making mechanisms are being blinded by modern lights',
        topic: "현대 문명의 인공조명이 바다거북 새끼거북 새끼들의 본능적이고 과거에는 합리적이었던 행동을 지금은 위험하게 만들고 있다"
      },
      {
        id: 6,
        title: '34',
        content: 'Sensory organs are the only channels of communication between the brain and the outside world. Simply put, the brain is not designed to sense on its own. For instance, an exposed brain would neither sense light shining on it nor feel something touching it. In fact, patients are often kept awake during brain surgery, which can help a surgeon isolate specific regions of the brain. The ancient Greek philosopher Aristotle recognized this characteristic of the brain over 2,000 years ago when he said, “Nothing is in the mind that does not pass through the senses”. This concept can be seen clearly when volunteers are blind‐folded and placed in the warm water of a sensory deprivation tank. They soon experience visual, auditory, and tactile (touch) hallucinations, as well as incoherent thought patterns. From these experiments and others, it is apparent that we need constant input from our senses to carry out functions that give us personality and intellect.',
        topic: "뇌는 감각 기관을 통해 외부 세계와 소통하며, 이러한 감각 자극이 지각과 사고기능에 필수적이다"
      },
      {
        id: 6,
        title: '36',
        content: 'The transition from an oral culture, in which knowledge was handed down through stories, songs, and apprenticeships, to a literate one, based on the written word, was held back for centuries by the lack of suitable writing material. Stone and clay tablets were used, but they were prone to fracture and were bulky and heavy to transport. Wood suffers from splitting and is susceptible to decay. Wall paintings are static and space is limited. The invention of paper, said to be one of the four great inventions of the Chinese, solved these problems, but it wasn’t until the Romans replaced the scroll with the codex — or, as we call it now, the book — that the material reached its full potential. That was two thousand years ago, and it is still a dominant form of the written word. That paper, a much softer material than either stone or wood, won out as the guardian of the written word is a remarkable materials story.',
        topic: "종이의 발명과 책의 등장으로 기록매체가 혁신되어 오늘날 까지도 글의 전송 수단으로 자리 잡았다"
      },
      {
        id: 6,
        title: '37',
        content: 'A reason for a conclusion is very unlikely to consist in a single claim. No matter how we might state it in short‐ hand, it is, analytically, a complex interaction of many ideas and implications. The reason must be broken down into a chain of more precise premises. For example, the claim that ‘university education should be free for all Australians’ might be supported by the reason that ‘the economy benefits from a well‐educated Australian population’. But is our analysis of the situation clearly expressed in just one statement? Hardly. The conclusion is about universities and free education, while the reason introduces some new ideas: economic benefit and a well‐educated population. While the link between these two ideas and the conclusion might seem obvious, the purpose of reasoning is to avoid assuming the ‘obvious’ by carefully working through the connections between the various ideas in the initial statement of our reason.',
        topic: "추론의 핵심은 결론을 단일한 주장으로 뒷받침하기보다, 논리적으로 다양한 아이디어와 함의를 연결해 논리적인 전제로 분석하는 데 있다"
      },
      {
        id: 6,
        title: '38',
        content: 'The word “migration” is almost always reported in the popular media and even in scientific literature as a problem or a crisis. For example, migrants are assumed to overcrowd cities, clog up labor markets, and increase poverty. The other questionable assumption is that most migration is involuntary — people fleeing natural or man‐made disasters. The reality, however, is more complex, and many migrants are simply seeking greater economic opportunity. Of course migration can and does create social and economic problems. But migration can also be a solution for many preexisting problems. For example, out‐migration generally redistributes workers from places of labor surplus to areas where there is greater demand or more opportunity. Migration is generally selective of persons who are younger, healthier, more flexible, and more willing to endure hardship in hopes of a better life relative to their prospects in their places of origin. Most research that examines long‐term outcomes of migration, including remittances and intergenerational mobility, finds positive “long‐term” effects on places of origin and destination.',
        topic: " 이주는 경제적 기회를 추구하는 자발적 선택이며 장기적으로 긍정적인 영향을 줄 수 있다"
      },
      {
        id: 6,
        title: '39',
        content: 'The big problem with money created by the government is that those who run the government always face the temptation to create more money and spend it. Whether among ancient kings or modern politicians, this has happened again and again over the centuries, leading to inflation and the many economic and social problems that follow from inflation. For this reason, many countries have preferred using gold, silver, or some other material that is inherently limited in supply, as money. It is a way of depriving governments of the power to expand the money supply to inflationary levels. Gold has long been considered ideal for this purpose, since the supply of gold in the world usually cannot be increased rapidly. When paper money is convertible into gold whenever the individual chooses to do so, then the money is said to be “backed up” by gold. This expression is misleading only if we imagine that the value of the gold is somehow transferred to the paper money, when in fact the real point is that the gold simply limits the amount of paper money that can be issued.',
        topic: "정부가 인플레이션을 막기 위해 금 같은 제한된 자원을 화폐로 사용한다."
      },
      {
        id: 6,
        title: '40',
        content: 'The study of emotions and decision making is now of considerable importance. This involves the application of various tools afforded by neuroscience. One important stream of the literature examines people with brain damage and how damage to particular parts of the brain known to be responsible for particular cognitive functions impacts on decision making. One example of this research is the work of Antonio Damasio, who finds that when the emotional part of the brain is damaged, this actually reduces the efficacy of decision making. Good decisions are a product of the emotional part of the brain working in conjunction with the deliberative part. This contradicts the assumptions of conventional economics, where emotions play a negative role in the decision‐making process. Here it is assumed that decision making can be modeled as being generated in a stoic, unemotional fashion, and that’s why decisions tend to be optimal. But the evidence suggests that emotions actually play an important and, often, a positive role in decision making. The brain’s emotional part working in relation with its deliberative part enhances the effectiveness of decision making, which counters the ideas about emotions in the decision‐making process of traditional economics.',
        topic: "감정은 의사 결정에 긍정적 역할을 한다"
      },
    ]
  },
  
  2: {
    name: "중급편",
    title: "환경과 건강",
    description: "환경 보호와 건강한 생활에 관한 내용",
    difficulty: "중급",
    texts: [
      {
        id: 6,
        title: '환경 보호',
        content: 'Climate change is a serious global issue. We need to reduce our carbon footprint. Recycling helps protect the environment. Everyone should use renewable energy sources.',
        topic: "environment"
      },
      {
        id: 7,
        title: '건강한 생활',
        content: 'Regular exercise is important for good health. Eating nutritious food gives us energy. Getting enough sleep helps our body recover. Drinking water keeps us hydrated.',
        topic: "health"
      },
      {
        id: 8,
        title: '운동의 이점',
        content: 'Exercise strengthens our muscles and bones. It improves our mental health too. Swimming is great for the whole body. Walking daily keeps us fit.',
        topic: "exercise"
      },
      {
        id: 9,
        title: '친환경 생활',
        content: 'Using public transportation reduces pollution. Planting trees helps clean the air. Buying local products supports the community. Small actions make big differences.',
        topic: "eco-friendly"
      },
      {
        id: 10,
        title: '건강한 식습관',
        content: 'Eating vegetables provides essential vitamins. Fruits give us natural sugars and fiber. Avoiding processed foods keeps us healthy. Cooking at home is better than eating out.',
        topic: "nutrition"
      }
    ]
  },

  3: {
    name: "응용편",
    title: "기술과 학습",
    description: "현대 기술과 학습 방법에 관한 내용",
    difficulty: "중급",
    texts: [
      {
        id: 11,
        title: '기술과 생활',
        content: 'Technology has changed our daily lives significantly. Smartphones connect us to the world instantly. Social media allows us to share experiences. We should use technology responsibly.',
        topic: "technology"
      },
      {
        id: 12,
        title: '학습과 성장',
        content: 'Learning new skills takes time and practice. Making mistakes is part of the learning process. Reading books expands our knowledge. Setting goals helps us stay motivated.',
        topic: "learning"
      },
      {
        id: 13,
        title: '온라인 교육',
        content: 'Online courses offer flexible learning schedules. Students can learn from anywhere in the world. Interactive videos make lessons more engaging. Digital tools enhance the learning experience.',
        topic: "online-education"
      },
      {
        id: 14,
        title: '인공지능',
        content: 'Artificial intelligence is transforming many industries. AI helps doctors diagnose diseases faster. Smart assistants make our lives more convenient. We must use AI ethically.',
        topic: "ai"
      },
      {
        id: 15,
        title: '디지털 문해력',
        content: 'Digital literacy is essential in modern society. People need to evaluate online information critically. Understanding privacy settings protects personal data. Cybersecurity awareness prevents online threats.',
        topic: "digital-literacy"
      }
    ]
  },

  4: {
    name: "고급편",
    title: "문화와 여행",
    description: "다양한 문화와 여행 경험에 관한 내용",
    difficulty: "중상급",
    texts: [
      {
        id: 16,
        title: '여행 경험',
        content: 'Traveling opens our minds to new cultures. Meeting local people creates memorable experiences. Trying different foods is always exciting. Taking photos helps us remember beautiful moments.',
        topic: "travel"
      },
      {
        id: 17,
        title: '문화 교류',
        content: 'Cultural exchange programs build international friendships. Learning foreign languages connects people globally. Celebrating different festivals enriches our understanding. Respecting diversity creates harmony.',
        topic: "culture"
      },
      {
        id: 18,
        title: '음식 문화',
        content: 'Every country has unique traditional dishes. Spices and cooking methods vary across regions. Food festivals celebrate culinary diversity. Sharing meals brings people together.',
        topic: "cuisine"
      },
      {
        id: 19,
        title: '축제와 전통',
        content: 'Traditional festivals preserve cultural heritage. Music and dance express cultural identity. Storytelling passes down wisdom through generations. Handicrafts showcase artistic skills.',
        topic: "traditions"
      },
      {
        id: 20,
        title: '세계 명소',
        content: 'Famous landmarks attract millions of visitors annually. Ancient monuments tell stories of past civilizations. Natural wonders showcase the beauty of our planet. Museums preserve art and history.',
        topic: "landmarks"
      }
    ]
  }
};

// 기존 형태로 변환하는 함수 (기존 App.js와 호환성 유지)
function getAllTexts() {
  const allTexts = [];
  Object.values(stageData).forEach(stage => {
    stage.texts.forEach(text => {
      allTexts.push({
        id: text.id,
        title: text.title,
        content: text.content,
        stageInfo: {
          stageTitle: stage.title,
          difficulty: stage.difficulty,
          topic: text.topic
        }
      });
    });
  });
  return allTexts;
}

// 특정 스테이지의 텍스트만 가져오는 함수
function getStageTexts(stageNumber) {
  return stageData[stageNumber]?.texts.map(text => ({
    id: text.id,
    title: text.title,
    content: text.content,
    topic: text.topic
  })) || [];
}

// 스테이지 정보 가져오는 함수
function getStageInfo(stageNumber) {
  return stageData[stageNumber] || null;
}

// 총 스테이지 수
function getTotalStages() {
  return Object.keys(stageData).length;
}

// 주제별 검색 함수
function getTextsByTopic(topic) {
  const results = [];
  Object.values(stageData).forEach(stage => {
    const matchingTexts = stage.texts.filter(text => text.topic === topic);
    results.push(...matchingTexts);
  });
  return results;
}

// 난이도별 검색 함수
function getTextsByDifficulty(difficulty) {
  const results = [];
  Object.entries(stageData).forEach(([stageNum, stage]) => {
    if (stage.difficulty === difficulty) {
      results.push({
        stage: parseInt(stageNum),
        ...stage
      });
    }
  });
  return results;
}

// 기존 코드와의 호환성을 위한 기본 export
const presetTexts = getAllTexts();

export default presetTexts;
export { 
  stageData,
  getAllTexts, 
  getStageTexts, 
  getStageInfo, 
  getTotalStages, 
  getTextsByTopic, 
  getTextsByDifficulty 
};