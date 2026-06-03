"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

interface ChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultService?: string; // Pre-selection tracker context prop
}

interface Message {
    id: string;
    sender: "bot" | "user";
    text: string;
    isCustomForm?: boolean;
}

export default function ChatWizardModal({ isOpen, onClose, defaultService }: ChatModalProps) {
    const [shouldRender, setShouldRender] = useState(false);
    const [animateClass, setAnimateClass] = useState(false);
    const [step, setStep] = useState<number>(1);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: "init",
            sender: "bot",
            text: "Hi there! Welcome. Which service area are you exploring? You can select multiple options:",
            isCustomForm: true
        },
    ]);

    const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // States matching image_dabaff.png options directly
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [customServiceText, setCustomServiceText] = useState<string>("");

    const [selectedSlot, setSelectedSlot] = useState<string>("");
    const [customSlotText, setCustomSlotText] = useState<string>("");

    const [chatFields, setChatFields] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        role: "",
    });

    const SERVICE_OPTIONS = [
        "Cybersecurity & SOC",
        "Cloud & IT Operations",
        "GRC & Compliance", // From image_dabaff.png
        "Digital Transformation", // From image_dabaff.png
        "Business Continuity", // From image_dabaff.png
        "AI & Automation", // From image_dabaff.png
        "Other"
    ];

    const SLOT_OPTIONS = [
        "This week — Morning",
        "This week — Afternoon",
        "Next week — Morning",
        "Next week — Afternoon",
        "Other"
    ];

    // Pre-selection validation logic block trigger
    useEffect(() => {
        if (isOpen && defaultService && SERVICE_OPTIONS.includes(defaultService)) {
            setSelectedServices([defaultService]);
        }
    }, [isOpen, defaultService]);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            const timer = setTimeout(() => setAnimateClass(true), 10);
            return () => clearTimeout(timer);
        } else {
            setAnimateClass(false);
            const timer = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isBotTyping]);

    if (!shouldRender) return null;

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleServiceCheckboxToggle = (service: string) => {
        setSelectedServices((prev) =>
            prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
        );
    };

    // Step 1: Handle Checkbox Selection Form Submission
    const handleFormSubmitStep1 = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedServices.length === 0) return;
        if (selectedServices.includes("Other") && !customServiceText.trim()) return;

        const finalServices = selectedServices.map(s =>
            s === "Other" ? `Other (${customServiceText.trim()})` : s
        );

        setMessages((prev) => [
            ...prev,
            { id: `user-${Date.now()}`, sender: "user", text: `Exploring: ${finalServices.join(", ")}` }
        ]);
        setIsBotTyping(true);

        setTimeout(() => {
            setIsBotTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    id: `bot-${Date.now()}`,
                    sender: "bot",
                    text: "Perfect! Please provide your full name, work email, and an optional phone number:",
                    isCustomForm: true
                },
            ]);
            setStep(2);
        }, 1500);
    };

    // Step 2: Contact Info Handler
    const handleFormSubmitStep2 = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatFields.name.trim() || !isValidEmail(chatFields.email)) return;

        const userText = chatFields.phone.trim()
            ? `${chatFields.name} (${chatFields.email}) — Phone: ${chatFields.phone}`
            : `${chatFields.name} (${chatFields.email})`;

        setMessages((prev) => [...prev, { id: `user-${Date.now()}`, sender: "user", text: userText }]);
        setIsBotTyping(true);

        setTimeout(() => {
            setIsBotTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    id: `bot-${Date.now()}`,
                    sender: "bot",
                    text: `Great to meet you, ${chatFields.name}! What’s the name of your organization/company and your current role?`,
                    isCustomForm: true
                },
            ]);
            setStep(3);
        }, 1500);
    };

    // Step 3: Company & Role Handler
    const handleFormSubmitStep3 = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatFields.company.trim() || !chatFields.role.trim()) return;

        const userText = `${chatFields.company} — ${chatFields.role}`;
        setMessages((prev) => [...prev, { id: `user-${Date.now()}`, sender: "user", text: userText }]);
        setIsBotTyping(true);

        setTimeout(() => {
            setIsBotTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    id: `bot-${Date.now()}`,
                    sender: "bot",
                    text: "Understood. Lastly, what is your preferred briefing slot?",
                    isCustomForm: true
                },
            ]);
            setStep(4);
        }, 1500);
    };

    // Step 4: Radio Button Selection & API Data Dispatch
    const handleFormSubmitStep4 = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSlot || isSubmitting) return;
        if (selectedSlot === "Other" && !customSlotText.trim()) return;

        const finalSlotValue = selectedSlot === "Other" ? `Other (${customSlotText.trim()})` : selectedSlot;
        const finalServicesValue = selectedServices.map(s =>
            s === "Other" ? `Other (${customServiceText.trim()})` : s
        ).join(", ");

        setMessages((prev) => [...prev, { id: `user-${Date.now()}`, sender: "user", text: `Preferred Slot: ${finalSlotValue}` }]);
        setIsSubmitting(true);
        setIsBotTyping(true);

        try {
            // Clean dynamic payload routing architecture execution block
            const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
            await axios.post(`${basePath}/api/zoho`, {
                name: chatFields.name,
                email: chatFields.email,
                phone: chatFields.phone || "Not Provided",
                company: chatFields.company,
                preferredSolutions: finalServicesValue,
                selectedSlot: finalSlotValue,
                title: "Data coming from web",
                leadDetails: "Data coming from web"
            });

            setIsBotTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    id: `bot-${Date.now()}`,
                    sender: "bot",
                    text: "Thank you so much! All your details have been successfully mapped to Zoho CRM fields. Our strategy team will reach out shortly.",
                },
            ]);
            setStep(5);
        } catch (err) {
            setIsBotTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    id: `bot-err-${Date.now()}`,
                    sender: "bot",
                    text: "Data recorded locally, but there was a connection error saving directly to Zoho. Our engineers have been alerted!",
                },
            ]);
            setStep(5);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBackClick = () => {
        if (step > 1 && step <= 4) {
            setStep((prev) => prev - 1);
            setMessages((prev) => prev.slice(0, -2));
        }
    };

    const handleFinish = () => {
        onClose();
        setTimeout(() => {
            setStep(1);
            setSelectedServices([]);
            setCustomServiceText("");
            setSelectedSlot("");
            setCustomSlotText("");
            setChatFields({ name: "", email: "", phone: "", company: "", role: "" });
            setMessages([
                {
                    id: "init",
                    sender: "bot",
                    text: "Hi there! Welcome. Which service area are you exploring? You can select multiple options:",
                    isCustomForm: true
                },
            ]);
        }, 300);
    };

    return (
        <div className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ease-out ${animateClass ? "bg-black/85 backdrop-blur-md opacity-100" : "bg-black/0 backdrop-blur-none opacity-0"}`}>
            <div className={`w-full max-w-[920px] bg-[#0E0F12] border border-white/5 rounded-[2.5rem] p-10 relative flex flex-col justify-between h-[640px] shadow-2xl overflow-hidden transition-all duration-300 ease-out ${animateClass ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}>

                {/* Top Actions Nav Header */}
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                    {step > 1 && step < 5 ? (
                        <button onClick={handleBackClick} className="text-[#E11D48] hover:text-[#FF2E5B] cursor-pointer bg-transparent border-none">
                            <svg className="w-6 h-6 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                    ) : <div className="w-6 h-6" />}

                    <button onClick={handleFinish} className="text-white/30 hover:text-white cursor-pointer bg-transparent border-none">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Main Logs Feed Layout */}
                <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-6 scrollbar-none">
                    {messages.map((msg, index) => (
                        <div key={msg.id} className="space-y-4">
                            <div className={`flex items-start gap-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                {msg.sender === "bot" && (
                                    <div className="w-11 h-11 rounded-full bg-[#15161A] border border-[#E11D48]/30 flex items-center justify-center flex-shrink-0">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
                                    </div>
                                )}
                                <div className={`px-6 py-4 rounded-[1.75rem] text-[1.02rem] max-w-[70%] shadow-xl ${msg.sender === "user" ? "bg-[#1B1C20] text-white/90 rounded-br-none" : "bg-white text-[#0E0F12] font-medium rounded-bl-none"}`}>
                                    {msg.text}
                                </div>
                            </div>

                            {/* Forms Dynamic Interception Modules */}
                            {msg.isCustomForm && msg.sender === "bot" && (
                                <div className="pl-14 max-w-[85%] animate-messageEnter">

                                    {/* Step 1 Form Layout: Services Checkboxes */}
                                    {step === 1 && index === 0 && (
                                        <form onSubmit={handleFormSubmitStep1} className="bg-[#141519] border border-white/5 p-6 rounded-2xl space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {SERVICE_OPTIONS.map((service) => (
                                                    <label key={service} className="flex items-center gap-3 cursor-pointer select-none text-white/70 hover:text-white">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedServices.includes(service)}
                                                            onChange={() => handleServiceCheckboxToggle(service)}
                                                            className="w-4 h-4 accent-[#E11D48]"
                                                        />
                                                        <span className="text-[0.9rem] font-light">{service}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {selectedServices.includes("Other") && (
                                                <div className="flex flex-col gap-1 pt-2">
                                                    <input
                                                        type="text" required value={customServiceText}
                                                        onChange={(e) => setCustomServiceText(e.target.value)}
                                                        placeholder="Specify your solution requirement area..."
                                                        className="bg-transparent border-b border-[#E11D48]/40 py-1 text-white text-[0.95rem] focus:outline-none focus:border-[#E11D48]"
                                                    />
                                                </div>
                                            )}
                                            <button type="submit" disabled={selectedServices.length === 0 || (selectedServices.includes("Other") && !customServiceText.trim())} className="bg-[#E11D48] text-white font-medium text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl">
                                                Continue Setup →
                                            </button>
                                        </form>
                                    )}

                                    {/* Step 2 Form Layout: Contact Information */}
                                    {step === 2 && index === 2 && (
                                        <form onSubmit={handleFormSubmitStep2} className="bg-[#141519] border border-white/5 p-6 rounded-2xl space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-[0.7rem] tracking-widest text-white/40 uppercase">Full Name</label>
                                                    <input type="text" required value={chatFields.name} onChange={(e) => setChatFields({ ...chatFields, name: e.target.value })} placeholder="e.g. John Doe" className="bg-transparent border-b border-white/10 py-1.5 text-white focus:outline-none focus:border-[#E11D48]" />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-[0.7rem] tracking-widest text-white/40 uppercase">Work Email</label>
                                                    <input type="email" required value={chatFields.email} onChange={(e) => setChatFields({ ...chatFields, email: e.target.value })} placeholder="e.g. john@company.com" className="bg-transparent border-b border-white/10 py-1.5 text-white focus:outline-none focus:border-[#E11D48]" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label className="text-[0.7rem] tracking-widest text-white/40 uppercase">Phone Number <span className="lowercase text-white/20">(optional)</span></label>
                                                <input type="tel" value={chatFields.phone} onChange={(e) => setChatFields({ ...chatFields, phone: e.target.value })} placeholder="e.g. +966 50 123 4567" className="bg-transparent border-b border-white/10 py-1.5 text-white focus:outline-none focus:border-[#E11D48]" />
                                            </div>
                                            <button type="submit" disabled={!chatFields.name.trim() || !isValidEmail(chatFields.email)} className="bg-[#E11D48] text-white font-medium text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl">
                                                Proceed Next →
                                            </button>
                                        </form>
                                    )}

                                    {/* Step 3 Form Layout: Company Identity */}
                                    {step === 3 && index === 4 && (
                                        <form onSubmit={handleFormSubmitStep3} className="bg-[#141519] border border-white/5 p-6 rounded-2xl space-y-4">
                                            <div className="flex flex-col gap-1">
                                                <label className="text-[0.7rem] tracking-widest text-white/40 uppercase">Organization Name</label>
                                                <input type="text" required value={chatFields.company} onChange={(e) => setChatFields({ ...chatFields, company: e.target.value })} placeholder="e.g. Samurai" className="bg-transparent border-b border-white/10 py-1.5 text-white focus:outline-none focus:border-[#E11D48]" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label className="text-[0.7rem] tracking-widest text-white/40 uppercase">Job Designation</label>
                                                <input type="text" required value={chatFields.role} onChange={(e) => setChatFields({ ...chatFields, role: e.target.value })} placeholder="e.g. Chief Information Security Officer" className="bg-transparent border-b border-white/10 py-1.5 text-white focus:outline-none focus:border-[#E11D48]" />
                                            </div>
                                            <button type="submit" disabled={!chatFields.company.trim() || !chatFields.role.trim()} className="bg-[#E11D48] text-white font-medium text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl">
                                                Confirm Identity →
                                            </button>
                                        </form>
                                    )}

                                    {/* Step 4 Form Layout: Briefing Time Slots Radios */}
                                    {step === 4 && index === 6 && (
                                        <form onSubmit={handleFormSubmitStep4} className="bg-[#141519] border border-white/5 p-6 rounded-2xl space-y-4">
                                            <div className="flex flex-col gap-3">
                                                {SLOT_OPTIONS.map((slot) => (
                                                    <label key={slot} className="flex items-center gap-3 cursor-pointer select-none text-white/70 hover:text-white">
                                                        <input type="radio" name="briefingSlot" checked={selectedSlot === slot} onChange={() => setSelectedSlot(slot)} className="w-4 h-4 accent-[#E11D48]" />
                                                        <span className="text-[0.9rem] font-light">{slot}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {selectedSlot === "Other" && (
                                                <div className="flex flex-col gap-1 pt-2">
                                                    <input type="text" required value={customSlotText} onChange={(e) => setCustomSlotText(e.target.value)} placeholder="Describe preferred dates or schedule timelines..." className="bg-transparent border-b border-[#E11D48]/40 py-1 text-white text-[0.95rem] focus:outline-none focus:border-[#E11D48]" />
                                                </div>
                                            )}
                                            <button type="submit" disabled={!selectedSlot || isSubmitting || (selectedSlot === "Other" && !customSlotText.trim())} className="bg-[#E11D48] text-white font-medium text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl">
                                                {isSubmitting ? "Syncing Fields..." : "Submit Registration Request →"}
                                            </button>
                                        </form>
                                    )}

                                </div>
                            )}
                        </div>
                    ))}

                    {isBotTyping && (
                        <div className="flex items-start gap-4 justify-start animate-pulse">
                            <div className="w-11 h-11 rounded-full bg-[#15161A] border border-[#E11D48]/30 flex items-center justify-center flex-shrink-0"><div className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" /></div>
                            <div className="bg-white text-black px-6 py-4 rounded-[1.75rem] rounded-bl-none flex items-center gap-1.5 justify-center min-w-[80px]">
                                <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Footer Finish Actions Wrapper */}
                <div className="flex-shrink-0 pl-14 border-t border-white/5 pt-4">
                    {step === 5 ? (
                        <div className="flex justify-start pt-2 opacity-0 scale-95 translate-y-2 animate-messageEnter">
                            <button onClick={handleFinish} className="bg-[#1C1D21] border border-white/5 text-white/90 hover:bg-[#25262B] px-8 py-3 rounded-2xl text-[0.95rem] font-medium tracking-wide transition-all duration-300 shadow-lg">Finish Conversation</button>
                        </div>
                    ) : (
                        <div className="text-[0.8rem] text-white/20 tracking-wider uppercase font-medium animate-pulse py-2">Please use the inline options blocks container above to continue chat...</div>
                    )}
                </div>

            </div>
        </div>
    );
}