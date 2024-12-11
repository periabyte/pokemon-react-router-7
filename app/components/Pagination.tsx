import { ChevronLeft, ChevronRight } from "lucide-react";


export default function Pagination({
    onNext,
    onPrev,
    disablePrev,
    disableNext,
}: {
    onNext: () => void;
    onPrev: () => void;
    disablePrev: boolean;
    disableNext?: boolean;
}) {
    return (
        <div className="flex justify-between mt-4">
                <button
                    onClick={onPrev}
                    disabled={disablePrev}
                    className="p-2 border flex justify-center items-center min-w-20 border-gray-300 rounded-lg disabled:opacity-20"
                >
                   <ChevronLeft /> Prev
                </button>
                <button
                    onClick={onNext}
                    disabled={disableNext}
                    className="p-2 border flex justify-center items-center min-w-20 border-gray-300 rounded-lg disabled:opacity-20"
                >
                    Next <ChevronRight />
                </button>
            </div>
    );  
}