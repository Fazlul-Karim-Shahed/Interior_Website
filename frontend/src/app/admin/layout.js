import AdminHeader from "@/src/components/admin/Header/AdminHeader";
import Preload from "@/src/components/admin/Preload/Preload";
import AdminContext from "@/src/context/AdminContext";

export default function Adminlayout({ children }) {
    return (
        <div>
            <AdminContext>
                <AdminHeader />
                {children}
            </AdminContext>
        </div>
    );
}
