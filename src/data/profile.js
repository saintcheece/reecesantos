export const CERTIFICATIONS = [
    { 
        date: "2023",
        title: "Scientific Computing with Python",
        titleHref: "https://www.freecodecamp.org/certification/reecesantos/scientific-computing-with-python-v7", 
        subtitle: "freeCodeCamp",
    },
]

export const EDUCATION = [
    { 
        date: "2023-2024",
        title: "Chief Creatives Officer", 
        subtitle: "Google Developer Groups NU Baliwag",
        subtitleHref: "https://www.facebook.com/GDGoCNUBaliwag" 
    },
    { 
        date: "2023-2024",
        title: "Creatives Officer",
        subtitle: "AWS Cloud Clubs NU Baliwag",
        subtitleHref: "https://www.facebook.com/AWSCloudClubNUB" 
    },
    { 
        date: "2024-2025",
        title: "Freelance Mascot Designer",
        subtitle: "Igris Balteus Construction",
        subtitleHref: "https://www.facebook.com/igrisconstruction" 
    },{ 
        date: "2025-2026",
        title: "Intern Web Developer",
        subtitle: "Pacific Roadlink Logistics Incorporation",
        subtitleHref: "https://cy.truckit.online/" 
    },{ 
        date: "2026",
        title: "Intern Web Developer",
        subtitle: "Metacom BPO Solutions",
        subtitleHref: "https://metacombpo.com/" 
    }
]

export const EXPERIENCES = [
    { 
        date: "2020-2021",
        title: "Web Developer",
        titleHref: "#", 
        subtitle: "Company Name",
        subtitleHref: "#" 
    }
]

export const CONTACTS = [
    { 
        date: "2020-2021",
        title: "Web Developer",
        titleHref: "#", 
        subtitle: "Company Name",
        subtitleHref: "#" 
    }
]
/** Square orange icon link. `icon` is a component from Icons.jsx. */
export default function SocialButton({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="grid size-18 place-items-center bg-primary text-dark transition-transform duration-100 ease-out hover:scale-110"
    >
      <Icon className="h-auto w-12" />
    </a>
  );
}

export const SOCIALS = [
    { 
        label: "Facebook",
        href: "",
        icon: FacebookIcon
    },
    { 
        label: "LinkedIn",
        href: "",
        icon: LinkedInIcon
    },
    { 
        label: "GitHub",
        href: "",
        icon: GitHubIcon
    },
    { 
        label: "YouTube",
        href: "",
        icon: YouTubeIcon
    },
]