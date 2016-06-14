var disconnectTimer = null;

// 30 seconds by default
var disconnectTime = (Meteor.settings && Meteor.settings.public && Meteor.settings.public.disconnectTimeSec || 30) * 1000;

Meteor.startup(function () {
  disconnectIfHidden();  
});

document.addEventListener('visibilitychange', function() {
  if (disconnectTimer) {
    clearTimeout(disconnectTimer);
  }

  disconnectIfHidden();
});

function disconnectIfHidden() {
  if (document.hidden) {
    // Disconnect the app if the tab is in the background for `disconnectTime` seconds.
    disconnectTimer = setTimeout(function() {
      Meteor.disconnect();
    }, disconnectTime);
  } else {
    // Reconnect immediately when it is brought to the foreground.
    Meteor.reconnect();
  }
}
