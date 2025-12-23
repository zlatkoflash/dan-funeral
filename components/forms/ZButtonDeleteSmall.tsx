import Image from "next/image"
import iconDelete from './../../assets/images/icon-delete-small.svg';

export default function ZButtonDeleteSmall(
  data: {
    // onRemove?: (data: any) => void,
    onClick: () => void
  }
) {


  return <button type="button" className="btn-delete-small" onClick={data.onClick}>
    <Image src={iconDelete} alt="Delete" />
  </button>
}