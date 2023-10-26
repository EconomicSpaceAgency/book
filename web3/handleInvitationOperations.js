
import { setInvitationUsed, getInvitationByInvitationValue, getNextThreeInvitations, getNextInvitation, setInvitationInvitedBy } from "../db/invitations";

// previously working, with 3 invitations
// const handleInvitationOperations = async (invitationId, signer) => {
//     try {
//         await setInvitationUsed(invitationId, signer);
//         let initial = await getInvitationByInvitationValue(invitationId);
//         const threeNewInvitations = await getNextThreeInvitations();
//         threeNewInvitations.forEach(element => {
//         setInvitationInvitedBy(initial[0].id, element.value);
//         for (let i = 1; i <= 3; i++) {
//           let element = document.getElementById(`invitation-link${i}`);
//           element.innerHTML = `${import.meta.env.VITE_INVITATION_URL}${threeNewInvitations[i-1].value}`;
//       }
//       });
//       } catch (error) {
//         console.log('operations with invitation storage failed...');
//       }
// };

// introducing, with 1 invitation that can be used multiple times ( 3 )
const handleInvitationOperations = async (invitationId, signer) => {
  try {
      await setInvitationUsed(invitationId, `,${signer}`);
      let initial = await getInvitationByInvitationValue(invitationId);
      const newInvitation = await getNextInvitation();
      console.log('new invitation: ' + newInvitation);
      // let invitedByInvitationId = `,${newInvitation[0].value}`;
      setInvitationInvitedBy(initial[0].id, newInvitation[0].value);
      localStorage.setItem('invitation', newInvitation[0].value);
      // let invitationLinkElement = document.getElementById(`invitation-link1`);
      // invitationLinkElement.innerHTML = `${import.meta.env.VITE_INVITATION_URL}${newInvitation[0].value}`;
      localStorage.setItem('invitation', `${import.meta.env.VITE_INVITATION_URL}${newInvitation[0].value}`);
    } catch (error) {
      console.log('operations with invitation storage failed...');
      console.log(error);
    }
};  
export {handleInvitationOperations};
