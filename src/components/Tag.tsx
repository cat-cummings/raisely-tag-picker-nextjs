import cx from "classnames";
import { Close } from "./Buttons";
export interface TagObject {
  uuid: string;
  title: string;
  color: string;
}

interface TagProps {
  tag: TagObject;
  removeTag: (tagId: string) => void;
  tabIndex: number;
}

export const Tag = ({ tag, removeTag, tabIndex }: TagProps) => {

  const colorVariants: { [key: string]: string } = {
    'red': 'bg-red-300 text-red-950 border-red-800',
    'blue': 'bg-blue-300 text-blue-800 border-blue-500',
    '#C8E8FF': 'bg-sky-300 text-sky-800 border-sky-500',
    '#B2419A': 'bg-fuchsia-700 text-fuchsia-200 border-fuchsia-800',
    '#B7EDD5': 'bg-emerald-200 text-emerald-800 border-emerald-500',
    '#EDB7B7': 'bg-rose-300 text-rose-800 border-rose-500',
    '#4654B2': 'bg-indigo-300 text-indigo-800 border-indigo-500',
  }

  return (
    <li tabIndex={tabIndex} className={cx('flex flex-row text-nowrap mr-1 w-fit justify-between font-medium rounded-full place-items-center',
      `text-xs px-2 py-0.5 text-center group ${colorVariants[tag.color]} border h-[25px]`
    )}
    >
      <p>{tag.title}</p>
      <Close onClick={() => removeTag(tag.uuid)}
        className='hidden group-hover:block ml-1 pt-0.5 cursor-pointer text-inherit'
        aria-label={'Remove tag'} size={'13'} />
    </li>
  );
}