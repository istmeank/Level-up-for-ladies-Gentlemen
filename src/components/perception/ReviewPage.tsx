import React from "react";
import { useFormContext } from "react-hook-form";
import { perceptionSections } from "@/data/perceptionQuestions";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type ReviewPageProps = {
  onEditSection: (sectionId: number) => void;
  onSubmit: () => void;
};

const ReviewRow: React.FC<{ label: string; value: any }> = ({ label, value }) => {
  const display =
    Array.isArray(value) ? (value.length ? value.join(", ") : "—") : value || "—";
  return (
    <div className="grid grid-cols-1 gap-1 rounded-lg border border-white/10 bg-white/5 p-3 sm:grid-cols-3">
      <div className="font-medium text-perception-gold">{label}</div>
      <div className="sm:col-span-2 text-white/90">{display}</div>
    </div>
  );
};

export const ReviewPage: React.FC<ReviewPageProps> = ({ onEditSection, onSubmit }) => {
  const { getValues } = useFormContext();
  const values = getValues();

  const downloadPdf = async () => {
    // Render the review content to canvas and export as PDF
    const container = document.getElementById("perception-review-container");
    if (!container) return;
    const canvas = await html2canvas(container, { backgroundColor: "#0e0e1a", scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    // Fit image width to page
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let position = 0;
    if (imgHeight < pageHeight) {
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    } else {
      // paginate
      let remainingHeight = imgHeight;
      let y = 0;
      while (remainingHeight > 0) {
        pdf.addImage(imgData, "PNG", 0, y, imgWidth, imgHeight);
        remainingHeight -= pageHeight;
        y -= pageHeight;
        if (remainingHeight > 0) pdf.addPage();
      }
    }
    // Header branding
    pdf.setTextColor(212, 175, 55); // gold
    pdf.setFontSize(16);
    pdf.text("PERCEPTION — Candidature", 14, 14);
    pdf.setTextColor(255, 255, 255);
    pdf.save(`perception_candidature_${values?.fullName || "candidat"}.pdf`);
  };

  return (
    <div>
      <h3 className="mb-4 text-2xl font-heading text-white">Relecture</h3>
      <p className="mb-6 text-sm text-white/70">
        Vérifie tes réponses. Tu peux modifier une section avant de soumettre.
      </p>
      <div id="perception-review-container" className="space-y-8">
        {perceptionSections.map((section) => (
          <div key={section.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-lg font-heading text-white">{section.title}</h4>
              <Button
                variant="secondary"
                onClick={() => onEditSection(section.id)}
                className="bg-white/10 text-white hover:bg-white/20"
              >
                Modifier cette section
              </Button>
            </div>
            <div className="grid gap-3">
              {section.questions.map((q) => (
                <ReviewRow key={q.id} label={q.label} value={values?.[q.id]} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-end gap-3">
        <Button
          variant="secondary"
          onClick={downloadPdf}
          className="bg-white/10 text-white hover:bg-white/20"
        >
          Télécharger PDF
        </Button>
        <Button onClick={onSubmit} className="bg-perception-gold text-black hover:bg-[#e6c200]">
          Soumettre ma candidature
        </Button>
      </div>
    </div>
  );
};

export default ReviewPage;


