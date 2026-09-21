import { FlashCards } from '@/components/contact/FlashCards';
import { ContactInfo } from '@/components/contact/ContactInfo';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      {/* Header Banner */}
      <section className="py-16 bg-[#2D4030] text-[#FAF7F2] text-center border-b border-white/10">
        <h1 className="font-serif text-4xl sm:text-6xl font-black">Επικοινωνία</h1>
        <p className="text-sm text-[#FAF7F2]/80 mt-3 font-light max-w-md mx-auto">
          Θέλετε να μάθετε περισσότερα για τους καρπούς μας ή τη φάρμα μας; Στείλτε μας το μήνυμά σας.
        </p>
      </section>

      {/* Component 1: Interactive Flashcard Form */}
      <FlashCards />

      {/* Component 2: Direct Contact Information */}
      <ContactInfo />
    </main>
  );
}