const C='dh-v1';
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(clients.claim());});
self.addEventListener('fetch',function(e){
  var u=new URL(e.request.url);
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(function(r){var cp=r.clone();caches.open(C).then(function(c){c.put('/',cp);});return r;}).catch(function(){return caches.match('/');}));
  } else if(u.origin===location.origin && /\.(png|jpg|jpeg|css|js|svg)$/.test(u.pathname)){
    e.respondWith(caches.match(e.request).then(function(m){return m||fetch(e.request).then(function(r){if(r.ok){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp);});}return r;});}));
  }
});
