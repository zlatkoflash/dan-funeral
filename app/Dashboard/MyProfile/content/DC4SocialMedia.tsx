'use client';

import { Button, Col, Container, Row } from "react-bootstrap";
// Adjust import path as needed
import AdminSubmenuContentWrapMyProfile from "../../content/AdminSubmenuContentWrapMyProfile";
// import TextInput from "@/components/forms/Input";
import { useEffect, useState } from "react";
// import Image from "next/image";

// import plusIcon from './../../../../assets/images/icon-plus.svg';
import ListSocialItemsEditor from "@/components/forms/ListItemsEdits/ListSocialItemsEditor";
import { IListSocialItemsEditorItem } from "@/components/forms/ListItemsEdits/ListSocialItemsEditorItem";
import { IUserSocialLink, useAuth } from "@/ContextProvider/AuthProviderWrap";
import { GetSocialLinksFromJSONString, UpdateWPUserMetas } from "@/utils/user";
import FormSearch from "@/components/forms/ReadyForms/FormSearch";
import { IDCToasterMessage } from "../../DashboardProvider";

export default function DS4SocialMedia() {
  // State for the new password fields
  /*const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');*/

  const {
    user,
    setUser,

  } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [socialLinksJSOn, setSocialLinksJSOn] = useState<string>(user?.social_links_json_array || "[]");
  const [socialLinks, setSocialLinks] = useState<IUserSocialLink[]>(GetSocialLinksFromJSONString(user?.social_links_json_array as string));

  console.log("socialLinksJSOn:", socialLinksJSOn);

  const [singleMessage, setSingleMessage] = useState<IDCToasterMessage>({
    id: '',
    message: '',
    title: '',
    type: 'success',
  });

  return (
    <AdminSubmenuContentWrapMyProfile subHeadSearchSettings={{
      breads: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Dashboard",
          link: "/Dashboard",
        },
        {
          label: "My Profile",
          link: "/Dashboard/MyProfile",
        },
        {
          label: "Social Media",
          link: "",
        },
      ],
      title: "Social Media",
      right_content: <FormSearch buttonSearchType="btn-text" />
    }}>
      {/* Updated component name to reflect new purpose */}
      <form onSubmit={() => {

      }} className="form-dashboard">
        <Container>
          <Row>
            <Col>
              <ListSocialItemsEditor
                // items={socialItems} 
                itemsJSON={user?.social_links_json_array || "[]"}
                /*onAddItem={(item: IListSocialItemsEditorItem) => {
                  // setSocialItems([...socialItems, item]);
                }} onRemoveItem={(item: IListSocialItemsEditorItem) => {
                  // setSocialItems(socialItems.filter((item2) => item2.id !== item.id));
                }}*/
                onChangeItemsList={(items: IListSocialItemsEditorItem[], itemsJSON: string) => {
                  // setSocialItems(items);
                  // setUser({ ...user, social_links_json_array: itemsJSON });
                  console.log("itemsJSON", itemsJSON);
                  console.log("items", items);
                  setSocialLinksJSOn(itemsJSON);
                }}

              />
            </Col>
          </Row>


          <Row className="row-footer-buttons">
            <Col>
              {/* Submit Button */}
              <Button variant="success" type="button" className={`${loading ? "loading" : ""}`} onClick={async () => {

                setLoading(true);

                try {
                  const metas = [
                    {
                      var: "social_links_json_array",
                      val: socialLinksJSOn
                    }
                  ];
                  /*try {
                    const socialMetasArray = JSON.parse(socialLinksJSOn) as IListSocialItemsEditorItem[];
                    for (const meta of socialMetasArray) {
                      metas.push({
                        var: `social_${meta.socialType}`,
                        val: meta.link
                      })
                    }
                  }
                  catch (error) { }*/
                  await UpdateWPUserMetas(metas)
                }
                catch (error) {
                  console.log("error", error);
                  setLoading(false);
                }
                if (user) {

                  setUser({ ...user, social_links_json_array: socialLinksJSOn as string });
                }
                setSingleMessage({
                  id: "social-profile-updated-successfully",
                  message: "Social Profile Updated Successfully",
                  title: "Success",
                  type: "success",
                })
                setLoading(false);


              }}>Update Social Profile</Button>

            </Col>
          </Row>

          {
            singleMessage.id !== '' && <Row>
              <Col>
                <div className="text-let text-success">
                  {singleMessage.message}
                </div>
              </Col>
            </Row>
          }

        </Container>
      </form>
    </AdminSubmenuContentWrapMyProfile>
  );
}