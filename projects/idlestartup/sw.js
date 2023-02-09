//install service worker
self.addEventListener('install', evt=>{
   // console.log('service worker installed');  
})
//activate service worker
self.addEventListener('activate', evt=>{
   // console.log('service worker has been activated')  
})
//fetch request
self.addEventListener('fetch', evt=>{
   // console.log('Fetch event started', evt);   
})