"use client";

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ITagSelectorItem } from '../InputTags';

// const availableTags = ['React', 'JavaScript', 'Bootstrap', 'Node.js', 'CSS', 'HTML', 'Python'];

export default function TagsButtonsPlusMinus(
  {
    tags,
    title,
    onTagClick
  }: {
    tags?: ITagSelectorItem[]
    title?: string
    onTagClick?: (tag: ITagSelectorItem) => void
  }
) {
  // const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const availableTags = tags ? tags : [
    {
      label: 'React',
      value: 'react',
      selected: false
    },
    {
      label: 'JavaScript',
      value: 'javascript',
      selected: false
    },
    {
      label: 'Bootstrap',
      value: 'bootstrap',
      selected: false
    },
    {
      label: 'Node.js',
      value: 'node-js',
      selected: false
    },
    {
      label: 'CSS',
      value: 'css',
      selected: false
    },
    {
      label: 'HTML',
      value: 'html',
      selected: false
    },
    {
      label: 'Python',
      value: 'python',
      selected: false
    }
  ];

  /*const toggleTag = (tag: ITagSelectorItem) => {
    if (selectedTags.includes(tag)) {
      // Remove tag
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      // Add tag
      setSelectedTags([...selectedTags, tag]);
    }

  };*/

  return (
    <div className="text-input-wrap buttons-tags-list-element">
      <label htmlFor="languages-spoken" className="form-label">
        {title ? title : "Undefined Title"}
      </label>
      <div className="buttons-list">
        {availableTags.map((tag: ITagSelectorItem) => {
          // const isSelected = selectedTags.includes(tag);
          const isSelected = tag.selected;

          return (
            <Button
              key={tag.value}
              // variant={isSelected ? "active" : "outline-secondary"}
              onClick={() => {
                onTagClick?.(tag)
              }}
              className={isSelected ? "active" : ""}
              style={{ transition: 'all 0.2s ease' }}
            >
              <span >
                {isSelected ? '×' : '+'}
              </span>
              {tag.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}