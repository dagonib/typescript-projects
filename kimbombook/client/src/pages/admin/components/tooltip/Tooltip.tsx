import './Tooltip.css'

interface TooltipProps {
  text: string
  position: { x: number, y: number }
}

const Tooltip: React.FC<TooltipProps> = ({ text, position }) => {
  return (
    <div
      className="tooltip-container"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    >
      <p className="tooltip">{text}</p>
    </div>
  )
}

export default Tooltip
