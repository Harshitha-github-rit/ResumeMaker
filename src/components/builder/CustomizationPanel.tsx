import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { DEFAULT_RESUME } from '../../data/sampleResumes';
import { CustomizationSettings, FontSizeOption, SpacingOption, MarginOption, HeadingStyleOption } from '../../types';
import { Palette, Type, Sliders, Check, X, Image as ImageIcon } from 'lucide-react';

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

const FONTS = [
  { id: 'font-sans', name: 'Plus Jakarta Sans', category: 'Modern Sans' },
  { id: 'font-inter', name: 'Inter', category: 'Clean Sans' },
  { id: 'font-outfit', name: 'Outfit', category: 'Geometric' },
  { id: 'font-playfair', name: 'Playfair Display', category: 'Editorial Serif' },
  { id: 'font-merriweather', name: 'Merriweather', category: 'Classic Serif' },
  { id: 'font-mono', name: 'Roboto Mono', category: 'Technical Mono' },
];

export const CustomizationPanel: React.FC<Props> = ({ isOpen, onClose }) => {
  const { currentResume, updateCustomization } = useResume();
  const customization = currentResume?.customization || DEFAULT_RESUME.customization;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-2xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">Customize Resume Style</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
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

          {/* 2. Typography Font */}
          <div>
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2">
              <Type className="w-3.5 h-3.5 text-slate-500" />
              Font Family
            </label>
            <div className="space-y-1.5">
              {FONTS.map(f => (
                <div
                  key={f.id}
                  onClick={() => updateCustomization({ fontFamily: f.id })}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    customization.fontFamily === f.id
                      ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-900">{f.name}</p>
                    <p className="text-[10px] text-slate-400">{f.category}</p>
                  </div>
                  {customization.fontFamily === f.id && <Check className="w-4 h-4 text-blue-600" />}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* 3. Font Size */}
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-2">Font Size Scaling</label>
            <div className="grid grid-cols-3 gap-2">
              {(['compact', 'normal', 'large'] as FontSizeOption[]).map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => updateCustomization({ fontSize: size })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition-all ${
                    customization.fontSize === size
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Line Spacing */}
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-2">Section & Line Spacing</label>
            <div className="grid grid-cols-3 gap-2">
              {(['tight', 'normal', 'relaxed'] as SpacingOption[]).map(sp => (
                <button
                  key={sp}
                  type="button"
                  onClick={() => updateCustomization({ spacing: sp })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition-all ${
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
                  className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition-all ${
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
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Footer with Close */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            Apply & Close
          </button>
        </div>

      </div>
    </div>
  );
};
