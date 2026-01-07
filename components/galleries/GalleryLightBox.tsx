import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, X } from 'react-bootstrap-icons';

interface ImageItem {
  url: string;
  alt?: string;
}

interface GalleryLightBoxProps {
  images: ImageItem[];
  showTheThumbs?: boolean;
  showFromOutside?: boolean;
  setShowFromOutside?: (show: boolean) => void;
}

export default function GalleryLightBox({ images, showTheThumbs = true, showFromOutside = undefined, setShowFromOutside = undefined }: GalleryLightBoxProps) {
  const [show, setShow] = useState(showFromOutside !== undefined ? showFromOutside : false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClose = () => {

    if (setShowFromOutside) {
      setShowFromOutside(false);
    }
    else {
      setShow(false);
    }
  }
  const handleShow = (index: number) => {
    setCurrentIndex(index);
    setShow(true);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Thumbnail Grid */}
      {
        showTheThumbs === true && <div className="d-flex flex-wrap gap-2">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={img.alt || `Gallery ${idx}`}
              style={{ width: '150px', cursor: 'pointer', borderRadius: '8px' }}
              onClick={() => handleShow(idx)}
            />
          ))}
        </div>
      }


      {/* Lightbox Modal */}
      <Modal
        show={showFromOutside !== undefined ? showFromOutside : show}
        onHide={handleClose}
        centered
        size="xl"
        contentClassName="bg-transparent border-0"
      >
        <Modal.Body className="p-0 position-relative d-flex align-items-center justify-content-center">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="btn text-white position-absolute"
            style={{ top: '10px', right: '10px', zIndex: 1050, fontSize: '2rem', border: 'none' }}
          >
            <X />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="btn text-white position-absolute start-0"
            style={{ zIndex: 1050, fontSize: '3rem', border: 'none' }}
          >
            <ChevronLeft />
          </button>

          <img
            src={images[currentIndex]?.url}
            alt="Lightbox content"
            className="img-fluid rounded"
            style={{ maxHeight: '90vh', objectFit: 'contain' }}
          />

          <button
            onClick={nextImage}
            className="btn text-white position-absolute end-0"
            style={{ zIndex: 1050, fontSize: '3rem', border: 'none' }}
          >
            <ChevronRight />
          </button>


          {/* Image Counter */}
          <div
            className="position-absolute bottom-0 end-0 m-3 px-3 py-1 bg-dark text-white rounded-pill opacity-75"
            style={{ fontSize: '0.9rem' }}
          >
            {currentIndex + 1} / {images.length}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}