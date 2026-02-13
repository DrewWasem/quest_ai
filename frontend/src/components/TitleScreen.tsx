interface TitleScreenProps {
  onPlay: () => void;
}

export default function TitleScreen({ onPlay }: TitleScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-quest-page-bg stars-bg-light px-6">
      {/* Logo */}
      <div className="font-display text-6xl sm:text-7xl font-bold flex items-center gap-3 mb-2">
        <span className="text-5xl sm:text-6xl animate-sparkle">{'\u{2728}'}</span>
        <span className="bg-gradient-to-r from-quest-purple via-quest-orange to-quest-yellow bg-clip-text text-transparent">
          Quest AI
        </span>
      </div>

      <p className="font-heading text-lg text-quest-text-mid mb-10">
        Learn to talk to AI through play
      </p>

      {/* Play button */}
      <button
        onClick={onPlay}
        className="btn-primary text-xl px-12 py-5 rounded-2xl mb-16 shadow-lg hover:shadow-xl transition-shadow"
      >
        {'\u{1F3AE}'} Play
      </button>

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-5 py-4 border border-quest-purple/15 text-center">
          <div className="text-2xl mb-1">{'\u{1F3F0}'}</div>
          <h3 className="font-heading font-bold text-sm text-quest-text-dark">Explore</h3>
          <p className="text-xs text-quest-text-light mt-1">
            Roam a 3D village with 7 quest zones
          </p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-5 py-4 border border-quest-orange/15 text-center">
          <div className="text-2xl mb-1">{'\u{1F9E9}'}</div>
          <h3 className="font-heading font-bold text-sm text-quest-text-dark">Prompt</h3>
          <p className="text-xs text-quest-text-light mt-1">
            Fill in the blanks to command characters and props
          </p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-5 py-4 border border-quest-yellow/15 text-center">
          <div className="text-2xl mb-1">{'\u{1F3C6}'}</div>
          <h3 className="font-heading font-bold text-sm text-quest-text-dark">Earn Badges</h3>
          <p className="text-xs text-quest-text-light mt-1">
            Get more specific to unlock all 8 badges
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="text-[11px] text-quest-text-muted mt-12">
        Ages 8-10 {'\u{2022}'} Built for the Claude Code Hackathon 2026
      </p>
    </div>
  );
}
