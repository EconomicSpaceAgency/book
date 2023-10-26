function modifyBenefits() {
   let beneift5 = document.getElementById('benefit5');
    if(beneift5){
      beneift5.style.borderBottom = '1px solid';
    }
    let benefit6 = document.getElementById('benefit6');
    if(benefit6) {
      benefit6.remove();
    }  
    let benefit7 = document.getElementById('benefit7');
    if(benefit7) {
      benefit7.textContent = benefit7.textContent.replace('7.', '6.');
    }
}
function resetBenefits() {
  let removedBenefit = `<p id="benefit6" class="pbenefit"> 6. Receive the Special Edition print book →</p>`;
  if (removedBenefit) {
    let benefit5 = document.getElementById('benefit5');
    if (benefit5) {
      benefit5.after(removedBenefit);
    }
  }
  // Change the text content of the element with id 'benefit7' back to '7.'
  let benefit7 = document.getElementById('benefit7');
  if (benefit7) {
    benefit7.textContent = benefit7.textContent.replace('6.', '7.');
  }
}
export {modifyBenefits, resetBenefits};
  