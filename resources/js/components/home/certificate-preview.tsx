import type { Certification } from '@/types/portfolio';

export default function CertificatePreview({
    certifications,
}: {
    certifications: Certification[];
}) {
    const aiCertificates = certifications.filter((cert) =>
        cert.issuer.toLowerCase().includes('anthropic'),
    );
    const selected = (
        aiCertificates.length ? aiCertificates : certifications
    ).slice(0, 3);
    if (selected.length === 0) return null;

    return (
        <section
            className="credential-preview"
            aria-label="Selected recorded certificates"
        >
            <div className="credential-heading">
                <h3>Learning alongside the work</h3>
                <p>Selected certificates · recorded dates</p>
            </div>
            <div className="credential-grid">
                {selected.map((cert) => (
                    <article className="credential-card" key={cert.id}>
                        <span className="credential-mark" aria-hidden="true">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <path d="M14 2v6h6M8 12h8M8 16h5" />
                            </svg>
                        </span>
                        <p className="mono">
                            {cert.issuer} / {cert.year}
                        </p>
                        <h4>{cert.name}</h4>
                    </article>
                ))}
            </div>
        </section>
    );
}
