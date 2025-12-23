import React, { useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import ZButtonEdit from './ZButtonEdit';

interface ZProfileImageChangerProps {
  profilePhotoUrl: any;
  isUploading: boolean;
  onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  // Allowing custom dimensions to increase reusability
  width?: number;
  height?: number;
  id: string;
}

export default function ZProfileImageChanger({
  profilePhotoUrl,
  isUploading,
  onFileSelect,
  width = 150,
  height = 150,
  id
}: ZProfileImageChangerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    fileInputRef.current?.click();
    console.log("Profile image click triggered");
  };

  return (
    <div
      className={`profile-image-changer ${isUploading ? 'element-is-preloading' : ''}`}
      onClick={handleContainerClick}
    >
      <Image
        src={profilePhotoUrl}
        alt="Profile Image"
        width={width}
        height={height}
      />

      <ZButtonEdit onClick={(e) => {
        e.preventDefault();
        // Container click handles the logic, this prevents event bubbling issues
      }} />

      <input
        ref={fileInputRef}
        type="file"
        id={id}
        accept="image/*"
        className="d-none"
        onChange={onFileSelect}
      />
    </div>
  );
}