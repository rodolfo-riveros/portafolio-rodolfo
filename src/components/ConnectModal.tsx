import React, { useState } from 'react';
import { Send, CheckCircle, Mail, User, MessageSquare, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';
import { useApp } from '../AppContext';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
  const { t, language, addTransmission } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = language === 'en' ? 'Your name is required.' : 'Tu nombre es obligatorio.';
    }
    if (!formData.email.trim()) {
      newErrors.email = language === 'en' ? 'Your email is required.' : 'Tu correo es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === 'en' ? 'Invalid email format.' : 'Formato de correo inválido.';
    }
    if (!formData.message.trim()) {
      newErrors.message = language === 'en' ? 'Message cannot be empty.' : 'El mensaje no puede estar vacío.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatus('idle');

    const newReceiptId = `TXN-${Math.floor(Math.random() * 900000) + 100000}`;

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          receipt_id: newReceiptId,
          to_email: 'riveros70397516@gmail.com',
          reply_to: formData.email,
          subject: `Contacto de ${formData.name} - ${formData.email}`,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      addTransmission({
        id: `msg-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date().toISOString(),
        userId: 'direct',
        receiptId: newReceiptId,
      });

      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#030303]/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-lg rounded-xl border border-primary/25 bg-[#06111f] text-[#d4e4fa] shadow-2xl p-4 sm:p-6 md:p-8 glass-panel-heavy z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-outline hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5 cursor-pointer z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {status === 'success' ? (
            /* Success state */
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 bg-secondary/10 border border-secondary/30 rounded-full flex items-center justify-center mx-auto text-secondary">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-headline text-2xl font-bold text-primary">
                  {t.connect.successTitle}
                </h3>
                <p className="text-outline text-sm max-w-sm mx-auto leading-relaxed">
                  {language === 'en'
                    ? 'Your message has been sent successfully. I will get back to you soon.'
                    : 'Tu mensaje ha sido enviado correctamente. Te responderé pronto.'}
                </p>
              </div>
              <button
                onClick={() => {
                  setStatus('idle');
                  setFormData({ name: '', email: '', message: '' });
                  onClose();
                }}
                className="px-8 py-3 bg-primary hover:bg-secondary text-on-primary hover:text-on-secondary rounded-lg text-xs font-mono tracking-widest uppercase font-bold transition-all cursor-pointer"
              >
                {t.connect.btnDismiss}
              </button>
            </div>
          ) : (
            /* Compose form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center space-y-1 mb-2">
                <span className="text-secondary font-mono text-[9px] tracking-[0.3em] uppercase block">{t.connect.compose}</span>
                <h3 className="font-headline text-xl font-bold text-primary">{t.connect.title}</h3>
                <p className="text-outline text-xs max-w-sm mx-auto">
                  {t.connect.subtitle}
                </p>
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-outline uppercase flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-secondary" /> {t.connect.nameLabel}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  className={`w-full bg-[#030a13] border ${errors.name ? 'border-red-500/50' : 'border-outline-variant/30 focus:border-secondary'} rounded-lg p-3 text-sm text-primary outline-none focus:ring-1 focus:ring-secondary/20 transition-all font-sans`}
                  placeholder={language === 'en' ? 'Your name' : 'Tu nombre'}
                />
                {errors.name && <p className="text-[10px] text-red-400 font-mono">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-outline uppercase flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-secondary" /> {t.connect.emailLabel}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className={`w-full bg-[#030a13] border ${errors.email ? 'border-red-500/50' : 'border-outline-variant/30 focus:border-secondary'} rounded-lg p-3 text-sm text-primary outline-none focus:ring-1 focus:ring-secondary/20 transition-all font-sans`}
                  placeholder={language === 'en' ? 'your@email.com' : 'tu@correo.com'}
                />
                {errors.email && <p className="text-[10px] text-red-400 font-mono">{errors.email}</p>}
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-outline uppercase flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-secondary" /> {t.connect.messageLabel}
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  className={`w-full bg-[#030a13] border ${errors.message ? 'border-red-500/50' : 'border-outline-variant/30 focus:border-secondary'} rounded-lg p-3 text-sm text-primary outline-none focus:ring-1 focus:ring-secondary/20 transition-all font-sans resize-none`}
                  placeholder={t.connect.messagePlaceholder}
                />
                {errors.message && <p className="text-[10px] text-red-400 font-mono">{errors.message}</p>}
              </div>

              {status === 'error' && (
                <p className="text-[11px] text-red-400 font-mono text-center">
                  {language === 'en'
                    ? 'Failed to send. Please try again or email me directly at riveros70397516@gmail.com.'
                    : 'Error al enviar. Intenta de nuevo o escríbeme a riveros70397516@gmail.com.'}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2.5 bg-primary hover:bg-secondary text-on-primary hover:text-on-secondary rounded-lg py-3.5 text-xs font-mono tracking-widest font-bold uppercase transition-all duration-300 shadow-lg shadow-primary/5 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-on-primary" />
                    {t.connect.btnSyncing}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t.connect.btnBroadcast}
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
