import { useEffect, useRef, useState } from "react";
import { Users, TrendingUp, Lock, CheckCircle2, Eye, Zap } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export function SuppliersValue() {
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

    const pillars = [
        { icon: Users, title: "Curated Discovery", description: "Manual review means low-quality data doesn't clutter the marketplace. If it's here, buyers know it's valuable.", color: "text-blue-400", bgGlow: "from-blue-500/10" },
        { icon: TrendingUp, title: "No Hidden Negotiations", description: "You set a fixed price. Buyers either purchase at your stated terms or move on. No painful back-and-forth.", color: "text-emerald-400", bgGlow: "from-emerald-500/10" },
        { icon: Lock, title: "Strict Governance", description: "Column-level schemas, explicit licensing, and quality statements protect you from liability and prove data provenance.", color: "text-amber-400", bgGlow: "from-amber-500/10" },
        { icon: CheckCircle2, title: "Zero Bot Traffic", description: "Identity verification (PAN/business registration) for all. No bots, no fake buyers. Only verified humans.", color: "text-purple-400", bgGlow: "from-purple-500/10" },
        { icon: Eye, title: "Comprehensive Portfolios", description: "Go beyond file uploads. Document use cases, limitations, methodology, and samples. Sell the true value of your work.", color: "text-pink-400", bgGlow: "from-pink-500/10" },
        { icon: Zap, title: "Complete Autonomy", description: "You control visibility. Set datasets to Public, Private, or Unlisted. Unlist anytime. You're always in command.", color: "text-cyan-400", bgGlow: "from-cyan-500/10" },
    ];

    return (
        <section
            ref={sectionRef}
            className={`relative bg-white py-16 md:py-24 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
            <div className="mx-auto max-w-6xl px-6">
                {/* Section header */}
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-[#1a2240]/5 border border-[#1a2240]/10 mb-6">
                        <Users className="h-4 w-4 text-[#1a2240]" />
                        <span className="text-sm font-medium text-[#1a2240]">Why Kuinbee</span>
                    </div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a2240] sm:text-4xl md:text-5xl">
                        Why Suppliers Choose
                        <span className="block font-semibold mt-2">Kuinbee</span>
                    </h2>
                    <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Built specifically for data creators. No fake buyers. No negotiations. No compromise on your intellectual property.
                    </p>
                </div>

                {/* Pillars grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {pillars.map((pillar) => {
                        const Icon = pillar.icon;
                        return (
                            <div key={pillar.title} className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a2240] to-[#2a3454] mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#1a2240] mb-3">{pillar.title}</h3>
                                    <p className="text-sm leading-relaxed text-slate-600 flex-1">{pillar.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Comparison row */}
                <div className="mt-20 grid gap-6 md:grid-cols-2">
                    {[
                        { title: "Traditional Marketplaces", items: ["Low data quality", "Endless negotiations", "No visibility on usage", "Buyer anonymity"] },
                        { title: "On Kuinbee", items: ["Strictly reviewed", "Fixed pricing", "Full transparency", "Verified buyers only"] }
                    ].map((col, i) => (
                        <div key={i} className={cn(
                            "rounded-2xl border p-8",
                            i === 0
                                ? "border-slate-200 bg-slate-50"
                                : "border-blue-200 bg-gradient-to-br from-[#1a2240] to-[#2a3454] text-white"
                        )}>
                            <h3 className={cn("font-semibold mb-4 text-lg", i === 0 ? "text-slate-500" : "text-white")}>{col.title}</h3>
                            <ul className="space-y-3">
                                {col.items.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        {i === 0
                                            ? <span className="text-slate-400 mt-1">✕</span>
                                            : <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />}
                                        <span className={cn("text-sm", i === 0 ? "text-slate-500" : "text-white/90")}>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
