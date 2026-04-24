import Link from "next/link";
import { Briefcase } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    jobSeekers: [
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Companies", href: "/company" },
      { label: "Salary Explorer", href: "/salary-explorer" },
      { label: "Career Advice", href: "/career-advice" },
      { label: "Resume Tips", href: "/resume-tips" },
    ],
    employers: [
      { label: "Post a Job", href: "/jobs" },
      { label: "Talent Search", href: "/talent-search" },
      { label: "Pricing", href: "/pricing" },
      { label: "Hiring Resources", href: "/hiring-resources" },
      { label: "Recruiter Login", href: "/login" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Press", href: "/press" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Copyright", href: "/copyright" },
    ],
  };

  const sectionTitles: Record<string, string> = {
    jobSeekers: "For Job Seekers",
    employers: "For Employers",
    company: "Company",
  };

  const socialLinks = [
    {
      label: "Twitter",
      href: "https://twitter.com/",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.254 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/suraj-singh-b0962830a/",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      href: "https://github.com/",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "https://chat.whatsapp.com/EO4ydsWX12G7SE3WUsJMCK?mode=gi_t",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.52 3.48A11.94 11.94 0 0 0 12.05 0C5.4 0 .02 5.38.02 12.03c0 2.12.55 4.2 1.6 6.04L0 24l6.11-1.6a11.96 11.96 0 0 0 5.94 1.52h.01c6.65 0 12.03-5.38 12.03-12.03 0-3.21-1.25-6.22-3.57-8.41zM12.06 21.8h-.01a9.82 9.82 0 0 1-5.01-1.37l-.36-.21-3.63.95.97-3.54-.23-.36a9.8 9.8 0 0 1-1.5-5.24c0-5.44 4.43-9.87 9.88-9.87 2.64 0 5.12 1.03 6.99 2.91a9.8 9.8 0 0 1 2.89 6.96c0 5.45-4.43 9.87-9.88 9.87zm5.42-7.37c-.3-.15-1.78-.88-2.06-.98-.27-.1-.47-.15-.67.15s-.77.98-.95 1.18c-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.5-1.77-1.68-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.08 3.18 5.05 4.46.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.78-.73 2.03-1.44.25-.71.25-1.32.17-1.44-.07-.12-.27-.2-.57-.35z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/coding__vibes__/?hl=en",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.75 2C4.68 2 2.25 4.43 2.25 7.5v9c0 3.07 2.43 5.5 5.5 5.5h8.5c3.07 0 5.5-2.43 5.5-5.5v-9c0-3.07-2.43-5.5-5.5-5.5h-8.5zm8.5 1.5c2.21 0 4 1.79 4 4v9c0 2.21-1.79 4-4 4h-8.5c-2.21 0-4-1.79-4-4v-9c0-2.21 1.79-4 4-4h8.5zm-4.25 3.25a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zm0 1.5a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5zm4.88-.88a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-12">
        <div className="mb-10 grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-foreground shadow-sm">
                <Briefcase className="h-4 w-4 text-background" />
              </div>
              <span className="text-base font-semibold tracking-tight text-foreground">
                NextHire
              </span>
            </Link>

            <p className="max-w-[240px] text-sm leading-6 text-muted-foreground">
              Connecting top talent with the best companies. Your career journey
              starts here.
            </p>

            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 dark:bg-green-900/20">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span className="text-xs font-medium text-green-700 dark:text-green-400">
                Actively hiring
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all duration-200 hover:scale-110 hover:bg-primary hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([section, items]) => {
            if (section === "legal") return null;

            return (
              <div key={section}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {sectionTitles[section]}
                </p>
                <ul className="space-y-2.5">
                  {items.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <p className="text-xs tracking-wide text-muted-foreground">
            © {currentYear} NextHire. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">
            {links.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;