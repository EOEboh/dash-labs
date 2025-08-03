import { templates } from "@/lib/templates";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export default function TemplateDetailPage({ params }: Props) {
  const template = templates.find((t) => t.slug === params.slug);

  if (!template) return notFound();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{template.name}</h1>
      <p className="text-gray-600 mb-4">{template.description}</p>

      <img
        src={template.image}
        alt={template.name}
        className="w-full max-w-3xl rounded mb-6"
      />

      <div className="flex gap-4">
        <a
          href={template.previewLink}
          target="_blank"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Live Preview
        </a>
        <a
          href={template.downloadLink}
          download
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download Code
        </a>
      </div>
    </main>
  );
}
