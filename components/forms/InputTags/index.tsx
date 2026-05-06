"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Badge, ListGroup, Form, InputGroup } from 'react-bootstrap';
import icon_arrow_dropdown from '@/assets/images/icon-arrow-dropdown.svg';


export interface ITagSelectorItem {
  value: string | number;
  label: string | React.ReactNode;
  selected?: boolean;
  object?: any;
}

const TagSelector = (
  {
    onTagsChange,
    value,
    items,
    title
  }
    :
    {
      onTagsChange?: (tags: ITagSelectorItem[]) => void,
      value?: ITagSelectorItem[],
      items?: ITagSelectorItem[]
      title?: string
    }
) => {

  // console.log("items:", items);

  const suggestions = items ? items : [{ value: 1, label: 'React' }, { value: 2, label: 'JavaScript' }, { value: 3, label: 'Bootstrap' }, { value: 4, label: 'Node.js' }, { value: 5, label: 'CSS' }, { value: 6, label: 'HTML' }, { value: 7, label: 'Python' }];

  const [inputValue, setInputValue] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<ITagSelectorItem[]>([]);
  const __selectedTags = () => {
    if (value) {
      return value;
    }
    return selectedTags;
  }
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  // const [suggestions] = useState<{ value: string | number, label: string }[]>(suggestion_items);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = suggestions.filter(item => {
    const matchesInput = typeof item.label === 'string' ? item.label.toLowerCase().includes(inputValue.toLowerCase()) : false;

    // Check if the current item's value already exists in the selectedTags array
    const isAlreadySelected = __selectedTags().some(tag => tag.value === item.value);

    return matchesInput && !isAlreadySelected;
  });

  const addTag = (tag: ITagSelectorItem) => {
    if (!__selectedTags().includes(tag)) {
      const newSelectedTags = [...__selectedTags(), tag];
      setSelectedTags(newSelectedTags);
      if (onTagsChange) {
        onTagsChange(newSelectedTags);
      }
    }
    setInputValue('');
    setShowDropdown(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const removeTag = (tagToRemove: ITagSelectorItem) => {
    const newSelectedTags = __selectedTags().filter((tag) => tag.value !== tagToRemove.value);
    setSelectedTags(newSelectedTags);
    if (onTagsChange) {
      onTagsChange(newSelectedTags);
    }
  };

  const handleWrapperClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    inputRef.current?.focus();
    setShowDropdown(true); // Show dropdown when the general wrapper is clicked
  };

  return (
    <div className="text-input-wrap tag-selector-wrap" ref={containerRef}>
      {
        title && (
          <label htmlFor="languages-spoken" className="form-label">
            {title}
          </label>
        )
      }
      <div className="position-relative tags-selector">
        <InputGroup
          className="d-flex flex-wrap align-items-center input-wrap"
          onClick={handleWrapperClick}
          style={{ cursor: 'text' }}
        >
          {__selectedTags().map((tag, index) => (
            <Badge
              key={index}
              bg="primary"
              className="d-flex align-items-center"
              style={{ fontSize: '0.85rem', height: 'fit-content' }}
              onClick={(e) => e.stopPropagation()}
            >
              <span
                className="me-2"
                style={{ cursor: 'pointer', fontSize: '1.1rem', lineHeight: '1' }}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
              >
                &times;
              </span>
              {tag.label}
            </Badge>
          ))}

          <Form.Control
            ref={inputRef}
            id="languages-spoken"
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(true); // Ensure it shows when specifically clicking the input text area
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredSuggestions.length > 0 && inputValue) {
                  addTag(filteredSuggestions[0]);
                }
              }
            }}
            placeholder={__selectedTags().length === 0 ? "Select tags..." : ""}
            className="border-0 shadow-none p-1 flex-grow-1"
            style={{ minWidth: '100px', outline: 'none' }}
          />

          <div
            className="px-2 d-flex align-items-center z-btn-arrow-dropdown"
            style={{ cursor: 'pointer', color: '#6c757d' }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Toggle logic for the arrow specifically
              setShowDropdown(!showDropdown);
            }}
          >
            <span style={{
              transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
              pointerEvents: 'none'
            }}>
              <img src={icon_arrow_dropdown.src} alt="arrow-down" />
            </span>
          </div>
        </InputGroup>

        {showDropdown && filteredSuggestions.length > 0 && (
          <ListGroup
            className="position-absolute w-100 shadow mt-1"
            style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}
          >
            {filteredSuggestions.map((suggestion, index) => (
              <ListGroup.Item
                key={index}
                action
                onMouseDown={(e) => {
                  e.preventDefault();
                  addTag(suggestion);
                }}
                className="py-2"
              >
                {suggestion.label}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>
    </div>
  );
};

export default TagSelector;