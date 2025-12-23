import Image from 'next/image';
import React, { useState, ChangeEvent } from 'react';
import { Button } from 'react-bootstrap';
import ProfileImageChanger from "@/components/forms/ButtonProfileImageChanger";
// import { UserPlus, Trash2, Camera } from 'lucide-react';
import icon_plus from './../../assets/images/icon-plus.svg';
import profile_image_demo from './../../assets/images/dashboard-profile.jpg';
import TextInput from '../forms/Input';
import ZButtonEdit from '../forms/ZButtonEdit';
import { UploadFile } from '@/utils/files';

// --- Types ---
export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  description: string;
  // profilePhoto: string | null; // Base64 string or URL
  profile_photo: {
    file: File | null;
    preview: string | null;
    isNew?: boolean;
  }
}

interface TeamGridProps {
  initialMembers?: TeamMember[];
  onUpdate?: (members: TeamMember[]) => void;
}

const TeamManager: React.FC<TeamGridProps> = ({ initialMembers = [], onUpdate }) => {
  const [members, setMembers] = useState<TeamMember[]>(
    initialMembers.length > 0 ? initialMembers : []
  );

  // Central update function to return the full grid on every change
  const triggerUpdate = (updatedMembers: TeamMember[]) => {
    setMembers(updatedMembers);
    onUpdate?.(updatedMembers);
  };

  const addMember = () => {
    const newMember: TeamMember = {
      id: crypto.randomUUID(),
      firstName: '',
      lastName: '',
      position: '',
      description: '',
      // profilePhoto: null,
      profile_photo: {
        file: null,
        preview: "",
        isNew: true
      }
    };
    triggerUpdate([...members, newMember]);
  };

  const removeMember = (id: string) => {
    triggerUpdate(members.filter((m) => m.id !== id));
  };

  /*const updateMember = (id: string, field: keyof TeamMember, value: string | null) => {
    const updated = members.map((m) => (m.id === id ? { ...m, [field]: value } : m));
    triggerUpdate(updated);
  };*/
  const updateMember = (id: string, field: keyof TeamMember, value: any) => {
    const updated = members.map((m) => (m.id === id ? { ...m, [field]: value } : m));
    triggerUpdate(updated);
  };

  const ___SaveTheProfilePhoto = async (member: TeamMember, file: File) => {
    const result = await UploadFile(file, "members/");
    updateMember(member.id, 'profile_photo', {
      file,
      preview: result.url,
      isNew: true
    });
  }

  /*const handleFileChange = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        // updateMember(id, 'profilePhoto', reader.result as string);
        updateMember(id, 'profile_photo', {
          file: file,
          preview: base64String,
          isNew: true
        });
      };
      reader.readAsDataURL(file);
    }
  };*/

  return (
    <div className="z-team-members">
      {/*<div className="">
        {
          // <h2 className="text-2xl font-bold text-gray-800">Team Members</h2>
        }
        <button
          onClick={addMember}
          className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-all font-semibold shadow-md"
        >
          [icon plus]
          Add Member
        </button>
      </div>*/}

      <div className="z-team-members-list">
        {members.map((member) => (
          <div key={member.id} className="z-team-member-item">
            {/* Header: Photo + Name/Position */}

            <div className="z-team-member-heading-fields">

              {/*<div className="">
                  {member.profilePhoto ? (
                    <img src={member.profilePhoto} alt="Profile" className="" />
                  ) : (
                    <div className="">
                      [icon camera]
                    </div>
                  )}
                </div>
                <label className="">
                  <span className="">Upload</span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(member.id, e)} />
                </label>*/}

              <ProfileImageChanger
                id={`profileImage-${member.id}`}
                profilePhotoUrl={member.profile_photo.preview !== "" ? member.profile_photo.preview : profile_image_demo}
                isUploading={false}
                onFileSelect={async (e: ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      const base64String = e.target?.result as string;


                      /*updateMember(member.id, 'profile_photo', {
                        file,
                        preview: base64String,
                        isNew: true
                      });*/

                      ___SaveTheProfilePhoto(member, file);


                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />

              <TextInput
                placeholder="First Name"
                value={member.firstName}
                onChange={(e) => updateMember(member.id, 'firstName', e.target.value)}
                id={`firstName-${member.id}`}
                type='text'
              />
              <TextInput
                placeholder="Last Name"
                value={member.lastName}
                onChange={(e) => updateMember(member.id, 'lastName', e.target.value)}
                id={`lastName-${member.id}`}
                type='text'
              />
              <TextInput
                placeholder="Team Position"
                value={member.position}
                onChange={(e) => updateMember(member.id, 'position', e.target.value)}
                id={`position-${member.id}`}
                type='text'
              />

              <ZButtonEdit type="delete" onClick={() => removeMember(member.id)} />

            </div>

            {/*<div className="">
                <div className="flex gap-2">
                  <input
                    placeholder="First Name"
                    value={member.firstName}
                    onChange={(e) => updateMember(member.id, 'firstName', e.target.value)}
                    className=""
                  />
                  <input
                    placeholder="Last Name"
                    value={member.lastName}
                    onChange={(e) => updateMember(member.id, 'lastName', e.target.value)}
                    className=""
                  />
                </div>
                <input
                  placeholder="Position / Title"
                  value={member.position}
                  onChange={(e) => updateMember(member.id, 'position', e.target.value)}
                  className=""
                />
              </div>*/}


            {/* Description Area */}
            {/*<textarea
              placeholder="Short bio or description..."
              value={member.description}
              onChange={(e) => updateMember(member.id, 'description', e.target.value)}
              className=""
            />*/}

            <TextInput
              placeholder="Short bio or description..."
              value={member.description}
              onChange={(content: string) => {
                updateMember(member.id, 'description', content)
              }}
              id={`description-${member.id}`}
              type='rich-text-editor'
              maxLength={400}
            />

            {/* Remove Button */}
            {/*<button
              onClick={() => removeMember(member.id)}
              className=""
            >
              [icon delete]
            </button>*/}
          </div>
        ))}
      </div>

      {/*members.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-[2rem]">
          <p className="text-gray-400">No team members added yet.</p>
        </div>
      )*/}
      {
        members.length === 0 && (
          <div className="no-team-members">
            <p className="">No team members added yet.</p>
          </div>
        )
      }

      <Button variant='success' type='button' onClick={addMember}>
        <Image className='icon' src={icon_plus} alt="Add" />
        Add New Team Member
      </Button>

    </div>
  );
};

export default TeamManager;