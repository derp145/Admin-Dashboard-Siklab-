import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    displayName: "Admin",
    fullName: "Admin User",
    email: "admin@siklab.com",
    role: "Administrator",
    password: "123456",
    gender: "Male",
    birthdate: "2000-01-01",
    contact: "09123456789",
    profileImage: "",
    bannerImage: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [savedPopup, setSavedPopup] = useState(false);

  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showEmailConfirm, setShowEmailConfirm] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [tempValue, setTempValue] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [pendingPassword, setPendingPassword] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userProfile"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, profileImage: URL.createObjectURL(file) });
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, bannerImage: URL.createObjectURL(file) });
    }
  };

  const confirmSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(user));

    // 🔥 Notify header of update
    window.dispatchEvent(new Event("profileUpdated"));

    setEditMode(false);
    setConfirmPopup(false);
    setSavedPopup(true);
    setTimeout(() => setSavedPopup(false), 2000);
  };

  return (
    <div className="profile-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="profile-card">
        {/* Banner */}
        <div className="banner-wrapper">
          {user.bannerImage && (
            <img src={user.bannerImage} alt="banner" className="banner-img" />
          )}

          {editMode && (
            <label className="change-banner-bottom-btn">
              Change Banner
              <input type="file" hidden onChange={handleBannerChange} />
            </label>
          )}
        </div>

        {/* Header */}
        <div className="profile-header">
          <div className="avatar-wrapper">
            {user.profileImage ? (
              <img src={user.profileImage} alt="avatar" className="avatar-large" />
            ) : (
              <div className="avatar-large">A</div>
            )}

            {editMode && (
              <label className="change-avatar-btn">
                Change Avatar
                <input type="file" hidden onChange={handleAvatarChange} />
              </label>
            )}
          </div>

          <div className="name-email">
            <h2>{user.fullName}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        {/* Info */}
        <div className="info-section">
          <div className="section-title">Personal Information</div>

          <div className="form-row">
            <label>Display name</label>
            <input
              name="displayName"
              value={user.displayName}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          <div className="form-row">
            <label>Full name</label>
            <input
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          <div className="form-row">
            <label>Email</label>
            <div className="inline-field">
              <input value={user.email} disabled />
              {editMode && (
                <button
                  className="btn-style"
                  onClick={() => {
                    setTempValue(user.email);
                    setShowEmailPopup(true);
                  }}
                >
                  Change
                </button>
              )}
            </div>
          </div>

          <div className="form-row">
            <label>Password</label>
            <div className="inline-field">
              <input type="password" value={user.password} disabled />
              {editMode && (
                <button
                  className="btn-style"
                  onClick={() => {
                    setTempValue("");
                    setShowPasswordPopup(true);
                  }}
                >
                  Change
                </button>
              )}
            </div>
          </div>

          <div className="form-row">
            <label>Role</label>
            <input value={user.role} disabled />
          </div>

          <div className="form-row">
            <label>Gender</label>
            <select
              name="gender"
              value={user.gender}
              onChange={handleChange}
              disabled={!editMode}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="form-row">
            <label>Birthdate</label>
            <input
              type="date"
              name="birthdate"
              value={user.birthdate}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          <div className="form-row">
            <label>Contact No.</label>
            <input
              name="contact"
              value={user.contact}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="edit-button-bottom">
          {editMode ? (
            <>
              <button className="primary-btn" onClick={() => setEditMode(false)}>
                Cancel
              </button>
              <button
                className="primary-btn"
                onClick={() => setConfirmPopup(true)}
              >
                Save
              </button>
            </>
          ) : (
            <button className="primary-btn" onClick={() => setEditMode(true)}>
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Save Confirmation */}
      {confirmPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>Save changes?</p>
            <button className="primary-btn" onClick={confirmSave}>
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailPopup && (
        <div className="modal-overlay-small">
          <div className="modal-glass-small">
            <h3>Change Email</h3>
            <input
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
            />
            <button
              className="primary-btn full-width"
              onClick={() => {
                setPendingEmail(tempValue);
                setShowEmailPopup(false);
                setShowEmailConfirm(true);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {showEmailConfirm && (
        <div className="modal-overlay-small">
          <div className="modal-glass-small">
            <h3>Confirm Email</h3>
            <p>
              Change email to <b>{pendingEmail}</b>?
            </p>
            <div className="modal-secondary">
              <button
                className="link-btn"
                onClick={() => setShowEmailConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="primary-btn"
                onClick={() => {
                  setUser({ ...user, email: pendingEmail });
                  setShowEmailConfirm(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordPopup && (
        <div className="modal-overlay-small">
          <div className="modal-glass-small">
            <h3>Change Password</h3>
            <input
              type="password"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
            />
            <button
              className="primary-btn full-width"
              onClick={() => {
                setPendingPassword(tempValue);
                setShowPasswordPopup(false);
                setShowPasswordConfirm(true);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {showPasswordConfirm && (
        <div className="modal-overlay-small">
          <div className="modal-glass-small">
            <h3>Confirm Password</h3>
            <p>Are you sure you want to change your password?</p>
            <div className="modal-secondary">
              <button
                className="link-btn"
                onClick={() => setShowPasswordConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="primary-btn"
                onClick={() => {
                  setUser({ ...user, password: pendingPassword });
                  setShowPasswordConfirm(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {savedPopup && <div className="saved-popup">Saved!</div>}
    </div>
  );
};

export default Profile;