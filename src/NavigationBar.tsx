import React from "react";

interface NavigationBarItem {
  label: string;
  onClick: () => void;
}

interface NavigationBarProps {
  items: NavigationBarItem[];
}

const NavigationBar: React.FC<NavigationBarProps> = ({ items }) => {
  return (
    <div className="navigation-bar">
      {items.map((item, index) => (
        <button key={index} onClick={item.onClick}>
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default NavigationBar;
