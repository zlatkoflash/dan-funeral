import { Col, Container, Row } from "react-bootstrap";
import AButtonUpdateCreateListing from "./AButtonUpdateCreateListing";
import TeamManager, { TeamMember } from "@/components/grids/TeamManager";
import { useState } from "react";
import { useMyListing } from "../../../AddNewListing/MyListingProviderEditor";

export default function LE8MyTeam() {

  const {
    // listing, setListing,
    setActiveMyListingSlug,
    LE8MyTeam,
    setLE8MyTeam
  } = useMyListing();

  const [teams_members, setTeamsMembers] = useState<TeamMember[]>(LE8MyTeam);

  return <form onSubmit={() => { }} className="form-dashboard">
    <Container>
      <Row>
        <Col>
          <h3 className="title text-start">My Team</h3>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <TeamManager initialMembers={
            teams_members
            /*[
            {
              id: '1',
              firstName: 'John',
              lastName: 'Doe',
              position: 'Manager',
              profilePhoto: 'https://via.placeholder.com/150',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec metus vel metus placerat placerat.',
            },
            {
              id: '2',
              firstName: 'John',
              lastName: 'Doe',
              position: 'Manager',
              profilePhoto: 'https://via.placeholder.com/150',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec metus vel metus placerat placerat.',
            }
          ]*/
          } onUpdate={(members: TeamMember[]) => {
            console.log('members:', members);
            setTeamsMembers(members);
          }} />
        </Col>
      </Row>

      <AButtonUpdateCreateListing
        onContinue={() => {
          console.log('teams_members:', teams_members);
          // setListing({ ...listing, team_members: teams_members });
          setActiveMyListingSlug("faqs");
        }}
        onSubmit={() => { }}
        savingPartType="teamMembers"
        inputsData={{
          data: teams_members
        }}
      />

    </Container>
  </form>
}