import { useEffect, useState } from "react";

import NavigationBar from "../components/sections/NavigationBar";
import Sidebar from "../components/sections/sidebar/Sidebar";
import Fade from "../components/ui/Fade";

import { setBackgroundColor } from "../globals";

const Notes = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const [showFade, setShowFade] = useState<boolean>(false);

  useEffect(() => {
    setBackgroundColor();
  }, []);

  return (
    <>
      {showFade && <Fade />}

      <NavigationBar
        setToggleSidebar={setToggleSidebar}
        setShowFade={setShowFade}
      />
      <main className="notes-main w-full flex">
        <Sidebar
          toggleSidebar={toggleSidebar}
          setToggleSidebar={setToggleSidebar}
          setShowFade={setShowFade}
        />
      </main>
    </>
  );
};

export default Notes;
