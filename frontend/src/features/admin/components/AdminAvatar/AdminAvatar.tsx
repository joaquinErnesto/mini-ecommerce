import { useState } from "react";
import "./AdminAvatar.css";

interface AdminAvatarProps {
    src?: string;
    alt: string;
    size?: "small" | "medium" | "large";
}

export function AdminAvatar({
    src,
    alt,
    size = "medium"
}: AdminAvatarProps) {
    const [imageError, setImageError] = useState(false);

    const showImage = Boolean(src) && !imageError;

    return (
        <div className={`admin-avatar admin-avatar--${size}`}>
            {showImage ? (
                <img
                    src={src}
                    alt={alt}
                    onError={() => setImageError(true)}
                />
            ) : (
                <span aria-label={alt}>
                    {alt.charAt(0).toUpperCase()}
                </span>
            )}
        </div>
    );
}