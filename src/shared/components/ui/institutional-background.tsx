/**
 * InstitutionalBackground
 * Reusable background layer with subtle dot pattern and gradient,
 * matching the landing-page hero aesthetic.
 */
export function InstitutionalBackground() {
    return (
        <div className="pointer-events-none absolute inset-0">
            {/* Gradient base */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background dark:from-[#0a0f1e] dark:via-[#0f1729] dark:to-[#0a0f1e]" />
            {/* Dot pattern (light mode) */}
            <div
                className="absolute inset-0 dark:hidden"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(26, 34, 64, 0.04) 1px, transparent 0)`,
                    backgroundSize: "32px 32px",
                }}
            />
            {/* Subtle radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(26,34,64,0.04),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.03),transparent_60%)]" />
        </div>
    );
}
