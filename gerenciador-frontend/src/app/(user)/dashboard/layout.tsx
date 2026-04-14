import { MobileSidebar } from "@/features/menu/mobile-sidebar"
import { Sidebar } from "@/features/menu/sidebar"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <ProtectedRoute>
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex flex-col flex-1">
                    <header className="flex items-center border-b p-4 md:hidden">
                        <MobileSidebar />
                    </header>
                    <main className="p-6">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    )
}
