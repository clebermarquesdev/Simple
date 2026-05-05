interface IconProps {
  name: string;
  filled?: boolean;
  className?: string;
  size?: number;
}

export default function Icon({
  name,
  filled = false,
  className = "",
  size,
}: IconProps) {
  if (name === "whatsapp") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width={size}
        height={size}
        className={className}
      >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.526-2.961-2.64-.086-.115-.689-.915-.689-1.746 0-.831.431-1.24.585-1.41.154-.17.335-.213.447-.213.112 0 .225 0 .322.004.101.004.237-.038.371.285.139.337.475 1.156.515 1.241.041.085.069.184.012.298-.057.115-.085.184-.17.284-.085.1-.178.225-.255.302-.085.085-.175.178-.075.35.1.171.442.729.948 1.18.653.58 1.201.76 1.372.845.171.086.273.072.373-.043.101-.115.431-.501.547-.672.115-.17.23-.142.388-.085.158.057 1.003.472 1.174.558.171.085.285.128.326.2.042.072.042.413-.102.818z" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="#1877F2"
        width={size}
        height={size}
        className={className}
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={className}
      >
        <defs>
          <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#f09433" }} />
            <stop offset="25%" style={{ stopColor: "#e6683c" }} />
            <stop offset="50%" style={{ stopColor: "#dc2743" }} />
            <stop offset="75%" style={{ stopColor: "#cc2366" }} />
            <stop offset="100%" style={{ stopColor: "#bc1888" }} />
          </linearGradient>
        </defs>
        <rect 
          x="2" y="2" width="20" height="20" rx="5" ry="5" 
          stroke="url(#instagram-gradient)" strokeWidth="2" fill="none"
        />
        <circle 
          cx="12" cy="12" r="4" 
          stroke="url(#instagram-gradient)" strokeWidth="2" fill="none"
        />
        <circle cx="17.5" cy="6.5" r="1" fill="url(#instagram-gradient)" />
      </svg>
    );
  }

  if (name === "govbr") {
    return (
      <div 
        className={`flex items-baseline font-black italic tracking-tighter ${className}`} 
        style={{ fontSize: size ? size * 0.45 : undefined, fontFamily: "sans-serif" }}
      >
        <span style={{ color: "#165091" }}>g</span>
        <span style={{ color: "#FFC400" }}>o</span>
        <span style={{ color: "#4CAF50" }}>v</span>
        <span style={{ color: "#165091" }}>.</span>
        <span style={{ color: "#165091" }}>b</span>
        <span style={{ color: "#FFC400" }}>r</span>
      </div>
    );
  }

  if (name === "fgts") {
    return (
      <div className={`flex items-center gap-2 ${className}`} style={{ width: size, height: size }}>
        {/* Colorful F shape */}
        <svg viewBox="0 0 24 24" width={size ? size * 0.4 : 24} height={size ? size * 0.4 : 24} fill="none">
          <path d="M4 22L12 4L20 4L12 22L4 22Z" fill="#009c3b" />
          <path d="M8 22L14 8L18 8L12 22L8 22Z" fill="#ffdf00" />
        </svg>
        <div className="flex flex-col leading-none">
          <span style={{ color: "#165091", fontWeight: 900, fontSize: size ? size * 0.35 : 18 }}>FGTS</span>
          <span style={{ color: "#165091", fontWeight: 400, fontSize: size ? size * 0.15 : 8, marginTop: -2 }}>Digital</span>
        </div>
      </div>
    );
  }

  if (name === "inss") {
    const scale = size ? size / 80 : 1;
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {/* INSS Globe/Wings icon - More faithful version */}
        <svg viewBox="0 0 64 32" width={50 * scale} height={25 * scale} fill="none">
          {/* Left Green Wing */}
          <path d="M12 4C4 8 2 16 4 24C6 28 12 30 18 26C16 22 14 14 12 4Z" fill="#009c3b" />
          {/* Right Yellow Wing */}
          <path d="M52 4C60 8 62 16 60 24C58 28 52 30 46 26C48 22 50 14 52 4Z" fill="#ffdf00" />
          {/* Central Globe with squares */}
          <circle cx="32" cy="16" r="10" fill="white" />
          <g fill="#005ca9">
            <rect x="29" y="11" width="2.5" height="2.5" />
            <rect x="33" y="11" width="2.5" height="2.5" />
            <rect x="26" y="15" width="2.5" height="2.5" />
            <rect x="30" y="15" width="2.5" height="2.5" />
            <rect x="34" y="15" width="2.5" height="2.5" />
            <rect x="29" y="19" width="2.5" height="2.5" />
            <rect x="33" y="19" width="2.5" height="2.5" />
          </g>
        </svg>
        <span style={{ color: "#005ca9", fontWeight: 900, fontSize: 24 * scale, fontFamily: "sans-serif", fontStyle: "italic", marginLeft: -2 }}>INSS</span>
      </div>
    );
  }



  return (
    <span
      className={`material-symbols-outlined ${filled ? "filled" : ""} ${className}`}
      style={{
        fontVariationSettings: filled
          ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
          : undefined,
        fontSize: size ? `${size}px` : undefined,
      }}
    >
      {name}
    </span>
  );
}
