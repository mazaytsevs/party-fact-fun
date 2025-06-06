
import { Link } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { PartyCard } from '../components/PartyCard';
import { PartyButton } from '../components/PartyButton';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { motion } from 'framer-motion';

const Quiz = () => {
  const facts = useGameStore(state => state.facts);

  return (
    <div className="min-h-screen relative p-4">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🧩</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Викторина "Угадай кто!"
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Выберите факт и попробуйте угадать, кто его написал
            </p>
          </motion.div>
        </div>

        {facts.length === 0 ? (
          <PartyCard className="text-center">
            <div className="text-5xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Пока что нет фактов
            </h2>
            <p className="text-gray-600 mb-6">
              Чтобы начать викторину, нужно сначала добавить факты о себе
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/add-fact">
                <PartyButton variant="success">📝 Добавить факт</PartyButton>
              </Link>
              <Link to="/">
                <PartyButton variant="secondary">🏠 На главную</PartyButton>
              </Link>
            </div>
          </PartyCard>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {facts.map((fact, index) => (
                <motion.div
                  key={fact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PartyCard className="h-full">
                    <div className="text-center">
                      <div className="text-3xl mb-3">🎯</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        Факт #{index + 1}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {fact.fact.length > 100 
                          ? fact.fact.substring(0, 100) + '...'
                          : fact.fact
                        }
                      </p>
                      <Link to={`/fact/${fact.id}`}>
                        <PartyButton variant="warning" size="sm" className="w-full">
                          🎲 Угадать автора
                        </PartyButton>
                      </Link>
                    </div>
                  </PartyCard>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/">
                <PartyButton variant="secondary" size="lg">
                  🏠 Вернуться на главную
                </PartyButton>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
