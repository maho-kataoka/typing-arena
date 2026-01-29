import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';

interface Question {
  id: string;
  text: string;
  difficulty: 'easy' | 'normal' | 'hard';
}

const Admin: NextPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard'>('normal');

  // 初回読み込み
  useEffect(() => {
    const saved = localStorage.getItem('typing-questions');
    if (saved) {
      setQuestions(JSON.parse(saved));
    }
  }, []);

  // 問題を追加
  const handleAdd = () => {
    if (!newQuestion.trim()) return;

    const question: Question = {
      id: Date.now().toString(),
      text: newQuestion,
      difficulty,
    };

    const updated = [...questions, question];
    setQuestions(updated);
    localStorage.setItem('typing-questions', JSON.stringify(updated));
    setNewQuestion('');
  };

  // 問題を削除
  const handleDelete = (id: string) => {
    const updated = questions.filter(q => q.id !== id);
    setQuestions(updated);
    localStorage.setItem('typing-questions', JSON.stringify(updated));
  };

  return (
    <>
      <Head>
        <title>管理画面 - タイピングアリーナ</title>
        <meta name="description" content="タイピング問題の管理画面" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          {/* タイトル */}
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            管理画面
          </h1>

          {/* 問題追加フォーム */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">問題を追加</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  問題文
                </label>
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  placeholder="例：生麦生米生卵"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  難易度
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as 'easy' | 'normal' | 'hard')}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="easy">簡単</option>
                  <option value="normal">普通</option>
                  <option value="hard">難しい</option>
                </select>
              </div>

              <button
                onClick={handleAdd}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors"
              >
                追加
              </button>
            </div>
          </div>

          {/* 問題一覧 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              登録済み問題 ({questions.length}件)
            </h2>

            {questions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                まだ問題が登録されていません
              </p>
            ) : (
              <div className="space-y-3">
                {questions.map((q) => (
                  <div
                    key={q.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <p className="text-gray-900">{q.text}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        難易度: {
                          q.difficulty === 'easy' ? '簡単' :
                          q.difficulty === 'normal' ? '普通' : '難しい'
                        }
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
                    >
                      削除
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* プレイヤー画面へのリンク */}
          <div className="mt-8 text-center">
            <a
              href="/"
              className="inline-block px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded transition-colors"
            >
              プレイヤー画面へ
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default Admin;