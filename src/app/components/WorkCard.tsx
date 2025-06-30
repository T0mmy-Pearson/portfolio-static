import React from 'react';

type Work = {
  title: string;
  description: string;
  imageUrl: string;
  url?: string;
  isModal?: boolean;
  [key: string]: any;
};

type WorkCardProps = {
  work: Work;
  onModalOpen?: () => void;
};

export default function WorkCard({ work, onModalOpen }: WorkCardProps) {
  const handleClick = () => {
    if (work.isModal && onModalOpen) {
      onModalOpen();
    } else if (work.url) {
      window.open(work.url, '_blank');
    }
  };

  return (
    <div
      className={`work-card group max-w-xs mx-auto text-center border border-gray-200 rounded-lg shadow-md p-4 bg-white transition hover:shadow-lg ${work.isModal || work.url ? 'cursor-pointer' : 'cursor-default'}`}
      onClick={handleClick}
    >
      <div className="relative w-full h-44 mb-4">
        <img
          src={work.imageUrl}
          alt={work.title}
          className="w-full h-44 object-cover rounded-md"
        />
        {/* Overlay */}
        {(work.isModal || work.url) && (
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-md transition-opacity duration-300">
            <span className="text-white text-lg font-semibold">
              {work.isModal ? 'View demo' : 'View project'}
            </span>
          </div>
        )}
      </div>
      <h2 className="text-lg font-semibold mb-2">{work.title}</h2>
      <p className="text-gray-600 text-base">{work.description}</p>
    </div>
  );
}
