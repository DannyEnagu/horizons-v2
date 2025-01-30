
type Menu = {
  title: string;
  href: string;
  description: string;
  icon: string;
};

// General menu items for public users

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
    href: "/employer",
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

// Define the menu items for the employer dashboard
// The menu items are divided into three categories: Overview, Hiring, and Settings
export const OVERVIEW_MENUITEMS = [
  {
      url: '/employer',
      label: 'Dashboard',
      icon: 'dashboard',
  },
  {
      url: '/employer/messages',
      label: 'Notifications',
      icon: 'bell',
      count: 50
  }
];

export const HIRING_MENUITEMS = [
  {
      url: '/post-job',
      label: 'Post a Job',
      icon: 'dashboard',
  },
  {
      url: '/employer/my-jobs',
      label: 'My Jobs',
      icon: 'plus-circle',
  },
  {
      url: '/employer/applications',
      label: 'Applications',
      icon: 'list',
  },
  {
      url: '/employer/shortlisted',
      label: 'Shortlisted',
      icon: 'list-filter',
  },
  {
      url: '/employer/interviews',
      label: 'Interviews',
      icon: 'list-filter-plus',
  },
  {
      url: '/employer/hired',
      label: 'Hired',
      icon: 'list-check',
  }
];

export const SETTINGS_MENUITEMS = [
  {
      url: '/employer/profile',
      label: 'My Profile',
      icon: 'user',
  },
  {
      url: '/employer/settings',
      label: 'Settings',
      icon: 'settings',
  }
];