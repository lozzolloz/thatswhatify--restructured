import "./MainApp.css";
import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import OptionsSelect from "../components/OptionsSelect/OptionsSelect";
import CdCover from "../components/CdCover/CdCover";
import Footer from "../components/Footer/Footer";
import SaveButton from "../components/SaveButton/SaveButton";
import { getTopTracks, getCurrentUserProfile } from "../spotify";
import { catchErrors } from "../utils";

function App() {
  const [topTracks, setTopTracks] = useState([]);

  const [trackLimit, setTrackLimit] = useState(10);
  const [timeRange, setTimeRange] = useState("short_term");
  const [theme, setTheme] = useState("Balloons");
  const [userName, setUserName] = useState("");

  const today = new Date();
  const day = today.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = today.getMonth();
  const year = today.getFullYear();
  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  const trackLimits = [
    { value: 10, alias: "10 Tracks" },
    { value: 20, alias: "20 Tracks" },
    { value: 50, alias: "50 Tracks" },
  ];
  const timeRanges = [
    { value: "short_term", alias: "1 Month" },
    { value: "medium_term", alias: "6 Months" },
    { value: "long_term", alias: "Long Term" },
  ];
  const themes = [
    { value: "Balloons", alias: "Balloons" },
    { value: "Tropical", alias: "Tropical" },
    { value: "Bubbles", alias: "Bubbles" },
    { value: "Splash", alias: "Splash" },
    { value: "Fireworks", alias: "Fireworks" },
    { value: "Ice", alias: "Ice" },
  ];

  const captureScreenshot = () => {
    const elementToCapture = document.getElementById("cd-cover");
    if (elementToCapture) {
      html2canvas(elementToCapture).then(function (canvas) {
        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL("image/png");

        // Create a temporary anchor element to download the image
        const a = document.createElement("a");
        a.href = dataURL;
        a.download = "thatswhatify.png"; // Set the desired file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTopTracks = await getTopTracks(trackLimit, timeRange);
        console.log("API Response:", userTopTracks);
        setTopTracks(userTopTracks.data.items);
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
    };
    

    catchErrors(fetchData());
  }, [trackLimit, timeRange]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await getCurrentUserProfile();
        console.log("API Response:", userProfile);
        setUserName(userProfile.data.display_name);
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
    };
    

    catchErrors(fetchData());
  }, [trackLimit, timeRange]);

  useEffect(() => {
    console.log("This is our top tracks: ", topTracks);
  }, [topTracks]);

  useEffect(() => {
    console.log("This is our theme: ", theme);
  }, [theme]);

  return (
    <>
      <div className="main-app">
        <OptionsSelect
          trackLimit={trackLimit}
          trackLimits={trackLimits}
          setTrackLimit={setTrackLimit}
          timeRange={timeRange}
          timeRanges={timeRanges}
          setTimeRange={setTimeRange}
          theme={theme}
          themes={themes}
          setTheme={setTheme}
        />

        <CdCover
          topTracks={topTracks}
          trackLimit={trackLimit}
          timeRange={timeRange}
          theme={theme}
          formattedDate={formattedDate}
          userName={userName}
        />
        <SaveButton onClick={captureScreenshot} theme={theme} />
        <Footer />
      </div>
    </>
  );
}
export default App;
