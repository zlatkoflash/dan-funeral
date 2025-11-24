
import Image from 'next/image';

import Link from 'next/link';
import HeadingTitleParagraph, { IHeadingTitleParagraph } from '../headings/HeadingTitleParagraph';


export interface IX3DirectoriesPanels {
  headingTitleParagraph: IHeadingTitleParagraph,
  panels: {
    src: any,
    title: string,
    link: string,
    type?: 'home-page' | 'marketing-page',
    paragrpah?: string,
    btnDirLabel?: string,
    // btnDirLink?: string
  }[]
}

export default function X3DirectoriesPanels(data: IX3DirectoriesPanels) {

  /*const data: {
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
    ];*/

  return <section className="x3-directories-panels">

    {/*<HeadingTitleParagraph

      show={true}

      title='How Gentle Road Helps You'
      paragraph='We simplify the planning process in three easy steps.'
    />*/}
    <HeadingTitleParagraph
      {...data.headingTitleParagraph}
    />

    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="wrap-white-box">
            <div className="content-inner">


              <div className="grid-panels">
                {
                  data.panels.map((item, key: number) => {
                    return <div className="directory-item" key={`directory-item-${key}`}>


                      <div className="button-holder">
                        <Link href={item.link} className='btn btn-dark'>
                          {
                            item.btnDirLabel !== undefined ?
                              item.btnDirLabel
                              :
                              "View Directory"
                          }
                        </Link>
                      </div>

                      {
                        // photo-content will be absolute and over the button holder
                      }
                      <div className="photo-content">
                        <div className="image">
                          <Image src={item.src} alt={item.title} />
                        </div>

                        {
                          item.type === 'home-page' || item.type === undefined ?
                            <div className="the-title">
                              <div className="number body-lg">0{key + 1}</div>
                              <div className="title body-lg">{item.title}</div>
                            </div>
                            :
                            <></>
                        }
                        {
                          item.type === 'marketing-page' ?
                            <div className="the-title">
                              <div className={`title body-lg ${item.type}`}>
                                <h5>{item.title}</h5>
                                {
                                  item.paragrpah !== undefined && item.paragrpah !== '' ?
                                    <p>{item.paragrpah}</p>
                                    :
                                    <></>
                                }
                              </div>
                            </div>
                            :
                            <></>
                        }

                        {
                          item.type === "marketing-page" ?
                            <div className="number-marketing">0{key + 1}</div>
                            :
                            <></>
                        }

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