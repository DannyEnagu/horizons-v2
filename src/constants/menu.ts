
type Menu = {
    title: string;
    href: string;
    description: string;
    icon: string;
};

export const EMPLOYER_MENU: Menu[] = [
    {
      title: "Post a Job",
      href: "/post-job",
      description:
        "Post a job and reach out to the best candidates for your company.",
      icon: "/icons/briefcase.svg",
    },
    {
      title: "Employer Dashboard",
      href: "/employer/dashboard",
      description:
        "Manage your job postings and applications from one place.",
      icon: "/icons/dashboard.svg",
    },
    {
      title: "Candidate Search",
      href: "/talent-search",
      description:
        "Search for candidates based on your requirements.",
      icon: "/icons/user-search.svg",
    },
];