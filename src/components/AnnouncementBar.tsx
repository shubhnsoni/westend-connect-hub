import { Calendar, Home, Leaf } from "lucide-react";
import { useState } from "react";
import { X } from "lucide-react";

const announcements = [
  {
    icon: Calendar,
    text: "Next WECA Meeting: November 15th, 7 PM – Rockville City Hall",
    link: "#meetings"
  },
  {
    icon: Home,
    text: "Zoning Update: New Parkwood Avenue proposal open for feedback",
    link: "#feedback"
  },
  {
    icon: Leaf,
    text: "Volunteer Day: Join us this Saturday at Welsh Park for cleanup!",
    link: "#events"
  }
];

const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const current = announcements[currentIndex];
  const Icon = current.icon;

  return (
    <div className="bg-secondary text-secondary-foreground py-3 px-4 relative overflow-hidden">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Icon className="w-5 h-5 flex-shrink-0" />
          <a 
            href={current.link}
            className="text-sm font-medium hover:underline truncate animate-fade-in"
            key={currentIndex}
          >
            {current.text}
          </a>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {announcements.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-secondary-foreground w-4' : 'bg-secondary-foreground/40'
                }`}
                aria-label={`View announcement ${idx + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="ml-2 p-1 hover:bg-secondary-foreground/10 rounded transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
