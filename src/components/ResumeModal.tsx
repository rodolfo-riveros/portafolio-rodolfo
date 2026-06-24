import { MapPin, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-primary/20 bg-[#06101c] text-[#d4e4fa] shadow-2xl p-6 md:p-10 glass-panel-heavy z-10 print:p-0 print:border-none print:bg-white print:text-black"
        >
          {/* Action Header */}
          <div className="flex justify-between items-center mb-8 border-b border-outline-variant/20 pb-4 print:hidden">
            <span className="text-secondary font-mono text-xs tracking-widest uppercase">CURRICULUM VITAE</span>
            <div className="flex gap-4">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#122131] border border-outline-variant/30 hover:border-secondary hover:text-secondary text-primary transition-all text-xs font-mono cursor-pointer"
              >
                <Download className="w-4 h-4" /> IMPRIMIR / GUARDAR
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-[#122131]/60 hover:bg-red-500/20 text-outline hover:text-red-400 transition-all border border-outline-variant/20 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Resume Body */}
          <div className="space-y-8 print:text-black">
            {/* Header */}
            <div className="border-b border-outline-variant/10 pb-6">
              <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight print:text-black">RODOLFO RIVEROS MITMA</h1>
              <p className="text-secondary font-mono text-sm tracking-widest uppercase mt-2 print:text-emerald-700">Ingeniero de Sistemas</p>
              <div className="mt-3 font-mono text-xs text-outline space-y-1 print:text-gray-600">
                <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-secondary" /> Urubamba, Cusco</p>
                <p>927877726 | riveros70397516@gmail.com</p>
              </div>
            </div>

            {/* Sobre Mi */}
            <div className="space-y-3">
              <h3 className="font-headline font-bold text-primary text-lg tracking-wide uppercase border-l-2 border-secondary pl-3 print:text-black print:border-emerald-600">SOBRE MÍ</h3>
              <p className="text-sm text-outline leading-relaxed print:text-gray-700">
                Profesional en Ingeniería de Sistemas con capacidad de trabajo en equipo, carácter dinámico y entusiasta. Enfocado en aplicar mis conocimientos técnicos y experiencia en instituciones o empresas que busquen soluciones tecnológicas de alto impacto.
              </p>
            </div>

            {/* Experiencia Laboral */}
            <div className="space-y-6">
              <h3 className="font-headline font-bold text-primary text-lg tracking-wide uppercase border-l-2 border-secondary pl-3 print:text-black print:border-emerald-600">EXPERIENCIA LABORAL</h3>

              <div className="space-y-6 relative border-l border-outline-variant/20 pl-4 ml-2">
                {/* Job 1 */}
                <div className="relative space-y-1.5">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-secondary border-4 border-[#06101c] print:bg-emerald-600" />
                  <h4 className="font-headline font-bold text-primary text-md print:text-black">Instituto de Educación Superior Público LA SALLE (Urubamba-Cusco)</h4>
                  <p className="text-secondary font-mono text-xs uppercase print:text-emerald-700">Docente contratado</p>
                  <p className="font-mono text-xs text-outline print:text-gray-600">Abril 2026 – Diciembre2026</p>
                  <p className="font-mono text-xs text-outline print:text-gray-600">Marzo 2025 – Diciembre 2025</p>
                  <p className="font-mono text-xs text-outline print:text-gray-600">Junio 2024 – Diciembre 2024</p>
                </div>

                {/* Job 2 */}
                <div className="relative space-y-1.5">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-primary-fixed-dim border-4 border-[#06101c] print:bg-cyan-600" />
                  <h4 className="font-headline font-bold text-primary text-md print:text-black">Unidad de Gestión Educativa Local de Urubamba (Urubamba-Cusco)</h4>
                  <p className="text-secondary font-mono text-xs uppercase print:text-emerald-700">Técnico en AIRHSP</p>
                  <p className="font-mono text-xs text-outline print:text-gray-600">Febrero 2024 – Junio 2024</p>
                </div>

                {/* Job 3 */}
                <div className="relative space-y-1.5">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-outline border-4 border-[#06101c] print:bg-gray-500" />
                  <h4 className="font-headline font-bold text-primary text-md print:text-black">Unidad de Gestión Educativa Local de Urubamba (Urubamba-Cusco)</h4>
                  <p className="text-secondary font-mono text-xs uppercase print:text-emerald-700">Apoyo en AIRHSP</p>
                  <p className="font-mono text-xs text-outline print:text-gray-600">Agosto 2023 – Diciembre 2023</p>
                </div>

                {/* Job 4 */}
                <div className="relative space-y-1.5">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-primary/30 border-4 border-[#06101c] print:border-gray-400" />
                  <h4 className="font-headline font-bold text-primary text-md print:text-black">Unidad de Gestión Educativa Local de Urubamba (Urubamba-Cusco)</h4>
                  <p className="text-secondary font-mono text-xs uppercase print:text-emerald-700">Soporte técnico (Prácticas profesionales)</p>
                  <p className="font-mono text-xs text-outline print:text-gray-600">Abril 2023 – Julio 2023</p>
                </div>
              </div>
            </div>

            {/* Formación Académica */}
            <div className="space-y-3">
              <h3 className="font-headline font-bold text-primary text-lg tracking-wide uppercase border-l-2 border-secondary pl-3 print:text-black print:border-emerald-600">FORMACIÓN ACADÉMICA</h3>
              <div className="bg-[#0b141f]/60 p-4 rounded-xl border border-outline-variant/15 space-y-2 print:bg-gray-100 print:text-black">
                <h4 className="font-bold text-primary text-sm print:text-black">Ingeniero de Sistemas</h4>
                <p className="text-xs font-mono text-secondary print:text-emerald-700">Universidad Nacional "José María Arguedas" (UNAJMA)</p>
              </div>
            </div>

            {/* Proyectos y Actividades Académicas */}
            <div className="space-y-3">
              <h3 className="font-headline font-bold text-primary text-lg tracking-wide uppercase border-l-2 border-secondary pl-3 print:text-black print:border-emerald-600">PROYECTOS Y ACTIVIDADES ACADÉMICAS</h3>
              <div className="space-y-2 text-sm text-outline leading-relaxed print:text-gray-700">
                <p>• Colaborador en el proyecto: Influencia de una herramienta de visualización interactiva guiada en la detección de patrones cíclicos en series temporales (Resolución N° 034-2023-CO-UNAJMA y N° 0456-2022-CO-UNAJMA).</p>
                <p>• Vicepresidente del comité electoral de la Escuela Profesional de Ingeniería de Sistemas (2019).</p>
              </div>
            </div>

            {/* Capacitaciones y Cursos Relevantes */}
            <div className="space-y-3">
              <h3 className="font-headline font-bold text-primary text-lg tracking-wide uppercase border-l-2 border-secondary pl-3 print:text-black print:border-emerald-600">CAPACITACIONES Y CURSOS RELEVANTES</h3>
              <div className="space-y-1 text-sm text-outline leading-relaxed print:text-gray-700">
                <p>• Curso Taller de Metodologías de Aprendizaje y Sistemas de Evaluación (2025)</p>
                <p>• Curso de Flutter (2025)</p>
                <p>• Curso de Introducción a la Programación de Videojuegos 3D en Unity (2025)</p>
                <p>• Curso E-Learning Transformación Digital en el Perú - PCM (2024)</p>
                <p>• Curso Taller de Aplicación CRUD con PHP y MySQL (2022)</p>
                <p>• V Congreso Internacional de Ingeniería de Sistemas - Universidad de Lima (2022)</p>
                <p>• Curso Taller de Fortalecimiento en Especialización de Ingeniería de Sistemas (2023)</p>
                <p>• Capacitaciones en Ofimática en la nube, Corel Draw y Soporte Técnico Remoto (2024)</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
