import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Leaf, Send, GitBranch, Check, RotateCcw, Sparkles, ChevronDown,
} from 'lucide-react';

const BRANCHES = [
    { id: 'main', label: 'main', desc: 'Stable production branch', dot: 'bg-emerald-500' },
    { id: 'develop', label: 'develop', desc: 'Active development', dot: 'bg-teal-500' },
    { id: 'staging', label: 'staging', desc: 'Pre-release testing', dot: 'bg-lime-500' },
    { id: 'feature', label: 'feature/ui', desc: 'New interface work', dot: 'bg-green-600' },
    { id: 'hotfix', label: 'hotfix', desc: 'Urgent patches', dot: 'bg-emerald-700' },
];

const HomePage = () => {
    const [text, setText] = useState('');
    const [branch, setBranch] = useState(BRANCHES[0]);
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(null);
    const [sending, setSending] = useState(false);
    const dropRef = useRef(null);

    useEffect(() => {
        const onClick = (e) => {
            if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, []);

    const canSend = text.trim().length > 0 && !sending;

    const handleSend = async () => {
        if (!canSend) return;
        setSending(true);
        setSubmitted(null);

        /* tries to send the inut text from textbox to Flask via route:
        localhost:5000/api/entries */
        try {
            const response = await fetch('http://localhost:5000/api/entries', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    text: text,
                    branch_val: branch
                })
            });

            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }

            const sent_data = {branch: branch.label, chars: text.trim().length, time: new Date().toLocaleTimeString(), text: text}
            setSubmitted(sent_data);
        }

        catch (error) {
            console.error(error);
        } finally {
            setSending(false);
        }
    };

    const reset = () => {
        setSubmitted(null);
        setText('');
    };

    return (
        <div className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-b from-[#eefaf0] via-[#f2fbf3] to-[#e6f6ea] text-emerald-950">
            {/* ambient blobs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="animate-blob absolute -left-24 -top-24 h-96 w-96 rounded-full bg-emerald-300/40 blur-3xl" />
                <div className="animate-blob absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-teal-300/30 blur-3xl" style={{ animationDelay: '5s' }} />
                <div className="animate-blob absolute left-1/2 top-1/3 h-72 w-72 rounded-full bg-lime-300/30 blur-3xl" style={{ animationDelay: '9s' }} />
            </div>

            <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-3xl flex-col px-5 py-8 sm:px-8 sm:py-14">
                {/* header */}
                <header className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
                            <Leaf className="h-5 w-5" strokeWidth={2.2} />
                        </div>
                        <span className="font-display text-lg font-700 font-bold tracking-tight text-emerald-900">
                            Grove
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-emerald-700 backdrop-blur">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Connected
                    </div>
                </header>

                {/* hero */}
                <div className="mt-12 sm:mt-16">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/60 px-3 py-1 text-xs font-medium text-emerald-700 backdrop-blur">
                        <Sparkles className="h-3.5 w-3.5" />
                        Compose &amp; dispatch
                    </div>
                    <h1 className="font-display mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-emerald-950 sm:text-5xl">
                        Write it. Pick a branch.{' '}
                        <span className="relative whitespace-nowrap text-emerald-600">
                            Send it.
                            <svg className="absolute -bottom-1 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                                <path d="M2 7 Q 60 2 100 5 T 198 4" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" className="text-emerald-400" />
                            </svg>
                        </span>
                    </h1>
                    <p className="mt-4 max-w-md text-emerald-700/80">
                        Your personal assistant to organize your life, one branch at a time.
                    </p>
                </div>

                {/* composer card */}
                <div className="mt-8 rounded-3xl border border-emerald-200/70 bg-white/80 p-4 shadow-xl shadow-emerald-900/5 backdrop-blur-md sm:p-5">
                    {/* branch selector */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <label className="text-sm font-semibold text-emerald-800">Your message</label>
                        <div ref={dropRef} className="relative">
                            <button
                                type="button"
                                onClick={() => setOpen((o) => !o)}
                                className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100 active:scale-[0.98]"
                            >
                                <GitBranch className="h-4 w-4 text-emerald-600" />
                                <span className={`h-2 w-2 rounded-full ${branch.dot}`} />
                                {branch.label}
                                <ChevronDown className={`h-4 w-4 text-emerald-500 transition ${open ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {open && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                                        transition={{ duration: 0.16, ease: 'easeOut' }}
                                        className="absolute right-0 z-20 mt-2 w-64 overflow-hidden rounded-2xl border border-emerald-200 bg-white p-1.5 shadow-2xl shadow-emerald-900/10"
                                    >
                                        {BRANCHES.map((b) => (
                                            <button
                                                key={b.id}
                                                onClick={() => { setBranch(b); setOpen(false); }}
                                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-emerald-50 ${branch.id === b.id ? 'bg-emerald-50' : ''}`}
                                            >
                                                <span className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${b.dot}`} />
                                                <span className="flex-1">
                                                    <span className="block text-sm font-semibold text-emerald-900">{b.label}</span>
                                                    <span className="block text-xs text-emerald-600/80">{b.desc}</span>
                                                </span>
                                                {branch.id === b.id && <Check className="h-4 w-4 text-emerald-600" />}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type your input here..."
                        rows={7}
                        className="mt-3 w-full resize-none rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 text-emerald-900 placeholder:text-emerald-500/60 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-200/60"
                    />

                    <div className="mt-3 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-xs font-medium text-emerald-600/80">
                            {text.trim().length} characters · targeting{' '}
                            <span className="font-semibold text-emerald-800">{branch.label}</span>
                        </span>
                        <button
                            onClick={handleSend}
                            disabled={!canSend}
                            className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition hover:shadow-emerald-600/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                        >
                            {sending ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                    Sending
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    Send
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* feedback */}
                <AnimatePresence>
                    {submitted && (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="mt-5 overflow-hidden rounded-3xl border border-emerald-300/70 bg-gradient-to-br from-white to-emerald-50 p-5 shadow-xl shadow-emerald-900/5"
                        >
                            <div className="flex items-start gap-3">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 15 }}
                                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white"
                                >
                                    <Check className="h-5 w-5" strokeWidth={3} />
                                </motion.div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-3">
                                        <h3 className="font-display font-bold text-emerald-900">Message dispatched</h3>
                                        <button
                                        
                                            onClick={reset}
                                            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-100"
                                        >
                                            <RotateCcw className="h-3.5 w-3.5" />
                                            New
                                        </button>
                                    </div>
                                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-emerald-700">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 font-semibold">
                                            <GitBranch className="h-3 w-3" />
                                            {submitted.branch}
                                        </span>
                                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-semibold">{submitted.chars} chars</span>
                                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-semibold">{submitted.time}</span>
                                    </div>
                                    <p className="mt-3 whitespace-pre-wrap break-words rounded-2xl border border-emerald-200 bg-white/70 p-3 text-sm text-emerald-900">
                                        {submitted.text}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <footer className="mt-auto pt-10 text-center text-xs text-emerald-600/70">
                    Grove · {new Date().getFullYear()} · Clean input, delivered.
                </footer>
            </div>
        </div>
    );
};

export default HomePage;
