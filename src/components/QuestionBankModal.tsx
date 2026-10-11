import React, { useState } from 'react';
import { Question } from '../types';
import { X, Database, Plus, RefreshCw, Download, Check, AlertCircle } from 'lucide-react';
import { INITIAL_QUESTIONS } from '../data/questions';

interface QuestionBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  onUpdateQuestions: (newQuestions: Question[]) => void;
}

export const QuestionBankModal: React.FC<QuestionBankModalProps> = ({
  isOpen,
  onClose,
  questions,
  onUpdateQuestions,
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'import'>('list');
  const [sheetUrl, setSheetUrl] = useState(
    'https://script.google.com/macros/s/AKfycbxOu8z7Rz2Z5cmSDcj364WsmaglXpv8b70cw8FmRhKiWLZaeV48YF-hnYzkPVqDgM336g/exec?sheetId=1b4esXlNYMVT8TSAycIiqWf7HyufFgUnd1ncxU19jiY8'
  );
  const [csvText, setCsvText] = useState('');
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state for adding custom question
  const [newQText, setNewQText] = useState('');
  const [newQCorrect, setNewQCorrect] = useState('');
  const [newQD1, setNewQD1] = useState('');
  const [newQD2, setNewQD2] = useState('');
  const [newQD3, setNewQD3] = useState('');
  const [newQExplanation, setNewQExplanation] = useState('');

  if (!isOpen) return null;

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQText.trim() || !newQCorrect.trim() || !newQD1.trim()) {
      setStatusMsg({ type: 'error', text: 'Harap isi pertanyaan, jawaban benar, dan minimal 1 pengecoh!' });
      return;
    }

    const newQuestion: Question = {
      id: `q_custom_${Date.now()}`,
      question: newQText.trim(),
      correctAnswer: newQCorrect.trim(),
      distractors: [newQD1.trim(), newQD2.trim() || 'Pilihan Lain', newQD3.trim() || 'Pilihan Lain'],
      explanation: newQExplanation.trim() || 'Gunakan rumus refleksi koordinat untuk memeriksa bayangan.',
      category: 'Kustom Guru'
    };

    onUpdateQuestions([...questions, newQuestion]);
    setNewQText('');
    setNewQCorrect('');
    setNewQD1('');
    setNewQD2('');
    setNewQD3('');
    setNewQExplanation('');
    setStatusMsg({ type: 'success', text: 'Soal baru berhasil ditambahkan ke bank soal!' });
    setActiveTab('list');
  };

  const handleFetchFromSheet = async () => {
    if (!sheetUrl) return;
    setIsLoadingFetch(true);
    setStatusMsg(null);

    try {
      const res = await fetch(sheetUrl);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      
      // Expected array of objects or rows
      if (Array.isArray(data) && data.length > 0) {
        const parsed: Question[] = data.map((item, index) => {
          if (Array.isArray(item)) {
            return {
              id: `sheet_${index}`,
              question: String(item[0] || ''),
              correctAnswer: String(item[1] || ''),
              distractors: [String(item[2] || ''), String(item[3] || ''), String(item[4] || '')],
              category: 'Google Sheet'
            };
          } else {
            return {
              id: item.id || `sheet_${index}`,
              question: item.question || item.pertanyaan || item[Object.keys(item)[0]] || '',
              correctAnswer: item.correctAnswer || item.kunci || item[Object.keys(item)[1]] || '',
              distractors: [
                item.distractor1 || item.pilihan2 || item[Object.keys(item)[2]] || '',
                item.distractor2 || item.pilihan3 || item[Object.keys(item)[3]] || '',
                item.distractor3 || item.pilihan4 || item[Object.keys(item)[4]] || '',
              ],
              category: 'Google Sheet'
            };
          }
        }).filter(q => q.question && q.correctAnswer);

        if (parsed.length > 0) {
          onUpdateQuestions(parsed);
          setStatusMsg({ type: 'success', text: `Berhasil mengimpor ${parsed.length} soal dari Google Sheet!` });
          setActiveTab('list');
        } else {
          throw new Error('Format data tidak sesuai.');
        }
      } else {
        throw new Error('Respon data kosong atau bukan array.');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal terhubung';
      setStatusMsg({
        type: 'error',
        text: `Gagal memuat URL (${message}). Anda dapat memasukkan data soal melalui kolom CSV di bawah!`
      });
    } finally {
      setIsLoadingFetch(false);
    }
  };

  const handleParseCsv = () => {
    if (!csvText.trim()) return;
    try {
      const lines = csvText.trim().split('\n');
      const parsed: Question[] = [];

      lines.forEach((line, idx) => {
        // Parse CSV line handling quotes
        const match = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
        if (match) {
          const cells = match.map(c => c.replace(/^,/, '').replace(/^"|"$/g, '').trim()).filter(Boolean);
          if (cells.length >= 2) {
            parsed.push({
              id: `csv_${idx}_${Date.now()}`,
              question: cells[0],
              correctAnswer: cells[1],
              distractors: cells.slice(2, 5).length > 0 ? cells.slice(2, 5) : ['Pengecoh 1', 'Pengecoh 2', 'Pengecoh 3'],
              category: 'CSV Import'
            });
          }
        }
      });

      if (parsed.length > 0) {
        onUpdateQuestions([...questions, ...parsed]);
        setCsvText('');
        setStatusMsg({ type: 'success', text: `Berhasil menambahkan ${parsed.length} soal dari CSV!` });
        setActiveTab('list');
      } else {
        setStatusMsg({ type: 'error', text: 'Tidak ada baris yang valid.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Gagal membaca format CSV.' });
    }
  };

  const handleResetToDefault = () => {
    if (confirm('Kembalikan bank soal ke 32 soal bawaan SMPN 2 Kemranjen?')) {
      onUpdateQuestions(INITIAL_QUESTIONS);
      setStatusMsg({ type: 'success', text: 'Bank soal dikembalikan ke setelan awal!' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-800 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Database className="w-6 h-6 text-blue-200" />
            <div>
              <h3 className="font-extrabold text-lg">Bank Soal Tarik Menarik Refleksi</h3>
              <p className="text-xs text-blue-200">
                SMPN 2 Kemranjen • Total Soal Aktif: <strong>{questions.length}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-2 gap-2 text-xs sm:text-sm font-bold">
          <button
            onClick={() => { setActiveTab('list'); setStatusMsg(null); }}
            className={`flex-1 py-2 px-3 rounded-xl transition ${
              activeTab === 'list'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 hover:bg-slate-200 dark:text-slate-300'
            }`}
          >
            Daftar Soal ({questions.length})
          </button>
          <button
            onClick={() => { setActiveTab('add'); setStatusMsg(null); }}
            className={`flex-1 py-2 px-3 rounded-xl transition flex items-center justify-center gap-1 ${
              activeTab === 'add'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 hover:bg-slate-200 dark:text-slate-300'
            }`}
          >
            <Plus className="w-4 h-4" /> Tambah Soal
          </button>
          <button
            onClick={() => { setActiveTab('import'); setStatusMsg(null); }}
            className={`flex-1 py-2 px-3 rounded-xl transition flex items-center justify-center gap-1 ${
              activeTab === 'import'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 hover:bg-slate-200 dark:text-slate-300'
            }`}
          >
            <Download className="w-4 h-4" /> Import URL / Sheet
          </button>
        </div>

        {/* Status Message */}
        {statusMsg && (
          <div
            className={`mx-5 mt-4 p-3 rounded-xl flex items-center gap-2 text-xs font-bold ${
              statusMsg.type === 'success'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-rose-100 text-rose-800 border border-rose-300'
            }`}
          >
            {statusMsg.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Tab 1: List */}
        {activeTab === 'list' && (
          <div className="p-5 overflow-y-auto space-y-3 flex-1">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b">
              <span>Setiap pertandingan memilih <strong>16 soal acak tanpa pengulangan</strong>.</span>
              <button
                onClick={handleResetToDefault}
                className="text-indigo-600 hover:underline flex items-center gap-1 font-bold"
              >
                <RefreshCw className="w-3 h-3" /> Reset ke Bawaan
              </button>
            </div>

            {questions.map((q, idx) => (
              <div
                key={q.id || idx}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-blue-400 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                  {q.category && (
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-700 font-bold px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">
                      {q.category}
                    </span>
                  )}
                </div>
                <p className="font-bold text-sm text-slate-800 dark:text-slate-100 mt-1">
                  {q.question}
                </p>
                <div className="mt-2 text-xs flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">
                    Kunci: {q.correctAnswer}
                  </span>
                  {q.distractors.map((d, dIdx) => (
                    <span
                      key={dIdx}
                      className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Add */}
        {activeTab === 'add' && (
          <form onSubmit={handleAddQuestion} className="p-5 overflow-y-auto space-y-3 flex-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Teks Pertanyaan
              </label>
              <textarea
                value={newQText}
                onChange={(e) => setNewQText(e.target.value)}
                placeholder="Contoh: Titik K (4, -7) direfleksikan terhadap sumbu X, bayangannya adalah ..."
                rows={2}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-xs sm:text-sm font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                  Kunci Jawaban (Benar)
                </label>
                <input
                  type="text"
                  value={newQCorrect}
                  onChange={(e) => setNewQCorrect(e.target.value)}
                  placeholder="Contoh: (4, 7)"
                  className="w-full p-2 rounded-xl border border-emerald-400 dark:bg-slate-800 text-xs sm:text-sm font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Pengecoh 1 (Salah)
                </label>
                <input
                  type="text"
                  value={newQD1}
                  onChange={(e) => setNewQD1(e.target.value)}
                  placeholder="Contoh: (-4, -7)"
                  className="w-full p-2 rounded-xl border border-slate-300 dark:bg-slate-800 text-xs sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Pengecoh 2 (Salah)
                </label>
                <input
                  type="text"
                  value={newQD2}
                  onChange={(e) => setNewQD2(e.target.value)}
                  placeholder="Contoh: (-4, 7)"
                  className="w-full p-2 rounded-xl border border-slate-300 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Pengecoh 3 (Salah)
                </label>
                <input
                  type="text"
                  value={newQD3}
                  onChange={(e) => setNewQD3(e.target.value)}
                  placeholder="Contoh: (7, -4)"
                  className="w-full p-2 rounded-xl border border-slate-300 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Penjelasan / Pembahasan (Opsional)
              </label>
              <input
                type="text"
                value={newQExplanation}
                onChange={(e) => setNewQExplanation(e.target.value)}
                placeholder="Contoh: Refleksi sumbu X: (x, y) -> (x, -y). Maka (4, -(-7)) = (4, 7)."
                className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow mt-2"
            >
              Simpan ke Bank Soal
            </button>
          </form>
        )}

        {/* Tab 3: Import */}
        {activeTab === 'import' && (
          <div className="p-5 overflow-y-auto space-y-4 flex-1">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
              <label className="block text-xs font-bold text-blue-900 dark:text-blue-200 mb-1">
                Tautkan Google Apps Script / Sheet URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  placeholder="https://script.google.com/.../exec?sheetId=..."
                  className="flex-1 p-2 rounded-xl border border-slate-300 dark:bg-slate-800 text-xs font-mono"
                />
                <button
                  onClick={handleFetchFromSheet}
                  disabled={isLoadingFetch}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs disabled:opacity-50"
                >
                  {isLoadingFetch ? 'Mengunduh...' : 'Sinkronkan'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Atau Tempel Baris CSV Manual:
              </label>
              <textarea
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                placeholder={'"Titik (1,2) direfleksikan...",(1,-2),(-1,2),(-1,-2)'}
                rows={4}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-xs font-mono"
              />
              <button
                onClick={handleParseCsv}
                className="mt-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
              >
                Impor Data CSV
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-800 p-3.5 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
