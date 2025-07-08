import { FadeInUp } from "@/components/custom/ScrollAnimation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Disclaimer - MetaDawgs",
    description:
        "Important disclaimers and legal information for MetaDawgs platform users.",
};

function DisclaimerPage() {
    return (
        <div className="bg-black text-white min-h-screen">
            <div className="max-w-4xl mx-auto p-6 md:p-10 py-20">
                <FadeInUp>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[#9D4EDD] hover:text-[#9D4EDD]/80 mb-8 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>
                </FadeInUp>

                <FadeInUp>
                    <h1 className="title md:text-6xl text-4xl font-fredoka font-bold tracking-wider mb-8">
                        Disclaimer
                    </h1>
                </FadeInUp>

                <div className="space-y-8 text-lg leading-relaxed">
                    <FadeInUp>
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#FFC36C]">
                                Important Notice
                            </h2>
                            <p className="text-[#ACACAC]">
                                Please read this disclaimer carefully before
                                using the MetaDawgs platform. By accessing or
                                using our services, you acknowledge that you
                                have read, understood, and agree to be bound by
                                the terms outlined below.
                            </p>
                        </section>
                    </FadeInUp>

                    <FadeInUp>
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#FFC36C]">
                                No Access to Social Media Accounts
                            </h2>
                            <p className="text-[#ACACAC]">
                                MetaDawgs does not have access to your Twitter
                                account, Telegram account, or any other social
                                media platforms. We do not store your social
                                media credentials, passwords, or personal
                                information from these platforms. Any social
                                media interactions are handled through official
                                APIs and authentication protocols that protect
                                your privacy and security.
                            </p>
                        </section>
                    </FadeInUp>

                    <FadeInUp>
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#FFC36C]">
                                Not a Get-Rich-Quick Scheme
                            </h2>
                            <p className="text-[#ACACAC]">
                                MetaDawgs is not a get-rich-quick scheme or
                                investment opportunity. The platform is designed
                                for community engagement, quest completion, and
                                participation in the Solana ecosystem. Any
                                tokens, rewards, or benefits earned through the
                                platform should not be considered as guaranteed
                                returns or investment profits.
                            </p>
                        </section>
                    </FadeInUp>

                    <FadeInUp>
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#FFC36C]">
                                Financial Risk Warning
                            </h2>
                            <p className="text-[#ACACAC]">
                                Cryptocurrency and blockchain technologies
                                involve significant financial risks. The value
                                of MetaDawgs tokens and other digital assets can
                                be extremely volatile and may result in
                                substantial losses. Never invest more than you
                                can afford to lose. Past performance does not
                                guarantee future results.
                            </p>
                        </section>
                    </FadeInUp>

                    <FadeInUp>
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#FFC36C]">
                                Platform Services
                            </h2>
                            <p className="text-[#ACACAC] mb-4">
                                MetaDawgs provides various services including
                                but not limited to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-[#ACACAC] ml-4">
                                <li>Quest completion and reward systems</li>
                                <li>Token staking and pool participation</li>
                                <li>DawgBot trading and analysis tools</li>
                                <li>Community engagement features</li>
                                <li>Airdrop participation opportunities</li>
                                <li>Trading capabilities</li>
                            </ul>
                        </section>
                    </FadeInUp>

                    <FadeInUp>
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#FFC36C]">
                                No Financial Advice
                            </h2>
                            <p className="text-[#ACACAC]">
                                Nothing on the MetaDawgs platform constitutes
                                financial, investment, trading, or other
                                professional advice. All content is provided for
                                informational and entertainment purposes only.
                                You should consult with qualified professionals
                                before making any financial decisions.
                            </p>
                        </section>
                    </FadeInUp>

                    <FadeInUp>
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#FFC36C]">
                                Smart Contract Risks
                            </h2>
                            <p className="text-[#ACACAC]">
                                While MetaDawgs incorporates audited smart
                                contracts and employs best practices for
                                security, blockchain technology and smart
                                contracts carry inherent risks including but not
                                limited to bugs, vulnerabilities, and potential
                                exploits. Users participate at their own risk.
                            </p>
                        </section>
                    </FadeInUp>

                    <FadeInUp>
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#FFC36C]">
                                Regulatory Compliance
                            </h2>
                            <p className="text-[#ACACAC]">
                                Users are responsible for ensuring their
                                participation in MetaDawgs complies with
                                applicable laws and regulations in their
                                jurisdiction. MetaDawgs does not provide legal
                                advice regarding regulatory compliance.
                            </p>
                        </section>
                    </FadeInUp>

                    <FadeInUp>
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#FFC36C]">
                                Platform Availability
                            </h2>
                            <p className="text-[#ACACAC]">
                                MetaDawgs services are provided &quot;as
                                is&quot; without warranties of any kind. We do
                                not guarantee continuous, uninterrupted access
                                to the platform. Services may be modified,
                                suspended, or discontinued at any time without
                                notice.
                            </p>
                        </section>
                    </FadeInUp>

                    <FadeInUp>
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#FFC36C]">
                                Community Participation
                            </h2>
                            <p className="text-[#ACACAC]">
                                MetaDawgs is a community-driven platform. Users
                                are expected to participate respectfully and in
                                accordance with community guidelines. The
                                platform reserves the right to moderate content
                                and restrict access for violations of community
                                standards.
                            </p>
                        </section>
                    </FadeInUp>

                    <FadeInUp>
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#FFC36C]">
                                Contact Information
                            </h2>
                            <p className="text-[#ACACAC]">
                                For questions about this disclaimer or the
                                MetaDawgs platform, please contact us through
                                our official social media channels or community
                                forums. Always verify official communications
                                through our verified social media accounts.
                            </p>
                        </section>
                    </FadeInUp>

                    <FadeInUp>
                        <div className="border-t border-gray-700 pt-8 mt-12">
                            <p className="text-sm text-[#ACACAC] text-center">
                                Last updated: {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    </FadeInUp>
                </div>
            </div>
        </div>
    );
}

export default DisclaimerPage;
