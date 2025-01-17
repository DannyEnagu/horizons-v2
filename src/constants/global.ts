
export const themes = [
    { value: 'light', label: 'Light', icon: '/icons/sun.svg' },
    { value: 'dark', label: 'Dark', icon: '/icons/moon.svg' },
    { value: 'system', label: 'System', icon: '/icons/monitor-cog.svg' }
];

export const JOB_TYPES = [
    'Entry Level',
    'Mid Level',
    'Senior Level',
    'Lead',
    'Management',
    'Internship',
];

export const JOB_LEVELS_MAP = {
    'internship': 0,
    'entry-level': 2,
    'mid-level': 4,
    'senior-level': 5,
    'lead': 5,
    'management': 5
};

export const SOCIAL_PLATFORMS = [
    {
        url: 'https://www.linkedin.com/in/',
        label: 'linkedin'
    },
    {
        url: 'https://www.facebook.com/',
        label: 'facebook'
    },
    {
        url: 'https://www.twitter.com/',
        label: 'twitter'
    }
];

export const OVERVIEW_MENUITEMS = [
    {
        url: '/employer/dashboard',
        label: 'Dashboard',
        icon: 'dashboard',
    },
    {
        url: '/employer/dashboard/notifications',
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
        url: '/employer/dashboard/my-jobs',
        label: 'My Jobs',
        icon: 'plus-circle',
    },
    {
        url: '/employer/dashboard/applications',
        label: 'Applications',
        icon: 'list',
    },
    {
        url: '/employer/dashboard/shortlisted',
        label: 'Shortlisted',
        icon: 'list-filter',
    },
    {
        url: '/employer/dashboard/interviews',
        label: 'Interviews',
        icon: 'list-filter-plus',
    },
    {
        url: '/employer/dashboard/hired',
        label: 'Hired',
        icon: 'list-check',
    }
];

export const SETTINGS_MENUITEMS = [
    {
        url: '/employer/dashboard/profile',
        label: 'My Profile',
        icon: 'user',
    },
    {
        url: '/employer/dashboard/settings',
        label: 'Settings',
        icon: 'settings',
    },
    {
        url: '/employer/dashboard/logout',
        label: 'Logout',
        icon: 'power-off',
    }
];