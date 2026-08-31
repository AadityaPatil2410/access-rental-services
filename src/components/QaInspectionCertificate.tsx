import React from 'react';
import { ShieldCheck, CheckCircle2, Award, Zap, Sparkles, FileText } from 'lucide-react';

interface QaInspectionCertificateProps {
  serialNumber?: string;
  inspector?: string;
  lampHealth?: string;
  compact?: boolean;
}

export const QaInspectionCertificate: React.FC<QaInspectionCertificateProps> = ({
  serialNumber = 'EP-3LCD-994821',
  inspector = 'A. S. Verma (Senior QA Specialist)',
  lampHealth = '98.5% (High Brightness Output Verified)',
  compact = false,
}) => {
  if (compact) {
    return (
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <ShieldCheck size={16} />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-semibold text-emerald-950">
              <span>Tested Before Dispatch</span>
              <span className="bg-emerald-200/80 text-emerald-900 text-[10px] px-1.5 py-0.2 rounded font-semibold">100% PASS</span>
            </div>
            <p className="text-emerald-800 text-[11px] mt-0.5">Lamp life: {lampHealth} • Clean optical path</p>
          </div>
        </div>
        <span className="text-[10px] font-mono text-emerald-700 font-medium hidden sm:inline">QA #{serialNumber}</span>
      </div>
    );
  }

  return (
    <div className="bg-white border border-emerald-200 rounded-xl p-5 shadow-xs relative overflow-hidden" id="qa-certificate-card">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Pre-Dispatch QA Certification</h4>
              <span className="bg-emerald-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider">
                Verified
              </span>
            </div>
            <p className="text-xs text-slate-500">Every ACCESS unit is physically inspected and stress-tested before dispatch.</p>
          </div>
        </div>
      </div>

      {/* Checklist items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 my-3.5 bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
          <span><strong>Lamp Lumen Output:</strong> {lampHealth}</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
          <span><strong>Ports & Audio:</strong> HDMI 2.0 & AUX 3.5mm Pass</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
          <span><strong>Optics:</strong> Lens cleaned, dust-free & focused</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
          <span><strong>Sanitization:</strong> 100% Disinfected & Box Sealed</span>
        </div>
      </div>

      {/* Meta details */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
        <div>
          <span>QA Inspector: </span>
          <span className="text-slate-800 font-medium">{inspector}</span>
        </div>
        <div>
          <span>Certificate Ref: </span>
          <span className="text-emerald-800 font-semibold">{serialNumber}</span>
        </div>
      </div>
    </div>
  );
};
