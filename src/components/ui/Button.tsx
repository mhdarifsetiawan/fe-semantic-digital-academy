import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

// Gunakan as="link" jika ingin memakai Next.js routing tanpa reload
    // <Button as="link" href="/dashboard" variant="primary">Ke Dashboard</Button>
// Gunakan as="a" jika kamu perlu link biasa (misal eksternal)
    // <Button as="a" href="/blog" iconRight={<ArrowRight size={16} />}>Baca Blog</Button>
// Gunakan as="button" (atau default) untuk interaksi biasa
    // <Button onClick={handleClick}>Submit</Button>

// Kamu bisa pakai className, style, icon, dll

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    loading?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    style?: React.CSSProperties;
    as?: 'button' | 'a' | 'link';
    href?: string; // ⬅️ hanya dipakai jika `as="a"`
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    loading = false,
    disabled,
    iconLeft,
    iconRight,
    className,
    style,
    as = 'button',
    href,
    fullWidth = false,
    ...props
}) => {
    const baseStyle =
        'inline-flex items-center justify-center gap-2 px-4 py-2 rounded font-medium focus:outline-none focus:ring transition-all';

    const variants: Record<string, string> = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    };

    const fullWidthClass = fullWidth ? 'w-full' : '';

    const content = loading ? (
        <Loader2 className="animate-spin w-4 h-4" />
    ) : (
        <>
            {iconLeft && <span className="mr-1">{iconLeft}</span>}
            {children}
            {iconRight && <span className="ml-1">{iconRight}</span>}
        </>
    );

    if (as === 'a') {
        return (
            <a
                href={href}
                className={clsx(baseStyle, variants[variant], fullWidthClass, className)}
                style={style}
                {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {content}
            </a>
        );
    }

    if (as === 'link') {
    return (
        <Link
            href={href || '#'}
            className={clsx(baseStyle, variants[variant], fullWidthClass, className)}
            style={style}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
            {content}
        </Link>
    );
}

    return (
        <button
            className={clsx(baseStyle, variants[variant], fullWidthClass, className)}
            style={style}
            disabled={disabled || loading}
            {...props}
        >
            {content}
        </button>
    );
};

export default Button;
