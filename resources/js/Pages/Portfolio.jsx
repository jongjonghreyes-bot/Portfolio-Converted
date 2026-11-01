import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';

const skills = [
    ['🎨', '85%', 'Figma'],
    ['🖌️', '87%', 'Sketch'],
    ['📱', '78%', 'WordPress'],
    ['💻', '82%', 'React'],
    ['⚡', '88%', 'JavaScript'],
];

const experience = [
    ['2023 - Present', 'UX Designer', 'Quezon City'],
    ['2020 - 2021', 'UI Designer', 'Company'],
    ['2018 - 2020', 'Graphics Designer', 'Company'],
];

const education = [
    ['2020 - 2023', 'Information Technology', 'Urdaneta City University'],
    ['2019 - 2020', 'Graphic Design Course', 'Urdaneta City University'],
    ['2018 - 2019', 'Web Developer Course', 'Urdaneta City University'],
];

const testimonials = [
    {
        initial: 'W',
        name: 'Wade Virgilio',
        role: 'CEO, TechStart',
        quote: 'Jong consistently delivers high-quality wireframes and maintains a very organized Figma workspace. They follow the established design system and are open to feedback during design critiques.',
    },
    {
        initial: 'M',
        name: 'Michael Irving',
        role: 'Product Manager, Innovate',
        quote: 'Jong has a strong grasp of frontend logic. Continued focus on cross-browser testing and technical architecture will help make each project even stronger.',
    },
];

function SectionTitle({ children }) {
    return (
        <div className="section-title">
            <h2>{children}</h2>
        </div>
    );
}

function Timeline({ items }) {
    return items.map(([year, title, organization]) => (
        <article className="timeline-item" key={`${year}-${title}`}>
            <div className="timeline-year">{year}</div>
            <div className="timeline-title">{title}</div>
            <div className="timeline-company">{organization}</div>
        </article>
    ));
}

export default function Portfolio({ projects }) {
    return (
        <>
            <Head title="Portfolio" />
            <Navbar />
            <main>
                <section className="hero" id="about">
                    <div className="hero-left">
                        <img src="/images/jong-profile.png" alt="Profile portrait of Jong Reyes" />
                    </div>
                    <div className="hero-right">
                        <div className="name-tag">I am Jong</div>
                        <h1>Graphics Designer<br />+</h1>
                        <div className="ux-designer">UX Designer</div>
                        <p className="hero-text">
                            I am Kim Jhong Jhong H. Reyes, a web graphic designer and UX designer
                            who thrives at the intersection of logic and creativity, with a
                            background in technical development and human-centered design.
                        </p>
                        <div className="social-icons">
                            <a href="mailto:reyeskimjongjong@gmail.com" aria-label="Email Jong">✉</a>
                            <a href="#contact" aria-label="Contact Jong">in</a>
                        </div>
                    </div>
                </section>

                <section className="stats" aria-label="Portfolio statistics">
                    <div className="stat-item">
                        <div className="stat-number">5</div>
                        <div className="stat-label">Months of<br />Experience</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">{projects.length}</div>
                        <div className="stat-label">Projects<br />Completed</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">10</div>
                        <div className="stat-label">Clients</div>
                    </div>
                </section>

                <section id="skills">
                    <SectionTitle>Skills</SectionTitle>
                    <p className="section-subtitle">
                        I transform ideas into bespoke web experiences that connect brands with people.
                    </p>
                    <div className="skills">
                        {skills.map(([icon, percent, name]) => (
                            <article className="skill-card" key={name}>
                                <div className="skill-icon" aria-hidden="true">{icon}</div>
                                <div className="skill-percent">{percent}</div>
                                <div className="skill-name">{name}</div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="experience-section" id="education">
                    <div className="section-half">
                        <h3>My Experience</h3>
                        <Timeline items={experience} />
                    </div>
                    <div className="section-half">
                        <h3>My Education</h3>
                        <Timeline items={education} />
                    </div>
                </section>

                <section id="projects">
                    <SectionTitle>Projects</SectionTitle>
                    <div className="projects-grid">
                        {projects.map((project) => (
                            <article className="project-card" key={project.id}>
                                {project.image_url && (
                                    <img className="project-image" src={project.image_url} alt={project.title} />
                                )}
                                <div className="project-content">
                                    <span className="project-category">{project.category}</span>
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-desc">{project.description}</p>
                                    {project.tech_stack && (
                                        <p className="project-tech">{project.tech_stack}</p>
                                    )}
                                    {project.completed_at && (
                                        <p className="project-tech">
                                            Completed {project.completed_at.slice(0, 10)}
                                        </p>
                                    )}
                                    {(project.project_url || project.repository_url) && (
                                        <div className="project-links">
                                            {project.project_url && (
                                                <a href={project.project_url} target="_blank" rel="noreferrer">View project</a>
                                            )}
                                            {project.repository_url && (
                                                <a href={project.repository_url} target="_blank" rel="noreferrer">Source code</a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="testimonials-section">
                    <SectionTitle>My Clients’ Ratings</SectionTitle>
                    <p className="section-subtitle">
                        Feedback on the design, organization, and frontend work behind each project.
                    </p>
                    <div className="testimonials">
                        {testimonials.map((testimonial) => (
                            <article className="testimonial-card" key={testimonial.name}>
                                <div className="testimonial-header">
                                    <div className="testimonial-avatar" aria-hidden="true">{testimonial.initial}</div>
                                    <div className="testimonial-info">
                                        <h4>{testimonial.name}</h4>
                                        <div className="testimonial-role">{testimonial.role}</div>
                                    </div>
                                </div>
                                <p className="testimonial-text">“{testimonial.quote}”</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="contact-section" id="contact">
                    <SectionTitle>Contact</SectionTitle>
                    <div className="contact-header">
                        <h3>Let’s work together!</h3>
                        <p className="contact-subtitle">Get in touch to discuss your next project.</p>
                    </div>
                    <form
                        className="contact-form"
                        action="mailto:reyeskimjongjong@gmail.com"
                        method="post"
                        encType="text/plain"
                    >
                        <div className="form-group">
                            <input type="text" placeholder="First name" name="First name" required aria-label="First name" />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Last name" name="Last name" required aria-label="Last name" />
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email address" name="Email" required aria-label="Email address" />
                        </div>
                        <div className="form-group">
                            <input type="tel" placeholder="Phone number" name="Phone" aria-label="Phone number" />
                        </div>
                        <div className="form-group full">
                            <textarea placeholder="Message" name="Message" required aria-label="Message" />
                        </div>
                        <div className="form-group full">
                            <button type="submit" className="send-btn">Send Message ✓</button>
                        </div>
                    </form>
                    <div className="contact-info">
                        <a className="contact-info-item" href="tel:+6309461737491">
                            <div className="contact-icon" aria-hidden="true">☎</div>
                            <h4>+63-0946-1737-491</h4>
                            <p>Call</p>
                        </a>
                        <a className="contact-info-item" href="mailto:reyeskimjongjong@gmail.com">
                            <div className="contact-icon" aria-hidden="true">✉</div>
                            <h4>reyeskimjongjong@gmail.com</h4>
                            <p>Email</p>
                        </a>
                        <div className="contact-info-item">
                            <div className="contact-icon" aria-hidden="true">⌖</div>
                            <h4>Batong, Anao, Tarlac</h4>
                            <p>2310, Philippines</p>
                        </div>
                    </div>
                </section>
            </main>
            <footer>
                <p>© 2025 - 2026 Portfolio</p>
                <Link href="/admin/projects">Manage projects</Link>
            </footer>
        </>
    );
}
