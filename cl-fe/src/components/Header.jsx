export default function Header() {
  return (
    <header className="flex items-center gap-3 p-4 bg-white border-b border-gray-200">
      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
        🤖
      </span>
      <div>
        <h1 className="text-lg font-semibold text-gray-900">CivicBot</h1>
        <p className="text-xs text-gray-500">Asisten Hukum Virtual</p>
      </div>
    </header>
  );
}
