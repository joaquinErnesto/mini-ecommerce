import { AdminAvatar } from "../AdminAvatar/AdminAvatar";
import type { AdminProfile } from "../../data/admin.mock";
import "./AdminIdentity.css";

interface AdminIdentityProps {
    admin: AdminProfile;
}

export function AdminIdentity({
    admin
}: AdminIdentityProps) {
    const fullName = `${admin.firstName} ${admin.lastName}`;

    return (
        <div className="admin-identity">
            <AdminAvatar
                src={admin.image}
                alt={fullName}
                size="medium"
            />

            <div className="admin-identity__info">
                <p className="admin-identity__name">
                    {fullName}
                </p>

                <p className="admin-identity__role">
                    {admin.role}
                </p>
            </div>
        </div>
    );
}