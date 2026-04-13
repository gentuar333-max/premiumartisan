import { Metadata } from "next"
import VoiceDashboard from "@/components/voice/VoiceDashboard"

export const metadata: Metadata = {
  title: "Réceptionniste IA | PremiumArtisan",
}

export default function ReceptionistPage() {
  return <VoiceDashboard />
}