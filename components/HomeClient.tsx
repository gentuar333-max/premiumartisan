"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type ProjectType = "peinture-interieure" | "peinture-exterieure" | "plafond" | "renovation";

const styles = {
  miniForm: { display: "flex", gap: 12, flexWrap: "wrap" as const, alignItems: "center", marginTop: 4 },
  input: { height: 46, padding: "0 14px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.08)", color: "#EAF0FF", fontWeight: 800, outline: "none", minWidth: 200 },
  heroPrimaryBtn: { height: 46, padding: "0 16px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.16)", background: "linear-gradient(90deg, rgba(34,211,238,0.92), rgba(89,140,255,0.92))", color: "#FFFFFF", fontWeight: 950, cursor: "pointer", boxShadow: "0 18px 50px rgba(0,0,0,0.35)", whiteSpace: "nowrap" as const },
};

export default function HomeClient() {
  const router = useRouter();
  const [typeProjet, setTypeProjet] = useState<ProjectType>("peinture-interieure");
  const [codePostal, setCodePostal] = useState<string>("");

  useEffect(() => {
    router.prefetch("/publier-projet/form");
  }, [router]);

  const onSubmitMiniForm = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("type", typeProjet);
    if (codePostal.trim()) params.set("cp", codePostal.trim());
    router.push(`/publier-projet/form?${params.toString()}`);
  };

  return (
    <form onSubmit={onSubmitMiniForm} style={styles.miniForm} aria-label="Mini formulaire">
      <select value={typeProjet} onChange={(e) => setTypeProjet(e.target.value as ProjectType)} style={styles.input} aria-label="Type de projet">
        <option value="peinture-interieure">Peinture intérieure</option>
        <option value="peinture-exterieure">Peinture extérieure</option>
        <option value="plafond">Murs & plafonds</option>
        <option value="renovation">Rénovation</option>
      </select>
      <input
        value={codePostal}
        onChange={(e) => setCodePostal(e.target.value.replace(/\D/g, "").slice(0, 5))}
        style={styles.input}
        inputMode="numeric"
        pattern="[0-9]{5}"
        maxLength={5}
        placeholder="Code postal (ex: 21000)"
        aria-label="Code postal"
      />
      <button type="submit" style={styles.heroPrimaryBtn}>Recevoir des devis gratuits</button>
    </form>
  );
}