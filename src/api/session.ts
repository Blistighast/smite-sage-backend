let session = null;

const sessionUpdater = (updatedSession) => {
  session = updatedSession;
};

const sessionTimeouter = () => {
  console.log("setting session timeout");
  setTimeout(() => {
    console.log("nulling session");
    session = null;
  }, 1000 * 60 * 14);
};

export { session, sessionUpdater, sessionTimeouter };
