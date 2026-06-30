import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, AlertCircle } from 'lucide-react';

export default function JourneyModal({ isOpen, onClose, onSuccess }) {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!nameInput.trim()) {
      setErrorMessage('Please include your name.');
      return;
    }
    if (!emailInput.trim() || !emailInput.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsFormSubmitted(true);
      onSuccess(nameInput, emailInput);
    }, 850);
  };

  const resetAndClose = () => {
    setNameInput('');
    setEmailInput('');
    setIsFormSubmitted(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <div id="modal-wrapper" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark green-tinted blur backdrop */}
      <motion.div
        id="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={resetAndClose}
        className="absolute inset-0 bg-brand-green/30 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        id="modal-card"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative w-full max-w-md bg-brand-cream rounded-3xl p-8 shadow-2xl border border-brand-green/20 z-10 text-brand-green"
      >
        {/* Close Button */}
        <button
          id="modal-close-btn"
          onClick={resetAndClose}
          className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-brand-green/10 transition-colors text-brand-green/60 hover:text-brand-green focus:outline-none cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isFormSubmitted ? (
          <div id="modal-form-content">
            <div className="flex items-center space-x-2 text-brand-green/60 mb-3">
              <Sparkles className="w-4.5 h-4.5 text-brand-green/50" />
              <span className="text-xs uppercase tracking-widest font-semibold">Initiation Suite</span>
            </div>

            <h3 id="modal-title" className="font-serif text-3xl font-normal text-brand-green tracking-tight mb-2">
              Start Your Journey
            </h3>
            
            <p id="modal-desc" className="text-sm text-brand-green/75 leading-relaxed mb-6">
              Join Al Tooba® to cultivate health, experience prophetic wellness remedies, and connect with nature's pure essence.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Name input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-green/80 block tracking-wide">
                  What is your name?
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Emerson Geller"
                  className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-green/20 rounded-xl text-sm focus:outline-none focus:border-brand-green transition-colors placeholder:text-brand-green/45 text-brand-green"
                  maxLength={50}
                />
              </div>

              {/* Email input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-green/80 block tracking-wide">
                  Work Email
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@altooba.com"
                  className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-green/20 rounded-xl text-sm focus:outline-none focus:border-brand-green transition-colors placeholder:text-brand-green/45 text-brand-green"
                  maxLength={80}
                />
              </div>

              {/* Error Alerts */}
              {errorMessage && (
                <div className="flex items-center space-x-2 text-xs text-red-700 font-medium pt-1">
                  <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-full py-4.5 text-sm font-semibold bg-brand-green text-brand-cream hover:opacity-95 transition-all duration-300 transform active:scale-98 flex items-center justify-center space-x-2 focus:outline-none cursor-pointer disabled:opacity-75"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-brand-cream/20 border-t-brand-cream rounded-full animate-spin" />
                ) : (
                  <span>Embark</span>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Success Presentation state */
          <motion.div
            id="modal-success-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="w-14 h-14 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-5 text-brand-cream">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="font-serif text-3xl font-semibold text-brand-green tracking-tight mb-2">
              Welcome, {nameInput}
            </h3>

            <p className="text-sm text-brand-green/75 leading-relaxed max-w-sm mx-auto mb-6">
              Our servers have accepted your request. An initiation key has been sent to <span className="font-semibold text-brand-green">{emailInput}</span>. Pure flows from here.
            </p>

            <button
              onClick={resetAndClose}
              className="rounded-full px-8 py-3.5 bg-brand-green text-brand-cream font-semibold text-sm hover:opacity-90 transition-all duration-300 cursor-pointer focus:outline-none active:scale-95"
            >
              Done
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
