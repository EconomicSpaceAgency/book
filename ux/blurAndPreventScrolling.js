function blurAndPreventScroll(){
    let bookContentSection = document.getElementById('bookContent');
    if(bookContentSection){
        bookContentSection.style.filter = `blur(5px)`;
        bookContentSection.style.overflow = 'hidden';
    }
    else{
        console.log('could not find element with id `bookContent`');
    }
    let bookIndex = document.getElementById('bookIndex');
    if(bookIndex){
        bookIndex.style.filter = `blur(5px)`;
    }
    else{
        console.log('could not find element with id `bookIndex`');
    }
    let footNotesAndAudiobook = document.getElementById('footNotesAndAudiobook');
    if(footNotesAndAudiobook){
        footNotesAndAudiobook.style.filter = `blur(5px)`;
    }
    else{
        console.log('could not find element with id `footNotesAndAudiobook`');
    }

}
function disableBlurAndEnableScroll(){
    let bookContentSection = document.getElementById('bookContent');
    if(bookContentSection){
        bookContentSection.style.filter = '';
        bookContentSection.style.overflow = ''; 
    }
    else{
        console.warn('could not find element with id `bookContent`');
    }
    let bookIndex = document.getElementById('bookIndex');
    if(bookIndex){
        bookIndex.style.filter = ``;
    }
    else{
        console.warn('could not find element with id `bookIndex`');
    }
    let footNotesAndAudiobook = document.getElementById('footNotesAndAudiobook');
    if(footNotesAndAudiobook){
        footNotesAndAudiobook.style.filter = `none`;
    }
    else{
        console.warn('could not find element with id `footNotesAndAudiobook`');
    }
}
export {blurAndPreventScroll, disableBlurAndEnableScroll}