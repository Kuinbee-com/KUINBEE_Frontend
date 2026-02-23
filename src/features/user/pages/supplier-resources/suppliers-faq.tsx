import { useEffect, useRef, useState } from "react";
import { HelpCircle, ChevronDown, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
    { id: 1, question: "Does Kuinbee take exclusivity rights to my data?", answer: "Absolutely not. You're granting Kuinbee the right to distribute your data under the terms you define, but you retain full intellectual property ownership. You can sell your data on other platforms simultaneously." },
    { id: 2, question: "How long does the manual review process take?", answer: "We aim to review all new dataset proposals within 12-24 hours. If change requests are made, revisions are prioritized and usually reviewed quickly." },
    { id: 3, question: "Can I update the actual dataset file after it is published?", answer: "Currently, Kuinbee supports static dataset deliveries. If your data changes, submit a new dataset proposal representing the new timeframe or version. You can use descriptive fields to indicate it's a point-in-time snapshot. Versioning support is on the roadmap." },
    { id: 4, question: "Who handles buyer disputes or refunds?", answer: "Because buyers agree to your explicit licensing terms and receive structural schema and samples upfront, refunds are strictly limited. Kuinbee mediates disputes solely based on whether the final delivered data matches the approved proposal's schema and sample perfectly." },
    { id: 5, question: "What currencies do you support?", answer: "We support Indian Rupee (INR), US Dollar (USD), Euro (EUR), and British Pound (GBP). You can set your pricing in any of these currencies, and we handle the conversion for international buyers." },
    { id: 6, question: "Is there a commission or fee?", answer: "Yes, Kuinbee takes a percentage of each transaction. The exact percentage depends on your supplier tier and agreement. We're transparent about all fees upfront—no hidden costs." },
];

export function SuppliersFAQ() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [openItems, setOpenItems] = useState<number[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const toggleItem = (id: number) => {
        setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    };

    return (
        <section
            ref={sectionRef}
            id="faq"
            className={`relative py-16 md:py-24 bg-slate-50 overflow-hidden transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
            <div className="mx-auto max-w-4xl px-6 relative z-10">
                {/* Section header */}
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] mb-6">
                        <HelpCircle className="h-4 w-4 text-white" />
                        <span className="text-sm font-medium text-white">Supplier FAQ</span>
                    </div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a2240] sm:text-4xl md:text-5xl">
                        Frequently Asked
                        <span className="block font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent mt-2">Questions</span>
                    </h2>
                </div>

                {/* FAQ Items — matching landing page style */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                            className="group"
                        >
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 overflow-hidden hover:shadow-xl transition-all duration-500 hover:border-blue-200">
                                <button
                                    onClick={() => toggleItem(faq.id)}
                                    className="w-full px-6 py-5 text-left flex items-center justify-between transition-all duration-300 hover:bg-blue-50/30"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1a2240] to-[#4e5a7e] flex items-center justify-center flex-shrink-0">
                                            <MessageCircle className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-[#1a2240] group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className="flex-shrink-0"
                                    >
                                        <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors duration-300" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {openItems.includes(faq.id) && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1, transition: { height: { duration: 0.4 }, opacity: { duration: 0.3, delay: 0.1 } } }}
                                            exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.3 }, opacity: { duration: 0.2 } } }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 pl-20">
                                                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-xl p-4 border-l-4 border-blue-500">
                                                    <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact support */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-16 p-8 bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] rounded-2xl"
                >
                    <h3 className="text-2xl font-semibold text-white mb-4">Still have questions?</h3>
                    <p className="text-blue-100 mb-6 max-w-md mx-auto">
                        Our supplier success team is here to help you get started.
                    </p>
                    <a
                        href="mailto:support@kuinbee.com"
                        className="inline-block bg-white text-[#1a2240] px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                        Contact Support
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
