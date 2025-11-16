import React, { useRef } from "react";
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
				backgroundImage: `url(${bg})`,
				backgroundSize: "cover",
				backgroundAttachment: "fixed",
				backgroundPosition: "center",
			}}
		>
			<div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
				{/* Landing / Hero */}
				<section className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-6 shadow-cosmic-card backdrop-blur">
					<div className="absolute inset-0 pointer-events-none">
						{/* glows dorés subtils */}
						<div
							className="absolute -left-20 -top-28 h-64 w-64 rounded-full"
							style={{ background: "radial-gradient(circle at center, rgba(255,215,0,0.12), transparent 60%)" }}
						/>
						<div
							className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full"
							style={{ background: "radial-gradient(circle at center, rgba(212,175,55,0.10), transparent 60%)" }}
						/>
					</div>

					<div className="grid items-start gap-10 lg:grid-cols-2">
						{/* Texte de positionnement */}
						<div>
							<h1 className="text-4xl font-heading font-bold tracking-wide text-perception-gold sm:text-5xl">
								Programme PERCEPTION
							</h1>

							<div className="mt-4 space-y-4 text-white/90">
								<p className="text-lg font-semibold text-perception-soft-yellow/95">
									⚡ Depuis 10 ans, j'observe une dérive.
								</p>
								<p>
									Le développement personnel est devenu une industrie de solutions rapides :
								</p>
								<ul className="ml-4 list-disc space-y-1 text-white/85">
									<li>"7 jours pour changer ta vie"</li>
									<li>"Les 3 secrets des millionnaires"</li>
									<li>"Comment avoir confiance en 5 étapes"</li>
								</ul>

								<p className="mt-4 text-white/90">Le problème ?</p>
								<ul className="ml-4 list-disc space-y-1 text-white/85">
									<li>Ces approches construisent des façades, pas des fondations.</li>
									<li>Elles donnent des techniques, pas une architecture interne.</li>
									<li>Elles copient des modèles occidentaux, sans ancrage dans nos valeurs.</li>
									<li>Elles créent de la dépendance au coach, pas de la souveraineté.</li>
								</ul>

								<p className="mt-4 text-white/90">
									<span className="font-semibold text-perception-gold">Perception</span> est l'antithèse de cette industrie.
								</p>
							</div>

							<div className="mt-6">
								<Button
									onClick={onApplyClick}
									className="bg-perception-gold text-black hover:bg-[#e6c200]"
								>
									Postuler maintenant
								</Button>
							</div>
						</div>

						{/* Placeholder vidéo */}
						<div className="relative">
							<AspectRatio ratio={16 / 9}>
								<div className="flex h-full w-full items-center justify-center rounded-xl border border-white/10 bg-black/50 backdrop-blur">
									{/* Remplace par ton iframe YouTube/Vimeo si dispo */}
									{/* 
									<iframe
										className="h-full w-full rounded-xl"
										src="https://www.youtube.com/embed/xxxx"
										title="Présentation PERCEPTION"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										allowFullScreen
									/> 
									*/}
									<div className="text-center">
										<div className="text-6xl font-heading text-perception-gold">∞</div>
										<p className="mt-2 text-sm text-white/80">Vidéo de présentation</p>
										<p className="text-xs text-white/60">Place ton iframe ici</p>
									</div>
								</div>
							</AspectRatio>
						</div>
					</div>
				</section>

				{/* Section formulaire */}
				<div ref={formRef} className="mt-12">
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

