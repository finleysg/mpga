import React, { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import { ITag } from '../../models/Documents';
import useTagApi from './TagApi';
import TagList from './TagList';

export interface ITagPickerProps {
    selectedTags: ITag[],
    OnChange: (currentTags: ITag[]) => void,
}

const TagPicker: React.FC<ITagPickerProps> = (props) => {

    const [{ isLoading, isError, data }, setQuery] = useTagApi("", []);
    const [tags, updateTags] = useState(props.selectedTags);
    let instance: any;

    const removeTag = (tag: ITag) => {
        const idx = tags.findIndex(t => t.id === tag.id);
        if (idx >= 0) {
            const updatedTags = tags.slice(0);
            updatedTags.splice(idx, 1);
            updateTags(updatedTags);
            props.OnChange(updatedTags);
        }
    };

    return (
        <div>
            <AsyncTypeahead
                id="tag-picker"
                ref={(typeahead) => instance = typeahead}
                labelKey="name"
                placeholder="Tags..."
                isLoading={isLoading}
                filterBy={["name"]}
                minLength={3}
                onSearch={query => {
                    setQuery(query);
                }}
                onChange={selected => {
                    tags.push(selected[0]);
                    const newTags = tags.slice(0);
                    updateTags(newTags);
                    props.OnChange(newTags);
                    instance.getInstance().clear();
                }}
                options={data}
            />
            <TagList tags={tags} RemoveTag={removeTag} />
            {isError && <span className="text-danger">Doh!</span>}
        </div>
    );
}

export default TagPicker;
