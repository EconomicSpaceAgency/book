import { setReservationUsed, getReservationByReservationValue } from "../db/reservations";
import { getNextInvitation, getNextThreeInvitations, setInvitationInvitedByReservation } from "../db/invitations";

// previously working version ( with three invitations )
// const handleReservationOperations = async (reservationId, signer) => {
// try {
//     await setReservationUsed(reservationId, signer);
//     let initial = await getReservationByReservationValue(reservationId);
//     const threeNewInvitations = await getNextThreeInvitations();
//     threeNewInvitations.forEach(element => {
//     setInvitationInvitedByReservation(initial[0].id, element.value);
//     for (let i = 1; i <= 3; i++) {
//       let element = document.getElementById(`invitation-link${i}`);
//       element.innerHTML = `${import.meta.env.VITE_INVITATION_URL}${threeNewInvitations[i-1].value}`;
//   }
//   }); 
//   } catch (error) {
//     console.log('operations with invitation & reservation storage silently failed...');
//   }
// }
const handleReservationOperations = async (reservationId, signer) => {
  try {
      await setReservationUsed(reservationId, signer);
      let initial = await getReservationByReservationValue(reservationId);
      const newInvitation = await getNextInvitation();
      console.log('new invitation: ' + newInvitation);
      // let newInvitationModified = `,${newInvitation[0].value}`;
      setInvitationInvitedByReservation(initial[0].id, newInvitation[0].value);
        // let element = document.getElementById(`invitation-link1`);
        // element.innerHTML = `${import.meta.env.VITE_INVITATION_URL}${newInvitation[0].value}`;
      localStorage.setItem('invitation', `${import.meta.env.VITE_INVITATION_URL}${newInvitation[0].value}`);
    } catch (error) {
      console.log('operations with invitation & reservation storage silently failed...');
    }
  }
export {handleReservationOperations};

setInvitationInvitedByReservation