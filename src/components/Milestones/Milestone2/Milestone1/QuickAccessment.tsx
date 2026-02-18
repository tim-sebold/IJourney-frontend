
import { Button } from '../../../../elements/buttons'

function QuickAccessment({ SQs, index, setSelected }: any) {
    const colors: any = [
        {
            text: "EFF6FF",
            hoverText: "2273f5",
            bg: "2273f5",
            border: "2273f5",
        },
        {
            text: "5380b3",
            hoverText: "0d315a",
            bg: "ffffff",
            border: "5380b3",
        },
        {
            text: "ffffff",
            hoverText: "A2A3A6",
            bg: "A2A3A6",
            border: "A2A3A6",
        },
        {
            text: "636364",
            hoverText: "141414",
            bg: "ffffff",
            border: "636364",
        },
    ]
    return (
        <div className="flex flex-wrap justify-between gap-10 border border-[#9747FF] border-dashed rounded-sm p-4">
            {SQs.map((item: any, i: number) => (
                <Button key={i} onClick={() => setSelected(index, i)} className={`text-[#${colors[i].text}] cursor-pointer px-6 flex-1 py-1 z-3 rounded-full hover:text-[#${colors[i].hoverText}] bg-[#${colors[i].bg}] border-[#${colors[i].border}] border gap-0 flex h-fit ${item.selected && "outline-dashed outline-4 outline-[#9747FF] focus-visible:outline-4"} `}>
                    <h6 className="text-wrap text-[12px]">
                        {item.title}
                    </h6>
                </Button>
            ))}
        </div>
    )
}

export default QuickAccessment