import Link from "next/link";
import { getTemplates } from "../../lib/templates";

export default async function TemplatesPage() {
  const templates = await getTemplates();

  if (templates.length === 0) {
    return <p className="p-8 text-gray-500">No templates available yet.</p>;
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Dashboard Templates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.slug}
            className="border rounded-xl p-4 shadow hover:shadow-lg"
          >
            <img
              src={template.image}
              alt={template.name}
              className="rounded mb-3"
            />
            <h2 className="text-xl font-semibold">{template.name}</h2>
            <p className="text-gray-500 text-sm">{template.description}</p>
            <div className="flex gap-3 mt-4">
              <Link
                href={`/templates/${template.slug}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
              <a
                href={template.downloadLink}
                className="text-green-500 hover:underline"
                download
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
