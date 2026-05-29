export default function BotanicalLeaf({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 110 C50 110 10 70 10 40 C10 20 30 5 50 10 C70 5 90 20 90 40 C90 70 50 110 50 110Z"
        fill="#1a3d1f"
        fillOpacity="0.15"
      />
      <path
        d="M50 110 L50 10"
        stroke="#1a3d1f"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      <path d="M50 40 C40 35 25 38 20 45" stroke="#1a3d1f" strokeWidth="1" strokeOpacity="0.2" fill="none" />
      <path d="M50 55 C60 50 75 53 80 60" stroke="#1a3d1f" strokeWidth="1" strokeOpacity="0.2" fill="none" />
      <path d="M50 70 C40 65 28 68 24 75" stroke="#1a3d1f" strokeWidth="1" strokeOpacity="0.2" fill="none" />
    </svg>
  )
}
