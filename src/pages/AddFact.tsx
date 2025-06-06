
import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { PartyCard } from '../components/PartyCard';
import { PartyButton } from '../components/PartyButton';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AddFact = () => {
  const [fact, setFact] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { activeUser, addFact } = useGameStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fact.trim()) {
      addFact(fact.trim());
      setFact('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  if (!activeUser) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4">
        <AnimatedBackground />
        <PartyCard className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Нужно войти в игру!
          </h1>
          <Link to="/login">
            <PartyButton variant="primary">Войти</PartyButton>
          </Link>
        </PartyCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <AnimatedBackground />
      
      <PartyCard className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">📝</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Добавить факт о себе
          </h1>
          <p className="text-gray-600 mt-2">
            Привет, <span className="font-semibold text-purple-600">{activeUser.name}</span>! 
            Расскажи что-то интересное о себе
          </p>
        </div>

        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl mb-4 text-center"
          >
            ✅ Факт сохранён! Можно добавить ещё один
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ваш факт
            </label>
            <textarea
              value={fact}
              onChange={(e) => setFact(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"
              placeholder="Например: Я умею говорить на 5 языках..."
              rows={4}
              required
            />
          </div>
          
          <div className="flex gap-3">
            <PartyButton 
              variant="success" 
              size="lg" 
              className="flex-1"
              disabled={!fact.trim()}
            >
              💫 Добавить факт
            </PartyButton>
            
            <Link to="/" className="flex-1">
              <PartyButton 
                variant="secondary" 
                size="lg" 
                className="w-full"
              >
                🏠 На главную
              </PartyButton>
            </Link>
          </div>
        </form>

        <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
          <p className="text-sm text-yellow-800">
            💡 <strong>Совет:</strong> Придумывайте интересные и неожиданные факты - 
            так другим игрокам будет сложнее угадать, что это ваш факт!
          </p>
        </div>
      </PartyCard>
    </div>
  );
};

export default AddFact;
