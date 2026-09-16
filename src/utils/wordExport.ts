import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Packer,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType
} from 'docx';
import { ResumeData, TemplateId } from '../types';

/**
 * Maps app font selection to standard Microsoft Word fonts
 */
const getDocxFont = (fontFamily?: string, templateId?: TemplateId): string => {
  if (templateId === 'classic') return 'Georgia';
  if (templateId === 'minimal') return 'Arial';
  if (templateId === 'executive') return 'Calibri';
  if (templateId === 'creative') return 'Century Gothic';

  switch (fontFamily) {
    case 'serif':
      return 'Georgia';
    case 'mono':
      return 'Consolas';
    case 'poppins':
    case 'inter':
    case 'sans':
    default:
      return 'Calibri';
  }
};

/**
 * Generates and downloads a Microsoft Word (.docx) document
 * with layout, colors, and typography faithfully matching the selected template:
 * - Modern: Two-column layout with main content & structured sidebar
 * - Classic: Centered traditional layout with Georgia serif font & classic divider rules
 * - Minimal: Clean left-aligned modern typography with slash-separated contact
 * - Executive: Full-width dark/accent header banner with corporate executive styling
 * - Creative: Two-column layout with colored sidebar and modern design
 * - Professional: Structured corporate header with right-aligned contact & clear hierarchy
 */
export const downloadResumeAsWord = async (
  resume: ResumeData,
  fileName?: string
): Promise<boolean> => {
  const safeTitle = (resume.title || 'Resume').replace(/[^a-zA-Z0-9_\-]/g, '_');
  const baseName = fileName ? fileName.replace(/\.(docx|doc)$/i, '') : `${safeTitle}_Resume`;
  const cleanFileName = `${baseName}.docx`;

  try {
    const templateId: TemplateId = resume.customization?.template || 'modern';
    const accentHex = (resume.customization?.accentColor || '#2563eb').replace('#', '');
    const docFont = getDocxFont(resume.customization?.fontFamily, templateId);

    let doc: Document;

    switch (templateId) {
      case 'classic':
        doc = createClassicWordDoc(resume, accentHex, docFont);
        break;
      case 'minimal':
        doc = createMinimalWordDoc(resume, accentHex, docFont);
        break;
      case 'executive':
        doc = createExecutiveWordDoc(resume, accentHex, docFont);
        break;
      case 'creative':
        doc = createCreativeWordDoc(resume, accentHex, docFont);
        break;
      case 'professional':
        doc = createProfessionalWordDoc(resume, accentHex, docFont);
        break;
      case 'modern':
      default:
        doc = createModernWordDoc(resume, accentHex, docFont);
        break;
    }

    const blob = await Packer.toBlob(doc);
    downloadBlob(blob, cleanFileName);
    return true;
  } catch (error) {
    console.error('Word (.docx) export error, falling back to template-matching HTML Word file:', error);
    return exportWordHtmlFallback(resume, cleanFileName);
  }
};

// ============================================================================
// 1. MODERN TEMPLATE WORD GENERATOR (Two-column layout)
// ============================================================================
const createModernWordDoc = (resume: ResumeData, accentHex: string, font: string): Document => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = resume;

  const mainParagraphs: Paragraph[] = [];
  const sidebarParagraphs: Paragraph[] = [];

  // Helper for section headings in main column
  const createMainHeading = (title: string): Paragraph => {
    return new Paragraph({
      spacing: { before: 200, after: 80 },
      border: {
        bottom: {
          color: accentHex,
          space: 4,
          style: BorderStyle.SINGLE,
          size: 10
        }
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 22, // 11pt
          color: accentHex,
          font
        })
      ]
    });
  };

  // Helper for section headings in sidebar
  const createSidebarHeading = (title: string): Paragraph => {
    return new Paragraph({
      spacing: { before: 180, after: 80 },
      border: {
        bottom: {
          color: accentHex,
          space: 3,
          style: BorderStyle.SINGLE,
          size: 8
        }
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 20, // 10pt
          color: accentHex,
          font
        })
      ]
    });
  };

  // MAIN COLUMN: Summary
  if (summary) {
    mainParagraphs.push(createMainHeading('Professional Summary'));
    mainParagraphs.push(
      new Paragraph({
        spacing: { before: 60, after: 140 },
        children: [
          new TextRun({
            text: summary.trim(),
            size: 20,
            color: '334155',
            font
          })
        ]
      })
    );
  }

  // MAIN COLUMN: Experience
  if (experience && experience.length > 0) {
    mainParagraphs.push(createMainHeading('Work Experience'));
    experience.forEach(exp => {
      const dates = `${exp.startDate || ''} – ${exp.isCurrent ? 'Present' : exp.endDate || ''}`;
      mainParagraphs.push(
        new Paragraph({
          spacing: { before: 100, after: 20 },
          children: [
            new TextRun({
              text: exp.jobTitle,
              bold: true,
              size: 21,
              color: '0f172a',
              font
            }),
            new TextRun({
              text: exp.company ? ` | ${exp.company}` : '',
              bold: true,
              size: 20,
              color: accentHex,
              font
            }),
            new TextRun({
              text: ` (${dates})`,
              italics: true,
              size: 18,
              color: '64748b',
              font
            })
          ]
        })
      );

      if (exp.location) {
        mainParagraphs.push(
          new Paragraph({
            spacing: { before: 0, after: 40 },
            children: [
              new TextRun({
                text: exp.location,
                size: 18,
                color: '64748b',
                font
              })
            ]
          })
        );
      }

      if (exp.description) {
        const lines = exp.description.split('\n').map(l => l.trim()).filter(Boolean);
        lines.forEach(line => {
          mainParagraphs.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { before: 20, after: 20 },
              children: [
                new TextRun({
                  text: line.replace(/^[•\-\*]\s*/, ''),
                  size: 19,
                  color: '334155',
                  font
                })
              ]
            })
          );
        });
      }
    });
  }

  // MAIN COLUMN: Projects
  if (projects && projects.length > 0) {
    mainParagraphs.push(createMainHeading('Featured Projects'));
    projects.forEach(proj => {
      mainParagraphs.push(
        new Paragraph({
          spacing: { before: 100, after: 20 },
          children: [
            new TextRun({
              text: proj.name,
              bold: true,
              size: 20,
              color: '0f172a',
              font
            }),
            new TextRun({
              text: proj.role ? ` (${proj.role})` : '',
              italics: true,
              size: 18,
              color: '475569',
              font
            })
          ]
        })
      );
      if (proj.technologies) {
        mainParagraphs.push(
          new Paragraph({
            spacing: { before: 0, after: 20 },
            children: [
              new TextRun({
                text: `Tech: ${proj.technologies}`,
                size: 17,
                color: accentHex,
                font
              })
            ]
          })
        );
      }
      if (proj.description) {
        mainParagraphs.push(
          new Paragraph({
            spacing: { before: 0, after: 40 },
            children: [
              new TextRun({
                text: proj.description,
                size: 19,
                color: '475569',
                font
              })
            ]
          })
        );
      }
    });
  }

  // SIDEBAR COLUMN: Contact Info
  sidebarParagraphs.push(createSidebarHeading('Contact'));
  const contacts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.portfolio
  ].filter(Boolean);

  contacts.forEach(ct => {
    sidebarParagraphs.push(
      new Paragraph({
        spacing: { before: 20, after: 20 },
        children: [
          new TextRun({
            text: ct!,
            size: 18,
            color: '334155',
            font
          })
        ]
      })
    );
  });

  // SIDEBAR COLUMN: Core Skills
  if (skills && skills.length > 0) {
    sidebarParagraphs.push(createSidebarHeading('Core Skills'));
    skills.forEach(s => {
      sidebarParagraphs.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { before: 20, after: 20 },
          children: [
            new TextRun({
              text: s.name,
              bold: true,
              size: 19,
              color: '1e293b',
              font
            }),
            new TextRun({
              text: s.level ? ` (${s.level})` : '',
              size: 17,
              color: '64748b',
              font
            })
          ]
        })
      );
    });
  }

  // SIDEBAR COLUMN: Education
  if (education && education.length > 0) {
    sidebarParagraphs.push(createSidebarHeading('Education'));
    education.forEach(edu => {
      sidebarParagraphs.push(
        new Paragraph({
          spacing: { before: 60, after: 20 },
          children: [
            new TextRun({
              text: edu.degree,
              bold: true,
              size: 19,
              color: '0f172a',
              font
            })
          ]
        })
      );
      sidebarParagraphs.push(
        new Paragraph({
          spacing: { before: 0, after: 20 },
          children: [
            new TextRun({
              text: edu.institution,
              size: 18,
              color: '475569',
              font
            })
          ]
        })
      );
      if (edu.startDate || edu.endDate) {
        sidebarParagraphs.push(
          new Paragraph({
            spacing: { before: 0, after: 20 },
            children: [
              new TextRun({
                text: `${edu.startDate || ''} – ${edu.endDate || ''}`,
                size: 17,
                color: '64748b',
                font
              })
            ]
          })
        );
      }
    });
  }

  // SIDEBAR COLUMN: Languages
  if (languages && languages.length > 0) {
    sidebarParagraphs.push(createSidebarHeading('Languages'));
    languages.forEach(l => {
      sidebarParagraphs.push(
        new Paragraph({
          spacing: { before: 20, after: 20 },
          children: [
            new TextRun({
              text: `${l.name} (${l.proficiency})`,
              size: 18,
              color: '334155',
              font
            })
          ]
        })
      );
    });
  }

  // Top Header Row
  const headerParagraphs: Paragraph[] = [
    new Paragraph({
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({
          text: personalInfo.fullName || 'Resume',
          bold: true,
          size: 38, // 19pt
          color: '0f172a',
          font
        })
      ]
    }),
    new Paragraph({
      spacing: { before: 0, after: 180 },
      border: {
        bottom: {
          color: accentHex,
          space: 6,
          style: BorderStyle.SINGLE,
          size: 16
        }
      },
      children: [
        new TextRun({
          text: personalInfo.professionalTitle || '',
          bold: true,
          size: 22,
          color: accentHex,
          font
        })
      ]
    })
  ];

  // Two-column body table
  const twoColTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 65, type: WidthType.PERCENTAGE },
            margins: { right: 240, top: 40, bottom: 40, left: 40 },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE }
            },
            children: mainParagraphs.length > 0 ? mainParagraphs : [new Paragraph({})]
          }),
          new TableCell({
            width: { size: 35, type: WidthType.PERCENTAGE },
            shading: { fill: 'F8FAFC' },
            margins: { left: 200, right: 100, top: 80, bottom: 80 },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.SINGLE, size: 8, color: 'E2E8F0' },
              right: { style: BorderStyle.NONE }
            },
            children: sidebarParagraphs.length > 0 ? sidebarParagraphs : [new Paragraph({})]
          })
        ]
      })
    ]
  });

  return new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 900, right: 900, bottom: 900, left: 900 }
          }
        },
        children: [...headerParagraphs, twoColTable]
      }
    ]
  });
};

// ============================================================================
// 2. CLASSIC TEMPLATE WORD GENERATOR (Centered Serif Traditional Layout)
// ============================================================================
const createClassicWordDoc = (resume: ResumeData, accentHex: string, font: string): Document => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resume;
  const paragraphs: Paragraph[] = [];

  // Centered Header
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
      children: [
        new TextRun({
          text: (personalInfo.fullName || 'Resume').toUpperCase(),
          bold: true,
          size: 38,
          color: '0f172a',
          font: 'Georgia'
        })
      ]
    })
  );

  if (personalInfo.professionalTitle) {
    paragraphs.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [
          new TextRun({
            text: personalInfo.professionalTitle,
            italics: true,
            size: 22,
            color: '475569',
            font: 'Georgia'
          })
        ]
      })
    );
  }

  // Centered Contact Strip
  const contactParts = [
    personalInfo.location,
    personalInfo.email,
    personalInfo.phone,
    personalInfo.linkedin,
    personalInfo.portfolio
  ].filter(Boolean);

  if (contactParts.length > 0) {
    paragraphs.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 180 },
        border: {
          bottom: {
            color: accentHex,
            space: 6,
            style: BorderStyle.SINGLE,
            size: 12
          }
        },
        children: [
          new TextRun({
            text: contactParts.join('   •   '),
            size: 19,
            color: '64748b',
            font: 'Georgia'
          })
        ]
      })
    );
  }

  const createClassicHeading = (title: string): Paragraph => {
    return new Paragraph({
      spacing: { before: 180, after: 60 },
      border: {
        bottom: {
          color: 'cbd5e1',
          space: 3,
          style: BorderStyle.SINGLE,
          size: 6
        }
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 22,
          color: accentHex,
          font: 'Georgia'
        })
      ]
    });
  };

  // Summary
  if (summary) {
    paragraphs.push(createClassicHeading('Professional Summary'));
    paragraphs.push(
      new Paragraph({
        spacing: { before: 60, after: 120 },
        children: [
          new TextRun({
            text: summary.trim(),
            size: 21,
            color: '334155',
            font: 'Georgia'
          })
        ]
      })
    );
  }

  // Work Experience
  if (experience && experience.length > 0) {
    paragraphs.push(createClassicHeading('Work Experience'));
    experience.forEach(exp => {
      const dates = `${exp.startDate || ''} – ${exp.isCurrent ? 'Present' : exp.endDate || ''}`;
      paragraphs.push(
        new Paragraph({
          spacing: { before: 100, after: 20 },
          children: [
            new TextRun({
              text: exp.jobTitle,
              bold: true,
              size: 21,
              color: '0f172a',
              font: 'Georgia'
            }),
            new TextRun({
              text: exp.company ? `  —  ${exp.company}` : '',
              bold: true,
              size: 21,
              color: '334155',
              font: 'Georgia'
            }),
            new TextRun({
              text: ` (${dates})`,
              italics: true,
              size: 19,
              color: '64748b',
              font: 'Georgia'
            })
          ]
        })
      );

      if (exp.description) {
        const lines = exp.description.split('\n').map(l => l.trim()).filter(Boolean);
        lines.forEach(line => {
          paragraphs.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { before: 20, after: 20 },
              children: [
                new TextRun({
                  text: line.replace(/^[•\-\*]\s*/, ''),
                  size: 20,
                  color: '334155',
                  font: 'Georgia'
                })
              ]
            })
          );
        });
      }
    });
  }

  // Education
  if (education && education.length > 0) {
    paragraphs.push(createClassicHeading('Education'));
    education.forEach(edu => {
      paragraphs.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({
              text: edu.degree,
              bold: true,
              size: 21,
              color: '0f172a',
              font: 'Georgia'
            }),
            new TextRun({
              text: edu.institution ? `  —  ${edu.institution}` : '',
              size: 20,
              color: '334155',
              font: 'Georgia'
            }),
            new TextRun({
              text: ` (${edu.startDate || ''} – ${edu.endDate || ''})`,
              italics: true,
              size: 19,
              color: '64748b',
              font: 'Georgia'
            })
          ]
        })
      );
    });
  }

  // Skills
  if (skills && skills.length > 0) {
    paragraphs.push(createClassicHeading('Skills & Expertise'));
    paragraphs.push(
      new Paragraph({
        spacing: { before: 60, after: 120 },
        children: [
          new TextRun({
            text: skills.map(s => s.name).join('   •   '),
            size: 20,
            color: '334155',
            font: 'Georgia'
          })
        ]
      })
    );
  }

  return new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
          }
        },
        children: paragraphs
      }
    ]
  });
};

// ============================================================================
// 3. MINIMAL TEMPLATE WORD GENERATOR (Clean, Left-Aligned Sans-Serif)
// ============================================================================
const createMinimalWordDoc = (resume: ResumeData, accentHex: string, font: string): Document => {
  const { personalInfo, summary, experience, education, skills, projects } = resume;
  const paragraphs: Paragraph[] = [];

  // Left-aligned light title
  paragraphs.push(
    new Paragraph({
      spacing: { before: 0, after: 20 },
      children: [
        new TextRun({
          text: personalInfo.fullName || 'Resume',
          bold: false,
          size: 38,
          color: '090d16',
          font: 'Arial'
        })
      ]
    })
  );

  if (personalInfo.professionalTitle) {
    paragraphs.push(
      new Paragraph({
        spacing: { before: 0, after: 60 },
        children: [
          new TextRun({
            text: personalInfo.professionalTitle,
            size: 20,
            color: '64748b',
            font: 'Arial'
          })
        ]
      })
    );
  }

  // Slash-separated contact line
  const contactLine = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.portfolio
  ].filter(Boolean).join('   /   ');

  if (contactLine) {
    paragraphs.push(
      new Paragraph({
        spacing: { before: 0, after: 200 },
        children: [
          new TextRun({
            text: contactLine,
            size: 18,
            color: '94a3b8',
            font: 'Arial'
          })
        ]
      })
    );
  }

  const createMinimalHeading = (title: string): Paragraph => {
    return new Paragraph({
      spacing: { before: 180, after: 60 },
      border: {
        bottom: {
          color: 'e2e8f0',
          space: 2,
          style: BorderStyle.SINGLE,
          size: 4
        }
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 18,
          color: '64748b',
          font: 'Arial'
        })
      ]
    });
  };

  if (summary) {
    paragraphs.push(createMinimalHeading('About'));
    paragraphs.push(
      new Paragraph({
        spacing: { before: 40, after: 120 },
        children: [
          new TextRun({
            text: summary.trim(),
            size: 19,
            color: '334155',
            font: 'Arial'
          })
        ]
      })
    );
  }

  if (experience && experience.length > 0) {
    paragraphs.push(createMinimalHeading('Experience'));
    experience.forEach(exp => {
      const dates = `${exp.startDate || ''} – ${exp.isCurrent ? 'Present' : exp.endDate || ''}`;
      paragraphs.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({
              text: exp.jobTitle,
              bold: true,
              size: 20,
              color: '0f172a',
              font: 'Arial'
            }),
            new TextRun({
              text: exp.company ? `  —  ${exp.company}` : '',
              size: 19,
              color: '475569',
              font: 'Arial'
            }),
            new TextRun({
              text: `  [${dates}]`,
              size: 17,
              color: '94a3b8',
              font: 'Arial'
            })
          ]
        })
      );

      if (exp.description) {
        paragraphs.push(
          new Paragraph({
            spacing: { before: 20, after: 40 },
            children: [
              new TextRun({
                text: exp.description,
                size: 18,
                color: '475569',
                font: 'Arial'
              })
            ]
          })
        );
      }
    });
  }

  if (skills && skills.length > 0) {
    paragraphs.push(createMinimalHeading('Skills'));
    paragraphs.push(
      new Paragraph({
        spacing: { before: 40, after: 80 },
        children: [
          new TextRun({
            text: skills.map(s => s.name).join('   •   '),
            size: 19,
            color: '334155',
            font: 'Arial'
          })
        ]
      })
    );
  }

  if (education && education.length > 0) {
    paragraphs.push(createMinimalHeading('Education'));
    education.forEach(edu => {
      paragraphs.push(
        new Paragraph({
          spacing: { before: 60, after: 20 },
          children: [
            new TextRun({
              text: `${edu.degree} — ${edu.institution}`,
              size: 19,
              color: '0f172a',
              font: 'Arial'
            }),
            new TextRun({
              text: `  (${edu.startDate || ''} – ${edu.endDate || ''})`,
              size: 17,
              color: '94a3b8',
              font: 'Arial'
            })
          ]
        })
      );
    });
  }

  return new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 900, right: 900, bottom: 900, left: 900 }
          }
        },
        children: paragraphs
      }
    ]
  });
};

// ============================================================================
// 4. EXECUTIVE TEMPLATE WORD GENERATOR (Dark / Accent Header Banner)
// ============================================================================
const createExecutiveWordDoc = (resume: ResumeData, accentHex: string, font: string): Document => {
  const { personalInfo, summary, experience, education, skills, projects } = resume;
  const paragraphs: Paragraph[] = [];

  const contactText = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin
  ].filter(Boolean).join('   |   ');

  // Executive Top Banner Table
  const bannerTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 100, type: WidthType.PERCENTAGE },
            shading: { fill: accentHex },
            margins: { top: 260, bottom: 260, left: 260, right: 260 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: personalInfo.fullName || 'Executive Resume',
                    bold: true,
                    size: 38,
                    color: 'FFFFFF',
                    font
                  })
                ]
              }),
              new Paragraph({
                spacing: { before: 40, after: 80 },
                children: [
                  new TextRun({
                    text: (personalInfo.professionalTitle || '').toUpperCase(),
                    bold: true,
                    size: 20,
                    color: 'E2E8F0',
                    font
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: contactText,
                    size: 18,
                    color: 'CBD5E1',
                    font
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });

  paragraphs.push(
    new Paragraph({
      spacing: { before: 0, after: 120 },
      children: []
    })
  );

  const createExecHeading = (title: string): Paragraph => {
    return new Paragraph({
      spacing: { before: 200, after: 60 },
      border: {
        bottom: {
          color: accentHex,
          space: 4,
          style: BorderStyle.SINGLE,
          size: 14
        }
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 22,
          color: accentHex,
          font
        })
      ]
    });
  };

  if (summary) {
    paragraphs.push(createExecHeading('Executive Profile'));
    paragraphs.push(
      new Paragraph({
        spacing: { before: 60, after: 140 },
        children: [
          new TextRun({
            text: summary.trim(),
            size: 21,
            color: '334155',
            font
          })
        ]
      })
    );
  }

  if (experience && experience.length > 0) {
    paragraphs.push(createExecHeading('Leadership & Professional Experience'));
    experience.forEach(exp => {
      const dates = `${exp.startDate || ''} – ${exp.isCurrent ? 'Present' : exp.endDate || ''}`;
      paragraphs.push(
        new Paragraph({
          spacing: { before: 100, after: 20 },
          children: [
            new TextRun({
              text: exp.jobTitle,
              bold: true,
              size: 21,
              color: '0f172a',
              font
            }),
            new TextRun({
              text: exp.company ? `  |  ${exp.company}` : '',
              bold: true,
              size: 21,
              color: accentHex,
              font
            }),
            new TextRun({
              text: ` (${dates})`,
              italics: true,
              size: 19,
              color: '64748b',
              font
            })
          ]
        })
      );

      if (exp.description) {
        const lines = exp.description.split('\n').map(l => l.trim()).filter(Boolean);
        lines.forEach(line => {
          paragraphs.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { before: 20, after: 20 },
              children: [
                new TextRun({
                  text: line.replace(/^[•\-\*]\s*/, ''),
                  size: 20,
                  color: '334155',
                  font
                })
              ]
            })
          );
        });
      }
    });
  }

  if (education && education.length > 0) {
    paragraphs.push(createExecHeading('Education & Credentials'));
    education.forEach(edu => {
      paragraphs.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({
              text: `${edu.degree} — ${edu.institution}`,
              bold: true,
              size: 20,
              color: '0f172a',
              font
            }),
            new TextRun({
              text: ` (${edu.startDate || ''} – ${edu.endDate || ''})`,
              size: 18,
              color: '64748b',
              font
            })
          ]
        })
      );
    });
  }

  if (skills && skills.length > 0) {
    paragraphs.push(createExecHeading('Executive Competencies'));
    paragraphs.push(
      new Paragraph({
        spacing: { before: 60, after: 80 },
        children: [
          new TextRun({
            text: skills.map(s => s.name).join('   •   '),
            size: 20,
            color: '334155',
            font
          })
        ]
      })
    );
  }

  return new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 }
          }
        },
        children: [bannerTable, ...paragraphs]
      }
    ]
  });
};

// ============================================================================
// 5. CREATIVE TEMPLATE WORD GENERATOR (Colored Sidebar Column)
// ============================================================================
const createCreativeWordDoc = (resume: ResumeData, accentHex: string, font: string): Document => {
  const { personalInfo, summary, experience, education, skills, projects, languages } = resume;

  const sidebarParagraphs: Paragraph[] = [
    new Paragraph({
      spacing: { before: 40, after: 40 },
      children: [
        new TextRun({
          text: personalInfo.fullName || 'Resume',
          bold: true,
          size: 32,
          color: 'FFFFFF',
          font
        })
      ]
    }),
    new Paragraph({
      spacing: { before: 0, after: 120 },
      children: [
        new TextRun({
          text: personalInfo.professionalTitle || '',
          size: 20,
          color: 'E9D5FF',
          font
        })
      ]
    })
  ];

  // Contact
  sidebarParagraphs.push(
    new Paragraph({
      spacing: { before: 100, after: 40 },
      border: { bottom: { color: 'FFFFFF', space: 2, style: BorderStyle.SINGLE, size: 6 } },
      children: [
        new TextRun({
          text: 'CONTACT',
          bold: true,
          size: 20,
          color: 'FFFFFF',
          font
        })
      ]
    })
  );

  [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.portfolio].filter(Boolean).forEach(c => {
    sidebarParagraphs.push(
      new Paragraph({
        spacing: { before: 20, after: 20 },
        children: [
          new TextRun({
            text: c!,
            size: 18,
            color: 'F3E8FF',
            font
          })
        ]
      })
    );
  });

  // Skills in creative sidebar
  if (skills && skills.length > 0) {
    sidebarParagraphs.push(
      new Paragraph({
        spacing: { before: 120, after: 40 },
        border: { bottom: { color: 'FFFFFF', space: 2, style: BorderStyle.SINGLE, size: 6 } },
        children: [
          new TextRun({
            text: 'CREATIVE SKILLS',
            bold: true,
            size: 20,
            color: 'FFFFFF',
            font
          })
        ]
      })
    );

    skills.forEach(s => {
      sidebarParagraphs.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { before: 20, after: 20 },
          children: [
            new TextRun({
              text: s.name,
              size: 18,
              color: 'FFFFFF',
              font
            })
          ]
        })
      );
    });
  }

  // Languages
  if (languages && languages.length > 0) {
    sidebarParagraphs.push(
      new Paragraph({
        spacing: { before: 120, after: 40 },
        border: { bottom: { color: 'FFFFFF', space: 2, style: BorderStyle.SINGLE, size: 6 } },
        children: [
          new TextRun({
            text: 'LANGUAGES',
            bold: true,
            size: 20,
            color: 'FFFFFF',
            font
          })
        ]
      })
    );
    languages.forEach(l => {
      sidebarParagraphs.push(
        new Paragraph({
          spacing: { before: 20, after: 20 },
          children: [
            new TextRun({
              text: `${l.name} (${l.proficiency})`,
              size: 17,
              color: 'F3E8FF',
              font
            })
          ]
        })
      );
    });
  }

  // Right Column (Main content)
  const mainParagraphs: Paragraph[] = [];

  const createCreativeMainHeading = (title: string): Paragraph => {
    return new Paragraph({
      spacing: { before: 160, after: 60 },
      border: { bottom: { color: accentHex, space: 3, style: BorderStyle.SINGLE, size: 10 } },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 22,
          color: accentHex,
          font
        })
      ]
    });
  };

  if (summary) {
    mainParagraphs.push(createCreativeMainHeading('Creative Profile'));
    mainParagraphs.push(
      new Paragraph({
        spacing: { before: 40, after: 100 },
        children: [
          new TextRun({
            text: summary.trim(),
            size: 20,
            color: '334155',
            font
          })
        ]
      })
    );
  }

  if (experience && experience.length > 0) {
    mainParagraphs.push(createCreativeMainHeading('Experience'));
    experience.forEach(exp => {
      mainParagraphs.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({
              text: exp.jobTitle,
              bold: true,
              size: 21,
              color: '0f172a',
              font
            }),
            new TextRun({
              text: exp.company ? `  —  ${exp.company}` : '',
              bold: true,
              size: 20,
              color: accentHex,
              font
            })
          ]
        })
      );

      if (exp.description) {
        mainParagraphs.push(
          new Paragraph({
            spacing: { before: 20, after: 30 },
            children: [
              new TextRun({
                text: exp.description,
                size: 19,
                color: '475569',
                font
              })
            ]
          })
        );
      }
    });
  }

  if (education && education.length > 0) {
    mainParagraphs.push(createCreativeMainHeading('Education'));
    education.forEach(edu => {
      mainParagraphs.push(
        new Paragraph({
          spacing: { before: 60, after: 20 },
          children: [
            new TextRun({
              text: `${edu.degree} — ${edu.institution}`,
              bold: true,
              size: 20,
              color: '0f172a',
              font
            })
          ]
        })
      );
    });
  }

  const creativeTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 34, type: WidthType.PERCENTAGE },
            shading: { fill: accentHex },
            margins: { top: 180, bottom: 180, left: 160, right: 160 },
            children: sidebarParagraphs
          }),
          new TableCell({
            width: { size: 66, type: WidthType.PERCENTAGE },
            margins: { top: 180, bottom: 180, left: 240, right: 120 },
            children: mainParagraphs
          })
        ]
      })
    ]
  });

  return new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 }
          }
        },
        children: [creativeTable]
      }
    ]
  });
};

// ============================================================================
// 6. PROFESSIONAL TEMPLATE WORD GENERATOR (Structured Corporate)
// ============================================================================
const createProfessionalWordDoc = (resume: ResumeData, accentHex: string, font: string): Document => {
  const { personalInfo, summary, experience, education, skills, projects } = resume;

  // Header Table with 2 cells (Left: Name & Title, Right: Contact)
  const headerTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.SINGLE, color: accentHex, size: 14 },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 60, type: WidthType.PERCENTAGE },
            margins: { bottom: 120 },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE }
            },
            children: [
              new Paragraph({
                spacing: { before: 0, after: 20 },
                children: [
                  new TextRun({
                    text: personalInfo.fullName || 'Resume',
                    bold: true,
                    size: 38,
                    color: '0f172a',
                    font
                  })
                ]
              }),
              new Paragraph({
                spacing: { before: 0, after: 40 },
                children: [
                  new TextRun({
                    text: personalInfo.professionalTitle || '',
                    bold: true,
                    size: 21,
                    color: accentHex,
                    font
                  })
                ]
              })
            ]
          }),
          new TableCell({
            width: { size: 40, type: WidthType.PERCENTAGE },
            margins: { bottom: 120 },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE }
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { before: 0, after: 20 },
                children: [
                  new TextRun({
                    text: personalInfo.email || '',
                    size: 18,
                    color: '475569',
                    font
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { before: 0, after: 20 },
                children: [
                  new TextRun({
                    text: personalInfo.phone || '',
                    size: 18,
                    color: '475569',
                    font
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { before: 0, after: 20 },
                children: [
                  new TextRun({
                    text: personalInfo.location || '',
                    size: 18,
                    color: '64748b',
                    font
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });

  const bodyParagraphs: Paragraph[] = [
    new Paragraph({ spacing: { before: 0, after: 80 }, children: [] })
  ];

  const createProfHeading = (title: string): Paragraph => {
    return new Paragraph({
      spacing: { before: 180, after: 60 },
      border: {
        bottom: {
          color: accentHex,
          space: 3,
          style: BorderStyle.SINGLE,
          size: 8
        }
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 21,
          color: accentHex,
          font
        })
      ]
    });
  };

  if (summary) {
    bodyParagraphs.push(createProfHeading('Executive Summary'));
    bodyParagraphs.push(
      new Paragraph({
        spacing: { before: 40, after: 120 },
        children: [
          new TextRun({
            text: summary.trim(),
            size: 20,
            color: '334155',
            font
          })
        ]
      })
    );
  }

  if (experience && experience.length > 0) {
    bodyParagraphs.push(createProfHeading('Professional Experience'));
    experience.forEach(exp => {
      const dates = `${exp.startDate || ''} – ${exp.isCurrent ? 'Present' : exp.endDate || ''}`;
      bodyParagraphs.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({
              text: exp.jobTitle,
              bold: true,
              size: 21,
              color: '0f172a',
              font
            }),
            new TextRun({
              text: exp.company ? `  |  ${exp.company}` : '',
              bold: true,
              size: 20,
              color: accentHex,
              font
            }),
            new TextRun({
              text: ` (${dates})`,
              italics: true,
              size: 18,
              color: '64748b',
              font
            })
          ]
        })
      );

      if (exp.description) {
        const lines = exp.description.split('\n').map(l => l.trim()).filter(Boolean);
        lines.forEach(line => {
          bodyParagraphs.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { before: 20, after: 20 },
              children: [
                new TextRun({
                  text: line.replace(/^[•\-\*]\s*/, ''),
                  size: 19,
                  color: '334155',
                  font
                })
              ]
            })
          );
        });
      }
    });
  }

  if (education && education.length > 0) {
    bodyParagraphs.push(createProfHeading('Education'));
    education.forEach(edu => {
      bodyParagraphs.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({
              text: `${edu.degree} — ${edu.institution}`,
              bold: true,
              size: 20,
              color: '0f172a',
              font
            }),
            new TextRun({
              text: ` (${edu.startDate || ''} – ${edu.endDate || ''})`,
              size: 18,
              color: '64748b',
              font
            })
          ]
        })
      );
    });
  }

  if (skills && skills.length > 0) {
    bodyParagraphs.push(createProfHeading('Key Competencies & Technical Skills'));
    bodyParagraphs.push(
      new Paragraph({
        spacing: { before: 60, after: 80 },
        children: [
          new TextRun({
            text: skills.map(s => s.name).join('   •   '),
            size: 20,
            color: '334155',
            font
          })
        ]
      })
    );
  }

  return new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 900, right: 900, bottom: 900, left: 900 }
          }
        },
        children: [headerTable, ...bodyParagraphs]
      }
    ]
  });
};

/**
 * Universal browser Blob trigger helper
 */
const downloadBlob = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.style.display = 'none';
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  setTimeout(() => {
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  }, 200);
};

/**
 * Template-Matching HTML-based Word document (.doc) Fallback
 * Formats according to the selected template: Modern, Classic, Minimal, Executive, Creative, Professional
 */
const exportWordHtmlFallback = (resume: ResumeData, fileName: string): boolean => {
  try {
    const docName = fileName.replace(/\.docx$/i, '.doc');
    const { personalInfo, summary, experience, education, skills, projects, languages } = resume;
    const templateId = resume.customization?.template || 'modern';
    const accent = resume.customization?.accentColor || '#2563eb';

    let bodyHtml = '';

    if (templateId === 'executive') {
      bodyHtml = `
        <div style="background-color: ${accent}; color: #ffffff; padding: 24pt 20pt; margin-bottom: 20pt;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24pt;">${personalInfo.fullName || 'Resume'}</h1>
          <div style="color: #e2e8f0; font-size: 12pt; text-transform: uppercase; margin-top: 4pt; font-weight: bold;">${personalInfo.professionalTitle || ''}</div>
          <div style="color: #cbd5e1; font-size: 9.5pt; margin-top: 8pt;">
            ${[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin].filter(Boolean).join(' &bull; ')}
          </div>
        </div>
        ${summary ? `<h2 style="color: ${accent}; border-bottom: 2pt solid ${accent}; font-size: 13pt;">EXECUTIVE SUMMARY</h2><p>${summary}</p>` : ''}
        ${experience && experience.length > 0 ? `
          <h2 style="color: ${accent}; border-bottom: 2pt solid ${accent}; font-size: 13pt;">LEADERSHIP EXPERIENCE</h2>
          ${experience.map(e => `
            <div style="font-weight: bold; margin-top: 8pt;">${e.jobTitle} &mdash; ${e.company} (${e.startDate} - ${e.isCurrent ? 'Present' : e.endDate})</div>
            <div>${e.description.replace(/\n/g, '<br>')}</div>
          `).join('')}
        ` : ''}
        ${skills && skills.length > 0 ? `<h2 style="color: ${accent}; border-bottom: 2pt solid ${accent}; font-size: 13pt;">COMPETENCIES</h2><p>${skills.map(s => s.name).join(' &bull; ')}</p>` : ''}
      `;
    } else if (templateId === 'creative') {
      bodyHtml = `
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="width: 34%; background-color: ${accent}; color: #ffffff; padding: 20pt; vertical-align: top;">
              <h1 style="color: #ffffff; font-size: 20pt; margin: 0;">${personalInfo.fullName}</h1>
              <div style="color: #e9d5ff; font-size: 10pt; margin-bottom: 16pt;">${personalInfo.professionalTitle}</div>
              <h3 style="color: #ffffff; border-bottom: 1pt solid #ffffff; padding-bottom: 4pt; font-size: 10pt;">CONTACT</h3>
              <p style="color: #f3e8ff; font-size: 9pt;">${[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join('<br>')}</p>
              ${skills && skills.length > 0 ? `
                <h3 style="color: #ffffff; border-bottom: 1pt solid #ffffff; padding-bottom: 4pt; font-size: 10pt; margin-top: 16pt;">SKILLS</h3>
                <p style="color: #ffffff; font-size: 9pt;">${skills.map(s => s.name).join('<br>')}</p>
              ` : ''}
            </td>
            <td style="width: 66%; padding: 20pt; vertical-align: top;">
              ${summary ? `<h2 style="color: ${accent}; border-bottom: 1.5pt solid ${accent}; font-size: 12pt;">PROFILE</h2><p>${summary}</p>` : ''}
              ${experience && experience.length > 0 ? `
                <h2 style="color: ${accent}; border-bottom: 1.5pt solid ${accent}; font-size: 12pt;">EXPERIENCE</h2>
                ${experience.map(e => `
                  <div style="font-weight: bold; margin-top: 8pt;">${e.jobTitle} &mdash; ${e.company}</div>
                  <div style="color: #64748b; font-size: 9pt;">${e.startDate} - ${e.isCurrent ? 'Present' : e.endDate}</div>
                  <div>${e.description.replace(/\n/g, '<br>')}</div>
                `).join('')}
              ` : ''}
            </td>
          </tr>
        </table>
      `;
    } else if (templateId === 'classic') {
      bodyHtml = `
        <div style="text-align: center; border-bottom: 2pt solid ${accent}; padding-bottom: 12pt; margin-bottom: 16pt; font-family: Georgia, serif;">
          <h1 style="color: #0f172a; margin: 0; font-size: 22pt; text-transform: uppercase;">${personalInfo.fullName}</h1>
          <div style="color: #475569; font-size: 12pt; font-style: italic; margin-top: 4pt;">${personalInfo.professionalTitle}</div>
          <div style="color: #64748b; font-size: 9.5pt; margin-top: 6pt;">
            ${[personalInfo.location, personalInfo.email, personalInfo.phone, personalInfo.linkedin].filter(Boolean).join(' &bull; ')}
          </div>
        </div>
        ${summary ? `<h2 style="color: ${accent}; border-bottom: 1pt solid #cbd5e1; font-size: 12pt; font-family: Georgia, serif;">PROFESSIONAL SUMMARY</h2><p style="font-family: Georgia, serif;">${summary}</p>` : ''}
        ${experience && experience.length > 0 ? `
          <h2 style="color: ${accent}; border-bottom: 1pt solid #cbd5e1; font-size: 12pt; font-family: Georgia, serif;">WORK EXPERIENCE</h2>
          ${experience.map(e => `
            <div style="font-weight: bold; margin-top: 8pt; font-family: Georgia, serif;">${e.jobTitle} &mdash; ${e.company} (${e.startDate} - ${e.isCurrent ? 'Present' : e.endDate})</div>
            <div style="font-family: Georgia, serif;">${e.description.replace(/\n/g, '<br>')}</div>
          `).join('')}
        ` : ''}
        ${education && education.length > 0 ? `
          <h2 style="color: ${accent}; border-bottom: 1pt solid #cbd5e1; font-size: 12pt; font-family: Georgia, serif;">EDUCATION</h2>
          ${education.map(ed => `
            <div style="font-weight: bold; font-family: Georgia, serif;">${ed.degree} &mdash; ${ed.institution} (${ed.startDate} - ${ed.endDate})</div>
          `).join('')}
        ` : ''}
        ${skills && skills.length > 0 ? `<h2 style="color: ${accent}; border-bottom: 1pt solid #cbd5e1; font-size: 12pt; font-family: Georgia, serif;">SKILLS</h2><p style="font-family: Georgia, serif;">${skills.map(s => s.name).join(' &bull; ')}</p>` : ''}
      `;
    } else {
      // Modern / Minimal / Professional default structure
      bodyHtml = `
        <div style="border-bottom: 2pt solid ${accent}; padding-bottom: 10pt; margin-bottom: 16pt;">
          <h1 style="color: #0f172a; margin: 0; font-size: 22pt;">${personalInfo.fullName}</h1>
          <div style="color: ${accent}; font-size: 12pt; font-weight: bold; margin-top: 3pt;">${personalInfo.professionalTitle}</div>
          <div style="color: #64748b; font-size: 9.5pt; margin-top: 6pt;">
            ${[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.portfolio].filter(Boolean).join(' &bull; ')}
          </div>
        </div>
        ${summary ? `<h2 style="color: ${accent}; border-bottom: 1.5pt solid ${accent}; font-size: 12pt;">PROFESSIONAL SUMMARY</h2><p>${summary}</p>` : ''}
        ${experience && experience.length > 0 ? `
          <h2 style="color: ${accent}; border-bottom: 1.5pt solid ${accent}; font-size: 12pt;">WORK EXPERIENCE</h2>
          ${experience.map(e => `
            <div style="font-weight: bold; margin-top: 8pt;">${e.jobTitle} &mdash; ${e.company} (${e.startDate} - ${e.isCurrent ? 'Present' : e.endDate})</div>
            <div>${e.description.replace(/\n/g, '<br>')}</div>
          `).join('')}
        ` : ''}
        ${education && education.length > 0 ? `
          <h2 style="color: ${accent}; border-bottom: 1.5pt solid ${accent}; font-size: 12pt;">EDUCATION</h2>
          ${education.map(ed => `
            <div style="font-weight: bold;">${ed.degree} &mdash; ${ed.institution} (${ed.startDate} - ${ed.endDate})</div>
          `).join('')}
        ` : ''}
        ${skills && skills.length > 0 ? `<h2 style="color: ${accent}; border-bottom: 1.5pt solid ${accent}; font-size: 12pt;">SKILLS</h2><p>${skills.map(s => s.name).join(' &bull; ')}</p>` : ''}
      `;
    }

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>${personalInfo.fullName} - Resume (${templateId})</title>
        <style>
          body { font-family: Calibri, Arial, sans-serif; font-size: 10.5pt; color: #1e293b; line-height: 1.4; margin: 20pt; }
          h1, h2, h3 { margin-bottom: 4pt; }
          p { margin-top: 2pt; margin-bottom: 6pt; }
        </style>
      </head>
      <body>
        ${bodyHtml}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword;charset=utf-8'
    });
    downloadBlob(blob, docName);
    return true;
  } catch (err) {
    console.error('Failed to export fallback Word document:', err);
    return false;
  }
};
