import React, { useRef } from "react";
import PerceptionHeader from "@/components/perception/PerceptionHeader";
import MultiStepForm from "@/components/perception/MultiStepForm";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import bg from "@/assets/level-up-background.svg";
import { motion } from "framer-motion";

const PerceptionForm: React.FC = () => {
	const formRef = useRef<HTMLDivElement | null>(null);
	const videoRef = useRef<HTMLDivElement | null>(null);

	const onApplyClick = () => {
		videoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
	};

	return (
		<div
			className="min-h-[100svh]"
			style={{
				backgroundImage: `url(${bg})`,
				backgroundSize: "cover",
				backgroundAttachment: "fixed",
				backgroundPosition: "center",
			}}
		>
			<div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
				{/* Hero Section */}
			<motion.section 
				id="programme"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black/40 via-black/30 to-black/40 p-8 md:p-12 shadow-cosmic-card backdrop-blur-md mb-16"
			>
					<div className="absolute inset-0 pointer-events-none">
						<div
							className="absolute -left-32 -top-32 h-96 w-96 rounded-full"
							style={{ background: "radial-gradient(circle at center, rgba(255,215,0,0.15), transparent 70%)" }}
						/>
						<div
							className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full"
							style={{ background: "radial-gradient(circle at center, rgba(212,175,55,0.12), transparent 70%)" }}
						/>
					</div>

					<div className="relative z-10 max-w-4xl mx-auto text-center mb-12">
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.2, duration: 0.5 }}
							className="mb-6"
						>
							<span className="text-7xl font-heading text-perception-gold drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]">∞</span>
						</motion.div>

						<h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-wide text-perception-gold mb-6">
							Programme PERCEPTION
						</h1>
						
						<p className="text-xl md:text-2xl text-perception-soft-yellow/95 mb-4 font-semibold">
							L'Architecture Identitaire par les Valeurs™
						</p>

						<div className="w-24 h-1 bg-gradient-to-r from-transparent via-perception-gold to-transparent mx-auto mb-8"></div>
					</div>

				{/* Vidéo centrée */}
				<div ref={videoRef} id="video" className="relative z-10 max-w-4xl mx-auto mb-12">
						<AspectRatio ratio={16 / 9}>
							<div className="flex h-full w-full items-center justify-center rounded-2xl border-2 border-perception-gold/30 bg-black/60 backdrop-blur-md shadow-[0_0_50px_rgba(255,215,0,0.2)] overflow-hidden group hover:border-perception-gold/60 transition-all duration-300">
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
								<div className="text-center py-12">
									<motion.div 
										animate={{ rotate: 360 }}
										transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
										className="text-8xl font-heading text-perception-gold mb-4"
									>
										∞
									</motion.div>
									<p className="text-lg text-white/90 mb-2 font-medium">Vidéo de présentation</p>
									<p className="text-sm text-white/60">Découvrez le programme PERCEPTION</p>
								</div>
							</div>
						</AspectRatio>
					</div>

					{/* Texte de positionnement */}
					<div className="relative z-10 max-w-4xl mx-auto">
						<div className="grid md:grid-cols-2 gap-8 mb-10">
							<motion.div 
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.4 }}
								className="space-y-4 text-white/90"
							>
								<p className="text-lg font-semibold text-perception-soft-yellow/95 flex items-start">
									<span className="text-2xl mr-2">⚡</span>
									<span>Depuis 10 ans, j'observe une dérive.</span>
								</p>
								<p className="leading-relaxed">
									Le développement personnel est devenu une industrie de solutions rapides :
								</p>
								<ul className="space-y-2 text-white/80">
									<li className="flex items-start">
										<span className="text-perception-gold mr-2">•</span>
										<span>"7 jours pour changer ta vie"</span>
									</li>
									<li className="flex items-start">
										<span className="text-perception-gold mr-2">•</span>
										<span>"Les 3 secrets des millionnaires"</span>
									</li>
									<li className="flex items-start">
										<span className="text-perception-gold mr-2">•</span>
										<span>"Comment avoir confiance en 5 étapes"</span>
									</li>
								</ul>
							</motion.div>

							<motion.div 
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.6 }}
								className="space-y-4 text-white/90"
							>
								<p className="font-semibold text-perception-soft-yellow/95">Le problème ?</p>
								<ul className="space-y-2 text-white/80 leading-relaxed">
									<li className="flex items-start">
										<span className="text-perception-gold mr-2">•</span>
										<span>Ces approches construisent des façades, pas des fondations.</span>
									</li>
									<li className="flex items-start">
										<span className="text-perception-gold mr-2">•</span>
										<span>Elles donnent des techniques, pas une architecture interne.</span>
									</li>
									<li className="flex items-start">
										<span className="text-perception-gold mr-2">•</span>
										<span>Elles copient des modèles occidentaux, sans ancrage dans nos valeurs.</span>
									</li>
									<li className="flex items-start">
										<span className="text-perception-gold mr-2">•</span>
										<span>Elles créent de la dépendance au coach, pas de la souveraineté.</span>
									</li>
								</ul>
							</motion.div>
						</div>

						<motion.div 
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.8 }}
							className="text-center"
						>
							<p className="text-xl md:text-2xl text-white/95 mb-8 font-medium">
								<span className="font-bold text-perception-gold">Perception</span> est l'antithèse de cette industrie.
							</p>
							
							<Button
								onClick={onApplyClick}
								size="lg"
								className="bg-perception-gold text-black hover:bg-[#e6c200] font-semibold text-lg px-10 py-6 shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_40px_rgba(255,215,0,0.5)] transition-all duration-300"
							>
								Postuler maintenant
							</Button>
						</motion.div>
					</div>
				</motion.section>

				{/* Section formulaire */}
				<motion.div 
					ref={formRef}
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<PerceptionHeader />
					<div className="mt-6">
						<MultiStepForm />
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default PerceptionForm;

