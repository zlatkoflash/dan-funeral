import Image from "next/image";

import iconEdit from './../../assets/images/icon-edit.svg';

export interface IZButtonEdit {
  onClick: (e: any) => void
}

export default function ZButtonEdit(data: IZButtonEdit) {
  return <button className="btn-edit" type="button" onClick={data.onClick}>
    <Image src={iconEdit} alt="icon edit" />
  </button>
}