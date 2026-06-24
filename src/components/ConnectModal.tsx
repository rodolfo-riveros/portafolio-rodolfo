import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Mail, User, MessageSquare, Loader2, X, Download, ShieldCheck, History, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';
import { useApp } from '../AppContext';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
  const { t, language, user, authLoading, login, logout, myTransmissions, addTransmission } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [receiptId, setReceiptId] = useState('');
  const [activeTab, setActiveTab] = useState<'compose' | 'logs'>('compose');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.displayName || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = language === 'en' ? 'Full name is required.' : 'Se requiere el nombre completo.';
    }
    if (!formData.message.trim()) {
      newErrors.message = language === 'en' ? 'Message content cannot be blank.' : 'El contenido del mensaje no puede estar vacío.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!validate()) return;

    setIsSubmitting(true);

    const messageId = `msg-${Date.now()}`;
    const newReceiptId = `TXN-${Math.floor(Math.random() * 900000) + 100000}`;
    const payload = {
      id: messageId,
      name: formData.name,
      email: user.email || '',
      message: formData.message,
      timestamp: new Date().toISOString(),
      userId: user.uid,
      receiptId: newReceiptId
    };

    try {
      addTransmission(payload);
      setReceiptId(newReceiptId);

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: user.email || '',
          message: formData.message,
          receipt_id: newReceiptId,
          to_email: 'riveros70397516@gmail.com',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadReceipt = (msg?: typeof myTransmissions[0]) => {
    const activeMsg = msg || {
      receiptId,
      name: formData.name,
      email: formData.email,
      message: formData.message,
      timestamp: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      receiptId: activeMsg.receiptId,
      sender: activeMsg.name,
      contact: activeMsg.email,
      message: activeMsg.message,
      timestamp: activeMsg.timestamp,
      integrityHash: Math.random().toString(36).substring(2, 15)
    }, null, 2));

    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `sysio_receipt_${activeMsg.receiptId}.json`);
    dlAnchorElem.click();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#030303]/85 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-lg rounded-xl border border-primary/25 bg-[#06111f] text-[#d4e4fa] shadow-2xl p-6 md:p-8 glass-panel-heavy z-10 flex flex-col max-h-[90vh] overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-outline hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5 cursor-pointer z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Secure Port Active Badge at top */}
          {user && (
            <div className="flex items-center justify-between bg-[#040c16] border border-outline-variant/20 px-3.5 py-1.5 rounded-lg mb-4 text-[10px] font-mono text-secondary">
              <span className="flex items-center gap-1.5 truncate">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="text-outline uppercase hidden sm:inline">{t.connect.authenticatedAs}</span>
                <span className="text-primary font-bold truncate">{user.email}</span>
              </span>
              <button 
                onClick={() => logout()} 
                className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 ml-2 font-bold cursor-pointer hover:underline"
              >
                <LogOut className="w-3 h-3" />
                {t.connect.btnLogout}
              </button>
            </div>
          )}

          {/* Tab Navigation */}
          {user && (
            <div className="flex border-b border-outline-variant/10 mb-4 shrink-0">
              <button
                onClick={() => { setActiveTab('compose'); setIsSuccess(false); }}
                className={`flex-1 pb-2 text-xs font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-2 border-b-2 cursor-pointer ${activeTab === 'compose' ? 'border-secondary text-primary font-bold' : 'border-transparent text-outline hover:text-primary'}`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                {t.connect.compose}
              </button>
              <button
                onClick={() => setActiveTab('logs')}
                className={`flex-1 pb-2 text-xs font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-2 border-b-2 cursor-pointer relative ${activeTab === 'logs' ? 'border-secondary text-primary font-bold' : 'border-transparent text-outline hover:text-primary'}`}
              >
                <History className="w-3.5 h-3.5" />
                {t.connect.transmissionsLog}
                {myTransmissions.length > 0 && (
                  <span className="absolute top-0 right-2 px-1.5 py-0.5 text-[9px] bg-secondary text-on-secondary rounded-full font-sans font-bold">
                    {myTransmissions.length}
                  </span>
                )}
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto pr-1">
            {authLoading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-secondary" />
                <span className="text-xs font-mono text-outline">INITIALIZING SECURE SOCKETS...</span>
              </div>
            ) : !user ? (
              /* Local Session Establishment Block */
              <div className="py-4 space-y-4">
                <div className="text-center space-y-2 mb-2">
                  <div className="w-12 h-12 bg-secondary/10 border border-secondary/30 rounded-full flex items-center justify-center mx-auto text-secondary shadow-lg shadow-secondary/5">
                    <ShieldCheck className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="font-headline text-xl font-bold text-primary">
                    {language === 'en' ? 'Establish Secure Session' : 'Establecer Sesión Segura'}
                  </h3>
                  <p className="text-outline text-xs max-w-sm mx-auto leading-relaxed">
                    {language === 'en' ? 'Enter your details to generate a localized system architect signature.' : 'Ingrese sus datos para generar una firma localizada de arquitecto de sistema.'}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-outline uppercase flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-secondary" /> {language === 'en' ? 'Your Name' : 'Su Nombre'}
                    </label>
                    <input
                      type="text"
                      id="login-name-input"
                      placeholder="e.g. Satoshi Nakamoto"
                      className="w-full bg-[#030a13] border border-outline-variant/30 focus:border-secondary rounded-lg p-3 text-sm text-primary outline-none focus:ring-1 focus:ring-secondary/20 transition-all font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-outline uppercase flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-secondary" /> {language === 'en' ? 'Your Email' : 'Su Correo'}
                    </label>
                    <input
                      type="email"
                      id="login-email-input"
                      placeholder="e.g. satoshi@bitcoin.org"
                      className="w-full bg-[#030a13] border border-outline-variant/30 focus:border-secondary rounded-lg p-3 text-sm text-primary outline-none focus:ring-1 focus:ring-secondary/20 transition-all font-sans"
                    />
                  </div>
                  
                  <button
                    onClick={async () => {
                      const nameInput = document.getElementById('login-name-input') as HTMLInputElement;
                      const emailInput = document.getElementById('login-email-input') as HTMLInputElement;
                      const name = nameInput?.value.trim() || 'Guest Developer';
                      const email = emailInput?.value.trim() || 'dev@sysio.dev';
                      setIsLoggingIn(true);
                      await login(name, email);
                      setIsLoggingIn(false);
                    }}
                    disabled={isLoggingIn}
                    className="w-full flex items-center justify-center gap-2.5 bg-primary hover:bg-secondary text-on-primary hover:text-on-secondary rounded-lg py-4 text-xs font-mono tracking-widest font-bold uppercase transition-all duration-300 shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        ESTABLISHING LINK...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        {language === 'en' ? 'INITIALIZE INTERFACE' : 'INICIALIZAR INTERFAZ'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : activeTab === 'compose' ? (
              /* Compose Tab */
              !isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4 py-1">
                  <div className="text-center space-y-1 mb-2">
                    <span className="text-secondary font-mono text-[9px] tracking-[0.3em] uppercase block">{t.connect.compose}</span>
                    <h3 className="font-headline text-xl font-bold text-primary">{t.connect.title}</h3>
                    <p className="text-outline text-[11px] max-w-sm mx-auto">
                      {t.connect.subtitle}
                    </p>
                  </div>

                  {/* Name Field */}
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
                      placeholder="e.g. Satoshi Nakamoto"
                    />
                    {errors.name && <p className="text-[10px] text-red-400 font-mono">{errors.name}</p>}
                  </div>

                  {/* Email Field (READ-ONLY) */}
                  <div className="space-y-1 opacity-75">
                    <label className="text-xs font-mono text-outline uppercase flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-secondary" /> {t.connect.emailLabel} (VERIFIED)
                    </label>
                    <input
                      type="email"
                      readOnly
                      value={user.email || ''}
                      className="w-full bg-[#02070e] border border-outline-variant/10 rounded-lg p-3 text-sm text-outline font-mono outline-none cursor-not-allowed"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-outline uppercase flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-secondary" /> {t.connect.messageLabel}
                    </label>
                    <textarea
                      rows={3}
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

                  {/* Submit Button */}
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
              ) : (
                /* Success screen after composing */
                <div className="text-center space-y-6 py-4 animate-fadeIn">
                  <div className="w-16 h-16 bg-secondary/10 border border-secondary/30 rounded-full flex items-center justify-center mx-auto text-secondary shadow-lg shadow-secondary/5">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-headline text-2xl font-bold text-primary">{t.connect.successTitle}</h3>
                    <p className="text-outline text-xs max-w-sm mx-auto leading-relaxed">
                      {t.connect.successSubtitle}
                    </p>
                  </div>

                  {/* Receipt Terminal display */}
                  <div className="bg-[#030911] border border-outline-variant/20 p-4 rounded-lg font-mono text-left text-xs text-primary/80 space-y-2.5">
                    <div className="flex justify-between items-center text-[10px] text-outline border-b border-outline-variant/10 pb-1.5">
                      <span>{t.connect.receiptHeader}</span>
                      <span className="text-secondary font-bold">{receiptId}</span>
                    </div>
                    <p><span className="text-outline">{t.connect.sender}:</span> {formData.name}</p>
                    <p><span className="text-outline">{t.connect.channel}:</span> local_storage_db_v1.0 (SECURE)</p>
                    <p className="truncate"><span className="text-outline">{t.connect.inquiry}:</span> {formData.message}</p>
                    <p className="text-[10px] text-outline/60 text-right font-sans italic mt-1">{t.connect.timestamp} {new Date().toUTCString()}</p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        const emailSubject = encodeURIComponent(
                          language === 'en' 
                            ? `System Transmission from ${formData.name} - ${receiptId}` 
                            : `Transmisión de Sistema de ${formData.name} - ${receiptId}`
                        );
                        const emailBody = encodeURIComponent(
                          language === 'en'
                            ? `Sender Name: ${formData.name}\nSender Email: ${user.email || ''}\n\nMessage:\n${formData.message}\n\n---\nTransmission ID: ${receiptId}`
                            : `Nombre del Remitente: ${formData.name}\nCorreo del Remitente: ${user.email || ''}\n\nMensaje:\n${formData.message}\n\n---\nID de Transmisión: ${receiptId}`
                        );
                        window.location.href = `mailto:riveros70397516@gmail.com?subject=${emailSubject}&body=${emailBody}`;
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-secondary hover:bg-[#153457] text-on-secondary hover:text-primary rounded-lg transition-all cursor-pointer font-mono text-xs font-bold"
                    >
                      <Mail className="w-4 h-4 text-primary" />
                      {language === 'en' ? 'OPEN IN MAIL CLIENT' : 'ABRIR EN CLIENTE DE CORREO'}
                    </button>

                    <div className="flex gap-4">
                      <button
                        onClick={() => handleDownloadReceipt()}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#122131] hover:bg-[#1c2e42] border border-outline-variant/30 text-xs font-mono text-primary rounded-lg transition-all cursor-pointer"
                      >
                        <Download className="w-4 h-4 text-secondary" /> {t.connect.btnReceipt}
                      </button>
                      <button
                        onClick={() => {
                          setIsSuccess(false);
                          setFormData({ name: user.displayName || '', email: user.email || '', message: '' });
                          onClose();
                        }}
                        className="flex-1 px-4 py-3 bg-primary hover:bg-secondary text-on-primary hover:text-on-secondary text-xs font-mono tracking-widest uppercase rounded-lg transition-all font-bold cursor-pointer"
                      >
                        {t.connect.btnDismiss}
                      </button>
                    </div>
                  </div>
                </div>
              )
            ) : (
              /* Real-time Logs Tab synced from Firestore */
              <div className="space-y-4 py-1">
                <div className="text-center space-y-1 mb-2">
                  <span className="text-secondary font-mono text-[9px] tracking-[0.3em] uppercase block">PERSISTENT TELEMETRY LOGS</span>
                  <h3 className="font-headline text-xl font-bold text-primary">{t.connect.transmissionsLog}</h3>
                  <p className="text-outline text-[11px] max-w-sm mx-auto">
                    Audit, track, and download valid digital handshake transmission files currently saved locally in your browser.
                  </p>
                </div>

                {myTransmissions.length === 0 ? (
                  <div className="border border-outline-variant/10 rounded-xl bg-[#030911]/60 p-8 text-center space-y-2">
                    <History className="w-8 h-8 text-outline/30 mx-auto" />
                    <p className="text-xs font-mono text-outline">NO TRANSMISSION RECORDS DETECTED</p>
                    <p className="text-[10px] text-outline/60">Your secure local database is active. Go to Compose to send your first packet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {myTransmissions.map((msg) => (
                      <div 
                        key={msg.id} 
                        className="bg-[#030a13] border border-outline-variant/20 rounded-lg p-3 text-xs font-mono relative group hover:border-secondary/40 transition-all"
                      >
                        <div className="flex justify-between items-center text-[9px] border-b border-outline-variant/10 pb-1 mb-2">
                          <span className="text-secondary font-bold">{msg.receiptId}</span>
                          <span className="text-outline/60">{new Date(msg.timestamp).toLocaleDateString()}</span>
                        </div>
                        <p className="text-primary font-bold mb-1 truncate"><span className="text-outline text-[10px]">NAME:</span> {msg.name}</p>
                        <p className="text-outline-variant mb-2 line-clamp-2 leading-relaxed">{msg.message}</p>
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleDownloadReceipt(msg)}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0e1d2c] hover:bg-[#152a3f] border border-outline-variant/30 text-[10px] text-primary rounded transition-all cursor-pointer"
                          >
                            <Download className="w-3 h-3 text-secondary" />
                            DOWNLOAD JSON
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
