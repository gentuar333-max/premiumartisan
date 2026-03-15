"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ConfirmerContent() {
  const params = useSearchParams();
  const status = params.get("status");
  const error  = params.get("error");

  if (error === "invalid") {
    return (
      <Card
        icon="❌"
        iconBg="#fee2e2"
        title="Lien invalide"
        desc="Ce lien de confirmation est invalide ou a expiré."
        sub="Si vous avez publié un projet, vérifiez votre boîte email."
      />
    );
  }

  if (error === "server") {
    return (
      <Card
        icon="⚠️"
        iconBg="#fef3c7"
        title="Erreur serveur"
        desc="Une erreur s'est produite. Veuillez réessayer."
        sub="Si le problème persiste, contactez le support."
      />
    );
  }

  if (status === "already") {
    return (
      <Card
        icon="✅"
        iconBg="#d1fae5"
        title="Déjà confirmé"
        desc="Votre projet est déjà actif."
        sub="Les artisans de votre zone peuvent déjà vous contacter."
      />
    );
  }

  // status === "success"
  return (
    <Card
      icon="✅"
      iconBg="#d1fae5"
      title="Projet confirmé !"
      desc="Votre projet est maintenant visible par les artisans de votre zone."
      sub="Vous recevrez des appels dans les prochaines heures. Maximum 3 artisans auront accès à vos coordonnées."
      showBadge
    />
  );
}

function Card({
  icon, iconBg, title, desc, sub, showBadge
}: {
  icon: string;
  iconBg: string;
  title: string;
  desc: string;
  sub: string;
  showBadge?: boolean;
}) {
  return (
    <main style={S.page}>
      <div style={S.card}>
        <div style={{ ...S.iconWrap, background: iconBg }}>
          <span style={{ fontSize: 36 }}>{icon}</span>
        </div>
        <h1 style={S.title}>{title}</h1>
        <p style={S.desc}>{desc}</p>
        <p style={S.sub}>{sub}</p>
        {showBadge && (
          <div style={S.badge}>
            🔒 Maximum 3 artisans · Zéro engagement
          </div>
        )}
      </div>
    </main>
  );
}

export default function ConfirmerProjetPage() {
  return (
    <Suspense>
      <ConfirmerContent />
    </Suspense>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    background: "#f1f5f9",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  card: {
    background: "#ffffff",
    borderRadius: 20,
    padding: "40px 36px",
    maxWidth: 480,
    width: "100%",
    textAlign: "center",
    boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    color: "#0f172a",
    margin: "0 0 12px",
  },
  desc: {
    fontSize: 15,
    color: "#334155",
    margin: "0 0 10px",
    lineHeight: 1.6,
  },
  sub: {
    fontSize: 13,
    color: "#64748b",
    margin: "0 0 20px",
    lineHeight: 1.6,
  },
  badge: {
    display: "inline-block",
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: 13,
    color: "#1e40af",
    fontWeight: 600,
  },
};