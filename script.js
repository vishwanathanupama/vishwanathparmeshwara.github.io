const searchInput=document.getElementById('searchInput');
const cards=[...document.querySelectorAll('.gallery-card')];
const filters=[...document.querySelectorAll('.filter')];
const emptyMessage=document.getElementById('emptyMessage');
let activeFilter='all';

function updateGallery(){
  const term=searchInput.value.trim().toLowerCase();
  let visible=0;
  cards.forEach(card=>{
    const matchesType=activeFilter==='all'||card.dataset.type===activeFilter;
    const matchesText=card.dataset.name.toLowerCase().includes(term);
    const show=matchesType&&matchesText;
    card.hidden=!show;
    if(show) visible++;
  });
  emptyMessage.hidden=visible!==0;
}
filters.forEach(button=>button.addEventListener('click',()=>{
  activeFilter=button.dataset.filter;
  filters.forEach(item=>item.classList.toggle('active',item===button));
  updateGallery();
}));
searchInput.addEventListener('input',updateGallery);
document.querySelectorAll('[data-jump-filter]').forEach(link=>link.addEventListener('click',()=>{
  activeFilter=link.dataset.jumpFilter;
  filters.forEach(item=>item.classList.toggle('active',item.dataset.filter===activeFilter));
  updateGallery();
}));
document.getElementById('menuToggle').addEventListener('click',()=>{
  document.getElementById('mainNav').classList.toggle('show');
});
document.querySelectorAll('#mainNav a').forEach(link=>link.addEventListener('click',()=>{
  document.getElementById('mainNav').classList.remove('show');
}));
const lightbox=document.getElementById('lightbox');
const lightboxImage=document.getElementById('lightboxImage');
const lightboxCaption=document.getElementById('lightboxCaption');
cards.forEach(card=>card.addEventListener('click',()=>{
  const img=card.querySelector('img');
  lightboxImage.src=img.src;
  lightboxImage.alt=img.alt;
  lightboxCaption.textContent=card.dataset.name;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
}));
function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  lightboxImage.src='';
}
document.getElementById('closeLightbox').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',event=>{if(event.target===lightbox)closeLightbox();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeLightbox();});
document.getElementById('year').textContent=new Date().getFullYear();
