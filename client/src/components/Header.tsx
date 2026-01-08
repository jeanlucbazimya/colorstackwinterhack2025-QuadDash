import Button from './Button';
import logo from '../assets/images/logo.png';

export default function Header() {
  const navItems = ['Book a Ride', 'Cars Available', 'How it works', 'Why choose us'];

  return (
    <header className="bg-white py-4 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="QuadDash" className="h-10 w-auto" />
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            Sign in
          </a>
          <Button size="sm">Sign up</Button>
        </div>
      </div>
    </header>
  );
}
