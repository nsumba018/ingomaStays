"use client";

import BookingModal from "./BookingModal";
import Footer from "./Footer";
import GalleryLightbox from "./GalleryLightbox";
import Nav from "./Nav";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import DashboardScreen from "./screens/DashboardScreen";
import DestinationsScreen from "./screens/DestinationsScreen";
import DetailScreen from "./screens/DetailScreen";
import ExperiencesScreen from "./screens/ExperiencesScreen";
import HomeScreen from "./screens/HomeScreen";
import HomesScreen from "./screens/HomesScreen";
import SavedScreen from "./screens/SavedScreen";
import { s } from "@/lib/css";
import { IngomaProvider, useIngoma, type IngomaProps } from "@/lib/store";

export default function IngomaApp(props: IngomaProps) {
  return (
    <IngomaProvider {...props}>
      <Shell />
    </IngomaProvider>
  );
}

function Shell() {
  const v = useIngoma();

  return (
    <div
      className="app-root"
      style={s(
        "min-height:100vh;min-width:1280px;background:#FAFAF8;color:#212121;position:relative;"
      )}
    >
      <Nav />

      {v.onHome && <HomeScreen />}
      {v.onHomes && <HomesScreen />}
      {v.onDestinations && <DestinationsScreen />}
      {v.onExperiences && <ExperiencesScreen />}
      {v.onAbout && <AboutScreen />}
      {v.onContact && <ContactScreen />}
      {v.onSaved && <SavedScreen />}
      {v.onDashboard && <DashboardScreen />}
      {v.onDetail && <DetailScreen />}

      {v.galleryOpen && <GalleryLightbox />}
      {v.onBooking && <BookingModal />}

      <Footer />
    </div>
  );
}
