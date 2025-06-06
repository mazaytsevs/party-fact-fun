import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { PartyCard } from '../components/PartyCard';
import { PartyButton } from '../components/PartyButton';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const FactDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const { users, submitAnswer, activeUser } = useGameStore();

  const [fact, setFact] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/facts/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => setFact(data))
      .catch((err) => {
        console.error('Failed to fetch fact:', err);
        setFact(null);
      });
  }, [id]);

  const author = users.find(u => u.id === fact?.userId);

  if (!fact) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4">
        <AnimatedBackground />
        <PartyCard className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Факт не найден
          </h1>
          <PartyButton
            variant="secondary"
            onClick={() => navigate('/quiz')}
          >
            🔙 Назад к викторине
          </PartyButton>
        </PartyCard>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserId && activeUser) {
      try {
        await fetch(`${API_URL}/answers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: activeUser.id,
            factId: fact.id,
            guessUserId: selectedUserId
          })
        });
      } catch (err) {
        console.error('Ошибка при отправке ответа:', err);
      }

      const correct = submitAnswer(fact.id, selectedUserId);
      setIsCorrect(correct);
      setShowResult(true);
    }
  };

  const handleNextFact = () => {
    // Just go to /quiz, which will choose the next fact
    navigate('/quiz');
    setSelectedUserId('');
    setShowResult(false);
  };

  return (
    <div className="min-h-screen relative p-4">
      <AnimatedBackground />

      <div className="relative z-10 max-w-2xl mx-auto">
        <PartyCard>
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">🎯</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Угадайте автора факта
            </h1>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-6 border border-blue-200">
            <div className="text-center mb-4">
              <div className="text-2xl mb-2">📸</div>
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🖼️</span>
              </div>
            </div>
            <p className="text-lg text-gray-800 font-medium leading-relaxed">
              "{fact.ai_fact}"
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Кто написал этот факт?
              </label>
              <div className="grid grid-cols-1 gap-3">
                {users.map(user => (
                  <motion.label
                    key={user.id}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedUserId === user.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                    }`}
                  >
                    <input
                      type="radio"
                      name="author"
                      value={user.id}
                      checked={selectedUserId === user.id}
                      onChange={(e) => setSelectedUserId(e.target.value)}
                      className="mr-3 w-4 h-4 text-purple-600"
                    />
                    <span className="font-medium text-gray-800">
                      {user.name}
                    </span>
                  </motion.label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <PartyButton
                variant="success"
                size="lg"
                className="flex-1"
                disabled={!selectedUserId || !activeUser}
                onClick={handleSubmit}
              >
                ✨ Ответить
              </PartyButton>

              <PartyButton
                variant="secondary"
                size="lg"
                onClick={() => navigate('/quiz')}
              >
                🔙 Назад
              </PartyButton>
            </div>
          </form>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className={`p-6 rounded-xl ${
                isCorrect 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="text-6xl mb-4">
                  {isCorrect ? '🎉' : '😅'}
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isCorrect ? 'Правильно!' : 'Неправильно!'}
                </h2>
                <p className="text-lg text-gray-700">
                  Автор факта: <span className="font-bold text-purple-600">
                    {author?.name}
                  </span>
                </p>
                {isCorrect && activeUser && (
                  <p className="text-sm text-green-600 mt-2">
                    +1 очко! Ваш счёт: {activeUser.score}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <PartyButton
                  variant="primary"
                  size="lg"
                  onClick={handleNextFact}
                  className="flex-1"
                >
                  ➡️ Следующий факт
                </PartyButton>
                
                <PartyButton 
                  variant="secondary" 
                  size="lg" 
                  onClick={() => navigate('/quiz')}
                  className="flex-1"
                >
                  🎯 К викторине
                </PartyButton>
              </div>
            </motion.div>
          )}

          {!activeUser && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200 text-center">
              <p className="text-yellow-800">
                💡 Войдите в игру, чтобы отвечать на вопросы и зарабатывать очки!
              </p>
            </div>
          )}
        </PartyCard>
      </div>
    </div>
  );
};

export default FactDetail;
