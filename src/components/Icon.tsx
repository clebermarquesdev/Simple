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
        width={size || "1em"}
        height={size || "1em"}
        className={className}
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="#1877F2"
        width={size || "1em"}
        height={size || "1em"}
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
        width={size || "1em"}
        height={size || "1em"}
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
