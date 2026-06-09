"use client";

import { Button } from "react-bootstrap";


import icon_pencil from '@/assets/images/icon-pencil-green.svg';
import icon_delete from '@/assets/images/icon-delete-green.svg';
import icon_reorder_black from '@/assets/images/icon-reorder-black.svg';
import ModalAddService from "./ModalAddService";
import { useDispatch } from "react-redux";
import { dashboardSlice } from "@/redux/features/DashboardSlice";
import { useEffect, useState } from "react";
import { getApiData } from "@/utils/api";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { formatPrice } from "@/utils/strings";
import ModalUpdateService from "./ModalUpdateService";
import { useRouter } from "next/navigation";
// import { setModalShow_AddService } from "@/redux/features/DashboardSlice";


export interface IOtherService {
  
  id?: number, // very important
  title: string,
  price: number,
  order: number,
  // service?: string
  field_id?: string
}

export default function ServicesEditor(
  {
    services,
    onDeleteService,
    onUpdateService,
    onAddService
  }: {
    services: IOtherService[],
    onDeleteService: (index: number) => void,
    onUpdateService: (service: IOtherService, index: number) => void,
    onAddService: (service: IOtherService) => void
  }
) {

  const dispatch = useDispatch();

  const { user } = useAuth();

  if (!user) {
    return <></>
  }

  // const [services, setServices] = useState<IOtherService[]>([]);

  const router = useRouter();

  const deleteService = async (index: number) => {

    /*const newUpdatedServices: IOtherService[] = services.filter((_, i) => i !== index);
    setServices((prevServices) => {
      return prevServices.filter((_, i) => i !== index);
    });*/

    onDeleteService(index);

    // await updateServices(newUpdatedServices);

  }



  return <>
    <div className="services-editor text-input-wrap">

      <div className="heading">
        <label htmlFor="business-name" className="form-label">Other Services</label>

        <div className="right-buttons">
          {
            /*<Button type="button" variant="light" className="btn-equal-icon">
            <img src={icon_reorder_black.src} alt="reorder" className="icon" />
          </Button>*/
          }
          <Button type="button" variant="light" onClick={() => {
            dispatch(dashboardSlice.actions.setModalShow_AddService(true));
          }}>
            Add New
          </Button>
        </div>
      </div>

      <div className="services-list">
        {
          services.map((service, index) => (
            <div key={index} className="service-item">
              <div className="content-left">
                <h4>{service.title}</h4>
                <p>Starting Price: {formatPrice(service.price)}</p>
              </div>
              <div className="actions">
                <Button variant="light" type="button" className="btn-circle-icon" onClick={() => {
                  dispatch(dashboardSlice.actions.setModalShow_EditService({ show: true, serviceIndex: index }));
                }}>
                  <img src={icon_pencil.src} alt="pencil" />
                </Button>
                <Button variant="light" type="button" className="btn-circle-icon" onClick={() => {
                  deleteService(index);
                }}>
                  <img src={icon_delete.src} alt="delete" />
                </Button>
              </div>
            </div>
          ))
        }
        {
          services.length === 0 && (
            <p className="text-center">No services in the list</p>
          )
        }
      </div>

    </div>

    <ModalAddService onAfterAddService={(service: IOtherService) => {
      // updateServices([...services, service]);
      /*setServices((prevServices) => {
        return [...prevServices, service];
      });*/

      onAddService(service);
    }} />

    <ModalUpdateService services={services} onAfterEditService={(service: IOtherService, index: number) => {
      /*const updatedServices = [...services];
      updatedServices[index] = service;
      setServices(updatedServices);*/
      // updateServices(updatedServices);

      onUpdateService(service, index);
    }} />
  </>
}