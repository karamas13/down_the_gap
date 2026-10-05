'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wheat, 
  ShoppingBag, 
  Store, 
  MessageSquare, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Send 
} from 'lucide-react';

type CategoryType = 'Καλλιέργειες' | 'Προϊόντα' | 'Λαϊκές Αγορές' | 'Άλλο';

interface FormData {
  fullName: string;
  category: CategoryType | '';
  email: string;
  phone: string;
  message: string;
}

interface CategoryOption {
  id: CategoryType;
  label: string;
  icon: React.ElementType;
  desc: string;
}

const categories: CategoryOption[] = [
  { id: 'Καλλιέργειες', label: 'Καλλιέργειες', icon: Wheat, desc: 'Ερωτήσεις για τις μεθόδους & τη γη μας' },
  { id: 'Προϊόντα', label: 'Προϊόντα', icon: ShoppingBag, desc: 'Διαθεσιμότητα & παραγγελίες λαχανικών' },
  { id: 'Λαϊκές Αγορές', label: 'Λαϊκές Αγορές', icon: Store, desc: 'Σημεία & ημέρες παρουσίας μας' },
  { id: 'Άλλο', label: 'Γενική Επικοινωνία', icon: MessageSquare, desc: 'Προτάσεις, συνεργασίες & λοιπά' },
];

export const FlashCards = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    category: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
        newErrors.fullName = 'Παρακαλούμε συμπληρώστε το ονοματεπώνυμό σας.';
      }
    } else if (step === 2) {
      if (!formData.category) {
        newErrors.category = 'Παρακαλούμε επιλέξτε μία κατηγορία.';
      }
    } else if (step === 3) {
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Εισάγετε έγκυρη διεύθυνση email.';
      }
      if (!formData.phone.trim() || formData.phone.trim().length < 10) {
        newErrors.phone = 'Εισάγετε έγκυρο αριθμό τηλεφώνου (τουλάχιστον 10 ψηφία).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (step < 3) {
        handleNext();
      } else {
        handleSubmit(e as unknown as React.FormEvent);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (validateStep()) {
      setIsSubmitting(true);

      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '';
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            fullName: formData.fullName,
            category: formData.category,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            subject: `Νέο Μήνυμα Επικοινωνίας: ${formData.category}`,
          }),
        });

        const result = await response.json();

        if (result.success) {
          setIsSubmitted(true);
        } else {
          setSubmissionError(result.message || 'Παρουσιάστηκε σφάλμα κατά την υποβολή.');
        }
      } catch (error) {
        console.error('Submission Error:', error);
        setSubmissionError('Παρουσιάστηκε πρόβλημα σύνδεσης με την υπηρεσία.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className="py-16 bg-[#FAF7F2] text-[#121B15]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* FLASHCARD CONTAINER */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-10 border border-[#2D4030]/15 shadow-xl overflow-hidden">
          
          {/* TOP PROGRESS BAR */}
          {!isSubmitted && (
            <div className="mb-8">
              {/* High contrast step label text */}
              <div className="flex items-center justify-between text-xs font-black text-[#1E2C22] uppercase tracking-wider mb-2">
                <span>Βήμα {step} από 3</span>
                <span>{step === 1 ? '33%' : step === 2 ? '66%' : '100%'}</span>
              </div>
              <div className="h-2 w-full bg-[#2D4030]/15 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#C86D51]"
                  animate={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* SUCCESS STATE */}
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h3 className="font-serif text-3xl font-black text-[#121B15]">
                  Ευχαριστούμε, {formData.fullName.split(' ')[0]}!
                </h3>
                {/* High contrast subtext */}
                <p className="text-sm text-[#1E2C22] max-w-md mx-auto leading-relaxed">
                  Λάβαμε το μήνυμά σου σχετικά με τις <strong>{formData.category}</strong>. Θα επικοινωνήσουμε μαζί σου σύντομα στο <strong>{formData.phone}</strong> ή στο email σου.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setStep(1);
                    setFormData({ fullName: '', category: '', email: '', phone: '', message: '' });
                  }}
                  className="mt-6 px-6 py-3 rounded-xl bg-[#2D4030] text-white text-xs font-extrabold hover:bg-[#1E2C22] transition-colors shadow-sm"
                >
                  Νέο Μήνυμα
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                
                {/* STEP 1: FULL NAME */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      {/* Darker terracotta tone `#B05438` for WCAG AA ratio on white */}
                      <span className="text-xs font-black uppercase tracking-widest text-[#B05438] block mb-1">
                        Γνωριμία
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#121B15]">
                        Πώς ονομάζεστε;
                      </h2>
                      <p className="text-xs text-[#1E2C22] mt-1 font-medium">
                        Συμπληρώστε το ονοματεπώνυμό σας για να γνωρίζουμε με ποιον συνομιλούμε.
                      </p>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        onKeyDown={handleKeyDown}
                        placeholder="π.χ. Μαρία Παπαδοπούλου"
                        autoFocus
                        className="w-full px-5 py-4 text-base rounded-2xl bg-[#FAF7F2] text-[#121B15] border border-[#2D4030]/20 focus:outline-none focus:border-[#C86D51] transition-all"
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-600 font-bold mt-2">{errors.fullName}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: CATEGORY SELECTION */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-xs font-black uppercase tracking-widest text-[#B05438] block mb-1">
                        Θέμα
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#121B15]">
                        Ποιος είναι ο λόγος επικοινωνίας;
                      </h3>
                      <p className="text-xs text-[#1E2C22] mt-1 font-medium">
                        Επιλέξτε την κατηγορία που ταιριάζει στο αίτημά σας.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {categories.map((cat) => {
                        const IconComponent = cat.icon;
                        const isSelected = formData.category === cat.id;

                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, category: cat.id });
                              setErrors({ ...errors, category: '' });
                            }}
                            className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                              isSelected
                                ? 'bg-[#2D4030] text-white border-[#2D4030] shadow-md'
                                : 'bg-[#FAF7F2] text-[#121B15] border-[#2D4030]/15 hover:border-[#2D4030]/40'
                            }`}
                          >
                            <IconComponent
                              className={`w-6 h-6 shrink-0 mt-0.5 ${
                                isSelected ? 'text-amber-400' : 'text-[#2D4030]'
                              }`}
                            />
                            <div>
                              <span className="block text-sm font-extrabold">{cat.label}</span>
                              <span
                                className={`text-[11px] block mt-0.5 font-medium ${
                                  isSelected ? 'text-emerald-100' : 'text-[#1E2C22]'
                                }`}
                              >
                                {cat.desc}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {errors.category && (
                      <p className="text-xs text-red-600 font-bold mt-1">{errors.category}</p>
                    )}
                  </motion.div>
                )}

                {/* STEP 3: CONTACT & MESSAGE */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div>
                      <span className="text-xs font-black uppercase tracking-widest text-[#B05438] block mb-1">
                        Στοιχεία Επικοινωνίας
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#121B15]">
                        Πού να σας απαντήσουμε;
                      </h3>
                      <p className="text-xs text-[#1E2C22] mt-1 font-medium">
                        Συμπληρώστε υποχρεωτικά το τηλέφωνο και το email σας.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email Input */}
                      <div>
                        <label className="block text-xs font-black text-[#121B15] mb-1">
                          Email <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          onKeyDown={handleKeyDown}
                          placeholder="yourname@domain.gr"
                          className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#FAF7F2] text-[#121B15] border border-[#2D4030]/20 focus:outline-none focus:border-[#C86D51]"
                        />
                        {errors.email && (
                          <p className="text-[11px] text-red-600 font-bold mt-1">{errors.email}</p>
                        )}
                      </div>

                      {/* Phone Input */}
                      <div>
                        <label className="block text-xs font-black text-[#121B15] mb-1">
                          Τηλέφωνο <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          onKeyDown={handleKeyDown}
                          placeholder="69XXXXXXXX"
                          className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#FAF7F2] text-[#121B15] border border-[#2D4030]/20 focus:outline-none focus:border-[#C86D51]"
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-red-600 font-bold mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Optional Message */}
                    <div>
                      <label className="block text-xs font-black text-[#121B15] mb-1">
                        Το Μήνυμά σας <span className="text-[#1E2C22] font-medium">(προαιρετικό)</span>
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onKeyDown={handleKeyDown}
                        placeholder="Γράψτε μας περισσότερες λεπτομέρειες..."
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#FAF7F2] text-[#121B15] border border-[#2D4030]/20 focus:outline-none focus:border-[#C86D51] resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Submission Error Message */}
                {submissionError && (
                  <p className="text-xs text-red-600 font-bold mt-4 text-center">
                    {submissionError}
                  </p>
                )}

                {/* FORM CONTROLS */}
                <div className="pt-8 mt-6 border-t border-[#2D4030]/15 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-5 py-2.5 rounded-xl text-xs font-extrabold border border-[#2D4030]/30 text-[#121B15] hover:bg-[#2D4030]/5 transition-colors flex items-center gap-1.5"
                      disabled={isSubmitting}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Πίσω</span>
                    </button>
                  ) : <div />}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 rounded-xl text-xs font-extrabold bg-[#2D4030] text-white hover:bg-[#1E2C22] transition-colors shadow-sm ml-auto flex items-center gap-1.5"
                    >
                      <span>Συνέχεια</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className={`px-7 py-3 rounded-xl text-xs font-extrabold bg-[#C86D51] text-white transition-colors shadow-md ml-auto flex items-center gap-2 ${
                        isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#B05438]'
                      }`}
                      disabled={isSubmitting}
                    >
                      <span>{isSubmitting ? 'Αποστολή...' : 'Αποστολή Μηνύματος'}</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </form>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};