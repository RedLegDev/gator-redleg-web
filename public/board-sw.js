/* Board hub service worker — push + notification click. */
self.addEventListener("push", (event) => {
  let title = "Gator Redleg Board";
  let body = "New board activity";
  let url = "https://www.gatorredleg.org/board";
  try {
    const data = event.data ? JSON.parse(event.data.text()) : {};
    if (data.title) title = data.title;
    if (data.body) body = data.body;
    if (data.url) url = data.url;
  } catch {
    /* ignore */
  }
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      data: { url },
      icon: "/icon.png",
      badge: "/icon.png",
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url =
    (event.notification.data && event.notification.data.url) ||
    "https://www.gatorredleg.org/board";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ("focus" in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
