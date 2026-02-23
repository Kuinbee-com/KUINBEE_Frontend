import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { ArrowRight, Lock, TrendingUp, Zap } from "lucide-react";
import { SupplierWaitlistForm } from "./supplier-waitlist-form";

export function SuppliersCTA() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const benefits = [
        { icon: Lock, text: "Full IP Protection" },
        { icon: TrendingUp, text: "Zero Negotiation" },
        { icon: Zap, text: "Complete Control" },
    ];

    return (
        <section
            id="apply"
            ref={sectionRef}
            className={`relative overflow-hidden py-16 md:py-24 transition-opacity duration-1000 bg-slate-50 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
            <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
                {/* Elevated Card Container */}
                <div className="relative rounded-[2rem] border border-slate-200 bg-white p-8 md:p-16 shadow-2xl shadow-slate-200/50 overflow-hidden text-center">

                    {/* Subtle radial glow inside card */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] blur-3xl opacity-40"
                            style={{ background: 'radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, transparent 70%)' }}
                        />
                    </div>

                    <div className="relative z-10 mx-auto w-full">

                        {/* Moved Header */}
                        <div className="text-center mb-10">
                            <h3 className="text-3xl font-bold tracking-tight text-[#1a2240] mb-3">Apply to Supply</h3>
                            <p className="text-slate-500 text-base">Submit your details to join the priority waitlist.</p>
                        </div>

                        {/* Benefits row */}
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10">
                            {benefits.map((benefit) => {
                                const Icon = benefit.icon;
                                return (
                                    <div key={benefit.text} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-colors hover:bg-slate-50">
                                        <Icon className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                                        <span className="text-xs md:text-sm font-medium text-[#1a2240] text-center block">{benefit.text}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Try to center the form cleanly */}
                        <div className="mt-8 mb-12">
                            <SupplierWaitlistForm />
                        </div>

                        {/* Trust stats */}
                        <div className="mt-12 inline-flex flex-col md:flex-row gap-6 text-sm text-slate-600">
                            {[
                                { value: "99.99%", label: "Platform Uptime" },
                                { value: "24/7", label: "Dedicated Support" },
                                { value: "< 2hr", label: "Avg. Response Time" },
                            ].map((stat) => (
                                <div key={stat.label} className="flex items-center gap-2 justify-center">
                                    <span className="text-lg font-semibold text-[#1a2240]">{stat.value}</span>
                                    <span>{stat.label}</span>
                                </div>
                            ))}
                        </div>

                        <p className="mt-8 text-sm text-slate-400">
                            Identity verification required. Access subject to compliance review.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
