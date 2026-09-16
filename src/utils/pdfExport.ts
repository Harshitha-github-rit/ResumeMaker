import jsPDF from 'jspdf';
import { toJpeg } from 'html-to-image';
import confetti from 'canvas-confetti';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ResumeData, TemplateId } from '../types';
import { TemplateRenderer } from '../components/templates/TemplateRenderer';

export const triggerPrintResume = () => {
  window.print();
};

export const printResume = triggerPrintResume;

/**
 * Converts a hex color (#RRGGBB) to RGB tuple [r, g, b]
 */
const hexToRgb = (hex: string): [number, number, number] => {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return [r, g, b];
  }
  const num = parseInt(cleanHex, 16);
  if (isNaN(num)) return [37, 99, 235]; // Default blue
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

/**
 * Fast, high-fidelity PDF export function that captures the EXACT selected template
 * (Modern, Classic, Minimal, Executive, Creative, Professional)
 * with instant generation (skipFonts: true, optimized JPEG compression, unscaled stage).
 */
export const downloadResumeAsPDF = async (
  target: string | ResumeData,
  fileName: string = 'Resume.pdf',
  onProgress?: (status: string) => void
): Promise<boolean> => {
  let tempHost: HTMLDivElement | null = null;
  let rootInstance: any = null;

  try {
    if (onProgress) onProgress('Preparing template...');

    let captureElement: HTMLElement | null = null;

    // 1. If target is already a DOM element ID
    if (typeof target === 'string') {
      captureElement = document.getElementById(target);
    }

    // 2. If target is ResumeData (or element not found)
    if (typeof target === 'object' && target !== null) {
      const templateName = target.customization?.template || 'modern';
      if (onProgress) onProgress(`Rendering ${templateName.toUpperCase()} layout...`);

      // Create a dedicated offscreen container for exact unzoomed A4 rendering
      tempHost = document.createElement('div');
      tempHost.id = 'offscreen-pdf-fast-stage';
      tempHost.style.position = 'fixed';
      tempHost.style.left = '-9999px';
      tempHost.style.top = '0';
      tempHost.style.width = '794px'; // 210mm at 96 DPI
      tempHost.style.minHeight = '1123px';
      tempHost.style.backgroundColor = '#ffffff';
      tempHost.style.zIndex = '-9999';
      tempHost.style.pointerEvents = 'none';
      tempHost.style.visibility = 'visible';
      tempHost.style.overflow = 'visible';
      document.body.appendChild(tempHost);

      // Fast layout effect to know immediately when DOM is mounted
      const FastMountNotifier: React.FC<{ onMount: () => void }> = ({ onMount }) => {
        React.useLayoutEffect(() => {
          onMount();
        }, [onMount]);
        return null;
      };

      rootInstance = createRoot(tempHost);

      await new Promise<void>((resolve) => {
        rootInstance.render(
          React.createElement(
            'div',
            {
              id: 'export-template-stage',
              style: {
                width: '794px',
                minHeight: '1123px',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box'
              }
            },
            React.createElement(TemplateRenderer, { data: target, resume: target }),
            React.createElement(FastMountNotifier, { onMount: resolve })
          )
        );
      });

      captureElement = document.getElementById('export-template-stage') || tempHost;

      // Ensure any images inside are ready without blocking
      const images = Array.from(captureElement.getElementsByTagName('img'));
      if (images.length > 0) {
        await Promise.all(
          images.map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(res => {
              img.onload = res;
              img.onerror = res;
              setTimeout(res, 120); // Fast 120ms max wait for images
            });
          })
        );
      }

      // Quick frame flush for computed styles
      await new Promise(r => requestAnimationFrame(r));
    }

    // Fallback: check on-screen printable container
    if (!captureElement) {
      captureElement = document.getElementById('printable-resume-container');
    }

    if (!captureElement) {
      throw new Error('Could not find resume layout container.');
    }

    if (onProgress) onProgress('Capturing PDF snapshot...');

    // Fast JPEG capture: skipFonts: true prevents slow network font downloads,
    // pixelRatio: 1.6 gives crisp 150+ DPI without huge memory overhead
    const dataUrl = await toJpeg(captureElement, {
      quality: 0.93,
      pixelRatio: 1.6,
      skipFonts: true,
      cacheBust: false,
      backgroundColor: '#ffffff',
      imagePlaceholder: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"/>'
    });

    if (onProgress) onProgress('Saving PDF...');

    // Load image quickly to get exact dimensions
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Image render error'));
      img.src = dataUrl;
    });

    const pdfWidth = 210; // A4 width in mm
    const stageWidth = captureElement.offsetWidth || 794;
    const stageHeight = captureElement.offsetHeight || 1123;
    const pdfHeight = (stageHeight * pdfWidth) / stageWidth;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // Page 1
    pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, Math.min(pdfHeight, 297));

    // Multi-page handling
    if (pdfHeight > 297.5) {
      let heightLeft = pdfHeight - 297;
      let position = -297;

      while (heightLeft > 5) {
        pdf.addPage();
        pdf.addImage(dataUrl, 'JPEG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= 297;
        position -= 297;
      }
    }

    const cleanFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    pdf.save(cleanFileName);

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#2563eb', '#4f46e5', '#10b981', '#f59e0b']
      });
    } catch {}

    if (onProgress) onProgress('Download complete!');
    return true;
  } catch (error) {
    console.warn('Fast image PDF capture issue, using instant vector fallback:', error);

    // If target was ResumeData or we have structured data, generate template-matching vector PDF
    if (typeof target === 'object' && target !== null) {
      return generateTemplateMatchingVectorPDF(target, fileName);
    }
    return false;
  } finally {
    if (rootInstance) {
      try {
        rootInstance.unmount();
      } catch {}
    }
    if (tempHost && tempHost.parentNode) {
      tempHost.parentNode.removeChild(tempHost);
    }
  }
};

/**
 * Instant vector fallback that faithfully respects each template's specific layout:
 * - Executive: Full-width dark/accent header banner with corporate executive styling
 * - Creative: Left-side colored column with white text and skill pills, right clean body
 * - Classic: Centered traditional layout with Georgia/Times serif font & classic divider rules
 * - Minimal: Clean left-aligned modern typography with slash-separated contact
 * - Professional: Structured corporate header with right-aligned contact & clear hierarchy
 * - Modern: Two-column layout with main content & structured sidebar
 */
const generateTemplateMatchingVectorPDF = (resume: ResumeData, fileName: string): boolean => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const templateId: TemplateId = resume.customization?.template || 'modern';
    const accentHex = resume.customization?.accentColor || '#2563eb';
    const [r, g, b] = hexToRgb(accentHex);
    const font = templateId === 'classic' ? 'times' : 'helvetica';
    const pageWidth = 210;

    if (templateId === 'executive') {
      // EXECUTIVE: Dark/Accent Header Banner
      pdf.setFillColor(r, g, b);
      pdf.rect(0, 0, pageWidth, 40, 'F');

      pdf.setFont(font, 'bold');
      pdf.setFontSize(22);
      pdf.setTextColor(255, 255, 255);
      pdf.text(resume.personalInfo.fullName || 'Resume', 18, 18);

      pdf.setFont(font, 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(226, 232, 240);
      pdf.text((resume.personalInfo.professionalTitle || '').toUpperCase(), 18, 26);

      const contact = [resume.personalInfo.email, resume.personalInfo.phone, resume.personalInfo.location].filter(Boolean).join('   |   ');
      pdf.setFontSize(9);
      pdf.setTextColor(203, 213, 225);
      pdf.text(contact, 18, 34);

      let y = 50;
      renderCommonSections(pdf, resume, 18, pageWidth - 36, y, r, g, b, font);
    } else if (templateId === 'creative') {
      // CREATIVE: Left Accent Sidebar
      const sidebarWidth = 68;
      pdf.setFillColor(r, g, b);
      pdf.rect(0, 0, sidebarWidth, 297, 'F');

      // Sidebar Name & Title
      pdf.setFont(font, 'bold');
      pdf.setFontSize(18);
      pdf.setTextColor(255, 255, 255);
      const nameLines = pdf.splitTextToSize(resume.personalInfo.fullName || 'Resume', sidebarWidth - 16);
      pdf.text(nameLines, 10, 24);

      let sideY = 24 + nameLines.length * 7;
      pdf.setFont(font, 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(243, 232, 255);
      pdf.text(resume.personalInfo.professionalTitle || '', 10, sideY);
      sideY += 14;

      // Sidebar Contact
      pdf.setFont(font, 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(255, 255, 255);
      pdf.text('CONTACT', 10, sideY);
      sideY += 6;

      pdf.setFont(font, 'normal');
      pdf.setFontSize(8.5);
      pdf.setTextColor(243, 232, 255);
      [resume.personalInfo.email, resume.personalInfo.phone, resume.personalInfo.location].filter(Boolean).forEach(ct => {
        pdf.text(ct!, 10, sideY);
        sideY += 5;
      });
      sideY += 8;

      // Sidebar Skills
      if (resume.skills && resume.skills.length > 0) {
        pdf.setFont(font, 'bold');
        pdf.setFontSize(10);
        pdf.setTextColor(255, 255, 255);
        pdf.text('SKILLS', 10, sideY);
        sideY += 6;

        pdf.setFont(font, 'normal');
        pdf.setFontSize(8.5);
        pdf.setTextColor(255, 255, 255);
        resume.skills.forEach(s => {
          pdf.text(`• ${s.name}`, 10, sideY);
          sideY += 5;
        });
      }

      // Right Main Content
      let mainY = 24;
      const mainLeft = sidebarWidth + 12;
      const mainWidth = pageWidth - mainLeft - 12;
      renderCommonSections(pdf, resume, mainLeft, mainWidth, mainY, r, g, b, font);
    } else if (templateId === 'classic') {
      // CLASSIC: Centered Serif Traditional
      pdf.setFont('times', 'bold');
      pdf.setFontSize(22);
      pdf.setTextColor(15, 23, 42);
      pdf.text((resume.personalInfo.fullName || 'Resume').toUpperCase(), pageWidth / 2, 20, { align: 'center' });

      if (resume.personalInfo.professionalTitle) {
        pdf.setFont('times', 'italic');
        pdf.setFontSize(12);
        pdf.setTextColor(71, 85, 105);
        pdf.text(resume.personalInfo.professionalTitle, pageWidth / 2, 27, { align: 'center' });
      }

      const contact = [resume.personalInfo.location, resume.personalInfo.email, resume.personalInfo.phone].filter(Boolean).join('   •   ');
      if (contact) {
        pdf.setFont('times', 'normal');
        pdf.setFontSize(9.5);
        pdf.setTextColor(100, 116, 139);
        pdf.text(contact, pageWidth / 2, 33, { align: 'center' });
      }

      pdf.setDrawColor(r, g, b);
      pdf.setLineWidth(0.8);
      pdf.line(20, 37, pageWidth - 20, 37);

      let y = 46;
      renderCommonSections(pdf, resume, 20, pageWidth - 40, y, r, g, b, 'times');
    } else if (templateId === 'professional') {
      // PROFESSIONAL: Corporate Header with Right-Aligned Contact Details
      let y = 20;
      const leftMargin = 18;
      const rightMargin = 18;
      const contentWidth = pageWidth - leftMargin - rightMargin;

      pdf.setFont(font, 'bold');
      pdf.setFontSize(22);
      pdf.setTextColor(15, 23, 42);
      pdf.text(resume.personalInfo.fullName || 'Resume', leftMargin, y);

      // Right-aligned contact info
      pdf.setFont(font, 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(71, 85, 105);
      if (resume.personalInfo.email) {
        pdf.text(resume.personalInfo.email, pageWidth - rightMargin, y - 2, { align: 'right' });
      }
      if (resume.personalInfo.phone) {
        pdf.text(resume.personalInfo.phone, pageWidth - rightMargin, y + 3, { align: 'right' });
      }
      if (resume.personalInfo.location) {
        pdf.text(resume.personalInfo.location, pageWidth - rightMargin, y + 8, { align: 'right' });
      }

      y += 7;
      if (resume.personalInfo.professionalTitle) {
        pdf.setFont(font, 'bold');
        pdf.setFontSize(11);
        pdf.setTextColor(r, g, b);
        pdf.text(resume.personalInfo.professionalTitle.toUpperCase(), leftMargin, y);
      }

      y += 8;
      pdf.setDrawColor(r, g, b);
      pdf.setLineWidth(1.2);
      pdf.line(leftMargin, y, pageWidth - rightMargin, y);
      y += 8;

      renderCommonSections(pdf, resume, leftMargin, contentWidth, y, r, g, b, font);
    } else if (templateId === 'minimal') {
      // MINIMAL: Refined Typography & Slash-Separated Contact Line
      let y = 22;
      const leftMargin = 20;
      const contentWidth = pageWidth - leftMargin * 2;

      pdf.setFont(font, 'normal');
      pdf.setFontSize(24);
      pdf.setTextColor(15, 23, 42);
      pdf.text(resume.personalInfo.fullName || 'Resume', leftMargin, y);
      y += 7;

      if (resume.personalInfo.professionalTitle) {
        pdf.setFont(font, 'normal');
        pdf.setFontSize(10.5);
        pdf.setTextColor(100, 116, 139);
        pdf.text(resume.personalInfo.professionalTitle, leftMargin, y);
        y += 6;
      }

      const contact = [resume.personalInfo.email, resume.personalInfo.phone, resume.personalInfo.location, resume.personalInfo.linkedin]
        .filter(Boolean)
        .join('  /  ');
      if (contact) {
        pdf.setFont('courier', 'normal');
        pdf.setFontSize(8.5);
        pdf.setTextColor(148, 163, 184);
        pdf.text(contact, leftMargin, y);
        y += 10;
      }

      renderCommonSections(pdf, resume, leftMargin, contentWidth, y, r, g, b, font);
    } else {
      // MODERN: Clean Accent Header with Modern Spacing
      let y = 20;
      const leftMargin = 18;
      const contentWidth = pageWidth - leftMargin * 2;

      pdf.setFont(font, 'bold');
      pdf.setFontSize(22);
      pdf.setTextColor(15, 23, 42);
      pdf.text(resume.personalInfo.fullName || 'Resume', leftMargin, y);
      y += 7;

      if (resume.personalInfo.professionalTitle) {
        pdf.setFont(font, 'bold');
        pdf.setFontSize(11);
        pdf.setTextColor(r, g, b);
        pdf.text(resume.personalInfo.professionalTitle, leftMargin, y);
        y += 6;
      }

      const contact = [resume.personalInfo.email, resume.personalInfo.phone, resume.personalInfo.location, resume.personalInfo.linkedin].filter(Boolean).join('   |   ');
      if (contact) {
        pdf.setFont(font, 'normal');
        pdf.setFontSize(9);
        pdf.setTextColor(100, 116, 139);
        pdf.text(contact, leftMargin, y);
        y += 8;
      }

      pdf.setDrawColor(r, g, b);
      pdf.setLineWidth(0.8);
      pdf.line(leftMargin, y, pageWidth - leftMargin, y);
      y += 8;

      renderCommonSections(pdf, resume, leftMargin, contentWidth, y, r, g, b, font);
    }

    const cleanFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    pdf.save(cleanFileName);
    return true;
  } catch (directError) {
    console.error('Direct vector PDF error:', directError);
    return false;
  }
};

/**
 * Shared renderer for PDF sections (Summary, Experience, Education, Skills)
 */
const renderCommonSections = (
  pdf: jsPDF,
  resume: ResumeData,
  left: number,
  width: number,
  startY: number,
  r: number,
  g: number,
  b: number,
  font: string
) => {
  let y = startY;

  // Summary
  if (resume.summary) {
    pdf.setFont(font, 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(r, g, b);
    pdf.text('PROFESSIONAL SUMMARY', left, y);
    y += 5;

    pdf.setFont(font, 'normal');
    pdf.setFontSize(9.5);
    pdf.setTextColor(51, 65, 85);
    const splitSummary = pdf.splitTextToSize(resume.summary, width);
    pdf.text(splitSummary, left, y);
    y += splitSummary.length * 4.5 + 6;
  }

  // Experience
  if (resume.experience && resume.experience.length > 0) {
    if (y > 250) { pdf.addPage(); y = 20; }
    pdf.setFont(font, 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(r, g, b);
    pdf.text('WORK EXPERIENCE', left, y);
    y += 5;

    resume.experience.forEach(exp => {
      if (y > 260) { pdf.addPage(); y = 20; }
      pdf.setFont(font, 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(15, 23, 42);
      const title = `${exp.jobTitle} - ${exp.company} (${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate})`;
      pdf.text(title, left, y);
      y += 4.5;

      if (exp.description) {
        pdf.setFont(font, 'normal');
        pdf.setFontSize(9);
        pdf.setTextColor(51, 65, 85);
        const splitDesc = pdf.splitTextToSize(exp.description, width);
        pdf.text(splitDesc, left, y);
        y += splitDesc.length * 4.2 + 3.5;
      }
    });
    y += 4;
  }

  // Education
  if (resume.education && resume.education.length > 0) {
    if (y > 255) { pdf.addPage(); y = 20; }
    pdf.setFont(font, 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(r, g, b);
    pdf.text('EDUCATION', left, y);
    y += 5;

    resume.education.forEach(edu => {
      if (y > 268) { pdf.addPage(); y = 20; }
      pdf.setFont(font, 'bold');
      pdf.setFontSize(9.5);
      pdf.setTextColor(15, 23, 42);
      pdf.text(`${edu.degree} - ${edu.institution} (${edu.startDate} - ${edu.endDate})`, left, y);
      y += 4.5;
    });
    y += 4;
  }

  // Skills
  if (resume.skills && resume.skills.length > 0) {
    if (y > 260) { pdf.addPage(); y = 20; }
    pdf.setFont(font, 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(r, g, b);
    pdf.text('SKILLS', left, y);
    y += 5;

    pdf.setFont(font, 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(51, 65, 85);
    const skillList = resume.skills.map(s => s.name).join('   •   ');
    const splitSkills = pdf.splitTextToSize(skillList, width);
    pdf.text(splitSkills, left, y);
  }
};
