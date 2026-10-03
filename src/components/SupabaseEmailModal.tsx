import React, { useState } from 'react';
import { SupabaseEmailLog, getStoredEmails } from '../services/supabaseAuth';
import { Mail, CheckCircle, ExternalLink, X, Sparkles, Inbox, RefreshCw } from 'lucide-react';

interface SupabaseEmailModalProps {
  recipientEmail: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirmViaEmail?: (token: string) => void;
}

export const SupabaseEmailModal: React.FC<SupabaseEmailModalProps> = ({
  recipientEmail,
  isOpen,
  onClose,
  onConfirmViaEmail,
}) => {
  const [emails, setEmails] = useState<SupabaseEmailLog[]>(() => {
    return getStoredEmails().filter(
      m => m.recipient.toLowerCase() === recipientEmail.trim().toLowerCase()
    );
  });

  const [selectedEmail, setSelectedEmail] = useState<SupabaseEmailLog | null>(() => {
    const list = getStoredEmails().filter(
      m => m.recipient.toLowerCase() === recipientEmail.trim().toLowerCase()
    );
    return list.length > 0 ? list[0] : null;
  });

  // Re-sync emails every time modal is opened or recipientEmail changes
  React.useEffect(() => {
    if (isOpen) {
      const clean = recipientEmail.trim().toLowerCase();
      const allStored = getStoredEmails();
      const list = allStored.filter(
        m => m.recipient.toLowerCase() === clean
      );
      // If list is empty, also include any recent confirm_signup emails
      const finalEmails = list.length > 0 ? list : allStored.slice(0, 3);
      setEmails(finalEmails);
      if (finalEmails.length > 0) {
        setSelectedEmail(finalEmails[0]);
      }
    }
  }, [isOpen, recipientEmail]);

  const refreshEmails = () => {
    const clean = recipientEmail.trim().toLowerCase();
    const allStored = getStoredEmails();
    const list = allStored.filter(
      m => m.recipient.toLowerCase() === clean
    );
    const finalEmails = list.length > 0 ? list : allStored.slice(0, 3);
    setEmails(finalEmails);
    if (finalEmails.length > 0) {
      setSelectedEmail(finalEmails[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs">
      <div className="clay-card w-full max-w-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#faf4e6] border border-[#d4af37] text-[#aa851d]">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-base text-[#1a1a1a]">
                  Supabase Auth Mailbox
                </h3>
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-800">
                  TEMPLATE SIMULATOR
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-500">
                Inbox for: <strong className="text-black">{recipientEmail}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={refreshEmails}
              title="Refresh inbox"
              className="p-1.5 text-neutral-400 hover:text-black rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-black rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Email list */}
          <div className="md:col-span-1 border-r border-neutral-100 pr-2 space-y-2 overflow-y-auto max-h-[50vh]">
            <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block mb-1">
              Received Emails ({emails.length})
            </span>
            {emails.length === 0 ? (
              <div className="text-center py-8 text-neutral-400 text-xs font-mono">
                <Inbox className="h-8 w-8 mx-auto mb-2 opacity-50" />
                No messages yet.
              </div>
            ) : (
              emails.map(email => (
                <button
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                    selectedEmail?.id === email.id
                      ? 'border-[#d4af37] bg-[#faf4e6] text-[#855f0b] font-bold shadow-xs'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600">
                      {email.type === 'confirm_signup' ? 'Auth Verification' : 'Welcome Trigger'}
                    </span>
                    <span className="text-[9px] text-neutral-400">
                      {new Date(email.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="truncate font-semibold">{email.subject}</div>
                </button>
              ))
            )}
          </div>

          {/* Email Preview Detail */}
          <div className="md:col-span-2 overflow-y-auto max-h-[50vh] bg-[#fdfdfd] border border-neutral-200 rounded-2xl p-5 font-sans text-sm">
            {selectedEmail ? (
              <div className="space-y-4">
                <div className="border-b border-neutral-200 pb-3">
                  <h4 className="font-extrabold text-base text-[#1a1a1a]">
                    {selectedEmail.subject}
                  </h4>
                  <div className="text-xs text-neutral-500 font-mono mt-1 flex items-center justify-between">
                    <span>From: Supabase Auth &lt;auth@supabase.io&gt;</span>
                    <span>To: {selectedEmail.recipient}</span>
                  </div>
                </div>

                {/* Rendered Template Body */}
                <div
                  className="prose prose-sm text-neutral-800"
                  dangerouslySetInnerHTML={{ __html: selectedEmail.htmlContent }}
                />

                {/* Interactive Action from Supabase Template */}
                {selectedEmail.type === 'confirm_signup' && selectedEmail.token && (
                  <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => {
                        if (onConfirmViaEmail && selectedEmail.token) {
                          onConfirmViaEmail(selectedEmail.token);
                          onClose();
                        }
                      }}
                      className="clay-btn-gold w-full sm:w-auto py-2.5 px-6 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Click to Confirm Account Now</span>
                    </button>
                    <span className="text-[11px] font-mono text-neutral-500">
                      Token: <strong className="text-black font-bold">{selectedEmail.token}</strong>
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-neutral-400 text-xs font-mono">
                Select an email from the left to read its contents.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-between border-t border-neutral-100 text-[11px] font-mono text-neutral-500">
          <span>Powered by Supabase Auth Templates Engine</span>
          <button
            onClick={onClose}
            className="text-neutral-600 hover:text-black font-semibold cursor-pointer"
          >
            Close Mailbox
          </button>
        </div>

      </div>
    </div>
  );
};
