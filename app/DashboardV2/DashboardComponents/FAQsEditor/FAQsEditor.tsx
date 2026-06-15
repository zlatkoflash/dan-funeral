import icon_pencil from "@/assets/images/icon-pencil-green.svg";
import icon_delete from "@/assets/images/icon-delete-green.svg";
import icon_reorder_black from "@/assets/images/icon-reorder-black.svg";
import { Button } from "react-bootstrap";
import ModalAddFAQ from "./ModalAddFAQ";
import { dashboardSlice } from "@/redux/features/DashboardSlice";
import { useAppDispatch } from "@/redux/hooks";
import ModalFAQsReorder from "./ModalFAQsReorder";
import { IFAQBusiness } from "../../EditBusiness/components/editors/BusinessFAQsEditor";
import ModalEditFAQ from "./ModalEditFAQ";

export default function FAQsEditor({
  faqsBusiness,
  onDeleteFAQ,
  onUpdateFAQ,
  onAddFAQ,
  onUpdateOrder,
}: {
  faqsBusiness: IFAQBusiness[];
  onDeleteFAQ: (index: number) => void;
  onUpdateFAQ: (faq: IFAQBusiness, index: number) => void;
  onAddFAQ: (faq: IFAQBusiness) => void;
  onUpdateOrder: (
    faq: IFAQBusiness,
    index: number,
    direction: "up" | "down",
  ) => void;
}) {
  const dispatch = useAppDispatch();

  console.log("faqsBusiness:", faqsBusiness);

  return (
    <>
      <div className="services-editor text-input-wrap">
        <div className="heading">
          <label htmlFor="business-name" className="form-label">
            Frequently Asked Questions
          </label>

          <div className="right-buttons">
            <Button
              type="button"
              variant="light"
              className="btn-equal-icon"
              onClick={() => {
                console.log(
                  "It is working..., dashboardSlice.actions.setModalShow_FAQsReorder:",
                  dashboardSlice.actions.setModalShow_FAQsReorder,
                );
                dispatch(dashboardSlice.actions.setModalShow_FAQsReorder(true));
              }}
            >
              <img
                src={icon_reorder_black.src}
                alt="reorder"
                className="icon"
              />
            </Button>
            <Button
              type="button"
              variant="light"
              onClick={() => {
                dispatch(dashboardSlice.actions.setModalShow_AddFAQ(true));
              }}
            >
              Add New
            </Button>
          </div>
        </div>

        <div className="services-list">
          {faqsBusiness.map((faq, index) => (
            <div key={index} className="service-item faq-item">
              <div className="content-left">
                <h4>{faq.title}</h4>
                <div
                  className="answer"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
              <div className="actions">
                <Button
                  variant="light"
                  type="button"
                  className="btn-circle-icon"
                  onClick={() => {
                    dispatch(
                      dashboardSlice.actions.setModalShow_EditFAQ({
                        show: true,
                        faqIndex: index,
                      }),
                    );
                  }}
                >
                  <img src={icon_pencil.src} alt="pencil" />
                </Button>
                <Button
                  variant="light"
                  type="button"
                  className="btn-circle-icon"
                  onClick={() => {
                    onDeleteFAQ(index);
                  }}
                >
                  <img src={icon_delete.src} alt="delete" />
                </Button>
              </div>
            </div>
          ))}
          {faqsBusiness.length === 0 && (
            <p className="text-center">No FAQs in the list</p>
          )}
        </div>
      </div>

      <ModalAddFAQ
        onAddFAQ={(faq: IFAQBusiness) => {
          onAddFAQ(faq);
        }}
        onCancel={() => {}}
      />
      <ModalEditFAQ
        faqsBusiness={faqsBusiness}
        onEditFAQ={(faq: IFAQBusiness, index: number) => {
          onUpdateFAQ(faq, index);
        }}
        onCancel={() => {}}
        // faqIndex={faqIndex}
      />
      <ModalFAQsReorder
        faqs={faqsBusiness}
        onUpdateOrder={(
          faq: IFAQBusiness,
          index: number,
          direction: "up" | "down",
        ) => {
          //onUpdateOrder(faq, index, direction);
          onUpdateOrder(faq, index, direction);
        }}
        onCancel={() => {}}
      />
    </>
  );
}
