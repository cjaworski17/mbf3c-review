import React, { useState, useEffect } from 'react';
import { Calculator, Check, X, RefreshCw, BookOpen, ChevronDown, ChevronUp, TrendingUp, DollarSign, Activity, Triangle, BarChart2 } from 'lucide-react';

// --- MATH UTILITIES ---

const toRad = (deg) => (deg * Math.PI) / 180;
const toDeg = (rad) => (rad * 180) / Math.PI;
const round = (num, decimals = 2) => Number(Math.round(num + "e" + decimals) + "e-" + decimals);

// --- QUESTION GENERATORS ---

// 1. QUADRATICS (The Core of MBF3C)
const generateVertexForm = () => {
  const a = Math.floor(Math.random() * 5) + 1; // 1 to 5
  const h = Math.floor(Math.random() * 10) - 5; // -5 to 5
  const k = Math.floor(Math.random() * 20) - 10; // -10 to 10
  
  // Format: y = a(x - h)^2 + k
  // Handle sign display logic
  const hDisplay = h >= 0 ? `- ${h}` : `+ ${Math.abs(h)}`;
  const kDisplay = k >= 0 ? `+ ${k}` : `- ${Math.abs(k)}`;
  
  const askX = Math.random() > 0.5;
  
  return {
    topic: 'Quadratics',
    subtopic: 'Vertex Form',
    question: `For the parabola y = ${a}(x ${hDisplay})² ${kDisplay}, state the ${askX ? 'x-coordinate' : 'y-coordinate'} of the vertex.`,
    answer: askX ? h : k,
    unit: '',
    type: 'numeric',
    solution: `
      1. Vertex Form: y = a(x - h)² + k
      2. Identify h: The value inside the bracket has the OPPOSITE sign. 
         (x ${hDisplay}) means h = ${h}.
      3. Identify k: The value outside is the y-coordinate (SAME sign). k = ${k}.
      4. Vertex is (${h}, ${k}).
    `
  };
};

const generateYIntercept = () => {
  // Standard form: y = ax^2 + bx + c
  const a = Math.floor(Math.random() * 3) + 1;
  const b = Math.floor(Math.random() * 10) - 5;
  const c = Math.floor(Math.random() * 20) - 10;
  
  const bDisplay = b >= 0 ? `+ ${b}x` : `${b}x`;
  const cDisplay = c >= 0 ? `+ ${c}` : `${c}`;
  
  return {
    topic: 'Quadratics',
    subtopic: 'Standard Form',
    question: `Find the y-intercept of the quadratic relation y = ${a}x² ${bDisplay} ${cDisplay}.`,
    answer: c,
    unit: '',
    type: 'numeric',
    solution: `
      1. The y-intercept always occurs when x = 0.
      2. Substitute x = 0 into the equation:
         y = ${a}(0)² ${b >=0 ? '+' : ''}${b}(0) ${c >=0 ? '+' : ''}${c}
      3. y = 0 + 0 ${c >=0 ? '+' : ''}${c}
      4. y-intercept = ${c}
    `
  };
};

const generateFactoredZero = () => {
    // Factored form: y = a(x-r)(x-s)
    const r = Math.floor(Math.random() * 8) - 4;
    const s = Math.floor(Math.random() * 8) - 4;
    // Avoid duplicates for clarity in question
    if (r === s) return generateYIntercept();

    const rDisplay = r >= 0 ? `- ${r}` : `+ ${Math.abs(r)}`;
    const sDisplay = s >= 0 ? `- ${s}` : `+ ${Math.abs(s)}`;

    const askFirst = Math.random() > 0.5;

    return {
        topic: 'Quadratics',
        subtopic: 'Factored Form',
        question: `Find the ${askFirst ? 'first' : 'second'} zero (x-intercept) of y = 2(x ${rDisplay})(x ${sDisplay}). \n(Hint: The zeros are the values that make the brackets equal zero).`,
        answer: askFirst ? r : s,
        unit: '',
        type: 'numeric',
        solution: `
            1. To find zeros, set each bracket to 0.
            2. Bracket 1: (x ${rDisplay}) = 0  -> x = ${r}
            3. Bracket 2: (x ${sDisplay}) = 0  -> x = ${s}
            4. The zeros are ${r} and ${s}.
        `
    }
}

// 2. TRIGONOMETRY (Right Angle + Sine/Cosine Law)
const generateTrig = () => {
  const type = Math.random();
  
  if (type < 0.33) {
    // SOH CAH TOA
    const angle = Math.floor(Math.random() * 50) + 20;
    const hyp = Math.floor(Math.random() * 20) + 10;
    const ans = hyp * Math.cos(toRad(angle));
    return {
      topic: 'Trigonometry',
      subtopic: 'Right Angle (SOH CAH TOA)',
      question: `In a right triangle, the hypotenuse is ${hyp} cm and an angle is ${angle}°. Find the adjacent side.`,
      answer: round(ans),
      unit: 'cm',
      type: 'numeric',
      solution: `
        1. Identify sides: You have Hypotenuse, looking for Adjacent.
        2. Choose Formula: CAH -> cos(θ) = adj / hyp
        3. Rearrange: adj = hyp × cos(θ)
        4. Calculate: ${hyp} × cos(${angle}°) ≈ ${round(ans)}
      `
    };
  } else if (type < 0.66) {
    // Sine Law (Find Side)
    const A = Math.floor(Math.random() * 40) + 30;
    const B = Math.floor(Math.random() * 40) + 30;
    const b = Math.floor(Math.random() * 15) + 5;
    const ans = (b * Math.sin(toRad(A))) / Math.sin(toRad(B));
    return {
      topic: 'Trigonometry',
      subtopic: 'Sine Law',
      question: `In Triangle ABC: ∠A=${A}°, ∠B=${B}°, and side b=${b}m. Find the length of side a.`,
      answer: round(ans),
      unit: 'm',
      type: 'numeric',
      solution: `
        1. Formula: a/sinA = b/sinB
        2. Substitute: a/sin${A}° = ${b}/sin${B}°
        3. Isolate a: a = (${b} × sin${A}°) / sin${B}°
        4. Result: a ≈ ${round(ans)}
      `
    };
  } else {
    // Cosine Law (Find Side)
    const b = Math.floor(Math.random() * 10) + 5;
    const c = Math.floor(Math.random() * 10) + 5;
    const A = Math.floor(Math.random() * 60) + 20;
    const a2 = b**2 + c**2 - 2*b*c*Math.cos(toRad(A));
    const ans = Math.sqrt(a2);
    return {
      topic: 'Trigonometry',
      subtopic: 'Cosine Law',
      question: `In Triangle ABC: side b=${b}cm, side c=${c}cm, and ∠A=${A}°. Find the length of side a.`,
      answer: round(ans),
      unit: 'cm',
      type: 'numeric',
      solution: `
        1. Formula: a² = b² + c² - 2bc cosA
        2. Substitute: a² = ${b}² + ${c}² - 2(${b})(${c})cos${A}°
        3. Calculate Squares: a² ≈ ${round(a2)}
        4. Square Root: a = √${round(a2)} ≈ ${round(ans)}
      `
    };
  }
};

// 3. EXPONENTIALS (Growth, Decay, Half Life)
const generateExponential = () => {
  const type = Math.random();
  
  if (type < 0.33) {
    // Growth
    const P0 = (Math.floor(Math.random() * 5) + 1) * 100;
    const r = Math.floor(Math.random() * 10) + 2;
    const n = Math.floor(Math.random() * 5) + 2;
    const ans = P0 * Math.pow(1 + r/100, n);
    return {
      topic: 'Exponentials',
      subtopic: 'Growth',
      question: `A population of ${P0} grows at ${r}% per year. How many are there after ${n} years?`,
      answer: Math.round(ans),
      unit: '',
      type: 'numeric',
      solution: `
        1. Formula: P = P₀(1 + r)ⁿ
        2. Identify: P₀=${P0}, r=${r/100}, n=${n}
        3. Substitute: P = ${P0}(1 + ${r/100})^${n}
        4. Calculate: P ≈ ${Math.round(ans)}
      `
    };
  } else if (type < 0.66) {
    // Decay (Specific to MBF3C)
    const P0 = (Math.floor(Math.random() * 20) + 10) * 1000; // Car value
    const r = Math.floor(Math.random() * 10) + 5;
    const n = Math.floor(Math.random() * 4) + 2;
    const ans = P0 * Math.pow(1 - r/100, n);
    return {
      topic: 'Exponentials',
      subtopic: 'Decay',
      question: `A car worth $${P0} depreciates (decays) by ${r}% per year. What is its value after ${n} years?`,
      answer: round(ans),
      unit: '$',
      type: 'numeric',
      solution: `
        1. Formula: P = P₀(1 - r)ⁿ
        2. Identify: P₀=${P0}, r=${r/100}, n=${n}
        3. Substitute: P = ${P0}(1 - ${r/100})^${n}
        4. P = ${P0}(${1 - r/100})^${n} ≈ $${round(ans)}
      `
    };
  } else {
    // Half-Life (Specific to MBF3C)
    const A0 = Math.floor(Math.random() * 50) + 50;
    const h = Math.floor(Math.random() * 5) + 2; // Half life period
    const t = h * (Math.floor(Math.random() * 2) + 2); // Time is multiple of h
    const ans = A0 * Math.pow(0.5, t/h);
    return {
      topic: 'Exponentials',
      subtopic: 'Half-Life',
      question: `A radioactive isotope has a mass of ${A0}mg and a half-life of ${h} days. How much remains after ${t} days?`,
      answer: round(ans),
      unit: 'mg',
      type: 'numeric',
      solution: `
        1. Formula: A = A₀(1/2)^(t/h)
        2. Identify: A₀=${A0}, h=${h}, t=${t}
        3. Exponent: t/h = ${t}/${h} = ${t/h}
        4. Calculate: A = ${A0}(0.5)^${t/h} ≈ ${round(ans)} mg
      `
    };
  }
};

// 4. FINANCIAL MATH (Simple, Compound, Present Value)
const generateFinance = () => {
  const type = Math.random();
  
  if (type < 0.33) {
    // Simple Interest
    const P = Math.floor(Math.random() * 20) * 100 + 500;
    const r = Math.floor(Math.random() * 5) + 2;
    const t = Math.floor(Math.random() * 5) + 1;
    const ans = P * (r/100) * t;
    return {
      topic: 'Financial Math',
      subtopic: 'Simple Interest',
      question: `Calculate the simple interest on $${P} at ${r}% per year for ${t} years.`,
      answer: round(ans),
      unit: '$',
      type: 'numeric',
      solution: `
        1. Formula: I = Prt
        2. Substitute: I = ${P} × ${r/100} × ${t}
        3. Calculate: I = $${round(ans)}
      `
    };
  } else if (type < 0.66) {
    // Compound Future Value
    const P = Math.floor(Math.random() * 20) * 100 + 1000;
    const r = Math.floor(Math.random() * 8) + 2;
    const n = Math.floor(Math.random() * 10) + 5;
    const ans = P * Math.pow(1 + r/100, n);
    return {
      topic: 'Financial Math',
      subtopic: 'Compound Interest',
      question: `Find the amount of an investment of $${P} at ${r}% compounded annually for ${n} years.`,
      answer: round(ans),
      unit: '$',
      type: 'numeric',
      solution: `
        1. Formula: A = P(1 + i)ⁿ
        2. Substitute: A = ${P}(1 + ${r/100})^${n}
        3. Calculate: A ≈ $${round(ans)}
      `
    };
  } else {
    // Present Value (PV) - Explicitly mentioned in MBF3C Formula Sheet
    const A = Math.floor(Math.random() * 50) * 100 + 5000; // Future Goal
    const r = Math.floor(Math.random() * 6) + 3;
    const n = Math.floor(Math.random() * 5) + 3;
    const ans = A / Math.pow(1 + r/100, n);
    return {
      topic: 'Financial Math',
      subtopic: 'Present Value',
      question: `You want to have $${A} in ${n} years. How much must you invest today at ${r}% compounded annually?`,
      answer: round(ans),
      unit: '$',
      type: 'numeric',
      solution: `
        1. Formula: PV = A / (1 + i)ⁿ
        2. Goal (A): $${A}, Rate (i): ${r/100}, Years (n): ${n}
        3. Substitute: PV = ${A} / (1 + ${r/100})^${n}
        4. Calculate: PV ≈ $${round(ans)}
      `
    };
  }
};

// 5. STATISTICS (Mean, Median, Range)
const generateStats = () => {
  const count = 5; 
  const nums = Array.from({length: count}, () => Math.floor(Math.random() * 15) + 1);
  
  const type = ['Mean', 'Median', 'Range'][Math.floor(Math.random() * 3)];
  let ans;
  let steps = '';
  
  if (type === 'Mean') {
    const sum = nums.reduce((a,b) => a+b, 0);
    ans = sum/count;
    steps = `Sum the numbers: ${sum}. Divide by count (${count}).`;
  } else if (type === 'Median') {
    const sorted = [...nums].sort((a,b) => a-b);
    ans = sorted[2]; // Middle of 5 is index 2
    steps = `Order the numbers: ${sorted.join(', ')}. The middle number is ${ans}.`;
  } else {
    const sorted = [...nums].sort((a,b) => a-b);
    ans = sorted[4] - sorted[0];
    steps = `Subtract Max (${sorted[4]}) - Min (${sorted[0]}).`;
  }
  
  return {
    topic: 'Statistics',
    subtopic: 'Central Tendency',
    question: `Find the ${type} of this data set: ${nums.join(', ')}`,
    answer: round(ans),
    unit: '',
    type: 'numeric',
    solution: `
      1. Data: ${nums.join(', ')}
      2. Method: ${type}
      3. Steps: ${steps}
      4. Answer: ${round(ans)}
    `
  };
};

// MASTER GENERATOR
const generateQuestion = (filterTopic) => {
  const generators = [];
  
  if (filterTopic === 'All' || filterTopic === 'Quadratics') generators.push(generateVertexForm, generateYIntercept, generateFactoredZero);
  if (filterTopic === 'All' || filterTopic === 'Trigonometry') generators.push(generateTrig);
  if (filterTopic === 'All' || filterTopic === 'Exponentials') generators.push(generateExponential);
  if (filterTopic === 'All' || filterTopic === 'Financial Math') generators.push(generateFinance);
  if (filterTopic === 'All' || filterTopic === 'Statistics') generators.push(generateStats);
  
  // Fallback
  if (generators.length === 0) generators.push(generateSimpleInterest);

  const choice = generators[Math.floor(Math.random() * generators.length)];
  return choice();
};

const FormulaSheet = () => (
  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-700 space-y-4 animate-in fade-in zoom-in-95 duration-200">
    <h3 className="font-bold text-slate-900 border-b pb-2 mb-2 flex items-center gap-2">
      <BookOpen size={16} /> MBF3C Formula Sheet
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h4 className="font-semibold text-purple-600 mb-1">Quadratics</h4>
        <ul className="space-y-1 text-xs font-mono">
          <li>Standard: y = ax² + bx + c</li>
          <li>Vertex: y = a(x - h)² + k</li>
          <li>Factored: y = a(x - p)(x - q)</li>
          <li>Quadratic Formula: x = (-b ± √b²-4ac) / 2a</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-blue-600 mb-1">Trigonometry</h4>
        <ul className="space-y-1 text-xs font-mono">
          <li>SOH CAH TOA</li>
          <li>Sine Law: a/sinA = b/sinB</li>
          <li>Cosine Law: a² = b² + c² - 2bc cosA</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-orange-600 mb-1">Exponentials</h4>
        <ul className="space-y-1 text-xs font-mono">
          <li>Growth: P = P₀(1 + r)ⁿ</li>
          <li>Decay: P = P₀(1 - r)ⁿ</li>
          <li>Doubling: A = A₀(2)^(t/d)</li>
          <li>Half-Life: A = A₀(1/2)^(t/h)</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-green-600 mb-1">Financial</h4>
        <ul className="space-y-1 text-xs font-mono">
          <li>Simple: I = Prt, A = P+I</li>
          <li>Compound: A = P(1 + i)ⁿ</li>
          <li>PV = A / (1 + i)ⁿ</li>
        </ul>
      </div>
    </div>
  </div>
);

const App = () => {
  const [topic, setTopic] = useState('All');
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [showFormulas, setShowFormulas] = useState(false);

  useEffect(() => { newQuestion(); }, [topic]);

  const newQuestion = () => {
    setQuestion(generateQuestion(topic));
    setUserAnswer('');
    setFeedback(null);
    setShowSolution(false);
  };

  const checkAnswer = () => {
    if (!userAnswer) return;
    const userVal = parseFloat(userAnswer);
    const correctVal = question.answer;
    const margin = Math.abs(correctVal * 0.05) || 0.1; // 5% margin or 0.1
    const isCorrect = Math.abs(userVal - correctVal) <= margin;
    
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setStats(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }));
    if (!isCorrect) setShowSolution(true);
  };

  const getIconForTopic = (t) => {
    switch(t) {
      case 'Quadratics': return <Activity size={20} />;
      case 'Trigonometry': return <Triangle size={20} />;
      case 'Financial Math': return <DollarSign size={20} />;
      case 'Exponentials': return <TrendingUp size={20} />;
      case 'Statistics': return <BarChart2 size={20} />;
      default: return <BookOpen size={20} />;
    }
  };

  if (!question) return <div className="p-10 text-center">Loading MBF3C Review...</div>;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b-4 border-purple-600">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Calculator className="text-purple-600" />
              MBF3C Exam Review
            </h1>
            <p className="text-slate-500 text-sm mt-1">Grade 11 College Math</p>
          </div>
          <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 text-center">
            <span className="block text-xs text-slate-400 uppercase font-bold">Score</span>
            <span className="font-mono font-bold text-lg text-slate-700">{stats.correct}/{stats.total}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-slate-200">
          <select value={topic} onChange={(e) => setTopic(e.target.value)} className="bg-transparent text-slate-700 font-medium px-2 py-1 focus:outline-none cursor-pointer hover:text-purple-600">
            <option value="All">All Topics</option>
            <option value="Quadratics">Quadratics</option>
            <option value="Exponentials">Exponentials</option>
            <option value="Financial Math">Financial Math</option>
            <option value="Trigonometry">Trigonometry</option>
            <option value="Statistics">Statistics</option>
          </select>
          <button onClick={() => setShowFormulas(!showFormulas)} className="text-purple-600 font-medium text-sm hover:underline">
            {showFormulas ? 'Hide Formulas' : 'Show Formulas'}
          </button>
        </div>

        {showFormulas && <FormulaSheet />}

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-600 uppercase">
              {getIconForTopic(question.topic)} {question.topic}
            </span>
            <span className="text-xs font-mono text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded">{question.subtopic}</span>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <p className="text-lg md:text-xl text-slate-800 font-medium">{question.question}</p>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input type="number" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && (feedback ? newQuestion() : checkAnswer())}
                  disabled={feedback !== null} placeholder="Enter answer..." 
                  className={`flex-1 text-lg p-3 rounded-lg border-2 focus:outline-none 
                    ${feedback === 'correct' ? 'border-green-500 bg-green-50' : feedback === 'incorrect' ? 'border-red-300 bg-red-50' : 'border-slate-300 focus:border-purple-500'}`} />
                {!feedback ? (
                  <button onClick={checkAnswer} className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-lg font-bold">Check</button>
                ) : (
                  <button onClick={newQuestion} className="bg-slate-800 hover:bg-slate-900 text-white px-6 rounded-lg font-bold flex items-center gap-2">Next <RefreshCw size={18}/></button>
                )}
              </div>

              {feedback && (
                <div className={`p-4 rounded-lg flex gap-3 ${feedback === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {feedback === 'correct' ? <Check className="mt-1"/> : <X className="mt-1"/>}
                  <div>
                    <h4 className="font-bold">{feedback === 'correct' ? 'Correct!' : 'Incorrect'}</h4>
                    <p className="text-sm">Answer: <strong>{question.answer} {question.unit}</strong></p>
                    {feedback === 'incorrect' && !showSolution && (
                      <button onClick={() => setShowSolution(true)} className="text-xs font-bold underline mt-2">Show Solution</button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {showSolution && (
            <div className="bg-slate-50 border-t border-slate-200 p-6">
              <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2"><BookOpen size={18}/> Solution Steps</h3>
              <div className="bg-white p-4 rounded-lg border border-slate-200 font-mono text-sm whitespace-pre-line">{question.solution}</div>
            </div>
          )}
        </div>
        <div className="text-center text-slate-400 text-sm">MBF3C Exam Review • Grade 11 College Math</div>
      </div>
    </div>
  );
};

export default App;