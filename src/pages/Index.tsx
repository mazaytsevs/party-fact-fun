
import { Link } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { PartyCard } from '../components/PartyCard';
import { PartyButton } from '../components/PartyButton';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { motion } from 'framer-motion';

const Index = () => {
  const { activeUser, users, facts, logout } = useGameStore();

  return (
    <div className="min-h-screen relative p-4">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-8xl mb-6">🎂</div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Викторина Фактов
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Угадайте, кто написал интересные факты о себе!
            </p>
            <p className="text-lg text-gray-500">
              🎉 Веселитесь и узнавайте друг друга лучше 🎉
            </p>
          </motion.div>
        </div>

        {/* User Status */}
        {activeUser && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <PartyCard className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">👋</div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      Привет, <span className="text-green-600">{activeUser.name}</span>!
                    </p>
                    <p className="text-sm text-gray-600">
                      Ваш счёт: <span className="font-bold text-purple-600">{activeUser.score}</span> очков
                    </p>
                  </div>
                </div>
                <PartyButton 
                  variant="secondary" 
                  size="sm"
                  onClick={logout}
                >
                  🚪 Выйти
                </PartyButton>
              </div>
            </PartyCard>
          </motion.div>
        )}

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {!activeUser ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <PartyCard className="text-center h-full">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Войти в игру
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Введите имя и присоединяйтесь к веселью
                </p>
                <Link to="/login">
                  <PartyButton variant="primary" className="w-full">
                    Войти
                  </PartyButton>
                </Link>
              </PartyCard>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <PartyCard className="text-center h-full">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Добавить факт
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Поделитесь интересным фактом о себе
                </p>
                <Link to="/add-fact">
                  <PartyButton variant="success" className="w-full">
                    Добавить
                  </PartyButton>
                </Link>
              </PartyCard>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <PartyCard className="text-center h-full">
              <div className="text-4xl mb-4">🎲</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Начать викторину
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Угадывайте авторов фактов и зарабатывайте очки
              </p>
              <Link to="/quiz">
                <PartyButton 
                  variant="warning" 
                  className="w-full"
                  disabled={facts.length === 0}
                >
                  {facts.length === 0 ? 'Нет фактов' : 'Играть'}
                </PartyButton>
              </Link>
            </PartyCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <PartyCard className="text-center h-full">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Доска лидеров
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Посмотрите, кто лучше всех знает друзей
              </p>
              <Link to="/leaderboard">
                <PartyButton variant="secondary" className="w-full">
                  Рейтинг
                </PartyButton>
              </Link>
            </PartyCard>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <PartyCard className="text-center bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="text-3xl mb-2">👥</div>
              <div className="text-2xl font-bold text-blue-600">
                {users.length}
              </div>
              <p className="text-sm text-gray-600">
                {users.length === 1 ? 'участник' : users.length < 5 ? 'участника' : 'участников'}
              </p>
            </PartyCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <PartyCard className="text-center bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="text-3xl mb-2">📚</div>
              <div className="text-2xl font-bold text-purple-600">
                {facts.length}
              </div>
              <p className="text-sm text-gray-600">
                {facts.length === 1 ? 'факт' : facts.length < 5 ? 'факта' : 'фактов'}
              </p>
            </PartyCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <PartyCard className="text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-2xl font-bold text-green-600">
                {users.reduce((sum, user) => sum + user.score, 0)}
              </div>
              <p className="text-sm text-gray-600">
                очков заработано
              </p>
            </PartyCard>
          </motion.div>
        </div>

        {/* Active Users */}
        {users.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <PartyCard>
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                🎉 Активные участники
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {users.map(user => (
                  <div
                    key={user.id}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.id === activeUser?.id
                        ? 'bg-purple-100 text-purple-800 border-2 border-purple-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {user.name}
                    {user.score > 0 && (
                      <span className="ml-1 text-xs opacity-75">
                        ({user.score})
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </PartyCard>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
