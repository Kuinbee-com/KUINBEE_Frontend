import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";

export function SuppliersHero() {
    return (
        <section className="relative pt-16 pb-20 overflow-hidden">
            {/* Radial glow effects */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[900px] blur-3xl opacity-30"
                    style={{
                        background: 'radial-gradient(circle, rgba(147, 197, 253, 0.3) 0%, rgba(191, 219, 254, 0.15) 35%, transparent 65%)'
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 z-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                            <TrendingUp className="h-4 w-4 text-white" />
                            <span className="text-sm font-medium text-white">
                                For Data Suppliers
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.15] tracking-tight text-white">
                            Turn Data Into
                            <br />
                            <span className="bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text text-transparent">Recurring Revenue</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg leading-relaxed text-white/80 max-w-xl">
                            Publish verified datasets to a governed marketplace. No negotiations, no samples, no friction. Just transparent pricing and institutional buyers ready to purchase.
                        </p>

                        {/* CTAs */}
                        <div className="pt-4 flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="bg-white text-[#1a2240] hover:bg-white/90 px-8 font-semibold rounded-xl shadow-lg"
                                asChild
                            >
                                <a href="#apply">
                                    Be a Supplier
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm rounded-xl"
                                asChild
                            >
                                <Link to="/marketplace">Explore Beta Marketplace</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right: Dashboard Screenshot */}
                    <div className="relative hidden lg:block">
                        <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                            <img
                                src="/supplier-panel-dashboard.png"
                                alt="Kuinbee Supplier Panel Dashboard"
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="absolute -inset-4 rounded-3xl bg-blue-400/5 blur-3xl -z-10" />
                    </div>
                </div>

                {/* Stats bar */}
                <div className="mt-16 grid grid-cols-3 gap-4 p-6 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm">
                    {[
                        { num: "12-24 Hours", text: "Average Time to Approval" },
                        { num: "100%", text: "Control Over Pricing" },
                        { num: "24/7", text: "Buyer Access to Your Data" },
                    ].map((item, i) => (
                        <div key={i} className="text-center py-4 px-2 border-r border-white/15 last:border-r-0">
                            <div className="text-2xl lg:text-3xl font-semibold text-white">{item.num}</div>
                            <p className="text-xs lg:text-sm text-white/60 mt-2">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
