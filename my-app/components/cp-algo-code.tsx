"use client"

import { type SortAlgorithm } from "@/lib/cp-sorting"
import { motion, AnimatePresence } from "framer-motion"

const bubbleSortCode = `void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      // Compare
      if (arr[j] > arr[j + 1]) {
        // Swap
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`

const mergeSortCode = `void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}

void merge(int arr[], int l, int m, int r) {
  // Merging two sorted subarrays
}`

const quickSortCode = `void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  // Partitioning around pivot
}`

export function CPAlgoCode({ algorithm }: { algorithm: SortAlgorithm }) {
  const code =
    algorithm === "bubble"
      ? bubbleSortCode
      : algorithm === "merge"
        ? mergeSortCode
        : quickSortCode

  return (
    <div className="h-full flex flex-col bg-[#0d1117]/80 backdrop-blur-sm rounded-xl overflow-hidden border border-white/5 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/5">
        <span className="text-[10px] sm:text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
           ALGORITHM.C
        </span>
        <div className="flex gap-1.5 opacity-60">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
      </div>
      
      <div className="relative flex-1 overflow-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="absolute top-0 right-0 p-2 opacity-50 text-[10px] text-white/30 font-mono">
            Line: {code.split('\n').length}
        </div>
        <pre className="p-4 font-mono text-[11px] sm:text-xs leading-relaxed text-gray-300">
          <AnimatePresence mode="wait">
            <motion.code
              key={algorithm}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="block min-w-max"
            >
              {code.split('\n').map((line, i) => (
                <div key={i} className="table-row group hover:bg-white/[0.03] transition-colors w-full">
                  <span className="table-cell w-8 text-right pr-4 select-none text-white/20 text-[10px] align-top shrink-0 border-r border-white/5 mr-2 group-hover:text-white/40">
                    {i + 1}
                  </span>
                  <span className="table-cell pl-4 whitespace-pre">
                    <SyntaxHighlight line={line} />
                  </span>
                </div>
              ))}
            </motion.code>
          </AnimatePresence>
        </pre>
      </div>
    </div>
  )
}

function SyntaxHighlight({ line }: { line: string }) {
  // Simple syntax highlighting
  const parts = line.split(/(\/\/.*)|(\b(?:void|int|if|else|for|while|return|struct|const)\b)|(\b(?:bubbleSort|mergeSort|quickSort|merge|partition|swap)\b)|(\b(?:arr|n|i|j|l|r|low|high|m|pi|temp|pivot)\b)|(\d+)|([(){}[\];,=<>+\-*/&])/g).filter(Boolean);

  return (
    <>
      {parts.map((part, i) => {
        let className = "text-gray-300";
        if (part.trim().startsWith("//")) return <span key={i} className="text-gray-500 italic">{part}</span>;
        
        if (/^(void|int|if|else|for|while|return)$/.test(part)) className = "text-pink-400 font-semibold";
        else if (/^(bubbleSort|mergeSort|quickSort|merge|partition|swap)$/.test(part)) className = "text-blue-400";
        else if (/^(arr|n|i|j|l|r|low|high|m|pi|temp|pivot)$/.test(part)) className = "text-cyan-300";
        else if (/^\d+$/.test(part)) className = "text-orange-300";
        
        return <span key={i} className={className}>{part}</span>;
      })}
    </>
  )
}
