import { Metadata } from "next"
import VoiceDashboard from "@/components/voice/VoiceDashboard"

export const metadata: Metadata = {
  title: "Réceptionniste IA | PremiumArtisan",
  description: "Gérez vos appels traités par votre réceptionniste IA 24/7",
}

export default function ReceptionistPage() {
  return <VoiceDashboard />
}