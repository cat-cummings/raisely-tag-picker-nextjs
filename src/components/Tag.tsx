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
  let colorName = ''

  switch (tag.color) {
    case 'red':
      colorName = 'bg-red-300 text-red-800 border-red-500'
      break;
    case 'blue':
      colorName = 'bg-blue-300 text-blue-800 border-blue-500'
      break;
    case '#C8E8FF':
      colorName = 'bg-sky-100 text-sky-800 border-sky-500'
      break;
    case '#B2419A':
      colorName = 'bg-violet-300 text-violet-800 border-violet-500'
      break;
    case '#B7EDD5':
      colorName = 'bg-emerald-300 text-emerald-800 border-emerald-500'
      break;
    case '#EDB7B7':
      colorName = 'bg-rose-300 text-rose-800 border-rose-500'
      break;
    case '#4654B2':
      colorName = 'bg-indigo-300 text-indigo-800 border-indigo-500'
      break;
    default:
      colorName = 'bg-gray-300 text-gray-800 border-gray-500'
  }

  return (
    <li className={`flex flex-row mr-1 w-fit justify-between font-medium rounded-full text-xs px-3 py-1.5 text-center group cursor-pointer ${colorName} border`}
    >
      <p>{tag.title}</p>
      <p className='hidden group-hover:block ml-2' onClick={() => removeTag(tag.uuid)}>x</p>
    </li>
  );
}