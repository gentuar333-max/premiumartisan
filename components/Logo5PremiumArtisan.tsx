 
// components/Logo5PremiumArtisan.tsx
// Logo zyrtar PA — Industrial Bold #5
// Përdorim: <Logo5PremiumArtisan /> kudo në projekt

export default function Logo5PremiumArtisan() {
  return (
    <>
      <style>{`
        .pa-logo-5 {
          font-family: 'Bebas Neue', sans-serif;
        }
        .pa-logo-5 .pa-container {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .pa-logo-5 .pa-icon-box {
          background: #ff6b35;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #000;
          transform: rotate(45deg);
          flex-shrink: 0;
        }
        .pa-logo-5 .pa-icon-box span {
          transform: rotate(-45deg);
          display: block;
        }
        .pa-logo-5 .pa-text-box {
          text-align: left;
        }
        .pa-logo-5 .pa-main-text {
          font-size: 2.2rem;
          color: #fff;
          letter-spacing: 3px;
          line-height: 0.9;
        }
        .pa-logo-5 .pa-sub-text {
          font-size: 0.7rem;
          color: #ff6b35;
          letter-spacing: 4px;
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>

      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;600&display=swap"
        rel="stylesheet"
      />

      <div className="pa-logo-5">
        <div className="pa-container">
          <div className="pa-icon-box">
            <span>⚒</span>
          </div>
          <div className="pa-text-box">
            <div className="pa-main-text">PREMIUM</div>
            <div className="pa-main-text">ARTISAN</div>
            <div className="pa-sub-text">MARKETPLACE</div>
          </div>
        </div>
      </div>
    </>
  );
}