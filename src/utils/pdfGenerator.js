import { jsPDF } from "jspdf";

export const generatePDF = (analysis) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("ResumeChecker ATS Report", 20, 20);

  doc.setFontSize(16);
  doc.text(`ATS Score: ${analysis.atsScore}`, 20, 40);

  let y = 60;

  doc.setFontSize(14);
  doc.text("Strengths", 20, y);

  y += 10;

  analysis.strengths.forEach((item) => {
    doc.text("• " + item, 25, y);
    y += 8;
  });

  y += 8;

  doc.text("Weaknesses", 20, y);

  y += 10;

  analysis.weaknesses.forEach((item) => {
    doc.text("• " + item, 25, y);
    y += 8;
  });

  y += 8;

  doc.text("Missing Keywords", 20, y);

  y += 10;

  analysis.missingKeywords.forEach((item) => {
    doc.text("• " + item, 25, y);
    y += 8;
  });

  y += 8;

  doc.text("Suggestions", 20, y);

  y += 10;

  analysis.suggestions.forEach((item) => {
    doc.text("• " + item, 25, y);
    y += 8;
  });

  doc.save("ATS_Report.pdf");
};