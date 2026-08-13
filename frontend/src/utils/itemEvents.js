const ITEM_CREATED_EVENT = 'grabgrid:item-created';
const ITEM_CREATED_CHANNEL = 'grabgrid:item-created-channel';
const ITEM_CREATED_STORAGE_KEY = 'grabgrid:item-created-payload';

export const publishItemCreated = (item) => {
  if (typeof window === 'undefined') {
    return;
  }

  const payload = {
    item,
    timestamp: Date.now(),
  };

  window.dispatchEvent(new CustomEvent(ITEM_CREATED_EVENT, { detail: payload }));

  if ('BroadcastChannel' in window) {
    const channel = new BroadcastChannel(ITEM_CREATED_CHANNEL);
    channel.postMessage(payload);
    channel.close();
  }

  try {
    localStorage.setItem(ITEM_CREATED_STORAGE_KEY, JSON.stringify(payload));
    localStorage.removeItem(ITEM_CREATED_STORAGE_KEY);
  } catch {
    // Ignore storage access errors and keep the in-tab event as the fallback.
  }
};

export const subscribeToItemCreated = (handler) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleCustomEvent = (event) => handler(event.detail);
  window.addEventListener(ITEM_CREATED_EVENT, handleCustomEvent);

  let channel = null;
  const handleBroadcastMessage = (event) => handler(event.data);

  if ('BroadcastChannel' in window) {
    channel = new BroadcastChannel(ITEM_CREATED_CHANNEL);
    channel.addEventListener('message', handleBroadcastMessage);
  }

  const handleStorage = (event) => {
    if (event.key !== ITEM_CREATED_STORAGE_KEY || !event.newValue) {
      return;
    }

    try {
      handler(JSON.parse(event.newValue));
    } catch {
      // Ignore malformed payloads.
    }
  };

  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener(ITEM_CREATED_EVENT, handleCustomEvent);
    window.removeEventListener('storage', handleStorage);

    if (channel) {
      channel.removeEventListener('message', handleBroadcastMessage);
      channel.close();
    }
  };
};