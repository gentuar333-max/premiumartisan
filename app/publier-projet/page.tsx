// app/publier-projet/page.tsx
import { redirect } from "next/navigation";

export default function PublierProjetRedirect({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const params = new URLSearchParams();

  // Ruaj ?cp=21000&city=Dijon (shumë e rëndësishme për SEO pages)
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (typeof value === "string") {
        params.set(key, value);
      }
    });
  }

  const query = params.toString();
  const target = query
    ? `/publier-projet/form?${query}`
    : `/publier-projet/form`;

  // Redirect automatik (clean funnel)
  redirect(target);
}