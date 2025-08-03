import { templates } from "@/lib/templates";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export default function PreviewPage({ params }: Props) {
  const template = templates.find((t) => t.slug === params.slug);
  if (!template) return notFound();

  return (
    <iframe
      src={`/templates/${template.slug}`}
      className="w-full h-screen border-none"
      title="Live Preview"
    />
  );
}
