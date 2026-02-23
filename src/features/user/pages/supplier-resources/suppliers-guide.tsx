import { useEffect, useRef, useState, useCallback } from "react";
import { CheckCircle2, FileText, BadgeCheck, DollarSign, Settings, Shield } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export function SuppliersGuide() {
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const filledLineRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const updateProgress = useCallback(() => {
        if (!timelineRef.current || !glowRef.current || !filledLineRef.current) return;
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const timelineTop = timelineRect.top;
        const timelineHeight = timelineRect.height;
        if (timelineHeight === 0) return;
        const nodes = timelineRef.current.querySelectorAll<HTMLElement>('[data-timeline-node]');
        if (nodes.length === 0) return;
        const nodePositions = Array.from(nodes).map(node => {
            const nodeRect = node.getBoundingClientRect();
            return nodeRect.top + nodeRect.height / 2 - timelineTop;
        });
        const triggerY = window.innerHeight * 0.4;
        const scrollY = triggerY - timelineTop;
        const firstNodeY = nodePositions[0];
        const lastNodeY = nodePositions[nodePositions.length - 1];
        const clampedY = Math.max(firstNodeY, Math.min(lastNodeY, scrollY));
        const topPx = `${clampedY}px`;
        glowRef.current.style.top = topPx;
        filledLineRef.current.style.height = topPx;
    }, []);

    useEffect(() => {
        const onScroll = () => {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(updateProgress);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        updateProgress();
        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(rafRef.current);
        };
    }, [updateProgress]);

    const steps = [
        { number: "01", icon: BadgeCheck, title: "Account Verification & KYC", description: "All suppliers verify identity via secure KYC. PAN for individuals, business registration for companies.", details: ["Self-service identity verification", "PAN or business registration required", "Profile becomes read-only after onboarding", "Changes require support ticket"], timeline: "1-2 hours" },
        { number: "02", icon: FileText, title: "Building Dataset Proposals", description: "Document your dataset comprehensively. Schema definitions, methodology, sample data, and licensing declarations required.", details: ["Detailed overview and methodology", "Column-level schema documentation", "Sample data upload (CSV, JSON, Parquet)", "Governance & licensing declaration"], timeline: "As fast as you" },
        { number: "03", icon: CheckCircle2, title: "The Quality Review", description: "Human review, not algorithms. Every proposal reviewed for structural, quality, and compliance standards.", details: ["12-24 hours typical turnaround", "Approval or change request feedback", "Locked during review for integrity", "Terminal rejection for policy violations"], timeline: "12-24 hours" },
        { number: "04", icon: DollarSign, title: "Pricing, Currencies & Revenue", description: "You set the price. Fixed pricing with no negotiation. Multiple currency support with transparent revenue.", details: ["INR, USD, EUR, GBP supported", "Fixed price or free access models", "Mini-approval on price changes", "No platform-determined pricing"], timeline: "Instant" },
        { number: "05", icon: Settings, title: "Managing Published Data", description: "Your operational hub. Control visibility, track sales, respond to feedback, and manage your portfolio.", details: ["Public, Unlisted, or Private visibility", "Supplier dashboard for tracking", "Archive (not delete) datasets", "Preserve transaction history"], timeline: "Ongoing" },
    ];

    return (
        <section
            ref={sectionRef}
            id="guide"
            className={`relative py-16 md:py-24 bg-slate-50 overflow-hidden transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
            <div className="relative mx-auto max-w-6xl px-6">
                {/* Section header */}
                <div className="mx-auto max-w-3xl text-center mb-20">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-[#1a2240]/5 border border-[#1a2240]/10 mb-6">
                        <BadgeCheck className="h-4 w-4 text-[#1a2240]" />
                        <span className="text-sm font-medium text-[#1a2240]">Supplier Journey</span>
                    </div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a2240] sm:text-4xl md:text-5xl">
                        Your Path to
                        <span className="block font-semibold mt-2">Revenue</span>
                    </h2>
                    <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Five straightforward steps from registration to published datasets. No hidden processes. Total transparency.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative" ref={timelineRef}>
                    {/* Center vertical line */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gradient-to-b from-[#1a2240]/20 via-[#1a2240]/15 to-[#1a2240]/10" />

                    {/* Scroll-tracking glow */}
                    <div
                        ref={glowRef}
                        className="hidden lg:block absolute left-1/2 -translate-x-1/2 pointer-events-none z-10"
                        style={{ top: '0%', willChange: 'top' }}
                    >
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: '20px', height: '20px', background: 'radial-gradient(circle, rgba(26,34,64,0.4) 0%, transparent 70%)' }} />
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-[#1a2240] shadow-[0_0_6px_2px_rgba(26,34,64,0.4)]" />
                    </div>

                    {/* Filled line */}
                    <div
                        ref={filledLineRef}
                        className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 w-px bg-[#1a2240]/50"
                        style={{ height: '0%', willChange: 'height' }}
                    />

                    <div className="space-y-12 lg:space-y-16">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <div key={step.number} className={cn("relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-start", !isEven && "lg:grid-flow-dense")}>
                                    {/* Center node */}
                                    <div data-timeline-node className="hidden lg:flex absolute left-1/2 top-6 -translate-x-1/2 z-20">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#1a2240]/20 bg-white shadow-lg">
                                            <span className="text-sm font-bold text-[#1a2240]">{step.number}</span>
                                        </div>
                                    </div>

                                    {/* Content card */}
                                    <div className={cn(!isEven && "lg:col-start-2")}>
                                        <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8 hover:shadow-xl transition-all duration-300">
                                            <div className="flex items-center gap-4 mb-4 lg:mb-6">
                                                <div className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full bg-[#1a2240] text-white">
                                                    <span className="text-sm font-bold">{step.number}</span>
                                                </div>
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a2240] to-[#2a3454] shadow">
                                                    <Icon className="h-5 w-5 text-white" />
                                                </div>
                                                <div className="flex-1 flex items-center justify-between">
                                                    <h3 className="text-xl font-semibold text-[#1a2240]">{step.title}</h3>
                                                    <span className="text-xs font-medium text-[#1a2240] bg-[#1a2240]/5 px-3 py-1 rounded-full flex-shrink-0 ml-2">
                                                        {step.timeline}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-slate-600 mb-6 leading-relaxed">{step.description}</p>
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                {step.details.map((detail) => (
                                                    <div key={detail} className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50">
                                                        <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                        <span className="text-sm text-slate-700">{detail}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Visual card on opposite side */}
                                    <div className={cn("hidden lg:block relative", !isEven && "lg:col-start-1 lg:row-start-1")}>
                                        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#1a2240] to-[#2a3454] p-8 overflow-hidden shadow-xl">
                                            <div className="relative space-y-4">
                                                {index === 0 && (
                                                    <>
                                                        <div className="rounded-lg border border-white/15 bg-white/10 p-4">
                                                            <div className="text-xs font-medium text-white/70 mb-3 uppercase tracking-wide">Identity Verification</div>
                                                            <div className="space-y-2">
                                                                {["PAN Card Verified", "Business Registration", "Address Confirmed"].map((item) => (
                                                                    <div key={item} className="flex items-center gap-2">
                                                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                                                        <span className="text-sm text-white/90">{item}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-4">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-2">
                                                                    <Shield className="h-4 w-4 text-emerald-400" />
                                                                    <span className="text-xs font-semibold text-emerald-300">Verified Supplier</span>
                                                                </div>
                                                                <span className="text-xs text-emerald-400/80">KYC Complete</span>
                                                            </div>
                                                        </div>
                                                        <div className="rounded-lg border border-white/15 bg-white/10 p-4">
                                                            <div className="text-xs font-medium text-white/70 mb-2 uppercase tracking-wide">Supplier Profile</div>
                                                            <div className="flex items-center gap-3">
                                                                <div className="h-8 w-8 rounded-full bg-white/15 flex items-center justify-center">
                                                                    <span className="text-xs font-bold text-white">JD</span>
                                                                </div>
                                                                <div>
                                                                    <div className="text-sm font-medium text-white/90">John Doe</div>
                                                                    <div className="text-xs text-white/50">john@datacompany.com</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                {index === 1 && (
                                                    <>
                                                        <div className="rounded-lg border border-white/15 bg-white/10 p-4">
                                                            <div className="text-xs font-medium text-white/70 mb-2 uppercase tracking-wide">Dataset Title</div>
                                                            <div className="text-sm font-medium text-white/90">Global Market Indicators Q4 2025</div>
                                                        </div>
                                                        {["Overview & Methodology", "Column Schema (24 fields)", "Sample Data (500 rows)", "License: Commercial Use"].map((field) => (
                                                            <div key={field} className="rounded-lg border border-white/15 bg-white/10 p-3 flex items-center justify-between">
                                                                <span className="text-xs font-medium text-white/70">{field}</span>
                                                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                                            </div>
                                                        ))}
                                                        <div className="rounded-lg border border-blue-400/30 bg-blue-500/10 p-3">
                                                            <div className="flex items-center gap-2">
                                                                <FileText className="h-3.5 w-3.5 text-blue-400" />
                                                                <span className="text-xs font-medium text-blue-300">Ready to Submit for Review</span>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                {index === 2 && (
                                                    <>
                                                        <div className="rounded-lg border border-white/15 bg-white/10 p-4">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <span className="text-xs font-medium text-white/70 uppercase tracking-wide">Review Status</span>
                                                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-500/15">
                                                                    <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                                                                    <span className="text-xs text-amber-300 font-semibold">In Review</span>
                                                                </div>
                                                            </div>
                                                            <div className="text-sm font-medium text-white/90">Global Market Indicators Q4 2025</div>
                                                            <div className="text-xs text-white/50 mt-1">Submitted 12 hours ago</div>
                                                        </div>
                                                        <div className="rounded-lg border border-white/15 bg-white/10 p-4">
                                                            <div className="text-xs font-medium text-white/70 mb-3 uppercase tracking-wide">Quality Checklist</div>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                {[{ label: "Schema Valid", done: true }, { label: "Samples Match", done: true }, { label: "Governance OK", done: true }, { label: "Final Review", done: false }].map((c) => (
                                                                    <div key={c.label} className="flex items-center gap-2">
                                                                        {c.done ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <div className="h-3.5 w-3.5 rounded-full border-2 border-amber-400" />}
                                                                        <span className={cn("text-xs", c.done ? "text-white/80" : "text-white/50")}>{c.label}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="rounded-lg border border-white/15 bg-white/10 p-3">
                                                            <div className="text-xs text-white/60">Estimated completion: <span className="text-white/90 font-medium">12-24 hours</span></div>
                                                        </div>
                                                    </>
                                                )}
                                                {index === 3 && (
                                                    <>
                                                        <div className="rounded-lg border border-white/15 bg-white/10 p-4">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <span className="text-xs font-medium text-white/70 uppercase tracking-wide">Your Price</span>
                                                                <span className="text-2xl font-bold text-white">$890</span>
                                                            </div>
                                                            <div className="text-xs text-white/60">One-time purchase · Fixed pricing</div>
                                                        </div>
                                                        <div className="rounded-lg border border-white/15 bg-white/10 p-4">
                                                            <div className="text-xs font-medium text-white/70 mb-3 uppercase tracking-wide">Supported Currencies</div>
                                                            <div className="grid grid-cols-4 gap-2">
                                                                {["INR", "USD", "EUR", "GBP"].map((cur) => (
                                                                    <div key={cur} className={cn("rounded-lg border p-2 text-center text-xs font-medium", cur === "USD" ? "border-white/30 bg-white/15 text-white" : "border-white/10 text-white/60")}>
                                                                        {cur}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-4">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs font-medium text-emerald-300">Revenue This Month</span>
                                                                <span className="text-lg font-bold text-emerald-300">$4,450</span>
                                                            </div>
                                                            <div className="text-xs text-emerald-400/70 mt-1">5 purchases · 3 unique buyers</div>
                                                        </div>
                                                    </>
                                                )}
                                                {index === 4 && (
                                                    <>
                                                        <div className="rounded-lg border border-white/15 bg-white/10 p-4">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <span className="text-xs font-medium text-white/70 uppercase tracking-wide">Dataset Status</span>
                                                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/15">
                                                                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                                                                    <span className="text-xs text-emerald-300 font-semibold">Public</span>
                                                                </div>
                                                            </div>
                                                            <div className="text-sm font-medium text-white/90">Global Market Indicators</div>
                                                            <div className="text-xs text-white/50 mt-1">Published Feb 15, 2026</div>
                                                        </div>
                                                        <div className="rounded-lg border border-white/15 bg-white/10 p-4">
                                                            <div className="text-xs font-medium text-white/70 mb-3 uppercase tracking-wide">Performance</div>
                                                            <div className="grid grid-cols-3 gap-3 text-center">
                                                                {[{ label: "Views", value: "1,240" }, { label: "Purchases", value: "12" }, { label: "Rating", value: "4.8★" }].map((stat) => (
                                                                    <div key={stat.label}>
                                                                        <div className="text-lg font-bold text-white">{stat.value}</div>
                                                                        <div className="text-xs text-white/50">{stat.label}</div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="rounded-lg border border-white/15 bg-white/10 p-3">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs text-white/60">Total Lifetime Revenue</span>
                                                                <span className="text-sm font-bold text-white">$10,680</span>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Important note */}
                <div className="mt-16">
                    <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] p-6 shadow-lg">
                        <p className="text-sm text-white">
                            <span className="font-semibold">Important:</span>{" "}
                            <span className="text-blue-100">Published datasets cannot be deleted—only archived. This preserves transaction history for any buyer who previously purchased access.</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
