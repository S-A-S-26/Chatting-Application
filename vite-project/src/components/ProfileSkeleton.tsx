import { Skeleton } from "./ui/skeleton";

export default function ProfileSkeleton() {
    return (
        <>
            <div className="flex gap-4">
                <div>
                    <Skeleton className="bg-gray-50 w-[65px] h-[65px] rounded-full p-0 m-0 overflow-hidden" />
                </div>
                <div className="grid items-center">
                    <Skeleton className="w-32 h-6" />
                    <Skeleton className="w-32 h-3" />
                </div>
            </div>
        </>
    )
}
