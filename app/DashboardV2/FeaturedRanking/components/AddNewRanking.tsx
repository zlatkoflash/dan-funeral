'use client';

import icon_rank_eye from '@/assets/images/icon-eye-rank.svg';
import icon_delete from '@/assets/images/icon-delete-green.svg';
import icon_edit from '@/assets/images/icon-edit.svg';
import Image from 'next/image';
import { Button, Col, Container, Row } from 'react-bootstrap';
import example_listing_thumbnail from "@/assets/images/example-listing-thumbnail.jpg";
import ZSwitcherTabs from '@/components/ZSwitcherTabs';
import TextInput from '@/components/forms/Input';
import { useState } from 'react';
import TagsButtonsPlusMinus from '@/components/forms/TagsButtonsPlusMinus';
import dot_solid_circle from '@/assets/images/fas-fa-dot-circle.svg';
import dot_not_solid from '@/assets/images/far-fa-circle.svg';


export default function AddNewRanking() {

  const [loading, setLoading] = useState(false);

  return <>

    <div className="ranking-items-for-card">

      <div className="ranking-items-heading">
        <div className="left-content">
          <img src={icon_rank_eye.src} alt="Ad Preview" />
          <h5>
            Ad Preview
          </h5>
        </div>
        <div className="right-content-buttons">
          {
            /*<Link href="/DashboardV2/FeaturedRanking/AddNewRanking" className="btn btn-light ">
            Add New
          </Link>*/
          }
        </div>
      </div>


      <div className="ranking-items-list">
        <div className="item-ranking-card" >
          <div className="add-preview-panel">
            <div className="heading">
              <div className="left-content">
                <h5>"Home Renovation"</h5>
              </div>
              <div className="right-content">
                <div className="current-plan-label success">1st AD</div>
              </div>
            </div>
            <div className="content-inner">
              <div className="left-content">
                <Image src={example_listing_thumbnail} alt="image" width={250} height={250} />
                <div className="inner-titles-and-paragraphs">
                  <h5>Peaceful Funeral Home</h5>
                  <p>ID: #8821</p>
                </div>
              </div>
              <div className="right-content">
                <Button type="button" variant="light" className="btn-circle-icon">
                  <img src={icon_edit.src} alt="icon-edit" />
                </Button>
                <Button type="button" variant="light" className="btn-circle-icon">
                  <img src={icon_delete.src} alt="icon-delete" />
                </Button>
              </div>
            </div>
            <div className="footer-for">
              <p>Per Month $20</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="card-hr " />

      <div className="targeting-strategy-section">
        <div className="left-content">
          <h5>Targeting Strategy</h5>
          <p>Where should your ad appear?</p>
        </div>
        <div className="right-content">
          <ZSwitcherTabs />
        </div>
      </div>


      <form className='form-dashboard'>
        <Container>
          <Row>
            <Col>
              <TextInput
                id='service-category-target'
                label='Which Service Category target'
                placeholder=''
                type='select'
                options={[
                  {
                    value: 'option1',
                    label: 'Cremation Services'
                  },
                  {
                    value: 'option2',
                    label: 'Funeral Homes'
                  },
                  {
                    value: 'option3',
                    label: 'Funeral Planning'
                  },
                  {
                    value: 'option3',
                    label: 'Pre-paid Funerals'
                  }
                ]}
                onChange={() => { }}
                value=''
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <TagsButtonsPlusMinus title="Cremation Services" />
            </Col>
          </Row>

          <Row>
            <Col>
              <TextInput
                label="Price per month"
                id="price-per-month"
                type="text"
                placeholder="Price"
                onChange={() => { }}
                value=""
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="ranking-position-selector">
                <h3>Select Ranking Position</h3>
                <div className="ranking-position-radios">
                  {
                    [1, 2, 3].map((item, index) => {
                      return <label key={index} htmlFor={`ranking-position-${index}`} className="ranking-position-radio">
                        <input type="radio" name="ranking-position" id={`ranking-position-${index}`} />
                        <div className='the-content'>
                          <strong>1st Place</strong>
                          $150 /week
                        </div>

                        <div className="dot-icon">
                          <img src={dot_solid_circle.src} alt="icon" className='checked-dot' />
                          <img src={dot_not_solid.src} alt="icon" className='not-checked-dot' />
                        </div>
                      </label>
                    })
                  }
                </div>
              </div></Col>
          </Row>



          <Row className="row-buttons">
            <Col>
              <Button variant="light" type="button" className={`${loading ? "loading" : ""}`} onClick={() => {
                // ___SaveThePart();
              }}>
                Cancel
              </Button>

              <Button variant="success" type="button" className={`${loading ? "loading" : ""}`} onClick={() => {
                /*___SaveThePart(
                  true // redirect
                );*/
              }}>
                Add to Cart
              </Button>
            </Col>
          </Row>


        </Container>
      </form>




    </div>

  </>
}