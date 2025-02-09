// Loading animation
const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


export function CardSkeleton() {
    return (
        <div
            className={`${shimmer} relative overflow-hidden rounded-xl bg-green-100 p-2 shadow-sm`}
        >
            <div className="flex p-4">
            </div>
            <div className="flex items-center justify-center truncate rounded-xl bg-green px-4 py-8">
            </div>
        </div>
    );
}