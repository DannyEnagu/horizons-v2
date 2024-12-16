'use client';

import * as React from 'react';
import { Badge } from '../ui/badge';

export interface ExplorationTab {
    label: string;
    value: string;
    count: number;
    isActive: boolean;
}

interface ExplorationTabsProps {
    tabs: ExplorationTab[];
    showCount?: boolean;
    onChange: (tab: ExplorationTab) => void;
}

export default function ExplorationTabs({ tabs, showCount, onChange }: ExplorationTabsProps) {
    const [activeTab, setActiveTab] = React.useState<ExplorationTab | null>(null);

    const handleChange = (tab: ExplorationTab) => {
        tabs.forEach((tab) => tab.isActive = false);
        setActiveTab({ ...tab, isActive: true });
        onChange({ ...tab, isActive: true });
    }

    React.useEffect(() => {
        setActiveTab(tabs.find((tab) => tab.isActive) || tabs[0]);
    }, [tabs]);
    return (
        <div className="inline-flex items-center shadow background-light850_dark100 border border-color">
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    className={`flex flex-col justify-center h-12 px-3 pr-8 border-r border-r-t-gray-200 sharp-border dark:border-r-dark-400 ${tab.value === activeTab?.value &&activeTab?.isActive ? "text-blue-500 border-b border-blue-500" : ""}`}
                    onClick={() => handleChange(tab)}
                >
                    <span className='text-ellipsis'>
                        {tab.label}
                    </span>
                    {showCount &&
                        <Badge>{tab.count}</Badge>
                    }
                </button>
            ))}
        </div>
    );
}