import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToastStore } from '../store/toastStore';

export default function ContactUs() {
  const showToast = useToastStore((state) => state.showToast);

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast('Please complete all form fields', 'error');
      return;
    }

    // Success Mockup
    setSubmitted(true);
    showToast('Your message has been sent to Al-Tooba.');
    setForm({ name: '', email: '', subject: 'general', message: '' });
  };

  return (
    <div className="pt-24 pb-20 bg-parchment min-h-screen">
      <div className="max-w-7xl mx-auto mt-8 px-6 sm:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-sans font-bold uppercase tracking-widest text-forest/50 mb-10">
          <Link to="/" className="hover:text-forest">Home</Link>
          <span>/</span>
          <span className="text-forest">Contact Us</span>
        </div>

        {/* Page Title */}
        <div className="text-center mb-16">
          <span className="text-gold text-xs font-sans font-bold uppercase tracking-[0.25em]">GET IN TOUCH</span>
          <h1 className="font-serif font-bold text-4xl sm:text-6xl text-forest mt-3 tracking-tight">Connect With Us</h1>
          <p className="text-sm sm:text-base text-forest/70 max-w-xl mx-auto mt-4 leading-relaxed font-sans">
            Have questions about prophetic medicine, ingredients, or an active order? Reach out to our healing consultants.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 bg-[#1a4a38] border border-forest/10 rounded-3xl p-8 sm:p-10 shadow-[0_4px_12px_rgba(0,0,0,0.01)] space-y-8">
            <div>
              <h3 className="font-serif font-bold text-xl text-parchment mb-4">Apothecary Lab</h3>
              <p className="text-sm text-parchment/75 leading-relaxed font-sans">
                Al-Tooba® Prophetic Remedies Pvt. Ltd.<br />
                Plot 12-C, Sector H-9/4, Industrial Area,<br />
                Islamabad, Pakistan
              </p>
            </div>

            <div>
              <h3 className="font-serif font-bold text-xl text-parchment mb-4">Direct Contact</h3>
              <ul className="space-y-3 text-sm text-parchment/75 font-sans">
                <li className="flex items-center gap-2">
                  <span className="text-gold font-bold">📞</span>
                  <span>+92 (300) 111-TOOB (8662)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold font-bold">✉️</span>
                  <a href="mailto:healing@al-tooba.com" className="hover:text-gold transition-colors">healing@al-tooba.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold font-bold">💬</span>
                  <span>WhatsApp Support: +92 300 1234567</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif font-bold text-xl text-parchment mb-4">Operational Hours</h3>
              <ul className="space-y-2 text-sm text-parchment/75 font-sans">
                <li className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-semibold text-parchment">09:00 AM - 06:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold text-parchment">10:00 AM - 04:00 PM</span>
                </li>
                <li className="flex justify-between text-parchment/40">
                  <span>Sunday</span>
                  <span className="italic">Closed (Rest Day)</span>
                </li>
              </ul>
            </div>

            {/* Embed simple green mock locator card */}
            <div className="border border-parchment/10 bg-parchment/5 rounded-2xl p-6 text-center">
              <span className="text-xl mb-2 block">🕋</span>
              <h4 className="font-serif font-bold text-parchment mb-1 text-sm">International Orders</h4>
              <p className="text-xs text-parchment/70 font-sans leading-relaxed">
                We ship to Saudi Arabia, UAE, UK, and USA. International inquiries can be forwarded to <a href="mailto:global@al-tooba.com" className="font-bold text-parchment hover:text-gold">global@al-tooba.com</a>.
              </p>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7 bg-[#1a4a38] border border-forest/10 rounded-3xl p-8 sm:p-10 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
            <h3 className="font-serif font-bold text-2xl text-parchment mb-2">Send a Message</h3>
            <p className="text-xs sm:text-sm text-parchment/70 mb-8 font-sans">
              Fill in your details below and we will contact you back as soon as possible.
            </p>

            {submitted ? (
              <div className="text-center py-12 bg-parchment/5 rounded-2xl border border-parchment/5">
                <span className="text-4xl mb-4 block">✉️</span>
                <h4 className="font-serif font-bold text-xl text-parchment mb-2">Message Dispatched!</h4>
                <p className="text-xs sm:text-sm text-parchment/70 max-w-sm mx-auto mb-6 leading-relaxed">
                  Thank you for reaching out. A botanical representative will review your message and respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="rounded-full px-6 py-2.5 bg-[#D4A24C] text-forest text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#c2913b] transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-parchment/70 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-parchment/10 border border-parchment/20 rounded-full px-5 py-3.5 text-sm font-sans text-parchment focus:outline-none focus:border-gold placeholder:text-parchment/30"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-parchment/70 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-parchment/10 border border-parchment/20 rounded-full px-5 py-3.5 text-sm font-sans text-parchment focus:outline-none focus:border-gold placeholder:text-parchment/30"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-parchment/70 mb-2">Topic of Interest</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleInputChange}
                    className="w-full bg-parchment/10 border border-parchment/20 rounded-full px-5 py-3.5 text-sm font-sans text-parchment focus:outline-none focus:border-gold"
                  >
                    <option value="general" className="bg-forest text-parchment">General Inquiry</option>
                    <option value="order" className="bg-forest text-parchment">Order Support</option>
                    <option value="consult" className="bg-forest text-parchment">Remedy Consultation</option>
                    <option value="wholesale" className="bg-forest text-parchment">Wholesale & Distribution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-parchment/70 mb-2">Your Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Describe your inquiry in detail..."
                    className="w-full bg-parchment/10 border border-parchment/20 rounded-3xl px-5 py-4 text-sm font-sans text-parchment focus:outline-none focus:border-gold resize-none placeholder:text-parchment/30"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full py-4 bg-[#D4A24C] text-forest text-xs font-sans font-bold uppercase tracking-widest hover:bg-[#c2913b] transition-colors shadow-md cursor-pointer block text-center"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
