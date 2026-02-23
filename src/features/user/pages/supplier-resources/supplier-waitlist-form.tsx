import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { CheckCircle2, Loader2 } from "lucide-react";

export function SupplierWaitlistForm() {
    const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");

    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes("@")) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        setState("submitting");
        setErrorMessage("");

        try {
            const response = await fetch('https://api.freewaitlists.com/waitlists/cmlz5pcrt01jd01p26jvtg0se', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    meta: {
                        name: name,
                        phone: phone,
                        source: 'supplier-resources-page'
                    }
                })
            });

            const result = await response.json();

            if (response.ok) {
                setState("success");
            } else {
                throw new Error(result.message || "Failed to join waitlist");
            }
        } catch (error: any) {
            setState("error");
            setErrorMessage(error.message || "Something went wrong. Please try again.");
        }
    };

    if (state === "success") {
        return (
            <div className="w-full max-w-xl mx-auto rounded-3xl bg-green-50/50 border border-green-100 p-8 sm:p-12 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-6">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h4 className="text-2xl font-semibold text-[#1a2240] mb-3">You're on the list!</h4>
                <p className="text-slate-600 text-lg">
                    Thank you for your interest in becoming a Kuinbee supplier. Our partnership team will review your details and contact you shortly.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto text-left space-y-4 bg-transparent p-0">
            <div className="space-y-1.5 mt-2">
                <label htmlFor="name" className="text-xs uppercase tracking-wider font-semibold text-slate-500 ml-1">Full Name <span className="text-slate-300 font-normal lowercase tracking-normal">(Optional)</span></label>
                <Input
                    id="name"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={state === "submitting"}
                    className="h-11 px-4 border-slate-200 focus-visible:ring-blue-500 rounded-xl bg-slate-50/80 text-base text-slate-800 placeholder:text-slate-400 transition-colors focus:bg-white"
                />
            </div>

            <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs uppercase tracking-wider font-semibold text-slate-500 ml-1">Email Address <span className="text-red-400">*</span></label>
                <Input
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={state === "submitting"}
                    required
                    className="h-11 px-4 border-slate-200 focus-visible:ring-blue-500 rounded-xl bg-slate-50/80 text-base text-slate-800 placeholder:text-slate-400 transition-colors focus:bg-white"
                />
            </div>

            <div className="space-y-1.5">
                <label htmlFor="phone" className="text-xs uppercase tracking-wider font-semibold text-slate-500 ml-1">Phone Number <span className="text-slate-300 font-normal lowercase tracking-normal">(Optional)</span></label>
                <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={state === "submitting"}
                    className="h-11 px-4 border-slate-200 focus-visible:ring-blue-500 rounded-xl bg-slate-50/80 text-base text-slate-800 placeholder:text-slate-400 transition-colors focus:bg-white"
                />
            </div>

            {state === "error" && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm">
                    <p className="text-red-600 font-medium text-center">{errorMessage}</p>
                </div>
            )}

            <div className="pt-4">
                <Button
                    type="submit"
                    disabled={state === "submitting"}
                    className="w-full h-11 bg-[#1a2240] text-white hover:bg-[#2a3454] hover:shadow-lg rounded-xl text-base font-semibold transition-all duration-300 cursor-pointer"
                >
                    {state === "submitting" ? (
                        <span className="flex items-center">
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing...
                        </span>
                    ) : "Submit Application"}
                </Button>
            </div>
            <p className="text-center text-xs text-slate-400 mt-4 max-w-sm mx-auto">
                By submitting this form, you agree to our Terms of Service and Privacy Policy.
            </p>
        </form>
    );
}
