import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect, KeyboardEvent } from 'react';

interface Question {
  id: string;
  text: string;
  difficulty: 'easy' | 'normal' | 'hard';
}

const Home: NextPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);

  // 問題を読み込み
  useEffect(() => {
    const saved = localStorage.getItem('typing-questions');
    if (saved) {
      const loadedQuestions = JSON.parse(saved);
      setQuestions(loadedQuestions);
      // ランダムに1問選択
      if (loadedQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * loadedQuestions.length);
        setCurrentQuestion(loadedQuestions[randomIndex]);
      }
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  const checkAnswer = () => {
    if (!currentQuestion) return;
    const isCorrect = input === currentQuestion.text;
    setResult(isCorrect ? 'correct' : 'incorrect');
    setScore(input.length);
  };

  const handleReset = () => {
    setInput('');
    setResult(null);
    setScore(0);
    // 別の問題をランダムに選択
    if (questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setCurrentQuestion(questions[randomIndex]);
    }
  };

  return (
    <>
      <Head>
        <title>タイピングアリーナ</title>
        <meta name="description" content="リアルタイム対戦できるタイピングゲーム" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* タイトル */}
          <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
            タイピングアリーナ
          </h1>

          {questions.length === 0 ? (
            // 問題が登録されていない場合
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 mb-4">
                まだ問題が登録されていません
              </p>
              <a
                href="/admin"
                className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors"
              >
                管理画面へ
              </a>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
              {/* 問題 */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">問題</p>
                <p className="text-xl font-medium text-gray-900">
                  {currentQuestion?.text || '読み込み中...'}
                </p>
                {currentQuestion && (
                  <p className="text-xs text-gray-500 mt-2">
                    難易度: {
                      currentQuestion.difficulty === 'easy' ? '簡単' :
                      currentQuestion.difficulty === 'normal' ? '普通' : '難しい'
                    }
                  </p>
                )}
              </div>

              {/* 入力欄 */}
              <div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={result !== null}
                  className="w-full px-4 py-2 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 text-center mt-1">
                  Enterで送信
                </p>
              </div>

              {/* 結果 */}
              {result && (
                <div className="text-center">
                  <p className="text-sm text-gray-600">結果</p>
                  <p className="text-lg font-medium text-gray-900 mt-1">
                    {result === 'correct' ? 'すごい！正解だよ' : '大丈夫、ゆっくりでいいよ'}
                  </p>
                </div>
              )}

              {/* スコア */}
              {result && (
                <div className="text-center">
                  <p className="text-sm text-gray-600">スコア</p>
                  <p className="text-lg font-medium text-gray-900 mt-1">
                    {score}文字
                  </p>
                </div>
              )}

              {/* もう一度ボタン */}
              {result && (
                <div className="text-center">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors"
                  >
                    もう一度
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 管理画面へのリンク */}
          {questions.length > 0 && (
            <div className="mt-4 text-center">
              <a
                href="/admin"
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                管理画面
              </a>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;