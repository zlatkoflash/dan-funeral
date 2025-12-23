import Image from "next/image";

import iconEdit from './../../assets/images/icon-edit.svg';
import iconDelete from './../../assets/images/icon-delete-small.svg';

export interface IZButtonEdit {
  onClick: (e: any) => void,
  className?: string
  type?: 'edit' | 'delete'
}

export default function ZButtonEdit(data: IZButtonEdit) {
  return <button className={"btn-edit" + (data.className ? " " + data.className : "") + (data.type === 'delete' ? " btn-delete" : "")} type="button" onClick={data.onClick}>
    <Image src={data.type === 'delete' ? iconDelete : iconEdit} alt="icon edit" />
  </button>
}