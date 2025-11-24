import Image from "next/image";

import starsGray from './../../assets/images/stars-gray.svg';
// import stars from './../../assets/images/stars.svg';


export interface IZStars {
  value: number,
  size?: 'normal' | 'larger',
  showOutOfText?: boolean,
  reviewsCount?: number
}

export default function ZStars(data: IZStars) {
  return <>
    <div className={`z-stars ${data.size}`}>
      <div className={`stars-holder ${data.size}`}>
        <Image src={starsGray} alt="Stars" />
        <div className="stars-masked" style={{
          width: `${100 * (data.value / 5)}%`
        }}>
        </div>
      </div>
      <div className="text-value">
        {data.value.toFixed(1)}{data.showOutOfText === true ? ` out of 5` : ''}
      </div>
    </div>
    {
      data.reviewsCount !== undefined ?
        <div className="z-stars-review-count">{data.reviewsCount} reviews</div>
        :
        <></>
    }
  </>
}