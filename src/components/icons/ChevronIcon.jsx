// frontend/src/components/icons/ChevronIcon.jsx

export default function ChevronIcon({ direction = 'left', size = 16, ...props }) {
    const points = {
      left: '15 18 9 12 15 6',
      right: '9 18 15 12 9 6',
    };
  
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: 'block' }} // Убирает лишний отступ под иконкой
        {...props}
      >
        <polyline points={points[direction]} />
      </svg>
    );
  }