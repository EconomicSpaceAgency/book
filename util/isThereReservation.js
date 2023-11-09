function isThereReservation() {
    // Assuming you want to check the current page's URL
    const currentUrl = window.location.href; 
  
    // Create a URL object
    const url = new URL(currentUrl);
  
    // Get search params from the URL
    const searchParams = new URLSearchParams(url.search); 
  
    // Get the reservationId parameter from the URL
    const reservationId = searchParams.get('reservationId'); 
  
    if (reservationId) {
      console.log('Reservation ID:', reservationId);
      return true;
      // You can do something with the reservation ID here
    } else {
      console.log('No reservation ID found in the URL');
      return false;
    }
}
export {isThereReservation}