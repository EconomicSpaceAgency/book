const i=async function(e){document.querySelectorAll(`#publishUnit${e}`).forEach(function(o){o?(o.className="buttonload",o.innerHTML='<i class="fa fa-circle-o-notch fa-spin"></i>Publishing...',n(o)):console.warn(`Button with ID ${o} not found.`)})};function n(e){e?(e.style.border="1px solid var(--c2)",e.style.padding="0.3em 0.8em 0.5em 0.8em",e.style.fontFamily="var(--bookFontFamily)",e.style.fontSize="var(--bookFontSize)",e.style.marginBottom="1em",e.style.marginLeft="74%",e.style.transition="border 250ms, background-color 250ms"):console.warn(`Button with ${e} not found.`)}export{i as t};
