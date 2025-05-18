import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      // Demo user check
      if (email === 'user@gmail.com' && password === 'user1234') {
        // Redirect to chat page
        navigate('/chat');
        localStorage.setItem('authToken', 'loggedIn');
        alert('Logged in successfully!');

      } else {
        setError('Invalid email or password for demo user');
      }
    } else {
      // For now, just alert for registration
      alert('Registration functionality will be implemented later');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left side login form */}
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80')` }}
      >
       <div
  className="h-full bg-cover bg-center bg-opacity-50 flex items-center justify-center"
  style={{
    backgroundImage: `url('https://cdn.ceps.eu/wp-content/uploads/2024/07/vecteezy_ai-generated-ai-circuit-board-technology-background_37348385-1300x731.jpg')`,
    backgroundBlendMode: 'overlay',
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent dark overlay for readability
  }}
>
  <div className="text-center text-white px-12">
    <h2 className="text-4xl font-bold mb-6">My Chat AI</h2>
    <p className="text-xl max-w-xl mx-auto">
      Experience the future of conversations with My Chat AI — an intelligent assistant that understands, learns, and adapts to help you effortlessly. Powered by cutting-edge artificial intelligence, it’s your smart companion for productivity, creativity, and everyday tasks.
    </p>
  </div>
</div>

      </div>

      {/* Right side image */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'} text-red-600 fa-lg`}></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className="text-gray-600 mt-2">
                {isLogin ? 'Please sign in to continue' : 'Get started with your account'}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {error && (
                <p className="mb-4 text-center text-red-600 font-semibold">{error}</p>
              )}

              {isLogin ? null : (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    disabled
                    placeholder="Demo disabled"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
                  />
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="mt-1 text-sm text-red-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'} Password
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 focus:ring-4 focus:ring-red-600 focus:ring-opacity-50"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>

              <p className="mt-6 text-center text-gray-600">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button
                  type="button"
                  className="ml-1 text-red-600 hover:text-red-700 font-semibold"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
