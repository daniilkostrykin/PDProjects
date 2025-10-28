import { Link } from 'react-router-dom';
import { USER_PASSES, USER_REQUEST, USER_PROFILE } from '@/utils/consts';

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '40px 20px',
      color: '#1e293b'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* Заголовок */}
        <div style={{
          marginBottom: '60px'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '700',
            marginBottom: '20px',
            background: 'linear-gradient(45deg, #1e40af, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            🏢 Система пропусков
          </h1>
          <p style={{
            fontSize: '1.5rem',
            fontWeight: '300',
            color: '#64748b',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Современная платформа для управления доступом в здание
          </p>
        </div>

        {/* Основные возможности */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '60px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '40px 30px',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '20px'
            }}>
              🎫
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '15px',
              color: '#1e293b'
            }}>
              Оформление пропусков
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#64748b',
              lineHeight: '1.6',
              marginBottom: '25px'
            }}>
              Быстрое и удобное оформление пропусков для посетителей. 
              Поддержка автомобильных и пеших пропусков с гибкими настройками.
            </p>
            <Link 
              to={USER_REQUEST}
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                border: 'none',
                boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #1e40af, #1e3a8a)';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6, #1e40af)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(59, 130, 246, 0.3)';
              }}
            >
              Оформить пропуск
            </Link>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '40px 30px',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '20px'
            }}>
              📋
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '15px',
              color: '#1e293b'
            }}>
              Мои пропуска
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#64748b',
              lineHeight: '1.6',
              marginBottom: '25px'
            }}>
              Просматривайте историю ваших пропусков, отслеживайте статус 
              и управляйте активными заявками в удобном интерфейсе.
            </p>
            <Link 
              to={USER_PASSES}
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                border: 'none',
                boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #1e40af, #1e3a8a)';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6, #1e40af)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(59, 130, 246, 0.3)';
              }}
            >
              Посмотреть пропуска
            </Link>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '40px 30px',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '20px'
            }}>
              👤
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '15px',
              color: '#1e293b'
            }}>
              Профиль
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#64748b',
              lineHeight: '1.6',
              marginBottom: '25px'
            }}>
              Управляйте личными данными, настройками аккаунта 
              и получайте помощь по использованию системы.
            </p>
            <Link 
              to={USER_PROFILE}
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                border: 'none',
                boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #1e40af, #1e3a8a)';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6, #1e40af)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(59, 130, 246, 0.3)';
              }}
            >
              Открыть профиль
            </Link>
          </div>
        </div>

        {/* Преимущества */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '50px 40px',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          marginBottom: '40px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            marginBottom: '30px',
            color: '#1e293b'
          }}>
            Почему выбирают нашу систему?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>⚡</div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px', color: '#1e293b' }}>
                Быстро
              </h4>
              <p style={{ color: '#64748b', lineHeight: '1.5' }}>
                Оформление пропуска за считанные минуты
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🔒</div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px', color: '#1e293b' }}>
                Безопасно
              </h4>
              <p style={{ color: '#64748b', lineHeight: '1.5' }}>
                Надежная система контроля доступа
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>📱</div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px', color: '#1e293b' }}>
                Удобно
              </h4>
              <p style={{ color: '#64748b', lineHeight: '1.5' }}>
                Адаптивный дизайн для всех устройств
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🎯</div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px', color: '#1e293b' }}>
                Гибко
              </h4>
              <p style={{ color: '#64748b', lineHeight: '1.5' }}>
                Настройка под ваши потребности
              </p>
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '3rem',
              fontWeight: '700',
              color: '#fbbf24',
              marginBottom: '10px'
            }}>
              1000+
            </div>
            <div style={{ fontSize: '1.1rem', color: '#64748b' }}>
              Оформленных пропусков
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '3rem',
              fontWeight: '700',
              color: '#10b981',
              marginBottom: '10px'
            }}>
              99.9%
            </div>
            <div style={{ fontSize: '1.1rem', color: '#64748b' }}>
              Время работы системы
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '3rem',
              fontWeight: '700',
              color: '#3b82f6',
              marginBottom: '10px'
            }}>
              24/7
            </div>
            <div style={{ fontSize: '1.1rem', color: '#64748b' }}>
              Доступность сервиса
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '3rem',
              fontWeight: '700',
              color: '#8b5cf6',
              marginBottom: '10px'
            }}>
              &lt; 1мин
            </div>
            <div style={{ fontSize: '1.1rem', color: '#64748b' }}>
              Среднее время оформления
            </div>
          </div>
        </div>

        {/* Футер */}
        <div style={{
          borderTop: '1px solid rgba(226, 232, 240, 0.8)',
          paddingTop: '30px',
          color: '#64748b'
        }}>
          <p style={{
            fontSize: '1rem',
            marginBottom: '10px'
          }}>
            © 2024 Система пропусков. Все права защищены.
          </p>
          <p style={{
            fontSize: '0.9rem',
            color: '#94a3b8'
          }}>
            Создано с ❤️ для удобства и безопасности
          </p>
        </div>
      </div>
    </div>
  );
}
