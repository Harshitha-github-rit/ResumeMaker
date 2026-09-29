import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { DEFAULT_RESUME } from '../../data/sampleResumes';
import { CustomizationSettings, FontSizeOption, SpacingOption, MarginOption, HeadingStyleOption } from '../../types';
import { Palette, Type, Sliders, Check, X, Image as ImageIcon, Sparkles, Minus, Plus } from 'lucide-react';
import { AVAILABLE_FONTS, AVAILABLE_FONT_SIZES, FontDefinition, FontSizeDefinition } from '../templates/templateStyles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const COLOR_PALETTES = [
  { name: 'Royal Blue', hex: '#2563eb' },
  { name: 'Navy Slate', hex: '#1e293b' },
  { name: 'Deep Indigo', hex: '#312e81' },
  { name: 'Vibrant Violet', hex: '#7c3aed' },
  { name: 'Emerald Forest', hex: '#059669' },
  { name: 'Crimson Rose', hex: '#e11d48' },
  { name: 'Warm Amber', hex: '#d97706' },
  { name: 'Steel Charcoal', hex: '#334155' },
];

export const CustomizationPanel: React.FC<Props> = ({ isOpen, onClose }) => {
  const { currentResume, updateCustomization } = useResume();
  const customization = currentResume?.customization || DEFAULT_RESUME.customization;
  const [selectedFontCategory, setSelectedFontCategory] = useState<string>('all');

  if (!isOpen) return null;

  const currentSizeIndex = AVAILABLE_FONT_SIZES.findIndex(
    s => s.id === (customization.fontSize || 'normal')
  );
  const effectiveSizeIndex = currentSizeIndex >= 0 ? currentSizeIndex : 2;

  const handleStepFontSize = (delta: number) => {
    const nextIndex = Math.max(0, Math.min(AVAILABLE_FONT_SIZES.length - 1, effectiveSizeIndex + delta));
    updateCustomization({ fontSize: AVAILABLE_FONT_SIZES[nextIndex].id });
  };

  const filteredFonts = selectedFontCategory === 'all'
    ? AVAILABLE_FONTS
    : AVAILABLE_FONTS.filter(f => f.category === selectedFontCategory);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-2xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">Customize Resume Typography & Style</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Customization Options Body */}
        <div className="p-5 space-y-6 flex-1">
          {/* 1. Accent Color */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-slate-500" />
                Accent Color
              </label>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border" style={{ backgroundColor: customization.accentColor }} />
                <span className="text-[11px] font-mono text-slate-500">{customization.accentColor}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-3">
              {COLOR_PALETTES.map(color => (
                <button
                  key={color.hex}
                  type="button"
                  onClick={() => updateCustomization({ accentColor: color.hex })}
                  className="p-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer hover:border-slate-400"
                  style={{
                    borderColor: customization.accentColor === color.hex ? color.hex : '#e2e8f0',
                    backgroundColor: customization.accentColor === color.hex ? `${color.hex}10` : 'transparent'
                  }}
                >
                  <span className="w-5 h-5 rounded-full shadow-xs flex items-center justify-center text-white" style={{ backgroundColor: color.hex }}>
                    {customization.accentColor === color.hex && <Check className="w-3 h-3 stroke-[3]" />}
                  </span>
                  <span className="text-[10px] text-slate-600 truncate w-full text-center">{color.name}</span>
                </button>
              ))}
            </div>

            {/* Custom Hex Picker Input */}
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customization.accentColor}
                onChange={e => updateCustomization({ accentColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 p-0.5"
              />
              <input
                type="text"
                placeholder="#2563eb"
                value={customization.accentColor}
                onChange={e => updateCustomization({ accentColor: e.target.value })}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 font-mono w-28 uppercase"
              />
              <span className="text-[11px] text-slate-400">Custom hex</span>
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* 2. Typography Font Names & Writing Styles */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-blue-600" />
                <span>Font Name & Writing Style</span>
              </label>
              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                {AVAILABLE_FONTS.length} Fonts Available
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">
              Choose your preferred handwriting, modern sans, or editorial serif font. Your resume immediately applies your choice.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1 mb-3">
              {[
                { id: 'all', label: 'All Styles' },
                { id: 'Handwriting', label: '✍️ Handwriting' },
                { id: 'Clean Sans', label: '✨ Clean Sans' },
                { id: 'Editorial Serif', label: '🏛️ Serif' },
                { id: 'Monospace', label: '💻 Monospace' }
              ].map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedFontCategory(cat.id)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedFontCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Font Cards List */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {filteredFonts.map(f => {
                const isSelected = customization.fontFamily === f.id ||
                  (f.id === 'font-jakarta' && (!customization.fontFamily || customization.fontFamily === 'font-sans'));
                return (
                  <div
                    key={f.id}
                    onClick={() => updateCustomization({ fontFamily: f.id })}
                    className={`p-3 rounded-xl border flex flex-col gap-1.5 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-slate-900">{f.name}</p>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                          {f.category}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-blue-600">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          Active
                        </span>
                      )}
                    </div>

                    <p className="text-[10.5px] text-slate-500">
                      {f.writingStyle}
                    </p>

                    {/* Live Preview Text Rendered in this Exact Font */}
                    <div
                      className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[13px] text-slate-800 tracking-normal"
                      style={{ fontFamily: f.fontFamilyCss }}
                    >
                      {f.previewText || 'Resume typography preview sample'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* 3. Font Size Scaling with Point Sizes & Stepper */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-600" />
                <span>Resume Font Size</span>
              </label>

              {/* Stepper buttons A- / A+ */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleStepFontSize(-1)}
                  disabled={effectiveSizeIndex === 0}
                  className="px-2 py-0.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-white rounded disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Make font size smaller (A-)"
                >
                  A-
                </button>
                <span className="text-[10px] font-mono px-1 font-bold text-blue-700">
                  {AVAILABLE_FONT_SIZES[effectiveSizeIndex].pt}
                </span>
                <button
                  type="button"
                  onClick={() => handleStepFontSize(1)}
                  disabled={effectiveSizeIndex === AVAILABLE_FONT_SIZES.length - 1}
                  className="px-2 py-0.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-white rounded disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Make font size larger (A+)"
                >
                  A+
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mb-3">
              People can choose whichever font size fits their resume content best.
            </p>

            {/* Grid of all 6 Font Sizes */}
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_FONT_SIZES.map((sizeDef, idx) => {
                const isSelected = customization.fontSize === sizeDef.id ||
                  (!customization.fontSize && sizeDef.id === 'normal');
                return (
                  <button
                    key={sizeDef.id}
                    type="button"
                    onClick={() => updateCustomization({ fontSize: sizeDef.id })}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-600 ring-1 ring-blue-600 shadow-2xs'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-slate-900">{sizeDef.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      {sizeDef.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* 4. Line Spacing */}
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-2">Section & Line Spacing</label>
            <div className="grid grid-cols-3 gap-2">
              {(['tight', 'normal', 'relaxed'] as SpacingOption[]).map(sp => (
                <button
                  key={sp}
                  type="button"
                  onClick={() => updateCustomization({ spacing: sp })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition-all cursor-pointer ${
                    customization.spacing === sp
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {sp}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Page Margins */}
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-2">Page Margins</label>
            <div className="grid grid-cols-3 gap-2">
              {(['compact', 'normal', 'wide'] as MarginOption[]).map(mg => (
                <button
                  key={mg}
                  type="button"
                  onClick={() => updateCustomization({ margins: mg })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition-all cursor-pointer ${
                    customization.margins === mg
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {mg}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Profile Photo Toggle */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-slate-500" />
              <div>
                <p className="text-xs font-bold text-slate-800">Show Profile Photo</p>
                <p className="text-[10px] text-slate-400">Toggle avatar image on template header</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={customization.showPhoto}
              onChange={e => updateCustomization({ showPhoto: e.target.checked })}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Footer with Close */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Apply & Close
          </button>
        </div>

      </div>
    </div>
  );
};
