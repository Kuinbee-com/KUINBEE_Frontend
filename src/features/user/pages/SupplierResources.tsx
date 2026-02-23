import * as React from 'react';
import ResponsiveHeader from "@/features/user/components/ResponsiveHeader";
import Footer from "@/features/user/pages/landing/footer";

import { SuppliersHero } from "./supplier-resources/suppliers-hero";
import { SuppliersValue } from "./supplier-resources/suppliers-value";
import { SuppliersGuide } from "./supplier-resources/suppliers-guide";
import { SuppliersBestPractices } from "./supplier-resources/suppliers-best-practices";
import { SuppliersFAQ } from "./supplier-resources/suppliers-faq";
import { SuppliersCTA } from "./supplier-resources/suppliers-cta";

const SupplierResources: React.FC = () => {
    return (
        <main className="min-h-screen bg-white">
            {/* Header + Hero share the same dark gradient so they blend */}
            <div className="bg-gradient-to-br from-[#1a2240] via-[#1a2240] to-[#2a3454]">
                <ResponsiveHeader theme="hero" />
                <SuppliersHero />
            </div>
            <SuppliersValue />
            <SuppliersGuide />
            <SuppliersBestPractices />
            <SuppliersFAQ />
            <SuppliersCTA />
            <Footer />
        </main>
    );
};

export default SupplierResources;
