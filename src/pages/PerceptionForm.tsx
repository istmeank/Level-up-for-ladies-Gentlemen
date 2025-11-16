import React, { useRef } from "react";
import CosmicBackground from "@/components/perception/CosmicBackground";
import PerceptionHeader from "@/components/perception/PerceptionHeader";
import MultiStepForm from "@/components/perception/MultiStepForm";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import bg from "@/assets/level-up-background.svg";

const PerceptionForm: React.FC = () => {
	const formRef = useRef<HTMLDivElement | null>(null);

	const onApplyClick = () => {
		formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<div
			className="min-h-[100svh] px-0 sm:px-0"
			style={{
				backgroundImage: `linear-gradient(135deg, rgba(22,33,62,0.85) 0%, rgba(26,11,46,0.88) 50%, rgba(15,52,96,0.85) 100%), url(${bg})`,
				backgroundSize: "cover",
				backgroundAttachment: "fixed",
				backgroundPosition: "center",
			}}
		>
			<div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
				{/* Landing / Hero */}
				<section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-cosmic-card backdrop-blur">
					<div className="absolute inset-0 pointer-events-none">
						{/* subtle gold glow overlay */}
						<div className="absolute -left-20 -top-28 h-64 w-64 rounded-full"
							style={{ background: "radial-gradient(circle at center, rgba(255,215,0,0.18), transparent 60%)" }}
						/>
						<div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full"
							style={{ background: "radial-gradient(circle at center, rgba(212,175,55,0.15), transparent 60%)" }}
						/>
					</div>
					<div className="grid items-center gap-8 lg:grid-cols-2">
						<div>
							<h1 className="text-4xl font-heading font-bold tracking-wide text-perception-gold sm:text-5xl">
								Programme PERCEPTION
							</h1>
							<p className="mt-3 max-w-prose text-white/85">
								Un accompagnement profond pour aligner identité, valeurs et actions.
								Découvre l’essence du programme dans cette vidéo de présentation, puis dépose ta candidature.
							</p>
							<div className="mt-6">
								<Button
									onClick={onApplyClick}
									className="bg-perception-gold text-black hover:bg-[#e6c200]"
								>
									Postuler maintenant
								</Button>
							</div>
						</div>
						<div className="relative">
							<AspectRatio ratio={16 / 9}>
								<div className="flex h-full w-full items-center justify-center rounded-xl border border-white/10 bg-black/40 backdrop-blur">
									{/* Placeholder vidéo: remplace le contenu par un iframe YouTube/Vimeo si dispo */}
									<div className="text-center">
										<div className="text-6xl font-heading text-perception-gold">∞</div>
										<p className="mt-2 text-sm text-white/70">Espace vidéo de présentation</p>
										<p className="text-xs text-white/50">Intègre ton iframe ici</p>
									</div>
								</div>
							</AspectRatio>
						</div>
					</div>
				</section>

				{/* Formulaire */}
				<div ref={formRef} className="mt-10">
					<PerceptionHeader />
					<div className="mt-6">
						<MultiStepForm />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PerceptionForm;


