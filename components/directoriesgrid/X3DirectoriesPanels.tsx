
import Image from 'next/image';
import help1 from './../../assets/images/1-help.jpg';
import help2 from './../../assets/images/2-help.jpg';
import help3 from './../../assets/images/3-help.jpg';
import Link from 'next/link';

export default function X3DirectoriesPanels() {

  const data: {
    src: any,
    title: string,
    link: string
  }[] = [
      {
        src: help1,
        title: "Search for your city  ",
        link: "",
      },
      {
        src: help2,
        title: "Compare trusted providers",
        link: "",
      },
      {
        src: help3,
        title: "Connect directly for guidance  ",
        link: "",
      },
    ];

  return <section className="x3-directories-panels">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="wrap-white-box">
            <div className="content-inner">
              <div className="heading">
                <h2 className="heading-lg">How Gentle Road Helps You</h2>
                <p className="body-xl">We simplify the planning process in three easy steps.</p>
              </div>

              <div className="grid-panels">
                {
                  data.map((data, key: number) => {
                    return <div className="directory-item" key={`directory-item-${key}`}>


                      <div className="button-holder">
                        <Link href={data.link} className='btn btn-dark'>View Directory</Link>
                      </div>

                      {
                        // photo-content will be absolute and over the button holder
                      }
                      <div className="photo-content">
                        <div className="image">
                          <Image src={data.src} alt={data.title} />
                        </div>

                        <div className="the-title">
                          <div className="number body-lg">0{key + 1}</div>
                          <div className="title body-lg">{data.title}</div>
                        </div>

                      </div>





                    </div>
                  })
                }
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}