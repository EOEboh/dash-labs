export default function Home() {
  return (
    <main className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Dashboard Template Hub</h1>
      <p className="text-gray-600 mb-6">
        Explore beautiful dashboard templates. Preview and download.
      </p>
      <a
        href="/templates"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Browse Templates
      </a>
    </main>
  );
}
