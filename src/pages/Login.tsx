import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { PartyCard } from '../components/PartyCard';
import { PartyButton } from '../components/PartyButton';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { motion } from 'framer-motion';
import { usersApi } from '../lib/api/users';
import { toast } from 'sonner';

const Login = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useGameStore(state => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      const user = await usersApi.createUser({
        name: name.trim(),
        email: `${name.trim().toLowerCase()}@party-fact-fun.com` // Временное решение для email
      });

      // Обновляем store с данными от сервера
      login(user.name, user.id);
      toast.success('Добро пожаловать в игру! 🎉');
      navigate('/');
    } catch (error) {
      console.error('Failed to create user:', error);
      toast.error('Не удалось войти в игру. Попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <AnimatedBackground />
      
      <PartyCard className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Добро пожаловать на вечеринку!
          </h1>
          <p className="text-gray-600 mt-2">Введите ваше имя для участия в викторине</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ваше имя
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="Например: Анна"
              required
              disabled={isLoading}
            />
          </div>
          
          <PartyButton 
            variant="primary" 
            size="lg" 
            className="w-full"
            disabled={!name.trim() || isLoading}
          >
            {isLoading ? '⏳ Входим...' : '🚀 Войти в игру'}
          </PartyButton>
        </form>
      </PartyCard>
    </div>
  );
};

export default Login;
