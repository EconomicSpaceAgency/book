import { isTokenMinted } from '../web3/getMintedTokens.js'
import { getMintedTokens } from '../web3/getMintedTokens.js';
import { removeBlurFilter, setOrbBorderToSignalThatUnitIsPublished } from '../web3/ui-interactions/index.js';
import { enableSlider, enableCheckbox, replaceRevealPriceButtonWithActualPriceReverse } from "../ux/revealPrice.js";
import { deselectPhysicalBook } from '../ux/deselectPhysicalBook.js';
import { blurAndPreventScroll } from "../ux/blurAndPreventScrolling.js";

import { resetBenefits } from '../ux/modifyBenefits.js';

//Get the root style to access css variables
let root  = document.documentElement;

//Change color scheme
const colorSchemes = [
    /* --bg, --c1,  --c2, --c3, --c4 */
    ['#222','#bbb','#fff','#b7f43d','#5d8ffc','dark'], //SUBTLE-DARK
    ['#bbb','#222','#000','#4510cc','#047c02','light'], //SUBTLE-LIGHT
    ['#fff','#000','#222','#3b1e84','#028c55','light'], //LIGHT
    ['#b9d8e6','#58173e','#21173e','#ff5f3e','#db5cdb','light'], //WEIRD LIGHT A
    ['#cec2af','#16164c','#4c1634','#fc3c79','#019970','light'], //WEIRD-LIGHT B
    ['#121e2b','#d9f2a7','#9e6ffc','#fc53c6','#68f738','dark'], //INSANE-DARK A
    ['#23001c','#c9c9f8','#f4173e','#ffcb3e','#1c9bff','dark'], //INSANE-DARK B
    ['#000','#fff','#bbb','#e2ee5c','#ee7ac7','dark'] //DARK
];

const bookColorButton = document.getElementById('bookColorButton');
let bookColorIndicator = document.getElementById('bookColorIndicator');
bookColorIndicator.innerHTML = colorSchemes.length - 1;

const invertOnDarkArray = document.getElementsByClassName('invertOnDark');

let colorCounter = 0;
bookColorButton.onclick = function(){
  // Set color scheme
  root.style.setProperty('--bg', colorSchemes[colorCounter][0]);
  root.style.setProperty('--c1', colorSchemes[colorCounter][1]);
  root.style.setProperty('--c2', colorSchemes[colorCounter][2]);
  root.style.setProperty('--c3', colorSchemes[colorCounter][3]);
  root.style.setProperty('--c4', colorSchemes[colorCounter][4]);

  // Check if the color scheme type is dark
  if (colorSchemes[colorCounter][5] === 'dark') {
      // If dark theme, apply the CSS filter to invert the colors of the images
      for (let i = 0; i < invertOnDarkArray.length; i++) {
          invertOnDarkArray[i].style.filter = 'invert(1)';
      }
  } else {
      // If not dark theme, remove the CSS filter to return to the original image
      for (let i = 0; i < invertOnDarkArray.length; i++) {
          invertOnDarkArray[i].style.filter = 'invert(0)';
      }
  }
  // Update color counter and loop back to the first color scheme if necessary
  bookColorIndicator.innerHTML = colorCounter;
  colorCounter ++;
  if (colorCounter == colorSchemes.length) {
      colorCounter = 0;
  }
};

//END Change color scheme

//Change fonts
const fontPairs = [
    /* book, display, interface */
    ['Josefin Sans', 'Mazius','karrik'],
    ['Alegreya', 'coconat','ignazio'],
    ['Crimson Text', 'geomanist','argesta'],
    ['Source Sans Pro', 'Mattone','novela'],
    ['EB Garamond', 'basteleur','VG5000'],
];

const bookFontButton = document.getElementById('bookFontButton');
let bookFontIndicator = document.getElementById('bookFontIndicator');

let fontCounter = 0;
bookFontButton.onclick = function(){
    root.style.setProperty('--mainFontFamily', fontPairs[fontCounter][0]);
    root.style.setProperty('--displayFontFamily', fontPairs[fontCounter][1]);
    root.style.setProperty('--interfaceFontFamily', fontPairs[fontCounter][2]);
    bookFontIndicator.innerHTML = fontCounter;
    fontCounter ++;
    if(fontCounter == fontPairs.length){fontCounter = 0}
};

//Appear footnotes on view
let footNotes = document.getElementsByClassName('footNote');
let footNotesEx = document.getElementsByClassName('footNoteEx');
let thresholdLimit = 1;

let observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        let index = Array.from(footNotes).indexOf(entry.target);
        if(entry.isIntersecting === true){
            appear(footNotesEx[index], 250);
        } else {
            disappear(footNotesEx[index], 250);
        }
    });
}, { threshold: [thresholdLimit] });

// Activate Abount Content
// Activate observer for all footNotes
for(let c = 0; c < footNotes.length; c++){
    observer.observe(footNotes[c]);
}

//Appear functions
const appear = function(element, time){
  element.style.display = 'block';
  setTimeout(() => { element.style.opacity = 1; }, time);
};

const disappear = function(element, time){
  element.style.opacity = 0;
  setTimeout(() => { element.style.display = 'none'; }, time);
};

//Change audiobook file according to chapter in view
let sectionToAudioMap = {
  "Foreword": "01_Foreword.mp3",
  "chapter-1": "02_Chapter-01_Introduction.mp3",
  "chapter-2": "03_Chapter-02_From-capitalist-to-postcapitalist-economy.mp3",
  "Appendix-2.1": "04_Appendix-2.1_Do-big-data-change-the-story.mp3",
  "chapter-3": "05_Chapter-03_Markets-as-communication-networks.mp3",
  "chapter-4": "06_Chapter-04_Production-as-performance.mp3",
  "Appendix-4.1": "07_Appendix-4.1_A-performance-evaluation-framework.mp3",
  "Appendix-4.2": "08_Appendix-4.2_Performances-P-and-their-outputs-C.mp3",
  "chapter-5": "09_Chapter-05_Stake-the-key-to-value.mp3",
  "Appendix-5.1": "10_Appendix-5.1_Fundamental-value-and-speculation-Keynes-beauty-contest.mp3",
  "Appendix-5.2": "11_Appendix-5.2_Dividends-and-the-surplus.mp3",
  "chapter-6": "12_Chapter-06_The-commons.mp3",
  "chapter-7": "13_Chapter-07_Postcapitalist-units-of-measurement.mp3",
  "chapter-8": "14_Chapter-08_Liquidity-and-credit.mp3",
  "Appendix-8.1": "15_Appendix-8.1_Keynes-on-money-and-credit.mp3",
  "chapter-9": "16_Chapter-09_Exchange-relations-expressed-through-tokens.mp3",
  "Appendix-9.1": "17_Appendix-9.1_Tokens-and-network-derivatives.mp3",
  "chapter-10": "18_Chapter-10_Tokens-and-ledgers.mp3",
  "chapter-11": "19_Chapter-11_Dynamics-of-a-tokenised-network.mp3",
  "chapter-12": "20_Chapter-12_Stability-volatility-and-value.mp3",
  "Appendix-12.1": "21_Appendix-12.1_Tokenised-value-simple-and-expanded.mp3",
  "Appendix-12.2": "22_Appendix-12.2_MV=PQ.mp3",
  "chapter-13": "23_Chapter-13_The-conditions-of-a-digital-postcapitalist-economy.mp3"
};

let options = {
  root: null,
  rootMargin: '0px',
  threshold: 0
};

 // Ensure all units are the same size and occupy the full viewport.
 let singleUnits = document.querySelectorAll('.unit');
 // was before
//  let observerUnits = new IntersectionObserver(function(entries) {
//      entries.forEach(function(entry) {
//          if (entry.isIntersecting) {
//              // Update URL to reflect current unit.
//              let id = entry.target.id;
//              history.pushState({}, '', '#' + id);
//          }
//      });
//  }, {threshold: 0.5});  // Adjust threshold as needed.

// modified, so we preserve queryParameter like invitation & reservation
let observerUnits = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
      if (entry.isIntersecting) {
          let id = entry.target.id;

          let queryString = window.location.search;
          // Update URL with preserved query parameters and new hash.
          history.pushState({}, '', queryString + '#' + id);
      }
  });
}, { threshold: 0.5 });



 // Watch all units.
 singleUnits.forEach(function(unit) {
     observerUnits.observe(unit);
 });

let observerChapter = new IntersectionObserver(onIntersection, options);

// Watch all sections
let sections = document.querySelectorAll('[audiobookSection]');
sections.forEach(section => {
  observerChapter.observe(section);
});

// When a section intersects with the viewport
function onIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // This section is in view
      let sectionId = entry.target.id;
      let audioFile = sectionToAudioMap[sectionId];

      // Load and play the audio file
      loadAndPlayAudio(audioFile, sectionId);
    }
  });
}

function loadAndPlayAudio(file, sectionId) {
  // Stop current audio if any
  let audioElement = document.getElementById("audioBookFile");
  if (!audioElement.paused) {
    audioElement.pause();
  }

  // Replace hyphens with spaces and capitalize first letter for display
  let formattedSectionName = sectionId.replace(/-/g, ' ');
  formattedSectionName = formattedSectionName.charAt(0).toUpperCase() + formattedSectionName.slice(1);

  // Update displayed section name
  document.getElementById("bookSection").innerHTML = formattedSectionName;

  // Load new audio file
  let audioFilePath = `audiobook/${file}`;
  audioElement.src = audioFilePath;
}

//Increase and decrease font size buttons
const bookBiggerFontButton = document.getElementById('bookBiggerFontButton');
const bookSmallerFontButton = document.getElementById('bookSmallerFontButton');

bookBiggerFontButton.onclick = function(){
    if (bookBiggerFontButton.classList.contains('activeButton')){
        root.style.setProperty('--bookFontSize', '24px');
        this.classList.remove('activeButton');
    } else{
        this.classList.add('activeButton');
        root.style.setProperty('--bookFontSize', '28px');

        bookSmallerFontButton.classList.remove('activeButton');
    }
}

bookSmallerFontButton.onclick = function(){
    if (bookSmallerFontButton.classList.contains('activeButton')){
        root.style.setProperty('--bookFontSize', '24px');
        this.classList.remove('activeButton');
    } else{
        this.classList.add('activeButton');
        root.style.setProperty('--bookFontSize', '20px');

        bookBiggerFontButton.classList.remove('activeButton');
    }
}

//Toggle Index and Footnotes in mobile
const bookIndex = document.getElementById("bookIndex");

buttonIndex.onclick = function(){
    this.classList.toggle('activeButton');
    bookIndex.classList.toggle('showBookIndex');
};

const footNotesAndAudiobook = document.getElementById("footNotesAndAudiobook");

buttonFootNotes.onclick = function(){
    this.classList.toggle('activeButton');
    footNotesAndAudiobook.classList.toggle('showBookFootNotes');
};

//WITH SPANS
function createTermSpan(term, glossaryItem) {
  const span = document.createElement('span');
  span.textContent = term;

  const tooltip = document.createElement('span');
  tooltip.classList.add('tooltip');

  const definitionElement = document.createElement('span');
  definitionElement.classList.add('definition');
  definitionElement.textContent = glossaryItem.definition; // access the definition from the glossaryItem object

  const tooltipButton = document.createElement('button');
  tooltipButton.classList.add('term');

  tooltip.appendChild(span);
  tooltip.appendChild(tooltipButton);
  tooltip.appendChild(definitionElement);

  tooltip.addEventListener('mouseenter', () => {
    const parentRect = tooltip.parentElement.getBoundingClientRect();
    const buttonRect = tooltipButton.getBoundingClientRect();

    // Check if the term is on the left or right half of the parent element
    if (buttonRect.left + (buttonRect.width / 2) < parentRect.left + (parentRect.width / 2)) {
      // Term is on the left half of the parent, align the definition to the left of the term
      definitionElement.style.left = '0';
      definitionElement.style.right = 'auto';
    } else {
      // Term is on the right half of the parent, align the definition to the right of the term
      definitionElement.style.left = 'auto';
      definitionElement.style.right = '0';
    }
  });

  return tooltip;
}

function replaceTermsWithButtons(element, glossary) {
  if (element.classList.contains('bookGlossaryTermContainer')) {
    // Skip this element if it is a glossary term container
    return;
  }
  if (element.classList.contains('excludeGlossary')) {
    // Skip this element if it is a glossary term container
    return;
  }
  const terms = Object.keys(glossary);
  const regex = new RegExp('\\b(' + terms.join('|') + ')\\b', 'gi');

  Array.from(element.childNodes).forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      let content = node.textContent;
      const fragment = document.createDocumentFragment();
      let match;

      while ((match = regex.exec(content)) !== null) {
        // Add the text before the matched term
        const precedingText = content.slice(0, match.index);
        fragment.appendChild(document.createTextNode(precedingText));
        
        // Add the button for the matched term
        fragment.appendChild(createTermSpan(match[0], glossary[match[0].toLowerCase()]));

        // Remove the processed part of the content
        content = content.slice(regex.lastIndex);
        
        // Reset the regex lastIndex property, because we modified the content
        regex.lastIndex = 0;
      }
      
      // Add any remaining text after the last match
      fragment.appendChild(document.createTextNode(content));
      node.parentNode.replaceChild(fragment, node);
    } else if (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains('tooltip')) {
      // Only process childNodes that are not part of a tooltip
      replaceTermsWithButtons(node, glossary);
    }
  });
}

let tooltipsGenerated = false;
let tooltipsVisible = false;
let tooltipsFirstPress = true;

const buttonGlossary = document.getElementById("buttonGlossary");

buttonGlossary.addEventListener('click', function() {
  this.classList.toggle('activeButton');
  //on first press, generate tooltips
  if (tooltipsFirstPress){
    if (!tooltipsGenerated) {
        generateTooltips();
        tooltipsGenerated = true;
        tooltipsVisible = true;
    }
    tooltipsFirstPress = false;
    //after first press & tooltip generation, only hide and show
  } else if(!tooltipsFirstPress){
    if (tooltipsVisible){
      let tooltips = document.getElementsByClassName('tooltip');
      let terms = document.getElementsByClassName('term');
      for(let t = 0; t < tooltips.length; t++){
        tooltips[t].style.pointerEvents = 'none';
        terms[t].style.display = 'none';
      }
      tooltipsVisible = false;
    } else if (!tooltipsVisible){
      let tooltips = document.getElementsByClassName('tooltip');
      let terms = document.getElementsByClassName('term');
      for(let t = 0; t < tooltips.length; t++){
        tooltips[t].style.pointerEvents = 'all';
        terms[t].style.display = 'block';
      }
      tooltipsVisible = true;
    }
  }
});

function generateTooltips() {
  // Load the JSON file to make tooltips
  fetch('glossary.json')
      .then(response => response.json())
      .then(data => {
          // Convert the glossary array to an object
          const glossary = data.glossary.reduce((acc, item) => {
              acc[item.term.toLowerCase()] = { definition: item.definition, available: item.available }; // each glossary item is now an object
              return acc;
          }, {});

          const paragraphs = document.querySelectorAll('.unit');

          paragraphs.forEach(paragraph => {
              replaceTermsWithButtons(paragraph, glossary);
          });
      })
      .catch(error => console.error('Error:', error));
}

// Create the NFT paragraph and collect buttons
let units = [];
let unitsNFTLinks = [];
let unitsNFTImgs = [];
let unitsPublishButtons = [];
let mainUrl = '#';

// Start the unit ID at 602 for glossary items
let unitID = 602;
async function addGlosary(){
const mintedTokens = await getMintedTokens();
// Load the JSON file
fetch('glossary.json')
  .then(response => response.json())
  .then(async data => {
    // Convert the glossary array to an object
    const glossary = data.glossary;

    // Sort glossary array alphabetically by term
    glossary.sort((a, b) => a.term.localeCompare(b.term));

    // Get the parent element where the terms should be added
    const glossaryContainer = document.getElementById('bookGlossary');

    glossary.forEach(item => {
      const termContainer = document.createElement('details');
      termContainer.classList.add('bookGlossaryTermContainer');
      termContainer.classList.add('unit');
      termContainer.id = "u" + unitID;

      // Increment the unit ID for the next term
      unitID++;
      // here we should update glossary with response from a smart contract!
      // If the glossary term is available, add the 'available' class
      if (item.available) {
        termContainer.classList.add('available');
      }
      
      const termElement = document.createElement('summary');
      termElement.textContent = item.term;
      
      const definitionElement = document.createElement('p');
      definitionElement.textContent = ' ' + item.definition; // add space before definition for proper spacing
      
      termContainer.appendChild(termElement);
      termContainer.appendChild(definitionElement);
      
      glossaryContainer.appendChild(termContainer);
    });

    // Update units array
    units = Array.from(document.getElementsByClassName('unit'));

    for(let p = 0; p < units.length; p++){
      unitsNFTLinks[p] = document.createElement('a');
      unitsNFTLinks[p].classList.add('unitNFT');
      unitsNFTLinks[p].style.display = 'none';
      unitsNFTLinks[p].href = `${mainUrl}/${p+1}`;

      unitsNFTImgs[p] = document.createElement('img');
      unitsNFTImgs[p].src = `orbs/${p+1}.jpg`;

      unitsNFTLinks[p].appendChild(unitsNFTImgs[p]);
      units[p].prepend(unitsNFTLinks[p]);

      unitsPublishButtons[p] = document.createElement('button');
      const bool = await isTokenMinted(p+1, mintedTokens);
      if(!bool){
        unitsPublishButtons[p].classList.add('unitPublishButton');
      }
      unitsPublishButtons[p].style.display = 'none';
      unitsPublishButtons[p].id = `publishUnit${p+1}`; 
      // here we open `publish unit` popup
        if(!bool){
          unitsPublishButtons[p].innerHTML = `publish unit #${p+1}`;
          unitsPublishButtons[p].addEventListener('click', async function(event) {
              try {
                document.getElementById('priceTierOverlay').style.display = 'block';
                document.getElementById('priceTierOverlayClose').style.display = 'block';
                document.getElementById('priceTierContent').style.display = 'flex';
                blurAndPreventScroll();
                const mintingError = document.getElementById('tiersErrorMessage');
                const tiersSubmitButton = document.getElementById('tiersSubmitButton');
                if(mintingError){
                    mintingError.innerHTML = "";
                }
                if(tiersSubmitButton){
                    tiersSubmitButton.innerHTML = "Co-publish";
                }
                enableSlider();
                enableCheckbox();
                deselectPhysicalBook();
                replaceRevealPriceButtonWithActualPriceReverse();
                // resetBenefits();

                localStorage.setItem('tokenId', `${p+1}`);
              } catch (error) {
                    console.log("Trying to handle errors with magic:", error);
              }
          });
      }
      else{
        // remove blur filter for unit ( it's here or in script.js )
        removeBlurFilter(p+1);
        // set orb ( in index map ) border to signal that unit is published ( it's here on in script.js )
        setOrbBorderToSignalThatUnitIsPublished(p+1);
      }
      if (units[p].classList.contains('available')){
        units[p].append(unitsPublishButtons[p]);
      }
    }
  })
  .catch(error => console.error('Error:', error));
} 


 let unitNFTs = document.getElementsByClassName('unitNFT');


//hide/show all NFT links
const map = document.getElementById('map');
const toc = document.getElementById('toc');

let econMedia = false;
const bookOrbsButton = document.getElementById('bookOrbsButton');

bookOrbsButton.onclick = function(){
  this.classList.toggle('activeButton');
  // remove already minted tokenIds
  if(econMedia){
    econMedia = false;
    activateNFTs();
  }else if(econMedia === false){
    econMedia = true;
    activateNFTs();
  }
  // getAlreadyMintedTokenIds();
}
addGlosary();

const activateNFTs = function(){
  if (econMedia === true){
    map.style.display = 'grid';
    toc.style.display = 'none';

    for(let u = 1; u <units.length; u++){
      units[u].style.borderBottom = '1px solid var(--c2)';
     }

    for(let n = 1; n <unitNFTs.length; n++){
     unitNFTs[n].style.display = 'inline-block';
    }

    for(let b = 1; b <unitsPublishButtons.length; b++){
      // here
      unitsPublishButtons[b].style.display = 'inline-block';
     }

  }else if (econMedia === false){
    map.style.display = 'none';
    toc.style.display = 'block';

    for(let u = 1; u <units.length; u++){
      units[u].style.borderBottom = 'none';
     }

    for(let n = 1; n <unitNFTs.length; n++){
     unitNFTs[n].style.display = 'none';
    }
    for(let b = 1; b <unitsPublishButtons.length; b++){
      unitsPublishButtons[b].style.display = 'none';
     }
  }
};

function isIOS() {
  return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
  ].includes(navigator.platform) ||
  // iPad on iOS 13+ detection
  (navigator.userAgent.includes("Mac") && "ontouchend" in document);
}

window.onload = function() {
  if (isIOS()) {
      const btn = document.getElementById("buttonGlossary");
      if (btn) {
          btn.style.display = "none"; // hide the button
          btn.disabled = true; // disable the button
      }
  }
};
