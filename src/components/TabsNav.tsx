'use client';

import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
}

interface TabsNavProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  color?: string;
}

export default function TabsNav({
  tabs,
  activeTab,
  onTabChange,
  color = '#d946a8',
}: TabsNavProps) {
  return (
    <div className="flex gap-8 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="relative py-4 font-mono text-xs tracking-[0.2em] uppercase transition-colors"
          style={{
            color: activeTab === tab.id ? color : '#999999',
          }}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ backgroundColor: color }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
