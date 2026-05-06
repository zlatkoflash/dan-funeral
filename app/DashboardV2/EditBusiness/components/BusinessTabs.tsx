"use client"

import React from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import Link from 'next/link';
import BusinessIdentityPanelContent from './editors/BusinessIdentityPanelContent';
import BusinessLocationAndCategoriesContent from './editors/BusinessLocationAndCategoriesContent';
import BusinessMedia from './editors/BusinessMedia';
import BusinessIdentityServiceAndPricing from './editors/BusinessIdentityServiceAndPricing';
import BusinessFAQsEditor from './editors/BusinessFAQsEditor';
import BusinessHoursEditor from './editors/BusinessHoursEditor';
import BusinessHoursEditorWrap from './editors/BusinessHoursEditor';

interface BusinessTabsProps {
  activeTab: 'identity' | 'locations-and-categories' | 'media-gallery' | 'services-and-prices' | 'questions-and-answers' | 'business-hours';
}

export default function BusinessTabs({ activeTab }: BusinessTabsProps) {

  const navigationMap = [
    { key: 'identity', label: 'Identity', path: '/DashboardV2/EditBusiness' },
    { key: 'locations-and-categories', label: 'Locations & Categories', path: '/DashboardV2/EditBusiness/LocationsAndCategories' },
    { key: 'media-gallery', label: 'Media Gallery', path: '/DashboardV2/EditBusiness/MediaGallery' },
    { key: 'services-and-prices', label: 'Services & Prices', path: '/DashboardV2/EditBusiness/ServicesAndPrices' },
    { key: 'questions-and-answers', label: 'Questions & Answers', path: '/DashboardV2/EditBusiness/QuestionsAndAnswers' },
    { key: 'business-hours', label: 'Business Hours', path: '/DashboardV2/EditBusiness/BusinessHours' },
  ];

  return (
    <div className="business-editor-wrap">
      <Container >
        <Row>
          <Col>
            <div className="business-editor-content">
              {/* Navigation Tabs */}
              <Nav variant="tabs" activeKey={activeTab} className="border-bottom-0">
                {navigationMap.map((tab) => (
                  <Nav.Item key={tab.key}>
                    <Nav.Link eventKey={tab.key} as={Link} href={tab.path}>
                      {tab.label}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>

              {/* Content Panels Area */}
              <div className="tab-pane-wrapper">
                {activeTab === 'identity' && (
                  <BusinessIdentityPanelContent />
                )}

                {activeTab === 'locations-and-categories' && (
                  <BusinessLocationAndCategoriesContent />
                )}

                {activeTab === 'media-gallery' && (
                  <BusinessMedia />
                )}

                {activeTab === 'services-and-prices' && (
                  <BusinessIdentityServiceAndPricing />
                )}

                {activeTab === 'questions-and-answers' && (
                  <BusinessFAQsEditor />
                )}

                {activeTab === 'business-hours' && (
                  <BusinessHoursEditorWrap />
                )}

              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}