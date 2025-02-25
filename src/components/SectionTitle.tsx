import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SectionTitleProps {
  icon: LucideIcon;
  title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ icon: Icon, title }) => {
  return (
    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
      <Icon className="w-8 h-8 text-purple-500" />
      {title}
    </h2>
  );
};