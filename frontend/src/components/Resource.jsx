import React from 'react';
import { FaUsers, FaFolderOpen, FaLink } from 'react-icons/fa';

function Resource() {
  // Data for each group
  const resourceGroups = [
    {
      title: 'Group Spaces',
      icon: <FaUsers className="text-blue-500 mr-2" />,
      items: [
        { name: 'Classnote Group', link: 'https://t.me/+JBX8LkloPr8zNTM1' },
        { name: 'Notice Group', link: 'https://www.messenger.com/t/8457632377695721' },
        { name: 'Facebook Group', link: 'https://www.facebook.com/profile.php?id=61572255675948' },
      ],
    },
    {
      title: 'Past Academic Materials',
      icon: <FaFolderOpen className="text-green-600 mr-2" />,
      items: [
        { name: '1st Year 1st Semester (19-Batch)', link: 'https://drive.google.com/drive/u/0/folders/1-6fQ82d5EX3Qtni3eKrMHcx7TOeeOqSQ' },
        { name: '1st Year 2nd Semester (19-Batch)', link: 'https://docs.google.com/spreadsheets/u/4/d/e/2PACX-1vQy-dMjg6ED8Vyc4PeFsglZe-13N98-m3VZgSZTPlQG7CHgXp8UGvV1LBxGoH2NTJq6XrLtefhmfMSf/pubhtml#' },
                { name: '1st Year 1st Semester (18-Batch)', link: 'https://drive.google.com/drive/folders/1EwcNc8g5wXDDiqPjoTKGG0bbRqO3BEtX' },
        { name: '1st Year 2nd Semester (18-Batch)', link: 'https://drive.google.com/drive/folders/1UO2cjPZWm_htiB9tKTPMNY9gZEhj-eGa' },

      ],
    },
    {
      title: 'Essential Links',
      icon: <FaLink className="text-purple-600 mr-2" />,
      items: [
        { name: 'Department Website', link: 'https://jnu.ac.bd/department/portal/mathematics' },
        { name: 'Student Login JnU', link: 'https://student.erp.jnu.ac.bd/' },
        { name: 'BSc in Mathematics', link: 'https://drive.google.com/file/d/1KpQYXFHbo195eMg68LM1bJ1WhP4iJPYt/view?usp=sharing' },
        { name: 'Eccentric-18 website  ', link: 'https://eccentric18.netlify.app/' },
      ],
    },
  ];

  // Background colors to cycle through
  const bgColors = [
    'bg-red-100',
    'bg-blue-100',
    'bg-green-100',
    'bg-yellow-100',
    'bg-purple-100',
    'bg-pink-100',
    'bg-orange-100',
  ];

  return (
    <div className="p-6 space-y-12">
      {resourceGroups.map((group, groupIndex) => (
        <div key={groupIndex}>
          {/* Group Title with Icon */}
          <div className="flex items-center mb-4 text-xl font-semibold text-gray-800">
            {group.icon}
            <span>{group.title}</span>
          </div>

          {/* Responsive Card Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {group.items.map((item, itemIndex) => {
              const bgColor = bgColors[itemIndex % bgColors.length];
              return (
                <a
                  key={itemIndex}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-2xl shadow p-4 hover:shadow-md transition ${bgColor} flex items-center justify-between`}
                >
                  <span className="text-gray-800 font-medium text-base">{item.name}</span>
                  <span className="text-gray-500 text-lg">→</span>
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Resource;
