import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface MacbookMockupProps {
  url: string;
  className?: string;
}

// Shared key styling
const K =
  "bg-gradient-to-t from-black via-black to-zinc-900 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_1px_2px_0_rgba(0,0,0,0.3)]";

// Speaker grille pattern
const speakerGrilleStyle: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Ccircle cx='2' cy='2' r='0.8' fill='rgba(0,0,0,0.2)'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat",
  backgroundSize: "3px 3px",
};

// Keyboard layout data
const fnKeys = ["esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];
const numKeys: [string, string][] = [
  ["~", "`"],
  ["!", "1"],
  ["@", "2"],
  ["#", "3"],
  ["$", "4"],
  ["%", "5"],
  ["^", "6"],
  ["&", "7"],
  ["*", "8"],
  ["(", "9"],
  [")", "0"],
  ["_", "-"],
  ["+", "="],
];
const qwertyKeys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const qwertyExtra: [string, string][] = [
  ["{", "["],
  ["}", "]"],
  ["|", "\\"],
];
const asdfKeys = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const asdfExtra: [string, string][] = [
  [":", ";"],
  ['"', "'"],
];
const zxcvKeys = ["Z", "X", "C", "V", "B", "N", "M"];
const zxcvExtra: [string, string][] = [
  ["<", ","],
  [">", "."],
  ["?", "/"],
];

// Key components
const FnKey = ({ label }: { label: string }) => (
  <div
    className={`${K} h-full rounded-[4px] flex-1 flex items-center justify-center text-[8px] text-neutral-400`}
  >
    {label}
  </div>
);

const DualKey = ({ top, bottom }: { top: string; bottom: string }) => (
  <div
    className={`${K} h-full rounded-[4px] flex-1 flex flex-col items-center justify-center text-[8px] text-neutral-400`}
  >
    <div>{top}</div>
    <div>{bottom}</div>
  </div>
);

const LetterKey = ({ letter }: { letter: string }) => (
  <div
    className={`${K} h-full rounded-[4px] flex-1 flex flex-col items-center justify-center text-[8px] text-neutral-400`}
  >
    <div />
    <div>{letter}</div>
  </div>
);

const WideKey = ({
  label,
  flex,
  alignEnd,
  alignStart,
}: {
  label: string;
  flex: string;
  alignEnd?: boolean;
  alignStart?: boolean;
}) => (
  <div
    className={`${K} h-full rounded-[3px] ${flex} flex ${
      alignEnd
        ? "items-end justify-end"
        : alignStart
          ? "items-end justify-start"
          : "items-end justify-center"
    } p-1 text-[8px] text-neutral-400`}
  >
    {label}
  </div>
);

const MacbookMockup: React.FC<MacbookMockupProps> = ({ url, className }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  if (imgError) return null;

  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

  return (
    <div
      className={cn("w-full flex justify-center group/mockup", className)}
      style={{ perspective: "2000px" }}
    >
      <div
        className="relative w-[90%] pb-[62%] transition-transform duration-700 ease-out group-hover/mockup:scale-[1.02]"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Floating shadow - Optimized for performance */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[90%] h-12 bg-cyan-500/[0.08] blur-3xl rounded-full transition-[transform,background-color] duration-700 group-hover/mockup:bg-cyan-500/[0.15] group-hover/mockup:scale-x-110 group-hover/mockup:scale-y-105 z-0 transform-gpu will-change-transform" />
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[70%] h-6 bg-black/40 blur-xl rounded-full z-0 transform-gpu" />

        <div className="absolute inset-0 [transform:rotateX(73deg)] [transform-style:preserve-3d] origin-bottom z-10">
          {/* ===== SCREEN / LID ===== */}
          <div className="absolute overflow-hidden aspect-video left-0 h-[81.6%] -top-[81.8%] bg-black border-[2px] border-[#404041] rounded-md [transform:rotateX(-70deg)] origin-bottom">
            {/* MacBook Air label */}
            <div className="absolute bottom-0 w-full left-0 bg-zinc-900 h-3 flex items-center justify-center text-zinc-200 text-[6px] font-thin z-20">
              MacBook Air
            </div>
            {/* Screen area */}
            <div className="absolute inset-1 mb-4 mx-1 mt-1 rounded-[3px] overflow-hidden">
              <div className="relative w-full h-full rounded-[3px] overflow-hidden bg-[#0a0a0a]">
                {/* Loading state */}
                {!imgLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
                    <div className="w-6 h-6 border-2 border-gray-700 border-t-cyan-500 rounded-full animate-spin" />
                  </div>
                )}
                {/* Screenshot */}
                <img
                  src={screenshotUrl}
                  alt="Website Preview"
                  className={cn(
                    "w-full h-full object-cover object-top transition-opacity duration-700",
                    imgLoaded ? "opacity-100" : "opacity-0"
                  )}
                  loading="lazy"
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgError(true)}
                />

                {/* Lightning / Glare Effect */}
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-tr from-transparent via-white/[0.2] to-transparent -translate-x-[100%] skew-x-[-45deg] transition-transform duration-1000 ease-in-out group-hover/mockup:translate-x-[50%] pointer-events-none z-30" />

                {/* Screen reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none z-20" />
              </div>
            </div>
          </div>

          {/* ===== BASE / KEYBOARD ===== */}
          <div className="w-full h-full bg-[#6F7072] rounded-[16px] border-b border-zinc-800 flex flex-col pb-3 items-start overflow-hidden relative">
            {/* Keyboard Lightning / Glare Effect */}
            <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-tr from-transparent via-white/[0.15] to-transparent -translate-x-[100%] skew-x-[-45deg] transition-transform duration-1000 delay-150 ease-in-out group-hover/mockup:translate-x-[50%] pointer-events-none z-30" />

            {/* Inner base bg */}
            <div className="absolute inset-0 mt-3 bg-[#646464] w-full h-full -z-10 rounded-[28px]" />
            {/* Front notch / lip */}
            <div className="absolute bottom-[8px] left-[39.6%] h-[8px] bg-zinc-700/50 w-[20.7%] rounded-t-full -mb-4 [transform:rotateX(210deg)]" />

            {/* Top hinge area */}
            <div className="h-[6.94%] w-full relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-[75%] flex items-center">
                <div className="w-[10%] bg-gradient-to-b from-black via-neutral-700 to-black h-full rounded-bl-sm" />
                <div className="flex-grow bg-gradient-to-b from-black via-black to-zinc-700 h-full" />
                <div className="w-[10%] bg-gradient-to-b from-black via-neutral-700 to-black h-full rounded-br-sm" />
              </div>
            </div>

            {/* Keyboard section */}
            <div className="h-[50.42%] w-full relative flex">
              {/* Left speaker grille */}
              <div className="my-[6px] w-[4.07%] mx-[2px]" style={speakerGrilleStyle} />

              {/* Keyboard container */}
              <div className="w-[91.86%] rounded-md border-neutral-600/60 border-opacity-70 border relative overflow-hidden flex flex-col p-[5px]">
                {/* Edge lighting */}
                <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-r from-neutral-600/20 via-neutral-800/10 to-transparent" />
                <div className="absolute right-0 top-0 w-[2px] h-full bg-gradient-to-l from-neutral-600/20 via-neutral-800/10 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-t from-neutral-600/20 via-neutral-800/10 to-transparent" />

                {/* Function keys row */}
                <div className="h-[10.03%] mb-[.6%] flex items-center gap-x-[3px] w-full">
                  {fnKeys.map((k) => (
                    <FnKey key={k} label={k} />
                  ))}
                  <div className={`${K} aspect-square h-full rounded-[4px]`} />
                </div>

                {/* Number row */}
                <div className="h-[16.62%] mb-[.6%] flex items-center space-x-[2px] w-full">
                  {numKeys.map(([top, bottom], i) => (
                    <DualKey key={i} top={top} bottom={bottom} />
                  ))}
                  <WideKey label="delete" flex="flex-[1.3]" alignEnd />
                </div>

                {/* QWERTY row */}
                <div className="h-[16.62%] mb-[.6%] flex items-center space-x-[2px] w-full">
                  <WideKey label="tab" flex="flex-[1.31]" alignStart />
                  {qwertyKeys.map((k) => (
                    <LetterKey key={k} letter={k} />
                  ))}
                  {qwertyExtra.map(([top, bottom], i) => (
                    <DualKey key={`qe-${i}`} top={top} bottom={bottom} />
                  ))}
                </div>

                {/* ASDF row */}
                <div className="h-[16.62%] mb-[.6%] flex items-center space-x-[2px] w-full">
                  <WideKey label="caps lock" flex="flex-[1.5]" alignStart />
                  {asdfKeys.map((k) => (
                    <LetterKey key={k} letter={k} />
                  ))}
                  {asdfExtra.map(([top, bottom], i) => (
                    <DualKey key={`ae-${i}`} top={top} bottom={bottom} />
                  ))}
                  <WideKey label="return" flex="flex-[1.55]" alignEnd />
                </div>

                {/* ZXCV row */}
                <div className="h-[16.62%] mb-[.5%] flex items-center space-x-[2px] w-full">
                  <WideKey label="shift" flex="flex-[2]" alignStart />
                  {zxcvKeys.map((k) => (
                    <LetterKey key={k} letter={k} />
                  ))}
                  {zxcvExtra.map(([top, bottom], i) => (
                    <DualKey key={`ze-${i}`} top={top} bottom={bottom} />
                  ))}
                  <WideKey label="shift" flex="flex-[2]" alignEnd />
                </div>

                {/* Bottom row */}
                <div className="h-[16.62%] flex items-end space-x-[2px] w-full">
                  {/* fn key */}
                  <div
                    className={`${K} h-full flex-[1.2] rounded-[3px] flex flex-col items-center justify-center text-[8px] text-neutral-400 relative`}
                  >
                    <div className="absolute top-1 right-[6px]">fn</div>
                    <div className="absolute bottom-1 left-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M12 21.237a9.237 9.237 0 1 0 0-18.474a9.237 9.237 0 0 0 0 18.474m2.99-16.971c.36.387.685.838.97 1.335c.523.905.931 1.99 1.195 3.19q.623.156 1.166.348c.668.237 1.255.517 1.72.84a8.31 8.31 0 0 0-5.051-5.713"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  {/* control */}
                  <div
                    className={`${K} h-full flex-[1] rounded-[3px] relative flex items-end justify-center p-1 text-[8px] text-neutral-400`}
                  >
                    <div className="absolute top-1 right-1">⌃</div>
                    <div>control</div>
                  </div>
                  {/* option left */}
                  <div
                    className={`${K} h-full flex-[1] rounded-[3px] relative flex items-end justify-center p-1 text-[8px] text-neutral-400`}
                  >
                    <div className="absolute top-[1px] right-1">⌥</div>
                    <div>option</div>
                  </div>
                  {/* command left */}
                  <div
                    className={`${K} h-full flex-[.8] rounded-[3px] relative flex items-end justify-center p-1 text-[8px] text-neutral-400`}
                  >
                    <div className="absolute top-[1px] right-1">⌘</div>
                    <div>command</div>
                  </div>
                  {/* spacebar */}
                  <div className={`${K} h-full flex-[7] rounded-[3px]`} />
                  {/* command right */}
                  <div
                    className={`${K} h-full flex-[1] rounded-[3px] relative flex items-end p-1 text-[8px] text-neutral-400`}
                  >
                    <div className="absolute top-[1px] left-1">⌘</div>
                    <div>command</div>
                  </div>
                  {/* option right */}
                  <div
                    className={`${K} h-full flex-[.8] rounded-[3px] relative flex items-end justify-center p-1 text-[8px] text-neutral-400`}
                  >
                    <div className="absolute top-[1px] left-1">⌥</div>
                    <div>option</div>
                  </div>
                  {/* Arrow left */}
                  <div
                    className={`${K} h-1/2 flex-[1.4] rounded-[3px] flex items-center justify-center text-[8px] text-neutral-400`}
                  >
                    <svg className="rotate-180" width="8" height="5" viewBox="0 0 8 8">
                      <polygon points="8,4 4,0 4,8" fill="currentColor" />
                    </svg>
                  </div>
                  {/* Arrow up/down */}
                  <div className={`${K} h-full flex-[1.4] rounded-[3px] flex flex-col gap-[1px]`}>
                    <div
                      className={`${K} flex-1 rounded-t-[3px] flex items-center justify-center text-[8px] text-neutral-400`}
                    >
                      <svg width="8" height="5" viewBox="0 0 8 8">
                        <polygon points="4,0 0,4 8,4" fill="currentColor" />
                      </svg>
                    </div>
                    <div
                      className={`${K} flex-1 rounded-b-[3px] flex items-center justify-center text-[8px] text-neutral-400`}
                    >
                      <svg width="8" height="5" viewBox="0 0 8 8">
                        <polygon points="4,8 0,4 8,4" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  {/* Arrow right */}
                  <div
                    className={`${K} h-1/2 flex-[1.4] rounded-[3px] flex items-center justify-center text-[8px] text-neutral-400`}
                  >
                    <svg className="rotate-180" width="8" height="5" viewBox="0 0 8 8">
                      <polygon points="0,4 4,0 4,8" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right speaker grille */}
              <div className="my-[6px] w-[4.07%] mx-[2px]" style={speakerGrilleStyle} />
            </div>

            {/* Trackpad section */}
            <div className="h-[42.64%] w-full relative flex flex-col items-center">
              <div className="w-[40.41%] h-[91.56%] rounded-md border-neutral-600/60 border-opacity-70 border border-b-2 my-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacbookMockup;
