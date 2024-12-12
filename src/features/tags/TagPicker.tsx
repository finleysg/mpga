import React, { useRef, useState } from "react";

import { Typeahead, TypeaheadRef } from "react-bootstrap-typeahead";

import { ITag } from "../../models/Documents";
import useTagApi from "./TagApi";
import TagList from "./TagList";

export interface ITagPickerProps {
  selectedTags: ITag[];
  OnChange: (currentTags: ITag[]) => void;
}

const TagPicker: React.FC<ITagPickerProps> = (props) => {
  const [{ isLoading, isError, data }] = useTagApi("", []);
  const [tags, updateTags] = useState(props.selectedTags);
  const typeaheadRef = useRef<TypeaheadRef>();

  const removeTag = (tag: ITag) => {
    const idx = tags.findIndex((t) => t.id === tag.id);
    if (idx >= 0) {
      const updatedTags = tags.slice(0);
      updatedTags.splice(idx, 1);
      updateTags(updatedTags);
      props.OnChange(updatedTags);
    }
  };

  return (
    <div>
      <Typeahead
        id="tag-picker"
        ref={typeaheadRef}
        labelKey="name"
        placeholder="Tags..."
        isLoading={isLoading}
        filterBy={["name"]}
        minLength={3}
        allowNew={true}
        onChange={(selected) => {
          tags.push(selected[0] as ITag);
          const newTags = tags.slice(0);
          updateTags(newTags);
          props.OnChange(newTags);
          typeaheadRef.current?.clear();
        }}
        options={data}
      />
      <TagList tags={tags} RemoveTag={removeTag} />
      {isError && <span className="text-danger">Doh!</span>}
    </div>
  );
};

export default TagPicker;
