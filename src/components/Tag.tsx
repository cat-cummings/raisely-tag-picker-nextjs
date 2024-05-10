export interface TagObject {
  uuid: string;
  title: string;
  color: string;
}

interface TagProps {
  tag: TagObject;
  removeTag: (tagId: string) => void;
}

export const Tag = ({ tag, removeTag }: TagProps) => {

  const colorVariants: { [key: string]: string } = {
    'red': 'bg-red-300 text-red-800 border-red-500',
    'blue': 'bg-blue-300 text-blue-800 border-blue-500',
    '#C8E8FF': 'bg-sky-300 text-sky-800 border-sky-500',
    '#B2419A': 'bg-violet-300 text-violet-800 border-violet-500',
    '#B7EDD5': 'bg-emerald-300 text-emerald-800 border-emerald-500',
    '#EDB7B7': 'bg-rose-300 text-rose-800 border-rose-500',
    '#4654B2': 'bg-indigo-300 text-indigo-800 border-indigo-500',
  }

  return (
    <li className={`flex flex-row mr-1 w-fit justify-between font-medium rounded-full text-xs px-3 py-1.5 text-center group cursor-pointer ${colorVariants[tag.color]} border`}
    >
      <p>{tag.title}</p>
      <p className='hidden group-hover:block ml-2' onClick={() => removeTag(tag.uuid)}>x</p>
    </li>
  );
}