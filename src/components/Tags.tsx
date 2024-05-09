import React, { useEffect, useState, useRef, useMemo } from "react"
import CreatableSelect from "react-select/creatable"
import { twMerge } from "tailwind-merge"
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
  console.log(showInput, showAdd)

  // Only show tags that are not already assigned to the user
  const filteredTags = allTags?.filter((tag) => !userTags.includes(tag.uuid))
  const tagOptions = filteredTags?.map((tag) => ({ value: tag.uuid, label: tag.title, color: tag.color }))
  const selectRef = useRef(null)

  useEffect(() => {
    const fetchTagsData = async () => {
      try {
        const tags = await fetchTags();
        setAllTags(tags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTagsData();
  }, []);

  useEffect(() => {
    const fetchUserTagsData = async () => {
      try {
        const userTagsData = await fetchUserTags(user.uuid);
        setUserTags(userTagsData);
      } catch (error) {
        console.error('Error fetching user tags:', error);
      }
    };

    fetchUserTagsData();
  }, [user.uuid]);

  // runs when allTags or userTags changes. Returns array of tag objects
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
      await assignUserTag(user.uuid, value);
      setUserTags((prevUserTags) => (prevUserTags ? [...prevUserTags, value] : [value]));
    } else {
      const createdTag = await createTag({ title: value });
      setUserTags((prevUserTags) => (prevUserTags ? [...prevUserTags, createdTag.uuid] : [createdTag.uuid]));
    }
  };

  const removeTag = async (tagId: string) => {
    await removeUserTag(user.uuid, tagId);
    setUserTags((prevUserTags) => prevUserTags?.filter((tag) => tag !== tagId));
  }

  const mouseOutHandler = () => {
    if (showInput) return
    setShowAdd(false)
  }

  const clickOutHandler = () => {
    setShowInput(false)
    setShowAdd(false)
  }

  if (userTags.length === 0) return null

  return (
    <div className='m-2 p-4 outline w-1/3 outline-slate-300' onMouseEnter={() => setShowAdd(true)} onMouseLeave={() => mouseOutHandler()}>
      <h3 className='pb-2 font-bold'>Tags</h3>
      <div className="flex flex-row align-center">
        <ul className='pb-1 flex'>
          {userTagObjects.map((tag) => (
            <Tag key={tag.uuid} tag={tag} removeTag={removeTag} />
          ))}
        </ul>

        {showAdd && (
          !showInput ?
            <div className='flex group/add h-6 items-center'>
              <PlusButton onClick={() => setShowInput(true)} size={'20'} className='p-1 mt-1' />
              <p className='hidden group-hover/add:flex pl-1 pr-2 align-bottom text-sm'>ADD</p>
            </div> :
            <div className='w-1/2 h-4 min-h-4'>
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
                    <PlusButton onClick={() => changeHandler} size={'12'} className='p-0.5' />
                    <p className='text-xs pl-1'>CREATE TAG</p>
                  </div>
                )}
                noOptionsMessage={() => null}
                placeholder=''
                autoFocus={true}
                onMenuClose={() => clickOutHandler()}
                unstyled={true}
                classNames={{
                  control: (state) => twMerge('w-[100px] border border-black px-2 text-xs cursor-pointer',
                    'border-slate-500 border ',
                    'rounded-xl flex items-center h-[15px]'
                  ),
                  input: () => 'text-xs h-[15px] text-xs',
                  valueContainer: () => 'h-[15px] min-h-1 px-0 py-0',
                  menu: () => 'bg-white max-w-[130px] rounded-xl mt-1 text-xs',
                  menuList: () => 'rounded-xl border border-violet-300 w-[130px]',
                  option: (state) =>
                    twMerge(state.isFocused ? 'bg-violet-100' : '', 'py-1 px-2 cursor-pointer')
                }}
              />
            </div>)}
      </div>
    </div>
  )
}