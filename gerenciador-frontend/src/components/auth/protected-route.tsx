"use client";
import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import useAuthStore from "@/store/auth/auth-store";
import { Spinner } from "@/components/ui/spinner";

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const isInitialized = useAuthStore((state) => state.isInitialized);
    const isLoading = useAuthStore((state) => state.isLoading);
    const session = useAuthStore((state) => state.session);

    useEffect(() => {
        if (!isInitialized || isLoading) {
            return;
        }

        if (!session) {
            const redirectTo = pathname ? `?redirectTo=${encodeURIComponent(pathname)}` : "";
            router.replace(`/login${redirectTo}`);
        }
    }, [isInitialized, isLoading, pathname, router, session]);

    if (!isInitialized || isLoading) {
        return (
            <div className="flex min-h-[40vh] items-center justify-center">
                <Spinner className="size-5" />
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return <>{children}</>;
}

export default ProtectedRoute;
