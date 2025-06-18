import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  onAddClick,
  onEditProfile,
  onLogOut,
  onCardLike,
}) {
  return (
    <section className="profile">
      <div className="profile__sidebar">
        <SideBar onEditProfile={onEditProfile} onLogOut={onLogOut} />
      </div>
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}

export default Profile;
