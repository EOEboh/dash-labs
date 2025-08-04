import { getTemplates } from "../../../lib/templates";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PreviewPage({ params }: Props) {
  const templates = await getTemplates();
  const { slug } = await params;
  const template = templates.find((t) => t.slug === slug);

  if (!template) return notFound();

  return (
    <iframe
      src={`/templates/${template.slug}`}
      className="w-full h-screen border-none"
      title="Live Preview"
    />
  );
}
