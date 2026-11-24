'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Copy, Check, AlertCircle, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

export default function Contact() {
  const { data } = usePortfolio();
  const { personalInfo } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'preparing' | 'opened' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.socialLinks.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('preparing');
    setErrorMessage('');

    // Open native email client with pre-filled content (honest & functional without fake backend claims)
    const emailSubject = encodeURIComponent(
      formData.subject.trim() || `Portfolio Contact from ${formData.name.trim()}`
    );
    const emailBody = encodeURIComponent(
      `Hello Lahiru,\n\n${formData.message.trim()}\n\nBest regards,\n${formData.name.trim()}\n${formData.email.trim()}`
    );

    const mailtoUrl = `mailto:${personalInfo.socialLinks.email}?subject=${emailSubject}&body=${emailBody}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      setStatus('opened');
    }, 500);
  };

  return (
    <section id="contact" className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeading
          badgeText="07 / GET IN TOUCH"
          badgeVariant="blue"
          icon={<Mail className="w-3.5 h-3.5" />}
          title="Connect & Collaborate"
          subtitle="Whether you have an upcoming project, software engineering opportunity, or technical inquiry, feel free to reach out."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Email Card with Quick Copy */}
            <Card variant="glass" className="p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Direct Email
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-mono py-1 px-2 rounded-md hover:bg-zinc-800 transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <a
                  href={`mailto:${personalInfo.socialLinks.email}`}
                  className="text-sm sm:text-base font-semibold text-white hover:text-blue-400 transition-colors break-all"
                >
                  {personalInfo.socialLinks.email}
                </a>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                Primary contact address. Monitored regularly for technical and academic correspondence.
              </p>
            </Card>

            {/* Connect on Profiles */}
            <Card variant="glass" className="p-6 sm:p-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Network &amp; Profiles
              </span>

              <div className="space-y-3">
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-zinc-800 text-zinc-300 group-hover:text-white">
                      <GithubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
                        GitHub Profile
                      </h4>
                      <p className="text-[11px] text-zinc-400 font-mono">
                        github.com/lahiru-ai
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
                        LinkedIn Network
                      </h4>
                      <p className="text-[11px] text-zinc-400 font-mono">
                        linkedin.com/in/lahiru-ai
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </Card>

            {/* Location Note */}
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-rose-400 mt-1 shrink-0" />
              <div className="text-xs text-zinc-400 space-y-1">
                <p className="font-medium text-zinc-200">Location: {personalInfo.location}</p>
                <p>Based in Sri Lanka (GMT+5:30). Open to remote collaborations worldwide.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <Card variant="glass" className="lg:col-span-7 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-2">
              Compose Direct Message
            </h3>
            <p className="text-xs text-zinc-400 mb-6 font-mono">
              Fill in the details below to generate a pre-formatted message directly to my inbox.
            </p>

            {status === 'opened' ? (
              <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-semibold text-emerald-300">
                  Email Client Opened
                </h4>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                  Your message has been pre-filled in your default email client. You can send it directly or copy the address above.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded-xl"
                >
                  Write Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === 'error' && errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">
                      Your Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your inquiry, project scope, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'preparing'}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-[0.99] disabled:opacity-50"
                >
                  {status === 'preparing' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Opening Email Client...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send via Email Client</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
