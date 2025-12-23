import Image from 'next/image';
import React, { useState, ChangeEvent } from 'react';
import { Button } from 'react-bootstrap';
import ProfileImageChanger from "@/components/forms/ButtonProfileImageChanger";
import icon_plus from './../../assets/images/icon-plus.svg';
import profile_image_demo from './../../assets/images/dashboard-profile.jpg';
import TextInput from '../forms/Input';
import ZButtonEdit from '../forms/ZButtonEdit';
import ZButtonDeleteSmall from '../forms/ZButtonDeleteSmall';

// --- Types ---
export interface FAQItem {
  id: string;
  faqTitle: string; // New field for the Title
  firstName: string;
  lastName: string;
  position: string;
  description: string;
  profilePhoto: string | null;
}

interface FAQsEditorProps {
  initialItems?: FAQItem[];
  onUpdate?: (items: FAQItem[]) => void;
}

const FAQsEditor: React.FC<FAQsEditorProps> = ({ initialItems = [], onUpdate }) => {
  const [items, setItems] = useState<FAQItem[]>(
    initialItems.length > 0 ? initialItems : []
  );

  const triggerUpdate = (updatedItems: FAQItem[]) => {
    setItems(updatedItems);
    onUpdate?.(updatedItems);
  };

  const addItem = () => {
    const newItem: FAQItem = {
      id: crypto.randomUUID(),
      faqTitle: '',
      firstName: '',
      lastName: '',
      position: '',
      description: '',
      profilePhoto: null,
    };
    triggerUpdate([...items, newItem]);
  };

  const removeItem = (id: string) => {
    triggerUpdate(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof FAQItem, value: string | null) => {
    const updated = items.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    triggerUpdate(updated);
  };

  return (
    <div className="z-team-members">
      <div className="z-team-members-list">
        {items.map((item) => (
          <div key={item.id} className="z-team-member-item">

            <div className="z-team-member-heading-fields">
              {/* FAQ Title Input - Added as requested */}
              <TextInput
                containerClassName='w-100'
                placeholder="FAQ Title / Question Header"
                value={item.faqTitle}
                onChange={(e) => updateItem(item.id, 'faqTitle', e.target.value)}
                id={`faqTitle-${item.id}`}
                type='text'
              />


              {/*<ZButtonEdit type="delete" onClick={() => removeItem(item.id)} />*/}
              <ZButtonDeleteSmall onClick={() => removeItem(item.id)} />
            </div>

            <TextInput
              placeholder="FAQ Answer or description..."
              value={item.description}
              onChange={(content: string) => {
                updateItem(item.id, 'description', content)
              }}
              id={`description-${item.id}`}
              type='rich-text-editor'
              maxLength={400}
            />

          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="no-team-members">
          <p>No FAQs added yet.</p>
        </div>
      )}

      <Button variant='success' type='button' onClick={addItem}>
        <Image className='icon' src={icon_plus} alt="Add" />
        Add New FAQ
      </Button>
    </div>
  );
};

export default FAQsEditor;