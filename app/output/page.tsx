import { notFound } from "next/navigation";
import { codeToHtml } from "shiki";

async function OutputCode({
  searchParams,
}: {
  searchParams: { code?: string };
}) {
  if (!searchParams?.code) return notFound();
  const html = await codeToHtml(searchParams.code, {
    lang: "jsx",
    theme: "github-dark",
  });
  return (
    <div className="container">
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  );
}

export default OutputCode;
