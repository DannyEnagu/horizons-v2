

interface DashboardCardProps {
    children: React.ReactNode,
    className?: string
}

const  Card = ({children, className}: DashboardCardProps) => {
    return (
        <div className={`rounded-2xl shadow-md ${className}`}>
            {children}
        </div>
    );
}

const Header = ({children, className}: DashboardCardProps) => {
    return (
        <div className={`flex items-center justify-between p-4 border-b border-color ${className}`}>
            {children}
        </div>
    );
}

const Content = ({children, className}: DashboardCardProps) => {
    return (
        <div className={`p-4 ${className}`}>
            {children}
        </div>
    );
}

const Footer = ({children, className}: DashboardCardProps) => {
    return (
        <div className={`p-4 border-t border-color ${className}`}>
            {children}
        </div>
    );
}

Card.Header = Header;
Card.Content = Content;
Card.Footer = Footer;

export default Card;
