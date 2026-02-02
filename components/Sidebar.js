import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { label: '📊 Dashboard', href: '/' },
    { label: '📍 Branches', href: '/branches' },
    { label: '📅 Bookings', href: '/bookings' },
    { label: '💳 Payments', href: '/payments' },
    { label: '⚙️ Settings', href: '/settings' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary">🎨 Surya</h1>
        <p className="text-sm text-gray-600">Painting Management</p>
      </div>

      <nav className="p-4">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a
              className={`block px-4 py-3 rounded-lg mb-2 transition ${
                router.pathname === item.href
                  ? 'bg-primary text-white font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </a>
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-8 border-t border-gray-200">
        <p className="text-xs text-gray-500">v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
