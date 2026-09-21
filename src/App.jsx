import { useMemo, useState } from 'react'

const elements = [
  { key: '목', hanja: '木', label: '성장', color: '#668a72' },
  { key: '화', hanja: '火', label: '열정', color: '#c66c56' },
  { key: '토', hanja: '土', label: '균형', color: '#bd955e' },
  { key: '금', hanja: '金', label: '결단', color: '#8c8f91' },
  { key: '수', hanja: '水', label: '지혜', color: '#58748d' },
]

const fortunes = [
  {
    title: '잔잔한 물처럼 깊은 사람',
    summary: '겉으로는 담담해 보여도 마음속에는 선명한 기준과 깊은 생각이 흐르고 있어요.',
    character: '상황을 빠르게 읽고 사람의 마음을 세심하게 살피는 힘이 있습니다. 서두르기보다 충분히 생각한 뒤 움직일 때 당신다운 선택이 나옵니다.',
    relation: '넓은 관계보다 마음을 나눌 수 있는 몇 사람에게 진심을 다하는 편입니다. 표현을 조금만 더 자주 건네면 관계의 온도가 크게 달라져요.',
    work: '관찰력과 집중력이 필요한 일에서 빛납니다. 지금은 새로운 것을 벌이기보다 잘하는 한 가지를 선명하게 다듬을 시기예요.',
  },
  {
    title: '따뜻한 불씨를 품은 사람',
    summary: '당신의 밝은 기운은 주변을 움직이게 합니다. 좋아하는 것을 만났을 때 누구보다 뜨겁게 몰입해요.',
    character: '솔직하고 추진력이 좋으며, 정체된 분위기에 활기를 불어넣는 재능이 있습니다. 감정의 속도만 잠시 늦추면 판단은 더욱 단단해집니다.',
    relation: '진심을 숨기지 않아 믿음을 얻습니다. 다만 상대가 마음을 열 때까지 기다려 주는 여유가 좋은 인연을 오래 머물게 해요.',
    work: '사람을 설득하거나 새로운 흐름을 만드는 일에 강합니다. 작은 성취를 눈에 보이게 기록하면 큰 목표까지 힘을 잃지 않을 거예요.',
  },
  {
    title: '단단한 땅을 닮은 사람',
    summary: '쉽게 흔들리지 않는 안정감이 당신의 가장 큰 힘입니다. 곁에 있는 사람에게 든든한 쉼터가 되어 줍니다.',
    character: '책임감이 강하고 시작한 일을 끝까지 지켜 냅니다. 익숙함을 소중히 여기지만, 가끔은 계획에 없던 선택이 새로운 가능성을 열어 줍니다.',
    relation: '말보다 행동으로 마음을 보여 주는 사람입니다. 혼자 감당하려 하지 말고 필요한 순간에는 기대어도 괜찮아요.',
    work: '꾸준함이 자산이 되는 분야에서 성과를 냅니다. 빠른 결과보다 오래 쌓이는 실력을 선택하면 결국 앞서가게 됩니다.',
  },
  {
    title: '곧은 나무처럼 자라는 사람',
    summary: '가능성을 발견하고 키워 내는 힘이 있습니다. 어제보다 나은 오늘을 만들 때 가장 생기 있어 보여요.',
    character: '호기심이 많고 배운 것을 자기 방식으로 확장합니다. 너무 많은 방향을 바라보기보다 이번 계절의 목표 하나를 정해 보세요.',
    relation: '함께 성장하는 관계에서 행복을 느낍니다. 조언보다 먼저 공감해 줄 때 당신의 따뜻함이 더 잘 전해집니다.',
    work: '기획, 창작, 교육처럼 없던 것을 자라게 하는 일과 잘 맞습니다. 완벽한 준비보다 작은 공개가 좋은 기회를 부릅니다.',
  },
  {
    title: '맑은 금빛을 지닌 사람',
    summary: '복잡한 것에서 핵심을 찾아내는 눈이 있습니다. 분명한 태도와 섬세한 감각이 당신의 매력입니다.',
    character: '원칙이 뚜렷하고 스스로에게 높은 기준을 둡니다. 조금 부족한 모습도 과정의 일부로 받아들이면 마음이 한결 가벼워집니다.',
    relation: '한번 맺은 인연을 귀하게 여기고 신뢰를 지킵니다. 마음을 추측하게 두기보다 짧게라도 말로 표현해 보세요.',
    work: '분석하고 정리해 완성도를 높이는 일에서 강점을 보입니다. 이번에는 고치는 일보다 세상에 내놓는 일을 먼저 해도 좋아요.',
  },
]

const dailyNotes = [
  '오늘은 답을 서두르지 마세요. 한 번 더 바라본 곳에 좋은 실마리가 있습니다.',
  '미뤄 둔 작은 연락 하나가 생각보다 따뜻한 흐름을 만들어 줄 거예요.',
  '익숙한 길에서 한 걸음만 벗어나 보세요. 뜻밖의 영감이 기다리고 있습니다.',
  '당신의 속도를 믿어도 좋은 날입니다. 비교보다 어제의 나를 바라보세요.',
  '마음을 정리할수록 해야 할 일이 선명해집니다. 비워 낸 자리에 운이 들어옵니다.',
]

function hash(value) {
  return [...value].reduce((total, char, index) => total + char.charCodeAt(0) * (index + 7), 0)
}

function createReading({ name, birthDate, birthTime, gender }) {
  const seed = hash(`${name}${birthDate}${birthTime}${gender}`)
  const base = fortunes[seed % fortunes.length]
  const values = elements.map((_, index) => 26 + ((seed * (index + 3) + index * 17) % 58))
  const strongest = elements[values.indexOf(Math.max(...values))]
  return {
    ...base,
    values,
    strongest,
    note: dailyNotes[(seed + new Date().getDate()) % dailyNotes.length],
    luckyColor: ['청록빛', '노을빛', '모래빛', '은빛', '남색'][seed % 5],
    luckyNumber: (seed % 8) + 1,
  }
}

function Sparkle({ small = false }) {
  return <span className={small ? 'sparkle small' : 'sparkle'} aria-hidden="true">✦</span>
}

function App() {
  const [form, setForm] = useState({ name: '', birthDate: '', birthTime: '', gender: '선택 안 함' })
  const [reading, setReading] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const maxDate = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    if (!form.birthDate) {
      setError('생년월일을 알려 주세요.')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setReading(createReading(form))
      setLoading(false)
      requestAnimationFrame(() => document.querySelector('#result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }, 850)
  }

  const reset = () => {
    setReading(null)
    setTimeout(() => document.querySelector('#reading-form')?.scrollIntoView({ behavior: 'smooth' }), 20)
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="달빛사주 홈"><span>月</span> 달빛사주</a>
        <a className="nav-link" href="#about">사주 이야기</a>
      </nav>

      <section className="hero" id="top">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="hero-copy">
          <p className="eyebrow"><Sparkle small /> AI가 들려주는 나의 사주 이야기</p>
          <h1>오늘의 나를 읽고,<br /><em>내일의 마음</em>을 만나다</h1>
          <p className="hero-description">태어난 순간에 담긴 다섯 가지 기운을 살펴보고<br className="desktop" /> 지금 당신에게 필요한 이야기를 전해 드려요.</p>
        </div>
        <div className="moon-scene" aria-hidden="true">
          <div className="star star-a">✦</div><div className="star star-b">·</div><div className="star star-c">✧</div>
          <div className="moon"><span>달</span></div>
          <div className="cloud cloud-a" /><div className="cloud cloud-b" />
        </div>
      </section>

      <section className="form-section" id="reading-form">
        <div className="intro-mark"><span /><Sparkle /><span /></div>
        <p className="section-kicker">나의 사주 만나기</p>
        <h2>태어난 날을 알려 주세요</h2>
        <p className="section-copy">정보는 운세를 읽는 데만 사용되며 저장되지 않아요.</p>

        <form className="reading-form" onSubmit={submit}>
          <label>
            <span>이름 <small>선택</small></span>
            <input name="name" value={form.name} onChange={update} placeholder="어떻게 불러 드릴까요?" maxLength="12" />
          </label>
          <label>
            <span>생년월일 <b>필수</b></span>
            <input name="birthDate" type="date" value={form.birthDate} onChange={update} max={maxDate} required />
          </label>
          <label>
            <span>태어난 시간 <small>몰라도 괜찮아요</small></span>
            <input name="birthTime" type="time" value={form.birthTime} onChange={update} />
          </label>
          <fieldset>
            <legend>성별 <small>선택</small></legend>
            <div className="segments">
              {['여성', '남성', '선택 안 함'].map((option) => (
                <label key={option}>
                  <input type="radio" name="gender" value={option} checked={form.gender === option} onChange={update} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {error && <p className="error" role="alert">{error}</p>}
          <button className="primary-button" disabled={loading}>
            {loading ? <><span className="loader" /> 운명의 실을 살펴보는 중...</> : <><Sparkle small /> 나의 사주 이야기 듣기</>}
          </button>
          <p className="disclaimer">재미와 자기 성찰을 위한 콘텐츠입니다.</p>
        </form>
      </section>

      {reading && (
        <section className="result" id="result">
          <div className="result-heading">
            <p className="section-kicker"><Sparkle small /> {form.name ? `${form.name}님의` : '당신의'} 사주 이야기</p>
            <h2>{reading.title}</h2>
            <p>{reading.summary}</p>
          </div>

          <div className="element-card">
            <div className="card-title"><span>五行</span><div><h3>다섯 기운의 결</h3><p><strong>{reading.strongest.key}의 기운</strong>이 당신 안에서 가장 밝게 빛나요.</p></div></div>
            <div className="element-bars">
              {elements.map((element, index) => (
                <div className="element-item" key={element.key}>
                  <div className="element-symbol" style={{ '--element': element.color }}>{element.hanja}</div>
                  <div className="bar"><i style={{ height: `${reading.values[index]}%`, background: element.color }} /></div>
                  <strong>{element.key}</strong><small>{element.label}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="stories">
            <article><span>心</span><p className="article-label">마음과 성향</p><h3>당신만의 속도를 믿어요</h3><p>{reading.character}</p></article>
            <article><span>緣</span><p className="article-label">관계와 인연</p><h3>진심은 천천히 깊어져요</h3><p>{reading.relation}</p></article>
            <article><span>道</span><p className="article-label">일과 방향</p><h3>잘하는 것을 선명하게</h3><p>{reading.work}</p></article>
          </div>

          <div className="today-card">
            <span className="quote">“</span>
            <p className="section-kicker">오늘의 한마디</p>
            <h3>{reading.note}</h3>
            <div><span>행운의 색 <b>{reading.luckyColor}</b></span><i /><span>행운의 숫자 <b>{reading.luckyNumber}</b></span></div>
          </div>
          <button className="text-button" onClick={reset}>다른 사주 알아보기 ↗</button>
        </section>
      )}

      <section className="about" id="about">
        <p className="section-kicker">달빛사주의 마음</p>
        <h2>정해진 미래보다<br />오늘을 잘 살아갈 <em>작은 힌트</em></h2>
        <p>사주는 삶을 단정하는 답이 아니라, 나를 다른 각도에서 바라보는 오래된 언어라고 생각해요. 달빛사주는 그 언어를 지금의 말로 다정하게 건넵니다.</p>
      </section>

      <footer><a className="brand" href="#top"><span>月</span> 달빛사주</a><p>당신의 모든 계절을 응원합니다.</p><small>© 2026 달빛사주 · 오락 및 자기 성찰용</small></footer>
    </main>
  )
}

export default App
