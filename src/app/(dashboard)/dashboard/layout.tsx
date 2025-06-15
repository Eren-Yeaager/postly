import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import ClientLayout from "@/components/client-layout";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientLayout>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </ClientLayout>
  );
}
