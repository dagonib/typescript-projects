import { TrashFill } from 'react-bootstrap-icons';

export function Item (
    { text, handleClick }: 
    { text: string, handleClick: () => void 
}) {
    return (
        <li>
            {text}
            <button onClick={handleClick}>
                <TrashFill  size={16} />
            </button>
        </li>
    )
}