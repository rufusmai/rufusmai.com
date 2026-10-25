import { initBotId } from 'botid/client/core';

// The contact form's Server Action posts to the contact page itself.
initBotId({
  protect: [
    { path: '/de/kontakt', method: 'POST' },
    { path: '/en/contact', method: 'POST' },
  ],
});
