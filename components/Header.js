const Header = ({ title, subtitle }) => {
  return (
    <div className="bg-white shadow-sm p-6 border-b border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
    </div>
  );
};

export default Header;
