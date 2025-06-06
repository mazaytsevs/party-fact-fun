
import { Link } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { PartyCard } from '../components/PartyCard';
import { PartyButton } from '../components/PartyButton';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const getLeaderboard = useGameStore(state => state.getLeaderboard);
  const leaderboard = getLeaderboard();

  const getMedal = (position: number) => {
    switch (position) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '🏅';
    }
  };

  const getPositionStyle = (position: number) => {
    switch (position) {
      case 0: return 'from-yellow-400 to-orange-500';
      case 1: return 'from-gray-300 to-gray-500';
      case 2: return 'from-amber-600 to-yellow-700';
      default: return 'from-blue-400 to-purple-500';
    }
  };

  return (
    <div className="min-h-screen relative p-4">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Доска лидеров
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Лучшие знатоки фактов о друзьях
            </p>
          </motion.div>
        </div>

        {leaderboard.length === 0 ? (
          <PartyCard className="text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Пока никого нет в рейтинге
            </h2>
            <p className="text-gray-600 mb-6">
              Начните играть в викторину, чтобы попасть в таблицу лидеров!
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/quiz">
                <PartyButton variant="warning">🎲 Начать викторину</PartyButton>
              </Link>
              <Link to="/">
                <PartyButton variant="secondary">🏠 На главную</PartyButton>
              </Link>
            </div>
          </PartyCard>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {leaderboard.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PartyCard 
                    className={`${index < 3 ? 'ring-2 ring-yellow-300' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">
                          {getMedal(index)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-gray-800">
                              {user.name}
                            </span>
                            {index < 3 && (
                              <div className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getPositionStyle(index)}`}>
                                ТОП-{index + 1}
                              </div>
                            )}
                          </div>
                          <p className="text-gray-600">
                            Участник викторины
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-3xl font-bold text-purple-600">
                          {user.score}
                        </div>
                        <p className="text-sm text-gray-500">
                          {user.score === 1 ? 'очко' : user.score < 5 ? 'очка' : 'очков'}
                        </p>
                      </div>
                    </div>
                  </PartyCard>
                </motion.div>
              ))}
            </div>

            <div className="text-center space-y-4">
              <PartyCard className="bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="text-center">
                  <div className="text-3xl mb-2">🎉</div>
                  <p className="text-gray-700">
                    <strong>Участников:</strong> {leaderboard.length} • 
                    <strong> Всего очков:</strong> {leaderboard.reduce((sum, user) => sum + user.score, 0)}
                  </p>
                </div>
              </PartyCard>
              
              <div className="flex gap-3 justify-center">
                <Link to="/quiz">
                  <PartyButton variant="warning" size="lg">
                    🎲 Продолжить викторину
                  </PartyButton>
                </Link>
                <Link to="/">
                  <PartyButton variant="secondary" size="lg">
                    🏠 На главную
                  </PartyButton>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
