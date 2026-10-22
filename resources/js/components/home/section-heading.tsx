export default function SectionHeading({
    label,
    title,
    description,
}: {
    label: string;
    title: string;
    description?: string;
}) {
    return (
        <div className="section-heading">
            <p className="eyebrow">{label}</p>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
        </div>
    );
}
