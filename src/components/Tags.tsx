import React, { useEffect, useState, useRef, useMemo } from "react"
import CreatableSelect from "react-select/creatable"
import cx from "classnames"
import { fetchTags, createTag, assignUserTag, fetchUserTags, removeUserTag } from "../app/api"

import { PlusButton } from "./Buttons"
import { Tag } from "./Tag"
import { TagObject } from "./Tag"
import { User } from "./UserProfile"

export const UserTags = ({ ...user }: User) => {
  const [allTags, setAllTags] = useState<TagObject[] | null>(null)
  const [userTags, setUserTags] = useState<string[]>([])
  const [showInput, setShowInput] = React.useState<boolean>(false)
  const [showAdd, setShowAdd] = React.useState<boolean>(false)

  // Only show tags in select that are not already assigned to the user
  const filteredTags = allTags?.filter((tag) => !userTags.includes(tag.uuid))
  const tagOptions = filteredTags?.map((tag) => ({ value: tag.uuid, label: tag.title, color: tag.color }))
  const selectRef = useRef(null)

  // fetch tags on mount, and if user changes
  useEffect(() => {
    const fetchTagsData = async () => {
      try {
        const [tags, userTagsData] = await Promise.all([fetchTags(), fetchUserTags(user.uuid)]);
        setAllTags(tags);
        setUserTags(userTagsData);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTagsData();
  }, [user.uuid]);

  const userTagObjects = useMemo(() => {
    const uniqueUserTags = Array.from(new Set(userTags));
    return uniqueUserTags.map((tagId) => {
      if (!allTags) return null;
      const foundTag = allTags.find((tag) => tag.uuid === tagId);
      return foundTag ? { ...foundTag } : null;
    }).filter((tag) => tag !== null) as TagObject[];
  }, [allTags, userTags]);

  const changeHandler = async (value: string) => {
    setShowInput(false);

    // Check if the tag already exists in userTags
    if (userTags?.includes(value)) {
      return;
    }

    const existingTag = allTags?.find((tag) => tag.uuid === value);
    if (existingTag) {
      try {
        await assignUserTag(user.uuid, value);
        setUserTags((prevUserTags) => (prevUserTags ? [...prevUserTags, value] : [value]));
      } catch (error) {
        console.error('Error assigning tag:', error);
      }
    } else {
      try {
        const createdTag = await createTag({ title: value });
        setUserTags((prevUserTags) => (prevUserTags ? [...prevUserTags, createdTag.uuid] : [createdTag.uuid]));
      } catch (error) {
        console.error('Error creating tag:', error);
      }
    }
  };

  const removeTag = async (tagId: string) => {
    try {
      await removeUserTag(user.uuid, tagId);
      setUserTags((prevUserTags) => prevUserTags?.filter((tag) => tag !== tagId));
    } catch (error) {
      console.error('Error removing tag:', error);
    }
  }

  const mouseOutHandler = () => {
    if (showInput) return
    setShowAdd(false)
  }

  const clickOutHandler = () => {
    setShowInput(false)
    setShowAdd(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      setShowAdd(true);
    }
  };

  return (
    <div className='m-2 p-4 outline sm:w-1/2 md:w-1/3 w-2/3 outline-slate-300'
      onMouseEnter={() => setShowAdd(true)}
      onMouseLeave={() => mouseOutHandler()}
      onKeyDown={handleKeyDown}
      tabIndex={1}>
      <h3 className='pb-2 font-bold'>Tags</h3>
      <div className="flex flex-row items-center">
        <ul className='pb-1 flex flex-wrap gap-y-2 place-items-center'>
          {userTagObjects.map((tag, index) => (
            <Tag key={tag.uuid} tag={tag} removeTag={removeTag} tabIndex={index + 1} />
          ))}
          {showAdd && (
            !showInput ?
              <div className='flex group/add h-[15px] items-center'>
                <PlusButton onClick={() => setShowInput(true)} size={'14'} ariaLabel={'Add tag'} className='p-1' />
                <p className='opacity-0 group-hover/add:opacity-100 pl-1 pr-2 text-sm'>ADD</p>
              </div> :
              <div className='flex items-center'>
                <div className='w-1/2'>
                  <CreatableSelect
                    ref={selectRef}
                    options={tagOptions}
                    onChange={(value) => {
                      if (value && value.value) {
                        changeHandler(value.value);
                      }
                    }}
                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    formatCreateLabel={() => (
                      <div className='flex'>
                        <PlusButton onClick={() => changeHandler} size={'12'} ariaLabel={'Add new tag'} className='p-0.5' />
                        <p className='text-xs pl-1 text-slate-500 font-medium'>CREATE TAG</p>
                      </div>
                    )}
                    noOptionsMessage={() => null}
                    placeholder=''
                    autoFocus={true}
                    onMenuClose={() => clickOutHandler()}
                    unstyled={true}
                    theme={(theme) => ({
                      ...theme,
                      spacing: {
                        ...theme.spacing,
                        controlHeight: 25,
                        baseUnit: 0,
                      }
                    })}
                    classNames={{
                      control: () => cx('w-[100px] border border-black px-2 text-xs',
                        'border-slate-500 border cursor-pointer',
                        'rounded-xl flex items-center'
                      ),
                      input: () => 'text-xs text-xs m-0',
                      valueContainer: () => 'pt-0 py-0',
                      menu: () => 'bg-white max-w-[130px] rounded-xl mt-1 text-xs',
                      menuList: () => 'rounded-xl border border-violet-300 w-[130px] bg-white',
                      option: (state) =>
                        cx(state.isFocused ? 'bg-violet-100 rounded-xl max-w-[120px] text-fuchsia-950' : 'text-slate-400 bg-white', 'm-1 py-1 px-2 cursor-pointer'),
                    }}
                  />
                </div>
                <p className='opacity-0 group-hover/add:opacity-100 pl-1 pr-2 text-sm mt-1'>ADD</p>
              </div>
          )}
        </ul>
      </div>
    </div>
  )

}