// app/publier-projet/page.tsx
import { redirect } from "next/navigation";

export default function PublierProjetRedirect({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // ✅ NËSE forma u dërgua me sukses
  if (searchParams?.success === "1") {
    return (
      <main
        style={{
          padding: "60px 20px",
          maxWidth: 760,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 42,
            fontWeight: 900,
            marginBottom: 16,
          }}
        >
          Projet publié ✅
        </h1>

        <p
          style={{
            fontSize: 18,
            opacity: 0.8,
            marginBottom: 28,
          }}
        >
          Merci ! Votre demande a été envoyée avec succès.
          <br />
          Vous recevrez des réponses d’artisans selon la disponibilité.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/"
            style={{
              padding: "14px 20px",
              borderRadius: 14,
              fontWeight: 800,
              textDecoration: "none",
              border: "1px solid rgba(0,0,0,0.12)",
              background: "white",
            }}
          >
            Retour à l’accueil
          </a>

          <a
            href="/publier-projet/form"
            style={{
              padding: "14px 20px",
              borderRadius: 14,
              fontWeight: 800,
              textDecoration: "none",
              background: "#111",
              color: "white",
            }}
          >
            Publier un autre projet
          </a>
        </div>
      </main>
    );
  }

  // 🔒 Logjika jote SEO (e ruajtur 100%)
  const params = new URLSearchParams();

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

  // Redirect normal (clean funnel)
  redirect(target);
}