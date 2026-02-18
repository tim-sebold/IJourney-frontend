
import { Button } from './button';


function CustomButton({ onClickFunc, title, className, type, disabled }: { onClickFunc: () => void, title: string, className: string, type: string, disabled?: boolean }) {
    return (
        <Button 
            onClick={onClickFunc}
            disabled = {disabled}
            className={
                `cursor-pointer h-auto uppercase ${className}
                ${type === 'move' && '  text-white bg-custom border-custom  hover:bg-white border-2 hover:text-custom disabled:bg-custom disabled:text-white disabled:border-custom disabled:hover:bg-white disabled:hover:text-custom disabled:hover:border-custom'}
                ${type === 'export sheet' && '  text-white bg-gray-400 border-gray-400 hover:bg-white border-2 hover:text-gray-400 disabled:bg-gray-300 disabled:text-white disabled:border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-300 disabled:hover:border-gray-300'}
                ${type === 'red' && '  text-white bg-[#ff6f61] border-[#ff6f61] hover:bg-white border-2 hover:text-[#ff6f61] disabled:bg-[#ff6f61] disabled:text-white disabled:border-[#ff6f61] disabled:hover:bg-white disabled:hover:text-[#ff6f61] disabled:hover:border-[#ff6f61]'}
                ${type === 'green' && '  text-white bg-[#5ee088] border-[#5ee088] hover:bg-white border-2 hover:text-[#5ee088] disabled:bg-[#5ee088] disabled:text-white disabled:border-[#5ee088] disabled:hover:bg-white disabled:hover:text-[#5ee088] disabled:hover:border-[#5ee088]'}
                ${type === 'sky' && '  text-white bg-[#0B93CD] border-[#0B93CD] hover:bg-white border-2 hover:text-[#0B93CD] disabled:bg-[#0B93CD] disabled:text-white disabled:border-[#0B93CD] disabled:hover:bg-white disabled:hover:text-[#0B93CD] disabled:hover:border-[#0B93CD]'}` 
            }>
            <span className="text-wrap font-bold text-lg tracking-[0] leading-5">
                {title}
            </span>
        </Button>
    )
}

export default CustomButton