import { useEffect, useRef, useState } from "react";
import { TrendingUp, Database, Lightbulb, Zap } from "lucide-react";

export function SuppliersBestPractices() {
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

    const practices = [
        { icon: Database, title: "The Perfect Sample File", description: "Don't just upload the first 100 rows. Upload a statistically representative sample, obfuscate sensitive fields while maintaining real data variance.", tip: "Buyers rely on samples to test ingestion pipelines before purchase" },
        { icon: Lightbulb, title: "Mastering the Schema", description: 'Never leave descriptions blank. Transform "age: int" into "user_age_band: int - Age bucketed into 5-year intervals to preserve entity anonymity."', tip: "Clear field documentation dramatically increases enterprise purchasing confidence" },
        { icon: TrendingUp, title: "Clear Methodologies", description: "Tell buyers HOW data was collected. Was it scraped, surveyed, or from IoT sensors? Include collection intervals like 'polled every 15 mins, batched daily at midnight UTC.'", tip: "Collection methodology details prove to enterprise buyers that your data is reliable" },
        { icon: Zap, title: "Freemium Marketing", description: "Use free pricing strategically. Offer a highly aggregated 1-month historical extract for free, linking to your premium real-time, granular dataset.", tip: "Many top suppliers use freemium to drive trial-to-paid conversions" },
    ];

    return (
        <section
            ref={sectionRef}
            className={`relative py-16 md:py-24 bg-white overflow-hidden transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
            <div className="relative mx-auto max-w-6xl px-6">
                {/* Section header */}
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-[#1a2240]/5 border border-[#1a2240]/10 mb-6">
                        <TrendingUp className="h-4 w-4 text-[#1a2240]" />
                        <span className="text-sm font-medium text-[#1a2240]">Best Practices</span>
                    </div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a2240] sm:text-4xl md:text-5xl">
                        Convert Views
                        <span className="block font-semibold mt-2">Into Sales</span>
                    </h2>
                    <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                        Approved datasets get discovered, but meticulously documented datasets get purchased. Here's how top suppliers optimize their listings for conversion.
                    </p>
                </div>

                {/* Practices grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {practices.map((practice) => {
                        const Icon = practice.icon;
                        return (
                            <div key={practice.title} className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="relative z-10 p-8 lg:p-10 h-full flex flex-col">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a2240] to-[#2a3454] mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#1a2240] mb-3">{practice.title}</h3>
                                    <p className="text-slate-600 mb-6 leading-relaxed flex-1">{practice.description}</p>
                                    <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                                        <p className="text-sm text-slate-700">
                                            <span className="font-semibold text-[#1a2240]">💡 Tip:</span> {practice.tip}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Metrics */}
                <div className="mt-20 grid gap-6 md:grid-cols-3">
                    {[
                        { metric: "3x", label: "Higher conversion with detailed schema" },
                        { metric: "85%", label: "Of top suppliers use freemium models" },
                        { metric: "92%", label: "Enterprise buyers trust clear methodology" }
                    ].map((item, i) => (
                        <div key={i} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#1a2240] to-[#2a3454] p-6 text-center shadow-xl">
                            <div className="text-3xl lg:text-4xl font-semibold text-white mb-2">{item.metric}</div>
                            <p className="text-sm text-blue-100">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
